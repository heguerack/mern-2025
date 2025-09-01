import { StatusCodes } from 'http-status-codes'
import { hashPassword, passwordsMatch } from '../utils/passwordBcrypt.js'
import { createJWT } from '../utils/jwtToken.js'
import {
  BadRequestError,
  UnAuthenticatedError,
} from '../errors/customErrors.js'
import UserModel from '../models/temp.js'

export const register = async (req, res) => {
  const { password } = req.body
  const hashedPassword = await hashPassword(password)
  const user = await UserModel.create({ ...req.body, password: hashedPassword })

  res.status(StatusCodes.CREATED).json({ msg: 'User created' })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.findOne({ email })
  if (!user) throw new UnAuthenticatedError('Not user with that email')

  const passwordsMatched = await passwordsMatch(password, user.password)
  if (!passwordsMatched) throw new BadRequestError('Invalid credentials')

  // no need to await
  const token = createJWT({ userId: user._id, role: user.role })

  // res.status(StatusCodes.OK).json({ token })

  const oneDay = 24 * 60 * 60 * 1000 //in milliseconds

  // seesm like this is how we add the cookie to the response :)
  // so the cookie will be the as cookie in the response, so remeber we have status, cookie,
  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', // at the moment is insecure, but it will be secured in production
  })

  res.status(StatusCodes.OK).json({ msg: 'logged in successfully' })
}

export const logout = async (req, res) => {
  res.cookie('token', 'autoExpiringToken', {
    // so just just dont return a token anymore
    httpOnly: true,
    expires: new Date(Date.now()), // now, not now + oneDay
  })
  res.status(StatusCodes.OK).json({ msg: 'User logged out' })
}

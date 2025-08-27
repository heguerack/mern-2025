import {
  BadRequestError,
  UnAuthenticatedError,
  UnUNAUTHORIZEDError,
} from '../errors/customErrors.js'
import { verifyJWT } from '../utils/jwtToken.js'

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    throw new UnAuthenticatedError('Auhentication Invalid, not token')
  }
  try {
    const data = verifyJWT(token)
    const { userId, role } = data
    const testUser = userId === '68ac6473e7762905a2caaee3' // so just like isSubmitting this become a boolean

    req.user = { userId, role, testUser } // and ehre we can injected to the req.user! , to be used in
    console.log('authMiddleware @ authenticateUser: ', req.user)
    next()
  } catch (error) {
    throw new UnAuthenticatedError('Auhentication Invalid, error')
  }
}

export const authorizePermissionsMiddleware = (data) => {
  return (req, res, next) => {
    if (data !== req.user.role) throw new UnUNAUTHORIZEDError('Not authorized')
    next()
  }
}

export const checkForTestuser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError('Demo user. Read Only!!')
  next()
}

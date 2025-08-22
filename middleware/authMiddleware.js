import {
  UnAuthenticatedError,
  UnUNAUTHORIZEDError,
} from '../errors/customErrors.js'
import { verifyJWT } from '../utils/jwtToken.js'

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies

  if (!token) {
    throw new UnAuthenticatedError('You are unauthenticated, should not pass')
  }
  try {
    const data = verifyJWT(token)

    const { userId, role } = data
    req.user = { userId, role } // and ehre we can injected to the req! , to be used in

    next()
  } catch (error) {}
}

export const authorizePermissionsMiddleware = (data) => {
  return (req, res, next) => {
    if (data !== req.user.role) throw new UnUNAUTHORIZEDError('Not authorized')
    next()
  }
}

import { UnAuthenticatedError } from '../errors/customErrors.js'
import { verifyJWT } from '../utils/jwtToken.js'

export const authenticateUser = async (req, res, next) => {
  // console.log('cookies at authmiddleware :', req.cookies.token)

  // check if token i
  const { token } = req.cookies
  // console.log('token at authMiddlewre', token)

  // check if token matches the one on the server
  if (!token) {
    throw new UnAuthenticatedError('You are unauthenticated, should not pass')
  }
  try {
    const data = verifyJWT(token)
    // console.log(data)
    // data:{// data should look like this cuz we injected the userId and role
    // userId: '68a7977265d4c5a1dbcf3bce',
    // role: 'user',
    // iat: 1755816834,
    // exp: 1755903234
    // }
    const { userId, role } = data // so here we pull the dada
    req.user = { userId, role } // and ehre we can injected to the req! , to be used in the next middlwware or route
    // lets try to see if we get the user in getALlJobs

    next()
  } catch (error) {}
}

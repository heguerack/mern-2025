import { Router } from 'express'

// import { validateLoginInput } from '../middleware/validationMiddleware.js'
import { login, logout, register } from '../controllers/AuthController.js'
// import { validateRegister } from '../middleware/middewareValidations/validateRegister.js'
import { validateLoginInput } from '../middleware/middewareValidations/validateLoginInput.js'
import { validateRegisterInput } from '../middleware/middewareValidations/validateRegisterInput.js'
// import { validateUserInput } from '../middleware/middewareValidations/validateUserInput.js'

const router = Router()

router
  .post('/register', validateRegisterInput, register)
  .post('/login', validateLoginInput, login)
  .get('/logout', logout)

export default router

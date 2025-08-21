import { Router } from 'express'

import {
  validateLoginInput,
  validateUserInput,
} from '../middleware/validationMiddleware.js'
import { loginUser, registerUser } from '../controllers/AuthController.js'

// import { createJobValidation } from '../middleware/validationMiddleware.js'

const router = Router()

router
  // .route('/')
  // .post(validateUserInput, registerUser)
  // .post(validateUserInput, loginUser)
  .post('/register', validateUserInput, registerUser)
  .post('/login', validateLoginInput, loginUser)

export default router

import { body } from 'express-validator'
import { withValidationErrors } from './mainValidationFunction.js'
// import { withValidationErrors } from './mainValidationFunction.js'

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalidemail format'),
  body('password')
    .notEmpty()
    .withMessage('Password location is required')
    .isLength({ min: 5 })
    .withMessage('pasword must be at least 5 characters'),
])

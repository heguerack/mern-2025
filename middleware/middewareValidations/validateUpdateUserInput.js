import { body } from 'express-validator'
import {
  BadRequestError,
  UnAuthenticatedError,
} from '../../errors/customErrors.js'

import USerModel from '../../models/temp.js'
import { withValidationErrors } from './mainValidationFunction.js'
import { passwordsMatch } from '../../utils/passwordBcrypt.js'

export const validateUpdateUserInput = withValidationErrors([
  body('name')
    .notEmpty()
    .withMessage('name is required')
    .isLength({ min: 3 })
    .withMessage('name must be at least 3 characters')
    .trim(),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('Invalidemail format')
    .custom(async (email, { req }) => {
      const user = await USerModel.findOne({ email })
      if (user && user.id.toString() !== req.user.userId)
        // so if the user eaxists and its not us,
        throw new UnAuthenticatedError('Email already exists')
    }),
  body('location')
    .notEmpty()
    .withMessage('Location location i srequired')
    .isLength({ min: 3 })
    .withMessage('Location must be at least 3 characters'),
  body('lastName')
    .notEmpty()
    .withMessage('Last name is srequired')
    .isLength({ min: 3 })
    .withMessage('Last name is srequired'),
])

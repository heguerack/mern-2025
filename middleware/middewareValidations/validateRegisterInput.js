import { body } from 'express-validator'
import { BadRequestError } from '../../errors/customErrors.js'

import USerModel from '../../models/USerModel.js'
import { withValidationErrors } from './mainValidationFunction.js'

export const validateRegisterInput = withValidationErrors([
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
    .custom(async (email) => {
      const user = await USerModel.findOne({ email })
      if (user) throw new BadRequestError('Email already taken')
    }),
  body('password')
    .notEmpty()
    .withMessage('Password location is required')
    .isLength({ min: 5 })
    .withMessage('pasword must be at least 5 characters'),
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

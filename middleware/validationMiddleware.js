import { body, param, validationResult } from 'express-validator'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from '../errors/customErrors.js'
import { JOB_STATUS, JOB_TYPE, ROLES } from '../utils/constants.js'
// import BadRequestError from '../errors/customErrors.js'
import mongoose from 'mongoose'
import JobModel from '../models/JobModel.js'
import USerModel from '../models/USerModel.js'
import { passwordsMatch } from '../utils/passwordBcrypt.js'

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      // console.log(errors)
      console.log('errors.errors', errors.errors) // check the console.log for errors
      console.log(errors.isEmpty()) // if falso , that means we have error, if true it means we good it can pass,
      if (!errors.isEmpty()) {
        const errorMessages = errors.errors.map((error) => error.msg)
        console.log(errorMessages)
        // return res.status(400).json({ errorsArray: errorMessages })
        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages)
        }
        throw new BadRequestError(errorMessages)
      }

      next()
    },
  ]
}

export const validateTest = withValidationErrors([
  // so each of these is like a middleware on it won, they are chained. like body("name").noEmpty()  .withMesage("")...so htere asre a bunch of middleaware and internally express know what to do when they are in the array and addt he next() internally
  body('name') // meaning req.body?? and then the property name?...makes sese...
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .trim(),
  ///then here we check if we got any error and get the back as an array of erros
  // example: {"errorsArray":["Name is required","Invalid value"]}
])

export const validateJobInput = withValidationErrors([
  body('company')
    .notEmpty()
    .withMessage('Company is required')
    .isLength({ min: 3 })
    .withMessage('Company must be at least 3 characters')
    .trim(),
  body('position')
    .notEmpty()
    .withMessage('position is required')
    .isLength({ min: 3 })
    .withMessage('position must be at least 3 characters')
    .trim(),
  body('jobLocation')
    .notEmpty()
    .withMessage('Job location i srequired')
    .isLength({ min: 3 })
    .withMessage('position must be at least 3 characters'),
  body('jobStatus')
    .isIn(Object.values(JOB_STATUS)) //vey cool cuz we store JOB_STATUS as as object and move it around as an array too
    .withMessage('Invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid job value'),
])

export const validateIdParams = withValidationErrors([
  // so that the id here is in the format we require,
  // http://localhost:5100/api/v1/jobs/68a5ceae0f6061baddea7948
  param('id')
    // .custom((value) => {
    //   console.log('validateIdParams?:', mongoose.Types.ObjectId.isValid(value))
    //   return mongoose.Types.ObjectId.isValid(value)

    .custom(async (value) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value)
      if (!isValidId)
        throw new BadRequestError('the ID is not in the right format')
      //check if id exists
      const job = await JobModel.findById(value)
      if (!job) throw new NotFoundError(`no job with that ${value}`)
    }),
  // .withMessage('the ID is not in the right format'), <= so basically we dont need this one as we are using/doing a our own
])

export const validateUserInput = withValidationErrors([
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
      const user = await USerModel.findOne({ email }) //so thos email is coming form the body('email'), whatver is the value
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
  // body('role').isIn(Object.values(ROLES)).withMessage('Invalid role value'),
])

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

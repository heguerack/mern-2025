import { validationResult } from 'express-validator'
import {
  BadRequestError,
  NotFoundError,
  UnUNAUTHORIZEDError,
} from '../../errors/customErrors.js'

export const withValidationErrors = (validateValues) => {
  return [
    validateValues, //which is an array  of middlewres really
    // and if the previos or the passign array is not enought, then we run the next one lol
    (req, res, next) => {
      //I just feel we dont need this logic, its like we are pulling the errors we already have in place to then set them up again
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.errors.map((error) => error.msg)
        console.log(errorMessages)
        if (errorMessages[0].startsWith('no job')) {
          //im not quire sure of these logics, seem likea repetition
          throw new NotFoundError(errorMessages)
        }
        if (errorMessages[0].startsWith('not authorized')) {
          //im not quire sure of these logics, seem likea repetition
          throw new UnUNAUTHORIZEDError(errorMessages)
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

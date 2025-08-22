import { param } from 'express-validator'
import { withValidationErrors } from './mainValidationFunction.js'
import {
  BadRequestError,
  NotFoundError,
  UnUNAUTHORIZEDError,
} from '../../errors/customErrors.js'

export const validateIdParams = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId)
      throw new BadRequestError('the ID is not in the right format')

    const job = await JobModel.findById(value)
    if (!job) throw new NotFoundError(`no job with that ${value}`)

    console.log('userId', req.user.userId)
    console.log('createdBy :', job.createdBy.toString())

    const isAdmin = req.user.role === 'admin'
    const isOwner = job.createdBy.toString() === req.user.userId

    if (!isAdmin && !isOwner)
      throw new UnUNAUTHORIZEDError('not authorized to access this route')
  }),
])

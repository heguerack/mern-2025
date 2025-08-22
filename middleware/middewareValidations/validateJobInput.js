import { body } from 'express-validator'

import { JOB_STATUS, JOB_TYPE } from '../../utils/constants.js'
import { withValidationErrors } from './mainValidationFunction.js'

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
    .isIn(Object.values(JOB_STATUS))
    .withMessage('Invalid status value'),
  body('jobType')
    .isIn(Object.values(JOB_TYPE))
    .withMessage('Invalid job value'),
])

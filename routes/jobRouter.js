import { Router } from 'express'

import {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
} from '../controllers/jobController.js'
import { validateJobInput } from '../middleware/middewareValidations/validateJobInput.js'
import { validateIdParams } from '../middleware/middewareValidations/validateIdParams.js'
// import { createJobValidation } from '../middleware/validationMiddleware.js'

const router = Router()

router.route('/').get(getAllJobs).post(validateJobInput, createJob)

router
  .route('/:id')
  .get(validateIdParams, getSingleJob)
  .patch(validateJobInput, validateIdParams, updateJob)
  .delete(validateIdParams, deleteJob)

// very importan we must exoport the router!
export default router

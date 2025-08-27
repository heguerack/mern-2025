import { Router } from 'express'

import {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
  showStats,
} from '../controllers/jobController.js'
import { validateJobInput } from '../middleware/middewareValidations/validateJobInput.js'
import { validateIdParams } from '../middleware/middewareValidations/validateIdParams.js'
import { checkForTestuser } from '../middleware/authMiddleware.js'
// import { createJobValidation } from '../middleware/validationMiddleware.js'

const router = Router()

router
  .route('/')
  .get(getAllJobs)
  .post(checkForTestuser, validateJobInput, createJob)

router.route('/stats').get(showStats)

router
  .route('/:id') //:id has to be the last route
  .get(validateIdParams, getSingleJob)
  .patch(checkForTestuser, validateJobInput, validateIdParams, updateJob)
  .delete(checkForTestuser, validateIdParams, deleteJob)

// very importan we must exoport the router!
export default router

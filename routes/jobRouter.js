import { Router } from 'express'

import {
  getAllJobs,
  getSingleJob,
  createJob,
  deleteJob,
  updateJob,
} from '../controllers/jobController.js'

const router = Router()

router.route('/').get(getAllJobs).post(createJob)

router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

// very importan we must exoport the router!
export default router

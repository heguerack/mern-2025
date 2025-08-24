import { StatusCodes } from 'http-status-codes'
import JobModel from '../models/JobModel.js'
import {
  BadRequestError,
  NotFoundError,
  UnUNAUTHORIZEDError,
} from '../errors/customErrors.js'

// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
export const createJob = async (req, res) => {
  const { userId } = req.user //new

  // const job = await JobModel.create(req.body)
  const job = await JobModel.create({ ...req.body, createdBy: userId })

  res.status(StatusCodes.CREATED).json({ job })
}

// get ALL JOBS
// get ALL JOBS
// get ALL JOBS
// get ALL JOBS
export const getAllJobs = async (req, res) => {
  console.log('reqUser :', req.user)
  // const jobs = await JobModel.find({})
  console.log('role getAllAJobs:', req.user.role)

  let jobs
  if (req.user.role === 'admin') {
    jobs = await JobModel.find({})
  } else {
    jobs = await JobModel.find({ createdBy: req.user.userId })
  }

  console.log('jobsReqUser :', jobs)

  res.status(StatusCodes.OK).json({ jobs })
}

// Get JOB
// Get JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params
  const job = await JobModel.findById(id)
  res.status(StatusCodes.OK).json({ job })
}

// Delele JOB - Delele JOB
// Delele JOB - Delele JOB
export const deleteJob = async (req, res) => {
  const { params } = req
  const deletedJob = await JobModel.findByIdAndDelete(params.id)
  res.status(StatusCodes.OK).json({ msg: 'Job deleted' })
}

// Update JOB - Update JOB
// Update JOB - Update JOB
export const updateJob = async (req, res) => {
  const { id } = req.params
  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).json(updatedJob)
}

import { StatusCodes } from 'http-status-codes'
import JobModel from '../models/JobModel.js'
import { NotFoundError } from '../errors/customErrors.js'

// get ALL JOBS
// get ALL JOBS
export const getAllJobs = async (req, res) => {
  console.log('reqUser :', req.user)

  const jobs = await JobModel.find({})
  res.status(StatusCodes.OK).json({ jobs })
}

// Get JOB
// Get JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params
  const job = await JobModel.findById(id)
  // no now this kind of error is gonn a be taken care of my the middle, so we check the id
  // if (!job) throw new NotFoundError(`no job with that ${id}`)
  res.status(StatusCodes.OK).json({ job })
}

// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
export const createJob = async (req, res) => {
  const job = await JobModel.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}

// Delele JOB - Delele JOB
// Delele JOB - Delele JOB
export const deleteJob = async (req, res) => {
  const { params } = req
  const deletedJob = await JobModel.findByIdAndDelete(params.id)
  res.status(StatusCodes.OK).json({ msg: 'Job deleted' }, deletedJob)
}

// Update JOB - Update JOB
// Update JOB - Update JOB
export const updateJob = async (req, res) => {
  const { id } = req.params
  const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
    new: true,
  })

  res.status(StatusCodes.OK).json({ message: 'Job Updated', updatedJob })
}

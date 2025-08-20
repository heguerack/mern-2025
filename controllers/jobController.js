import JobModel from '../models/JobModel.js'

// get ALL JOBS
// get ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({})
  console.log('AllJobs :', jobs)

  res.status(200).json({ jobs })
}

// Get JOB
// Get JOB
export const getSingleJob = async (req, res) => {
  const { params } = req
  const job = await JobModel.findById(params.id)
  if (!job) {
    return res.status(404).json({ msg: `no job with that${id}` })
  }
  res.status(200).json({ job })
}

// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
export const createJob = async (req, res) => {
  const job = await JobModel.create(req.body)
  res.status(201).json({ job })
  //we will use express-error-validator to catch generic catch and try errors in the error middleware
}

// Delele JOB - Delele JOB
// Delele JOB - Delele JOB
export const deleteJob = async (req, res) => {
  const { params } = req

  const deletedJob = await JobModel.findByIdAndDelete(params.id)

  if (!deletedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ msg: 'Job deleted' }, deletedJob)
}

// Update JOB - Update JOB
// Update JOB - Update JOB
export const updateJob = async (req, res) => {
  const { id } = req.params

  const updatedJob = await JobModel.findByIdAndUpdate(
    id,
    {
      ...req.body, //or just id,req.body,{new:true}
    },
    { new: true } //this will send us the updated job back, and i thpught it was a bug
  )
  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` })
  }
  res.status(200).json({ message: 'Job Updated', updatedJob })
}

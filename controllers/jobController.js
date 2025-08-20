import { StatusCodes } from 'http-status-codes'
import JobModel from '../models/JobModel.js'
import { NotFoundError } from '../errors/customErrors.js'

// get ALL JOBS
// get ALL JOBS
export const getAllJobs = async (req, res) => {
  const jobs = await JobModel.find({})
  // console.log('AllJobs :', jobs)

  // res.status(200).json({ jobs })
  res.status(StatusCodes.OK).json({ jobs })
}

// Get JOB
// Get JOB
export const getSingleJob = async (req, res) => {
  const { params } = req
  const job = await JobModel.findById(params.id)
  if (!job) throw new NotFoundError(`no job with that ${params.id}`)
  res.status(StatusCodes.OK).json({ job })
}

// .status(StatusCodes.NOT_FOUND)
// .json({ msg: `no job with that${id}` })

// but now by doing it the following way, we are not really passing the messege to the middleware
// and im not too sure why :(
// but we are gonna do , is set a custom erro, and add logic in the ,middleare so that we check for this error messege there too.
/////////////////
// throw new Error('error msg')
/////////////////
// so we created the customeErrorClass in erros folder.
// now we use the class instead

// }
//Alright I tried it but iot still throws the reguka error mesage:Internal error - something went wrong", sop we still have to deal witht he middleware.
// instead of throw new Error(`No user with that ${id}`);
// we use the class as follows. that we exxtend the error and use it as in the class
// so basically we create our won Error()//now the way we grab it in the middlware is by checking the status code
// if (!job){
//   throw new NotFoundError(`No user with that ${id}`)

// }

// res.status(StatusCodes.OK).json({ job })

// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
export const createJob = async (req, res) => {
  const job = await JobModel.create(req.body)

  res.status(StatusCodes.CREATED).json({ job })
  //we will use express-error-validator to catch generic catch and try errors in the error middleware
}

// Delele JOB - Delele JOB
// Delele JOB - Delele JOB
export const deleteJob = async (req, res) => {
  const { params } = req

  const deletedJob = await JobModel.findByIdAndDelete(params.id)

  if (!deletedJob) throw new NotFoundError(`no job with that ${params.id}`)

  res.status(StatusCodes.OK).json({ msg: 'Job deleted' }, deletedJob)
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
  if (!updatedJob) throw new NotFoundError(`no job with that ${params.id}`)

  res.status(StatusCodes.OK).json({ message: 'Job Updated', updatedJob })
}

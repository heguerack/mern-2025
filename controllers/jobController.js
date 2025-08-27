import { StatusCodes } from 'http-status-codes'
import JobModel from '../models/JobModel.js'
// import day from 'dayjs'
import mongoose from 'mongoose'

// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
// Create JOB  -  Create JOB
export const createJob = async (req, res) => {
  const { userId } = req.user
  const job = await JobModel.create({ ...req.body, createdBy: userId })
  res.status(StatusCodes.CREATED).json({ job })
}

// get ALL JOBS - get ALL JOBS
// get ALL JOBS - get ALL JOBS
// get ALL JOBS - get ALL JOBS
// get ALL JOBS - get ALL JOBS
export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }

  if (search) {
    // this is to ocombine tow queries , like positon or company can ave that worrd in there
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } }, // "i", means we dont care about thenuppercase
      { company: { $regex: search, $options: 'i' } },
    ]
  }

  if (jobStatus && jobStatus !== 'all') {
    // it basically says , if !all then dont add it
    queryObject.jobStatus = jobStatus
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  }

  const sortkey = sortOptions[sort] || sortOptions.newest

  // set pagination
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 4
  // the way this one works is, if nothing is passed then page=1 - 1 = 0; so no jobs are skept
  const skip = (page - 1) * limit

  const jobs = await JobModel.find(queryObject)
    .sort(sortkey)
    .skip(skip)
    .limit(limit)
  // mr myself , if you wonder why we get the totalNumber this way, is because we can filter jobs, but at the end of the day, the total number of jobs wont change.
  const totalJobs = await JobModel.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs / limit)
  res
    .status(StatusCodes.OK)
    .json({ totalJobs, numOfPages, currentPage: page, jobs })
}

// Get JOB -  Get JOB
// Get JOB -  Get JOB
// Get JOB -  Get JOB
// Get JOB -  Get JOB
export const getSingleJob = async (req, res) => {
  const { id } = req.params
  const job = await JobModel.findById(id)
  res.status(StatusCodes.OK).json({ job })
}

// Delele JOB - Delele JOB
// Delele JOB - Delele JOB
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

export const showStats = async (req, res) => {
  let stats = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    // a crazy long arrayof jobs that belong to testUser obviously
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } },
    // [//this is what we would get go far
    //   { _id: 'interview', count: 50 },
    //   { _id: 'pending', count: 56 },
    //   { _id: 'declined', count: 54 },]
  ])

  // console.log('stats :', stats)

  // but now we want an object
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr
    acc[title] = count
    return acc
  }, {})

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  }

  // MONTHLY APPLICATIONS - MONTHLY APPLICATIONS - MONTHLY APPLICATIONS
  let monthlyApplications = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    // console.log(monthlyApplications)
    // monthlyApplications[
    //   ({ _id: { year: 2025, month: 8 }, count: 24 },
    //   { _id: { year: 2025, month: 6 }, count: 25 },
    //   { _id: { year: 2025, month: 7 }, count: 31 }[0])
    // ]
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 8 },
  ])

  // console.log('monthlyApplications:', monthlyApplications)
  const months = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  monthlyApplications = monthlyApplications.map((application) => {
    let year = application._id.year
    year = year.toString().split('').splice(-2).join('')
    console.log('application._id.year', year)

    let month = months[Number(application._id.month)]
    // console.log('application._id.month', month)

    return {
      date: `${month} ${year}`,
      count: application.count,
    }
  })

  // console.log('statsss', stats)
  // console.log('monthlyApplications ', monthlyApplications)
  // let monthlyApplications = [
  //   {
  //     date: 'May 23',
  //     count: 12,
  //   },
  //   {
  //     date: 'Jun 23',
  //     count: 14,
  //   },
  //   {
  //     date: 'Jul 23',
  //     count: 18,
  //   },
  // ]
  // res.status(200).json({ defaultStats, monthlyApplications })
  res.status(200).json({ defaultStats, monthlyApplications })
}

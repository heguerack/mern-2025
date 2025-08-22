import { StatusCodes } from 'http-status-codes'
import USerModel from '../models/USerModel.js'
import JobModel from '../models/JobModel.js'

export const getCurrentUser = async (req, res) => {
  const user = await USerModel.findById(req.user.userId)

  const userWithoutPassword = user.removePassword()
  res.status(StatusCodes.OK).json(userWithoutPassword)
}

export const getApplicationStats = async (req, res) => {
  // created by all
  const jobs = await JobModel.find({})
  const totalJobs = await JobModel.count()
  const users = await USerModel.find({})
  const totalUsers = await USerModel.count()
  // console.log(jobs, totalJobs, users, totalUsers)

  res.status(StatusCodes.OK).json({
    jobs: jobs,
    totalJobs: totalJobs,
    users: users,
    totalUsers: totalUsers,
  })
}

export const updateUser = async (req, res) => {
  const updatedUser = await USerModel.findByIdAndUpdate(
    req.user.userId,
    req.body
  )

  res.status(StatusCodes.OK).json({ msg: 'user updated' })
}

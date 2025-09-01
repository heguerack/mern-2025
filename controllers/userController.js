import { StatusCodes } from 'http-status-codes'
// import USerModel from '../models/USerModel.js'
import JobModel from '../models/JobModel.js'
import UserModel from '../models/UserModel.js'
import cloudinary from 'cloudinary'
import { promises as fs } from 'fs'

export const getCurrentUser = async (req, res) => {
  const user = await UserModel.findById(req.user.userId)

  const userWithoutPassword = user.removePassword()
  res.status(StatusCodes.OK).json(userWithoutPassword)
}

export const getApplicationStats = async (req, res) => {
  // created by all
  const jobs = await JobModel.find({})
  const totalJobs = await JobModel.count()
  const users = await UserModel.find({})
  const totalUsers = await UserModel.count()
  // console.log(jobs, totalJobs, users, totalUsers)

  res.status(StatusCodes.OK).json({
    jobs: jobs,
    totalJobs: totalJobs,
    users: users,
    totalUsers: totalUsers,
  })
}

export const updateUser = async (req, res) => {
  console.log('reqBody', req.body)
  console.log(req.file)
  if (req.file) {
    // this will loaded in cludinary
    const res = await cloudinary.v2.uploader.upload(req.file.path)
    // this will remove it from our local files, again i find this silly, not need to use banwht for this
    await fs.unlink(req.file.path)
    // here we aatch the avar to the req.body, which is in the return form cloudinary!!
    req.body.avatar = res.secure_url
    // and this is the id to be able to accces tha resource?
    req.body.avatarPublicId = res.public_id
  }

  const updatedUser = await UserModel.findByIdAndUpdate(
    req.user.userId,
    req.body
  )

  // so when they register they dont add an image. so ith they make it to req.file, it means they are updating the image. npw if thwy reach here the second time, that means we have to ccheck cuz there mut be an image in cluidnary that we also need to remove right after uploading the new image. how we kno ? beacsue of the avatarPublicId, and thus what we use to remove it too!
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }

  res.status(StatusCodes.OK).json({ msg: 'user updated' })
}

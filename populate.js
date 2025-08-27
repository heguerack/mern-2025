import { readFile } from 'fs/promises'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
import JobModel from './models/JobModel.js'
import UserModel from './models/USerModel.js'

try {
  await mongoose.connect(process.env.MONGO_DB_URL)
  // const user = await User.findOne({ email: 'john@gmail.com' });
  const user = await UserModel.findOne({ email: 'test@gmail.com' })

  const jsonJobs = JSON.parse(
    await readFile(new URL('./mockData.json', import.meta.url))
  )
  const jobs = jsonJobs.map((job) => {
    return { ...job, createdBy: user._id }
  })
  await JobModel.deleteMany({ createdBy: user._id })
  await JobModel.create(jobs)
  console.log('Success!!!')
  process.exit(0)
} catch (error) {
  console.log(error)
  process.exit(1)
}

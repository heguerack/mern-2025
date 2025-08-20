import mongoose from 'mongoose'

const JobSchema = new mongoose.Schema(
  {
    // id: String,
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'intership'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
    // createdBy:v,
    // createdAt: String,
    // updatedAt: String,
  },
  { timestamps: true }
)

// So basically here weare creating the fisrt table
export default mongoose.model('Job', JobSchema)

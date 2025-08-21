import mongoose from 'mongoose'
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js'
import USerModel from './USerModel.js'

const JobSchema = new mongoose.Schema(
  {
    // id: String,
    company: String,
    position: String,
    jobStatus: {
      type: String,
      // enum: [JOB_STATUS.INTERVIEW, JOB_STATUS.DECLINED, JOB_STATUS.PENDING],
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      // enum: [JOB_TYPE.FULTIME, JOB_TYPE.PARTTIME, JOB_TYPE.INTERSHIP],
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULTIME,
    },
    jobLocation: {
      type: String,
      default: 'my city',
    },
    createdBY: {
      type: mongoose.Types.ObjectId, // just checking is the tyoe mooogose id.
      ref: USerModel,
    },
  },
  { timestamps: true }
)

// So basically here weare creating the fisrt table
export default mongoose.model('Job', JobSchema)

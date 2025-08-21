import mongoose from 'mongoose'
import { ROLES } from '../utils/constants.js'

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    lastName: {
      type: String,
      default: 'last name',
    },
    location: {
      type: String,
      default: 'my city',
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
  },
  { timestamps: true }
)

// So basically here weare creating the fisrt table
export default mongoose.model('User', UserSchema)

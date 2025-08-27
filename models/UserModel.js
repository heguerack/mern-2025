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
    avatar: String,
    avatasPublicId: String,
  },
  { timestamps: true }
)

// this logic will remove the password from the response
UserSchema.methods.removePassword = function () {
  // have to diginto this logic. tey i would do it, i wouldstringity, remove item and conver back to json so that no confusion on the fron end
  let obj = this.toObject()
  delete obj.password
  return obj
}
// So basically here weare creating the fisrt table
// export default mongoose.model('User', UserSchema)
// Prevent OverwriteModelError// fixes the hot ralod isse /thing
const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User

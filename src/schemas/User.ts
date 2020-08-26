import mongoose, { Document, Schema } from 'mongoose'
import { UserModel } from '@models/User'
import bcrypt from 'bcrypt'

type User = Document & UserModel

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

// UserSchema.pre<User>('save', async function (next) {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10)
//   }
// })

export default mongoose.model<User>('User', UserSchema)

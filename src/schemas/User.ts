import mongoose, { Document, Schema } from 'mongoose'
import { UserModel } from '@models/User'

type User = Document & UserModel

const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true
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

export default mongoose.model<User>('User', UserSchema)

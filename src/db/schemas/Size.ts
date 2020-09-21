import { SizeModel } from '@models/Size'
import mongoose, { Document, Schema } from 'mongoose'

type Size = Document & SizeModel

const SizeSchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true
  }
})

export default mongoose.model<Size>('Size', SizeSchema)

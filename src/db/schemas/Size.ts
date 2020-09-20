import { SizeModel } from '@models/Size'
import mongoose, { Document, Schema } from 'mongoose'

type Size = Document & SizeModel

const SizeSchema = new Schema({
  number: {
    type: Number
  }
})

export default mongoose.model<Size>('Size', SizeSchema)

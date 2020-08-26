import mongoose, { Document, Schema } from 'mongoose'

type Size = Document & Record<string, unknown>

const SizeSchema = new Schema({
  amount: {
    type: Number
  }
})

export default mongoose.model<Size>('Size', SizeSchema)

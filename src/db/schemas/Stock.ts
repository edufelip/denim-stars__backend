import mongoose, { Document, Schema } from 'mongoose'

type Stock = Document & Record<string, unknown>

const StockSchema = new Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  size_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Size'
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  }
})

export default mongoose.model<Stock>('Stock', StockSchema)

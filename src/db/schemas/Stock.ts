import { StockModel } from '@models/Stock'
import mongoose, { Document, Schema } from 'mongoose'

type Stock = Document & StockModel

const StockSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  sizeId: {
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

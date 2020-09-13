import { ProductModel } from '@models/Product'
import mongoose, { Document, Schema } from 'mongoose'

type Product = Document & ProductModel

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    price: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

export default mongoose.model<Product>('Product', ProductSchema)

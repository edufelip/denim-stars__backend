import mongoose, { Document, Schema } from 'mongoose'

type Contact = Document & Record<string, unknown>

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true
    },
    sizes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Size'
      }
    ]
  },
  {
    timestamps: true
  }
)

export default mongoose.model<Contact>('Contact', ContactSchema)

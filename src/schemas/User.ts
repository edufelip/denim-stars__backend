import mongoose, { Document, Schema } from 'mongoose'

type Contact = Document & Record<string, unknown>

const ContactSchema = new Schema(
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
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
      }
    ]
  },
  {
    timestamps: true
  }
)

export default mongoose.model<Contact>('Contact', ContactSchema)

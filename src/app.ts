import express from 'express'
import { router } from './routes/routes'
import { router as productRoutes } from './routes/productRoutes'
import { router as userRoutes } from './routes/userRoutes'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('successfully connected')
    }
  }
)

const app = express()

app.use(express.json())
app.use(router)
app.use('/product', productRoutes)
app.use('/users', userRoutes)

export { app }

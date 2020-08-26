import express from 'express'
import { router } from './routes/routes'
import { router as productRouter } from './routes/productRoutes'
import { router as userRouter } from './routes/userRoutes'
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
class AppController {
  public express
  constructor() {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use(router)
    this.express.use('/product', productRouter)
    this.express.use('/users', userRouter)
  }
}

const app = new AppController().express
export { app }

import express from 'express'
import { router } from './routes/routes'
import { router as productRouter } from './routes/productRoutes'
import { router as userRouter } from './routes/userRoutes'
import { router as sizeRouter } from './routes/sizeRoutes'
import { router as stockRouter } from './routes/stockRoutes'
import mongoose from 'mongoose'
import 'dotenv/config'

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
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
    this.express.use('/products', productRouter)
    this.express.use('/users', userRouter)
    this.express.use('/sizes', sizeRouter)
    this.express.use('/stock', stockRouter)
  }
}

const app = new AppController().express
export { app }

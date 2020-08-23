import express from 'express'
import { router } from './routes/routes'
import { router as productRoutes } from './routes/productRoutes'

const app = express()

app.use(express.json())
app.use(router)
app.use('/product', productRoutes)

export { app }

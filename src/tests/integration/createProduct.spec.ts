import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { ProductModel } from '@models/Product'
import Product from '@schemas/Product'

const product: ProductModel = {
  name: 'example_name',
  price: '$99.99'
}

describe('createProduct', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized')
    }
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await Product.deleteMany({})
  })

  it('should access route and create a new product', async () => {
    await request(app).post('/products').send(product).expect(201)
  })

  it('should access route but deny to create a new product (empty name)', async () => {
    await request(app)
      .post('/products')
      .send({ ...product, name: '' })
      .expect(400)
  })
  it('should access route but deny to create a new product (empty price)', async () => {
    await request(app)
      .post('/products')
      .send({ ...product, price: '' })
      .expect(400)
  })
})

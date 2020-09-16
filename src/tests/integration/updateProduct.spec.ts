import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import User from '@schemas/User'
import { ProductModel } from '@models/Product'
import factory from '../factories'
import faker from 'faker'

describe('updateProduct', () => {
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
    await User.deleteMany({})
  })

  it('should access route and udpate a product', async () => {
    const newProduct: ProductModel = await factory.create('Product')
    await request(app)
      .put(`/products/${newProduct._id}`)
      .send({ name: faker.commerce.productName(), price: faker.commerce.price() })
      .expect(200)
  })

  it('should access route and fail to update an product (empty name)', async () => {
    const newProduct: ProductModel = await factory.create('User')
    await request(app).put(`/products/${newProduct._id}`).send({ name: '', price: faker.commerce.price() }).expect(400)
  })
  it('should access route and fail to update an product (empty price)', async () => {
    const newProduct: ProductModel = await factory.create('User')
    await request(app)
      .put(`/products/${newProduct._id}`)
      .send({ name: faker.commerce.productName(), price: '' })
      .expect(400)
  })
})

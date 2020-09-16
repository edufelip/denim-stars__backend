import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import product from '@schemas/product'
import { ProductModel } from '@models/product'
import factory from '../factories'
import faker from 'faker'

describe('deleteProduct', () => {
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
    await product.deleteMany({})
  })

  it('should access route and remove product from db', async () => {
    const newProduct: ProductModel = await factory.create('Product')
    await request(app).delete(`/products/${newProduct._id}`).expect(200)
  })

  it('should access route and fail to remove non existig product from db', async () => {
    const id: string = faker.random.uuid()
    await request(app).delete(`/products/${id}`).expect(400)
  })
})

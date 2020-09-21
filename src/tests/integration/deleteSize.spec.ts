import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import faker from 'faker'
import Size from '@schemas/Size'
import { SizeModel } from '@models/Size'
import factory from '../factories'

describe('deleteSize', () => {
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
    await Size.deleteMany({})
  })

  it('should access route and remove size from db', async () => {
    const newSize: SizeModel = await factory.create('Size')
    await request(app).delete(`/products/${newSize._id}`).expect(200)
  })

  it('should access route and fail to remove non existig size from db', async () => {
    const id: string = faker.random.uuid()
    await request(app).delete(`/products/${id}`).expect(400)
  })
})

import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { SizeModel } from '@models/Size'
import Size from '@schemas/Size'

const size: SizeModel = {
  name: 'extra-large'
}

describe('createSize', () => {
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

  it('should access route and create a new size', async () => {
    await request(app).post('/sizes').send(size).expect(201)
  })

  it('should access route but deny to create a new size (empty name)', async () => {
    await request(app).post('/sizes').send({ name: '' }).expect(400)
  })
})

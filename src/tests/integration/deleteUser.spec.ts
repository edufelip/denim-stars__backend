import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import User from '@schemas/User'
import { UserModel } from '@models/User'
import factory from '../factories'
import faker from 'faker'

describe('deleteUser', () => {
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

  it('should access route and remove user from db', async () => {
    const newUser: UserModel = await factory.create('User')
    await request(app).delete(`/users/${newUser._id}`).expect(200)
  })

  it('should access route and fail to remove non existig user from db', async () => {
    const id: string = faker.random.uuid()
    await request(app).delete(`/users/${id}`).expect(400)
  })
})

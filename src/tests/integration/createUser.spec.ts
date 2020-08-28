import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { createUserUseCase } from '@controllers/createUser'
import User from '@schemas/User'
import faker from 'faker'

const user = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password()
}

describe('createUser', () => {
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
  beforeEach(async () => {
    await User.deleteMany({})
  })

  it('should access route and create a new user', async () => {
    await request(app).post('/users').send(user).expect(201)
  })

  it('should access route and not create a new user', async () => {
    await request(app)
      .post('/users')
      .send({ ...user, name: '' })
      .expect(400)
  })
})

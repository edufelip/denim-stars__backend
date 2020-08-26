import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { createUserUseCase } from '@controllers/createUser'
import User from '@schemas/User'

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

  it('should create and save new user', async () => {
    const user = {
      name: 'Edu',
      email: 'edu_felip@hotmail.com',
      password: '123'
    }
    await createUserUseCase.execute(user)
    const foundUser = await User.findOne({ name: 'Edu' })
    expect(foundUser).toEqual(
      expect.objectContaining({
        email: user.email,
        name: user.name,
        password: user.password
      })
    )
    const response = await request(app).post('users').send(user)
    expect(response.status).toBe(200)
  })
  it('should fail to create user with empty email', async () => {
    const user = {
      name: 'Edu',
      email: '',
      password: '123'
    }
    await createUserUseCase.execute(user)
  })
})

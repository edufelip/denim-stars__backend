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

  it('should create and save new user', async () => {
    await User.create(user)
    const foundUser = await User.findOne({ name: user.name })
    expect(foundUser).toEqual(
      expect.objectContaining({
        email: user.email,
        name: user.name,
        password: user.password
      })
    )
  })
  it('should fail to create user with empty email', async () => {
    let err
    try {
      await User.create({ ...user, email: '' })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
  it('should fail to create user with empty password', async () => {
    let err
    try {
      await User.create({ ...user, password: '' })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
  it('should fail to create user with empty name', async () => {
    let err
    try {
      await User.create({ ...user, name: '' })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
})

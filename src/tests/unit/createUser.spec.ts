import mongoose from 'mongoose'
import User from '@schemas/User'
import { UserModel } from '@models/User'
import factory from '../factories'

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
  afterEach(async () => {
    await User.deleteMany({})
  })

  it('should create and save new user', async () => {
    const user: UserModel = await factory.create('User')
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
    let err: Error
    try {
      await factory.create('User', { email: '' })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
  it('should fail to create user with empty password', async () => {
    let err: Error
    try {
      await factory.create('User', { password: '' })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
  it('should fail to create user with empty name', async () => {
    let err: Error
    try {
      await factory.create('User', { name: '' })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
})

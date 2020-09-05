import mongoose from 'mongoose'
import faker from 'faker'
import User from '../../db/schemas/User'
import factory from '../factories'
import { UserModel } from '@models/User'

describe('updateUser', () => {
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

  it("should update user's name", async () => {
    const user: UserModel = await factory.create('User')
    const oldName = user.name
    await User.update(
      { name: user.name },
      {
        $set: {
          name: faker.name.findName()
        }
      }
    )
    expect(oldName).not.toEqual(user.name)
  })
  it("should update user's email", async () => {
    const user: UserModel = await factory.create('User')
    const oldEmail = user.name
    await User.update(
      { name: user.name },
      {
        $set: {
          email: faker.internet.email()
        }
      }
    )
    expect(oldEmail).not.toEqual(user.email)
  })
  it("should update user's password", async () => {
    const user: UserModel = await factory.create('User')
    const oldPass = user.name
    await User.update(
      { name: user.name },
      {
        $set: {
          password: faker.internet.password()
        }
      }
    )
    expect(oldPass).not.toEqual(user.password)
  })
  it('should fail to update user with empty name', async () => {
    const user: UserModel = await factory.create('User')
    let error
    try {
      User.update(
        { name: user.name },
        {
          $set: {
            name: ''
          }
        }
      )
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
  it('should fail to update user with empty email', async () => {
    const user: UserModel = await factory.create('User')
    let error
    try {
      User.update(
        { name: user.name },
        {
          $set: {
            email: ''
          }
        }
      )
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
  it('should fail to update user with empty password', async () => {
    const user: UserModel = await factory.create('User')
    let error
    try {
      User.update(
        { name: user.name },
        {
          $set: {
            password: ''
          }
        }
      )
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
})

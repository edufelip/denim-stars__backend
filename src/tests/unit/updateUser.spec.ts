import mongoose, { Document } from 'mongoose'
import faker from 'faker'
import User from '@schemas/User'
import factory from '../factories'
import { UserModel } from '@models/User'

type UserType = UserModel & Document

describe('updateUser', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized')
    }
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await User.deleteMany({})
  })

  it("should update user's name", async () => {
    const user: UserType = await factory.create('User')
    const newName = faker.name.findName()
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          name: newName
        }
      },
      { new: true }
    )
    expect(updatedUser).toEqual(
      expect.objectContaining({
        name: newName
      })
    )
  })
  it("should update user's email", async () => {
    const user: UserType = await factory.create('User')
    const newEmail = faker.internet.email().toLowerCase()
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          email: newEmail
        }
      },
      { new: true }
    )
    expect(updatedUser).toEqual(
      expect.objectContaining({
        email: newEmail
      })
    )
  })
  it("should update user's password", async () => {
    const user: UserType = await factory.create('User')
    const newPass = faker.internet.password()
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          password: newPass
        }
      },
      { new: true }
    )
    expect(updatedUser).toEqual(
      expect.objectContaining({
        password: newPass
      })
    )
  })
  it('should fail to update an user with empty name', async () => {
    const user: UserType = await factory.create('User')
    let error: Error
    try {
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            name: ''
          }
        },
        { new: true }
      )
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
  it('should fail to update user with empty email', async () => {
    const user: UserType = await factory.create('User')
    let error
    try {
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            email: ''
          }
        },
        { new: true }
      )
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
  it('should fail to update user with empty password', async () => {
    const user: UserType = await factory.create('User')
    let error
    try {
      await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            password: ''
          }
        },
        { new: true }
      )
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
})

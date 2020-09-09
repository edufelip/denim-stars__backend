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
    const user: UserType = await factory.create('User')
    const newName = faker.name.findName()
    await User.updateOne(
      { _id: user._id },
      {
        $set: { name: newName }
      }
    )
    const updatedUser = await User.findById(user._id)
    expect(updatedUser).toEqual(
      expect.objectContaining({
        name: newName
      })
    )
  })
  it("should update user's email", async () => {
    const user: UserType = await factory.create('User')
    const newEmail = faker.internet.email().toLowerCase()
    await User.updateOne(
      { name: user.name },
      {
        $set: { email: newEmail }
      }
    )
    const updatedUser = await User.findById(user._id)
    expect(updatedUser).toEqual(
      expect.objectContaining({
        email: newEmail
      })
    )
  })
  it("should update user's password", async () => {
    const user: UserType = await factory.create('User')
    const newPass = faker.internet.password()
    await User.updateOne(
      { name: user.name },
      {
        $set: { password: newPass }
      }
    )
    const updatedUser = await User.findById(user._id)
    expect(updatedUser).toEqual(
      expect.objectContaining({
        password: newPass
      })
    )
  })
  it('should fail to update user with empty name', async () => {
    const user: UserType = await factory.create('User')
    let error: Error
    try {
      await User.updateOne(
        { _id: user._id },
        {
          $set: { name: '' }
        }
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
      await User.updateOne(
        { name: user.name },
        {
          $set: { email: '' }
        }
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
      await User.updateOne(
        { name: user.name },
        {
          $set: { password: '' }
        }
      )
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
})

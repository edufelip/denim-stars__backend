import mongoose from 'mongoose'
import User from '../../db/schemas/User'
import factory from '../factories'
import faker from 'faker'
import { UserModel } from '@models/User'

describe('deleteUser', () => {
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
    await User.deleteMany({})
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await User.deleteMany({})
  })

  it('should delete existing user', async () => {
    const user: UserModel = await factory.create('User')
    await User.findOneAndRemove({ name: user.name })
    const users = await User.find({})
    expect(users).toEqual(expect.arrayContaining([]))
  })
  it('should fail to delete non existing user', async () => {
    let err: Error
    const randomName = faker.name.findName()
    try {
      await User.findOneAndRemove({ name: randomName })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
})

import mongoose from 'mongoose'
import User from 'src/db/schemas/User'
import faker from 'faker'

const user = {
  name: faker.name.findName(),
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password()
}

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
  beforeEach(async () => {
    await User.create(user)
  })
  afterEach(async () => {
    await User.deleteMany({})
  })

  it('should delete existing user', async () => {
    await User.findOneAndRemove({ name: user.name })
    const users = await User.find({})
    expect(users).toEqual(expect.arrayContaining([]))
  })
  it('should fail to delete non existing user', async () => {
    let err
    let randomName: string
    randomName = faker.name.findName()
    while (randomName === user.name) {
      randomName = faker.name.findName()
    }
    try {
      await User.findOneAndRemove({ name: randomName })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
})

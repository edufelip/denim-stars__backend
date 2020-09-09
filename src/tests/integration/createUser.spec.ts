import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import User from '../../db/schemas/User'
import { UserModel } from '@models/User'

const user: UserModel = {
  name: 'example_name',
  email: 'example_email@yahoo.com',
  password: 'examplepassword123'
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

  it('should access route but deny to create a new user (empty name)', async () => {
    await request(app)
      .post('/users')
      .send({ ...user, name: '' })
      .expect(400)
  })
  it('should access route but deny to create a new user (empty email)', async () => {
    await request(app)
      .post('/users')
      .send({ ...user, email: '' })
      .expect(400)
  })
  it('should access route but deny to create a new user (empty password)', async () => {
    await request(app)
      .post('/users')
      .send({ ...user, password: '' })
      .expect(400)
  })
})

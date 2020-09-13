import mongoose from 'mongoose'
import factory from '../factories'
import faker from 'faker'
import Product from '@schemas/Product'
import { ProductModel } from '@models/Product'

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
    await mongoose.connection.close()
  })
  afterEach(async () => {
    await Product.deleteMany({})
  })

  it('should delete existing product', async () => {
    const product: ProductModel = await factory.create('Product')
    await Product.findOneAndRemove({ name: product.name })
    const products = await Product.find({})
    expect(products).toEqual(expect.arrayContaining([]))
  })
  it('should fail to delete non existing product', async () => {
    let err: Error
    const randomName = faker.commerce.productName()
    try {
      await Product.findOneAndRemove({ name: randomName })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
})

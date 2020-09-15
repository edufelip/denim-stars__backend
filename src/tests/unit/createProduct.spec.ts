import mongoose from 'mongoose'
import Product from '@schemas/Product'
import { ProductModel } from '@models/Product'
import factory from '../factories'

describe('createProduct', () => {
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
    await Product.deleteMany({})
  })

  it('should create and save new product', async () => {
    const product: ProductModel = await factory.create('Product')
    const foundProduct = await Product.findOne({ name: product.name })
    expect(foundProduct).toEqual(
      expect.objectContaining({
        name: product.name,
        price: product.price
      })
    )
  })
  it('should fail to create product with empty name', async () => {
    let err: Error
    try {
      await factory.create('Product', { name: '' })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
  it('should fail to create product with empty price', async () => {
    let err: Error
    try {
      await factory.create('Product', { price: '' })
    } catch (error) {
      err = error
    }
    expect(err).not.toBeNull()
  })
})

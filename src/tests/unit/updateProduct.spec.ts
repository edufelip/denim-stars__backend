import mongoose, { Document } from 'mongoose'
import Product from '@schemas/Product'
import { ProductModel } from '@models/Product'
import factory from '../factories'
import faker from 'faker'

type ProductType = ProductModel & Document

describe('updateProduct', () => {
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

  it("should update product's name", async () => {
    const product: ProductType = await factory.create('Product')
    const newName = faker.commerce.productName()
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        $set: {
          name: newName
        }
      },
      { new: true }
    )
    expect(updatedProduct).toEqual(
      expect.objectContaining({
        name: newName
      })
    )
  })
  it("should update product's price", async () => {
    const product: ProductType = await factory.create('Product')
    const newPrice = faker.commerce.price()
    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        $set: {
          price: newPrice
        }
      },
      { new: true }
    )
    expect(updatedProduct).toEqual(
      expect.objectContaining({
        price: newPrice
      })
    )
  })
  it('should fail to update a product with an empty value for the name', async () => {
    const product: ProductType = await factory.create('Product')
    let error: Error
    try {
      await Product.findByIdAndUpdate(product._id, {
        $set: {
          name: ''
        }
      })
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
  it('should fail to update a product with an empty value for the price', async () => {
    const product: ProductType = await factory.create('Product')
    let error: Error
    try {
      await Product.findByIdAndUpdate(product._id, {
        $set: {
          price: ''
        }
      })
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })
})

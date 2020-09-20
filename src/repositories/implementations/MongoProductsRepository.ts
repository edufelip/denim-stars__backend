import { CreateProductRequestDTO } from '@controllers/createProduct/CreateProductDTO'
import { UpdateProductRequestDTO } from '@controllers/updateProduct/UpdateProductDTO'
import { ProductModel } from '@models/Product'
import Product from '@schemas/Product'
import { IProductRepository } from '../IProductRepository'

export class MongoProductsRepository implements IProductRepository {
  async findByName(name: string): Promise<ProductModel> {
    const product = await Product.findOne({ name: name })
    return product
  }

  async findByIdAndUpdate(data: UpdateProductRequestDTO): Promise<ProductModel> {
    const product = await Product.findByIdAndUpdate(
      data.id,
      {
        $set: {
          name: data.name,
          price: data.price
        }
      },
      { new: true }
    )
    return product
  }

  async save(product: CreateProductRequestDTO): Promise<void> {
    await Product.create(product)
  }

  async delete(id: string): Promise<void> {
    await Product.findByIdAndDelete(id)
  }
}

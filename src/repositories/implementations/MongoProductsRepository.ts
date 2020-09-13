import { CreateProductRequestDTO } from '@controllers/createProduct/CreateProductDTO'
import { ProductModel } from '@models/Product'
import Product from '@schemas/Product'
import { IProductRepository } from '../IProductRepository'

export class MongoProductsRepository implements IProductRepository {
  async findByName(name: string): Promise<ProductModel> {
    const product = Product.findOne({ name: name })
    return product
  }

  async save(product: CreateProductRequestDTO): Promise<void> {
    await Product.create(product)
  }

  async delete(id: string): Promise<void> {
    await Product.findByIdAndDelete(id)
  }

  // async update(product: UpdateUserRequestDTO, id: string): Promise<UserModel> {
  //   const updatedUser = await User.findByIdAndUpdate(
  //     id,
  //     {
  //       $set: {
  //         name: product.name,
  //         password: product.password
  //       }
  //     },
  //     { new: true }
  //   )
  //   return updatedUser
  // }
}

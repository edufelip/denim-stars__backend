import { CreateProductRequestDTO } from '@controllers/createProduct/CreateProductDTO'
import { ProductModel } from '@models/Product'

export interface IProductRepository {
  findByName(name: string): Promise<ProductModel>
  save(user: CreateProductRequestDTO): Promise<void>
  delete(id: string): Promise<void>
  // update(product: UpdateProductRequestDTO, id: string): Promise<UserModel>
}

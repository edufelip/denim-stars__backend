import { CreateProductRequestDTO } from '@controllers/createProduct/CreateProductDTO'
import { UpdateProductRequestDTO } from '@controllers/updateProduct/UpdateProductDTO'
import { ProductModel } from '@models/Product'

export interface IProductRepository {
  findByName(name: string): Promise<ProductModel>
  findByIdAndUpdate(data: UpdateProductRequestDTO): Promise<ProductModel>
  save(user: CreateProductRequestDTO): Promise<void>
  delete(id: string): Promise<void>
}

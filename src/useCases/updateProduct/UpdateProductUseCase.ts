import { ProductModel } from '@models/Product'
import { IProductRepository } from '@repos/IProductRepository'
import { UpdateProductRequestDTO } from './UpdateProductDTO'

export class UpdateProductUseCase {
  private productRepository: IProductRepository
  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(data: UpdateProductRequestDTO): Promise<ProductModel> {
    const updatedProduct = await this.productRepository.findByIdAndUpdate(data)
    return updatedProduct
  }
}

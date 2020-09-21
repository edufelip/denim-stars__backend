import { IProductRepository } from '@repos/IProductRepository'
import { CreateProductRequestDTO } from './CreateProductDTO'

export class CreateProductUseCase {
  private productRepository: IProductRepository
  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(data: CreateProductRequestDTO): Promise<void> {
    const productExists = await this.productRepository.findByName(data.name)
    if (productExists) throw new Error('Product Already Exists' + productExists)
    await this.productRepository.save(data)
  }
}

import { MongoProductsRepository } from '@repos/implementations/MongoProductsRepository'
import { CreateProductRequestDTO } from './CreateProductDTO'

export class CreateProductUseCase {
  private productRepository: MongoProductsRepository
  constructor(productRepository: MongoProductsRepository) {
    this.productRepository = productRepository
  }

  async execute(data: CreateProductRequestDTO): Promise<void> {
    const productExists = this.productRepository.findByName(data.name)
    if (productExists) throw new Error('Product Already Exists')
    await this.productRepository.save(data)
  }
}

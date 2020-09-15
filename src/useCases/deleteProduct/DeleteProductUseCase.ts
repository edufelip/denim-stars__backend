import { IProductRepository } from '@repos/IProductRepository'

export class DeleteProductUseCase {
  private productRepository: IProductRepository
  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository
  }

  async execute(id: string): Promise<void> {
    await this.productRepository.delete(id)
  }
}

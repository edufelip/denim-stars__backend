import { IStockRepository } from '@repos/IStockRepository'

export class DeleteStockElementUseCase {
  private stockRepository: IStockRepository
  constructor(stockRepository: IStockRepository) {
    this.stockRepository = stockRepository
  }

  async execute(stockId: string): Promise<void> {
    const stockExists = await this.stockRepository.findById(stockId)
    if (!stockExists) throw new Error('This element does not exist')
    await this.stockRepository.delete(stockExists._id)
  }
}

import { StockModel } from '@models/Stock'
import { IStockRepository } from '@repos/IStockRepository'
import { UpdateStockElementRequestDTO } from './UpdateStockElementDTO'

export class UpdateStockElementUseCase {
  private stockRepository: IStockRepository
  constructor(stockRepository: IStockRepository) {
    this.stockRepository = stockRepository
  }

  async execute(data: UpdateStockElementRequestDTO): Promise<StockModel> {
    const stockExists = await this.stockRepository.findById(data.id)
    if (!stockExists) throw new Error('This element does not exist in stock')
    return await this.stockRepository.update(data)
  }
}

import { StockModel } from '@models/Stock'
import { IStockRepository } from '@repos/IStockRepository'
import { UpdateProductAmountRequestDTO } from './UpdateProductAmountDTO'

export class UpdateProductAmountUseCase {
  private stockRepository: IStockRepository
  constructor(stockRepository: IStockRepository) {
    this.stockRepository = stockRepository
  }

  async execute(data: UpdateProductAmountRequestDTO): Promise<StockModel> {
    const stockExists = await this.stockRepository.findStock(data.productId, data.sizeId)
    if (!stockExists) throw new Error('This element does not exist in stock')
    return await this.stockRepository.update(data)
  }
}

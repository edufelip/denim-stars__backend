import { UpdateStockElementRequestDTO } from '@controllers/updateStockElement/UpdateStockElementDTO'
import { StockModel } from '@models/Stock'
import { IStockRepository } from '@repos/IStockRepository'
import Stock from '@schemas/Stock'

export class MongoStockRepository implements IStockRepository {
  async save(productId: string, sizeId: string): Promise<void> {
    const amount = 0
    await Stock.create({ productId, sizeId, amount })
  }

  async update(data: UpdateStockElementRequestDTO): Promise<StockModel> {
    const updatedStock = await Stock.findByIdAndUpdate(
      data.id,
      {
        $set: {
          amount: data.amount
        }
      },
      { new: true }
    )
    return updatedStock
  }

  async findById(stockId: string): Promise<StockModel> {
    const stockExists = await Stock.findById(stockId)
    return stockExists
  }

  async delete(stockId: string): Promise<void> {
    await Stock.findByIdAndDelete(stockId)
  }
}

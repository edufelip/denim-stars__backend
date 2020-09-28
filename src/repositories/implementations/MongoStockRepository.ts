import { IStockRepository } from '@repos/IStockRepository'
import Stock from '@schemas/Stock'

export class MongoStockRepository implements IStockRepository {
  async save(productId: string, sizeId: string): Promise<void> {
    const amount = 0
    const stockExists = await Stock.findOne({
      productId: productId,
      sizeId: sizeId
    })
    if (!stockExists) {
      await Stock.create({ productId, sizeId, amount })
    }
  }
}

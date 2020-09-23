import { IStockRepository } from '@repos/IStockRepository'
import Stock from '@schemas/Stock'

export class MongoStockRepository implements IStockRepository {
  async save(productId: string, sizeId: string, amount: number): Promise<void> {
    const stockExists = await Stock.findOne({
      productId: productId,
      sizeId: sizeId
    })
    if (!stockExists) {
      await Stock.create({ productId, sizeId, amount })
    } else {
      stockExists.amount = amount
      await stockExists.save()
    }
  }
}

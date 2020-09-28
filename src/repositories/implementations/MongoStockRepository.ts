import { UpdateProductAmountRequestDTO } from '@controllers/updateProductAmount/UpdateProductAmountDTO'
import { StockModel } from '@models/Stock'
import { IStockRepository } from '@repos/IStockRepository'
import Stock from '@schemas/Stock'

export class MongoStockRepository implements IStockRepository {
  async save(productId: string, sizeId: string): Promise<void> {
    const amount = 0
    await Stock.create({ productId, sizeId, amount })
  }

  async update(data: UpdateProductAmountRequestDTO): Promise<StockModel> {
    const updatedStock = await Stock.findOneAndUpdate(
      {
        productId: data.productId,
        sizeId: data.sizeId
      },
      {
        $set: {
          amount: data.amount
        }
      },
      { new: true }
    )
    return updatedStock
  }

  async findStock(productId: string, sizeId: string): Promise<StockModel> {
    const stockExists = await Stock.findOne({
      productId: productId,
      sizeId: sizeId
    })
    return stockExists
  }
}

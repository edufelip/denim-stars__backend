import { StockModel } from '@models/Stock'

export interface IStockRepository {
  save(productId: string, sizeId: string, amount: number): Promise<void>
  // get(productId: string, sizeId: string, amount: number): Promise<StockModel>
}

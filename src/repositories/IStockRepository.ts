import { StockModel } from '@models/Stock'

export interface IStockRepository {
  save(productId: string, sizeId: string): Promise<void>
}

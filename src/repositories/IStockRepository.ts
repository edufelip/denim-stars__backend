import { UpdateProductAmountRequestDTO } from '@controllers/updateProductAmount/UpdateProductAmountDTO'
import { StockModel } from '@models/Stock'
export interface IStockRepository {
  save(productId: string, sizeId: string): Promise<void>
  update(data: UpdateProductAmountRequestDTO): Promise<StockModel>
  findStock(productId: string, sizeId: string): Promise<StockModel>
}

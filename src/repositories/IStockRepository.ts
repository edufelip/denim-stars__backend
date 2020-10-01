import { UpdateStockElementRequestDTO } from '@controllers/updateStockElement/UpdateStockElementDTO'
import { StockModel } from '@models/Stock'
export interface IStockRepository {
  save(productId: string, sizeId: string): Promise<void>
  update(data: UpdateStockElementRequestDTO): Promise<StockModel>
  findById(stockId: string): Promise<StockModel>
  delete(stockId: string): Promise<void>
}

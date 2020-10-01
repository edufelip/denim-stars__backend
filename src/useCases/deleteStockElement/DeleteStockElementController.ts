import { Request, Response } from 'express'
import { DeleteStockElementUseCase } from './DeleteStockElementUseCase'

export class DeleteStockElementController {
  private deleteStockElementUseCase: DeleteStockElementUseCase
  constructor(deleteStockElementUseCase: DeleteStockElementUseCase) {
    this.deleteStockElementUseCase = deleteStockElementUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const stockId = req.params.id
    try {
      await this.deleteStockElementUseCase.execute(stockId)
      return res.status(200).send('Stock deleted')
    } catch (err) {
      return res.status(400).send(err.message || 'Something wrong happened')
    }
  }
}

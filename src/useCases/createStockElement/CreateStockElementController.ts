import { Request, Response } from 'express'
import { CreateStockElementUseCase } from './CreateStockElementUseCase'

export class CreateStockElementController {
  private createStockElementUseCase: CreateStockElementUseCase

  constructor(createStockElementUseCase: CreateStockElementUseCase) {
    this.createStockElementUseCase = createStockElementUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { productId, sizeId } = req.body
    try {
      await this.createStockElementUseCase.execute(productId, sizeId)
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected Error')
    }
    return res.status(200).send('created')
  }
}

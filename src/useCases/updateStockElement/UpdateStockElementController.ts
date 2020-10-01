import { Request, Response } from 'express'
import { UpdateStockElementUseCase } from './UpdateStockElementUseCase'

export class UpdateStockElementController {
  private updateStockElementUseCase: UpdateStockElementUseCase
  constructor(updateStockElementUseCase: UpdateStockElementUseCase) {
    this.updateStockElementUseCase = updateStockElementUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const { amount } = req.body
    if (!id || !amount) return res.status(400).send('Missing info')
    try {
      const updatedStock = await this.updateStockElementUseCase.execute({ id, amount })
      return res.status(200).send(updatedStock)
    } catch (err) {
      return res.status(400).send(err.message || 'Something went wrong')
    }
  }
}

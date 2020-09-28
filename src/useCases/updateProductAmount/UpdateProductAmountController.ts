import { Request, Response } from 'express'
import { UpdateProductAmountUseCase } from './UpdateProductAmountUseCase'

export class UpdateProductAmountController {
  private updateProductAmountUseCase: UpdateProductAmountUseCase
  constructor(updateProductAmountUseCase: UpdateProductAmountUseCase) {
    this.updateProductAmountUseCase = updateProductAmountUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const productId = req.params.id
    const { sizeId, amount } = req.body
    if (!productId || !sizeId || !amount) return res.status(400).send("Fields can't be empty")
    try {
      const updatedStock = await this.updateProductAmountUseCase.execute({ productId, sizeId, amount })
      return res.status(200).send(updatedStock)
    } catch (err) {
      return res.status(400).send(err.message || 'Something went wrong')
    }
  }
}

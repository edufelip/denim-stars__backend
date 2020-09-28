import { Request, Response } from 'express'
import { AddSizeToProductUseCase } from './AddSizeToProductUseCase'

export class AddSizeToProductController {
  private addSizeToProductUseCase: AddSizeToProductUseCase

  constructor(addSizeToProductUseCase: AddSizeToProductUseCase) {
    this.addSizeToProductUseCase = addSizeToProductUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { productId, sizeId } = req.body
    try {
      await this.addSizeToProductUseCase.execute(productId, sizeId)
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected Error')
    }
    return res.status(200).send('created')
  }
}

import { Request, Response } from 'express'
import { UpdateProductUseCase } from './UpdateProductUseCase'

export class UpdateProductController {
  private updateProductUseCase: UpdateProductUseCase
  constructor(updateProductUseCase: UpdateProductUseCase) {
    this.updateProductUseCase = updateProductUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    const { name, price } = req.body
    if (!name || !price) return res.status(400).send('name or price fields should not be empty')
    try {
      await this.updateProductUseCase.execute({ id, name, price })
      return res.status(200).send('product updated')
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected Error')
    }
  }
}

import { Request, Response } from 'express'
import { CreateProductUseCase } from './createProductUseCase'

export class CreateProductController {
  private createProductUseCase: CreateProductUseCase
  constructor(createProductUseCase: CreateProductUseCase) {
    this.createProductUseCase = createProductUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, price } = req.body
    try {
      await this.createProductUseCase.execute({ name, price })
      return res.status(201).send('Product Created')
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected error')
    }
  }
}

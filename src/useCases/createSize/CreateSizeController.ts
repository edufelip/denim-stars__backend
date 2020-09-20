import { CreateSizeUseCase } from './CreateSizeUseCase'
import { Request, Response } from 'express'

export class CreateSizeController {
  private createSizeUseCase: CreateSizeUseCase
  constructor(createSizeUseCase: CreateSizeUseCase) {
    this.createSizeUseCase = createSizeUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { number } = req.body
    try {
      await this.createSizeUseCase.execute(number)
      return res.status(201).send('size created')
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected error')
    }
  }
}

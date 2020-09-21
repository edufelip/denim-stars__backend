import { CreateSizeUseCase } from './CreateSizeUseCase'
import { Request, Response } from 'express'
import 'dotenv/config'

export class CreateSizeController {
  private createSizeUseCase: CreateSizeUseCase
  constructor(createSizeUseCase: CreateSizeUseCase) {
    this.createSizeUseCase = createSizeUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body
    try {
      await this.createSizeUseCase.execute({ name })
      return res.status(201).send('size created')
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected error')
    }
  }
}

import { Request, Response } from 'express'
import { CreateUserUseCase } from './createUserUseCase'

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase
  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    try {
      await this.createUserUseCase.execute({ name, email, password })
      return res.status(201).send('user created')
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected error')
    }
  }
}

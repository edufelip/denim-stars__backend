import { Request, Response } from 'express'
import { UpdateUserUseCase } from './updateUserUseCase'

export class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase
  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, password } = req.body
    if (!name || !password) return res.status(400).send('name or password fields should not be empty')
    const id = req.params.id
    try {
      const updatedUser = await this.updateUserUseCase.execute({ name, password }, id)
      return res.status(200).send(updatedUser)
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected error')
    }
  }
}

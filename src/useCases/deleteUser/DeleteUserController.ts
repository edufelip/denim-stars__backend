import { Request, Response } from 'express'
import { DeleteUserUseCase } from './DeleteUserUseCase'
export class DeleteUserController {
  private deleteUserUseCase: DeleteUserUseCase
  constructor(deleteUserUseCase: DeleteUserUseCase) {
    this.deleteUserUseCase = deleteUserUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    try {
      await this.deleteUserUseCase.execute(id)
      return res.status(201).send('user deleted')
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected error')
    }
  }
}

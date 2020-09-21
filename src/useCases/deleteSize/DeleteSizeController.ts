import { Request, Response } from 'express'
import { DeleteSizeUseCase } from './DeleteSizeUseCase'

export class DeleteSizeController {
  private deleteSizeUseCase: DeleteSizeUseCase
  constructor(deleteSizeUseCase: DeleteSizeUseCase) {
    this.deleteSizeUseCase = deleteSizeUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    try {
      await this.deleteSizeUseCase.execute(id)
      return res.status(200).send('size properly deleted')
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected error')
    }
  }
}

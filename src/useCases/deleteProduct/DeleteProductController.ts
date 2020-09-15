import { Request, Response } from 'express'
import { DeleteProductUseCase } from './DeleteProductUseCase'

export class DeleteProductController {
  private deleteProductUseCase: DeleteProductUseCase
  constructor(deleteProductUseCase: DeleteProductUseCase) {
    this.deleteProductUseCase = deleteProductUseCase
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id
    try {
      await this.deleteProductUseCase.execute(id)
      return res.status(200).send('Product successfully deleted')
    } catch (err) {
      return res.status(400).send(err.message || 'Unexpected error')
    }
  }
}

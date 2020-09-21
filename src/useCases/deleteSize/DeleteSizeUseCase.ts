import { ISizeRepository } from '@repos/ISizeRepository'

export class DeleteSizeUseCase {
  private sizeRepository: ISizeRepository
  constructor(sizeRepository: ISizeRepository) {
    this.sizeRepository = sizeRepository
  }

  async execute(id: string): Promise<void> {
    const sizeExists = await this.sizeRepository.findById(id)
    if (!sizeExists) throw new Error('This size does not exist')
    await this.sizeRepository.delete(id)
  }
}

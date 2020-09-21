import { SizeModel } from '@models/Size'
import { ISizeRepository } from '@repos/ISizeRepository'

export class CreateSizeUseCase {
  private sizeRepository: ISizeRepository
  constructor(sizeRepository: ISizeRepository) {
    this.sizeRepository = sizeRepository
  }

  async execute(size: SizeModel): Promise<void> {
    const sizeExists = await this.sizeRepository.findByName(size.name)
    if (sizeExists) throw new Error('Size already exists')
    await this.sizeRepository.save(size)
  }
}

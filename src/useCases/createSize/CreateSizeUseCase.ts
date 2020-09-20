import { SizeModel } from '@models/Size'
import { ISizeRepository } from '@repos/ISizeRepository'

export class CreateSizeUseCase {
  private sizeRepository: ISizeRepository
  constructor(sizeRepository: ISizeRepository) {
    this.sizeRepository = sizeRepository
  }

  async execute(number: SizeModel): Promise<void> {
    const sizeExists = this.sizeRepository.findByNumber(number.number)
    if (sizeExists) throw new Error('Size already exists')
    await this.sizeRepository.save(number)
  }
}

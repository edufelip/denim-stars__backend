import { SizeModel } from '@models/Size'
import { ISizeRepository } from '@repos/ISizeRepository'
import Size from '@schemas/Size'

export class MongoSizesRepository implements ISizeRepository {
  async findByNumber(number: number): Promise<SizeModel> {
    const size = Size.findOne({ number: number })
    return size
  }

  async save(number: SizeModel): Promise<void> {
    await Size.create(number)
  }

  async delete(number: number): Promise<void> {
    await Size.findOneAndDelete({ number: number })
  }
}

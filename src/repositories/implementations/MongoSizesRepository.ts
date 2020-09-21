import { SizeModel } from '@models/Size'
import { ISizeRepository } from '@repos/ISizeRepository'
import Size from '@schemas/Size'

export class MongoSizesRepository implements ISizeRepository {
  async findByName(name: string): Promise<SizeModel> {
    const size = Size.findOne({ name: name })
    return size
  }

  async findById(id: string): Promise<SizeModel> {
    const size = Size.findById(id)
    return size
  }

  async save(name: SizeModel): Promise<void> {
    await Size.create(name)
  }

  async delete(id: string): Promise<void> {
    await Size.findByIdAndRemove(id)
  }
}

import { SizeModel } from '@models/Size'

export interface ISizeRepository {
  findByName(name: string): Promise<SizeModel>
  findById(id: string): Promise<SizeModel>
  save(name: SizeModel): Promise<void>
  delete(id: string): Promise<void>
}

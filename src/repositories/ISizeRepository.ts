import { SizeModel } from '@models/Size'

export interface ISizeRepository {
  findByNumber(number: number): Promise<SizeModel>
  save(number: SizeModel): Promise<void>
  delete(number: number): Promise<void>
}

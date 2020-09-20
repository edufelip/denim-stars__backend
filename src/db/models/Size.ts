export class SizeModel {
  public readonly _id?: string

  public number: number

  constructor(props: Omit<SizeModel, '_id'>) {
    Object.assign(this, props)
  }
}

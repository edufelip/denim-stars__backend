export class SizeModel {
  public readonly _id?: string

  public name: string

  constructor(props: Omit<SizeModel, '_id'>) {
    Object.assign(this, props)
  }
}

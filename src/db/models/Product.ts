export class ProductModel {
  public readonly _id?: string

  public name: string

  public price: string

  constructor(props: Omit<ProductModel, '_id'>) {
    Object.assign(this, props)
  }
}

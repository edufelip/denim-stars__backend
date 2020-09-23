export class StockModel {
  public readonly _id?: string

  public productId: string

  public sizeId: string

  public amount: number

  constructor(props: Omit<StockModel, '_id'>) {
    Object.assign(this, props)
  }
}

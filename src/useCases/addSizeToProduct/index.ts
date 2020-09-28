import { MongoStockRepository } from '@repos/implementations/MongoStockRepository'
import { AddSizeToProductController } from './AddSizeToProductController'
import { AddSizeToProductUseCase } from './AddSizeToProductUseCase'

const mongoStockRepository = new MongoStockRepository()

const addSizeToProductUseCase = new AddSizeToProductUseCase(mongoStockRepository)

const addSizeToProductController = new AddSizeToProductController(addSizeToProductUseCase)

export { addSizeToProductUseCase, addSizeToProductController }

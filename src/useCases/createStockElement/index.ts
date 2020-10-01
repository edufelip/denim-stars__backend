import { MongoStockRepository } from '@repos/implementations/MongoStockRepository'
import { CreateStockElementController } from './createStockElementController'
import { CreateStockElementUseCase } from './CreateStockElementUseCase'

const mongoStockRepository = new MongoStockRepository()

const createStockElementUseCase = new CreateStockElementUseCase(mongoStockRepository)

const createStockElementController = new CreateStockElementController(createStockElementUseCase)

export { createStockElementUseCase, createStockElementController }

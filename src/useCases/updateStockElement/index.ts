import { MongoStockRepository } from '@repos/implementations/MongoStockRepository'
import { UpdateStockElementController } from './UpdateStockElementController'
import { UpdateStockElementUseCase } from './UpdateStockElementUseCase'

const mongoStockRepository = new MongoStockRepository()

const updateStockElementUseCase = new UpdateStockElementUseCase(mongoStockRepository)

const updateStockElementController = new UpdateStockElementController(updateStockElementUseCase)

export { updateStockElementUseCase, updateStockElementController }

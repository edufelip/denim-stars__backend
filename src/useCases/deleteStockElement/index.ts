import { MongoStockRepository } from '@repos/implementations/MongoStockRepository'
import { DeleteStockElementController } from './DeleteStockElementController'
import { DeleteStockElementUseCase } from './DeleteStockElementUseCase'

const mongoStockRepository = new MongoStockRepository()

const deleteStockElementUseCase = new DeleteStockElementUseCase(mongoStockRepository)

const deleteStockElementController = new DeleteStockElementController(deleteStockElementUseCase)

export { deleteStockElementUseCase, deleteStockElementController }

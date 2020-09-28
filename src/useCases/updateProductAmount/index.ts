import { MongoStockRepository } from '@repos/implementations/MongoStockRepository'
import { UpdateProductAmountController } from './UpdateProductAmountController'
import { UpdateProductAmountUseCase } from './UpdateProductAmountUseCase'

const mongoStockRepository = new MongoStockRepository()

const updateProductAmountUseCase = new UpdateProductAmountUseCase(mongoStockRepository)

const updateProductAmountController = new UpdateProductAmountController(updateProductAmountUseCase)

export { updateProductAmountUseCase, updateProductAmountController }

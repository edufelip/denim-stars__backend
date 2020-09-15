import { MongoProductsRepository } from '@repos/implementations/MongoProductsRepository'
import { DeleteProductController } from './DeleteProductController'
import { DeleteProductUseCase } from './DeleteProductUseCase'

const mongoProductsRepository = new MongoProductsRepository()

const deleteProductUseCase = new DeleteProductUseCase(mongoProductsRepository)

const deleteProductsController = new DeleteProductController(deleteProductUseCase)

export { deleteProductUseCase, deleteProductsController }

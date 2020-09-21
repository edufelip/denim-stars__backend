import { MongoProductsRepository } from '@repos/implementations/MongoProductsRepository'
import { UpdateProductUseCase } from './UpdateProductUseCase'
import { UpdateProductController } from './UpdateProductController'

const mongoProductsRepository = new MongoProductsRepository()

const updateProductuseCase = new UpdateProductUseCase(mongoProductsRepository)

const updateProductController = new UpdateProductController(updateProductuseCase)

export { updateProductuseCase, updateProductController }

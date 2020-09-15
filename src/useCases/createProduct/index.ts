import { MongoProductsRepository } from '@repos/implementations/MongoProductsRepository'
import { CreateProductController } from './CreateProductController'
import { CreateProductUseCase } from './createProductUseCase'

const mongoProductsRepository = new MongoProductsRepository()

const createProductUseCase = new CreateProductUseCase(mongoProductsRepository)

const createProductController = new CreateProductController(createProductUseCase)

export { createProductUseCase, createProductController }

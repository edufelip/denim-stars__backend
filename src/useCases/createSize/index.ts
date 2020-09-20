import { CreateSizeUseCase } from './CreateSizeUseCase'
import { MongoSizesRepository } from '@repos/implementations/MongoSizesRepository'
import { CreateSizeController } from './CreateSizeController'

const mongoSizeRepository = new MongoSizesRepository()

const createSizeUseCase = new CreateSizeUseCase(mongoSizeRepository)

const createSizeController = new CreateSizeController(createSizeUseCase)

export { createSizeUseCase, createSizeController }

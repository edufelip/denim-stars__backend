import { MongoSizesRepository } from '@repos/implementations/MongoSizesRepository'
import { DeleteSizeController } from './DeleteSizeController'
import { DeleteSizeUseCase } from './DeleteSizeUseCase'

const mongoSizeRepository = new MongoSizesRepository()

const deleteSizeUseCase = new DeleteSizeUseCase(mongoSizeRepository)

const deleteSizeController = new DeleteSizeController(deleteSizeUseCase)

export { deleteSizeUseCase, deleteSizeController }

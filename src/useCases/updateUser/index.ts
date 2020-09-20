import { MongoUsersRepository } from '../../repositories/implementations/MongoUsersRepository'
import { UpdateUserUseCase } from './updateUserUseCase'
import { UpdateUserController } from './UpdateUserController'

const mongoUsersRepository = new MongoUsersRepository()

const updateUserUseCase = new UpdateUserUseCase(mongoUsersRepository)

const updateUserController = new UpdateUserController(updateUserUseCase)

export { updateUserUseCase, updateUserController }

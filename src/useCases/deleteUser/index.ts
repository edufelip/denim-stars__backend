import { MongoUsersRepository } from 'src/repositories/implementations/MongoUsersRepository'
import { DeleteUserUseCase } from './DeleteUserUseCase'
import { DeleteUserController } from './DeleteUserController'

const mongoUserRepository = new MongoUsersRepository()

const deleteUserUseCase = new DeleteUserUseCase(mongoUserRepository)

const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserUseCase, deleteUserController }

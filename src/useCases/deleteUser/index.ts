import { MongoUsersRepository } from 'src/repositories/implementations/MongoUsersRepository'
import { DeleteUserUseCase } from './DeleteUserUseCase'
import { DeleteUserController } from './DeleteUserController'
import { MailtrapMailProvider } from 'src/providers/implementations/MailtrapMailProvider'

const mongoUserRepository = new MongoUsersRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const deleteUserUseCase = new DeleteUserUseCase(mongoUserRepository, mailtrapMailProvider)

const deleteUserController = new DeleteUserController(deleteUserUseCase)

export { deleteUserUseCase, deleteUserController }

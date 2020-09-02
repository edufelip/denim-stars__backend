import { CreateUserUseCase } from './CreateUserUseCase'
import { MongoUsersRepository } from '../../repositories/implementations/MongoUsersRepository'
import { CreateUserController } from './CreateUserController'
import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider'

const mongoUsersRepository = new MongoUsersRepository()
const mailtrapMailProvider = new MailtrapMailProvider()

const createUserUseCase = new CreateUserUseCase(mongoUsersRepository, mailtrapMailProvider)

const createUserController = new CreateUserController(createUserUseCase)

export { createUserUseCase, createUserController }

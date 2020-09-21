import { IUserRepository } from '../../repositories/IUserRepository'
import { CreateUserRequestDTO } from './CreateUserDTO'
import { IMailProvider, IMessage } from '../../providers/IMailProvider'
import Queue from '../../lib/Queue'
import 'dotenv/config'

export class CreateUserUseCase {
  private userRepository: IUserRepository
  private mailProvider: IMailProvider
  constructor(userRepository: IUserRepository, mailprovider: IMailProvider) {
    this.userRepository = userRepository
    this.mailProvider = mailprovider
  }

  async execute(data: CreateUserRequestDTO): Promise<void> {
    const userExists = await this.userRepository.findByEmail(data.email)
    if (userExists) throw new Error('User already exists')
    await this.userRepository.save(data)

    const message: IMessage = {
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Denim Starts',
        email: process.env.MAILER_EMAIL
      },
      subject: 'Your account has been created',
      body: 'Welcome to Denim Stars, you can now login to our platform'
    }

    if (process.env.MOCK_MODE === 'false') await Queue.add('RegistrationMail', message)
  }
}

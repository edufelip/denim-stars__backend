import { IUserRepository } from 'src/repositories/IUserRepository'
import { CreateUserRequestDTO } from './CreateUserDTO'
import { IMailProvider } from 'src/providers/IMailProvider'
import dotenv from 'dotenv'
dotenv.config()

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
    this.mailProvider.sendMail({
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
    })
  }
}

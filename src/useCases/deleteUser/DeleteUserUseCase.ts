import { IUserRepository } from 'src/repositories/IUserRepository'
import { IMailProvider, IMessage } from 'src/providers/IMailProvider'
import Queue from '../../lib/Queue'
import 'dotenv/config'
export class DeleteUserUseCase {
  private userRepository: IUserRepository
  private mailProvider: IMailProvider
  constructor(userRepository: IUserRepository, mailProvider: IMailProvider) {
    this.userRepository = userRepository
    this.mailProvider = mailProvider
  }

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new Error("User doesn't exist")
    await this.userRepository.delete(id)

    const message: IMessage = {
      to: {
        name: user.name,
        email: user.email
      },
      from: {
        name: 'Denim Starts',
        email: process.env.MAILER_EMAIL
      },
      subject: 'Your account has been created',
      body: 'Welcome to Denim Stars, you can now login to our platform'
    }

    if (process.env.MOCK_MODE === 'false') await Queue.add('ExclusionEmail', message)
  }
}

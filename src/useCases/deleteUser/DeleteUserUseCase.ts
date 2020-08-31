import { IUserRepository } from 'src/repositories/IUserRepository'
import { IMailProvider } from 'src/providers/IMailProvider'
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
    this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      from: {
        name: 'Denim Stars',
        email: process.env.MAILER_EMAIL
      },
      subject: 'Your account has been deleted',
      body: "It's been a pleasure being with you, see you next time"
    })
  }
}

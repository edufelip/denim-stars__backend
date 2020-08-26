import { IUserRepository } from 'src/repositories/IUserRepository'
import { CreateUserRequestDTO } from './CreateUserDTO'

export class CreateUserUseCase {
  private userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: CreateUserRequestDTO): Promise<void> {
    const userExists = await this.userRepository.findByEmail(data.email)

    if (userExists) {
      throw new Error('User already exists')
    } else {
      await this.userRepository.save(data)
    }
  }
}

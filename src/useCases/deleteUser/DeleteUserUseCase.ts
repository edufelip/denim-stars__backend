import { IUserRepository } from 'src/repositories/IUserRepository'

export class DeleteUserUseCase {
  private userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(id: string): Promise<void> {
    this.userRepository.delete(id)
  }
}

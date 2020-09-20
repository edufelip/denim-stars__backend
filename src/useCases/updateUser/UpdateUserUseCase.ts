import { UserModel } from '@models/User'
import { IUserRepository } from '../../repositories/IUserRepository'
import { UpdateUserRequestDTO } from './UpdateUserDTO'

export class UpdateUserUseCase {
  private userRepository: IUserRepository
  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository
  }

  async execute(data: UpdateUserRequestDTO, id: string): Promise<UserModel> {
    const userExists = await this.userRepository.findById(id)
    if (!userExists) throw new Error('User does not exists')
    return await this.userRepository.update(data, id)
  }
}

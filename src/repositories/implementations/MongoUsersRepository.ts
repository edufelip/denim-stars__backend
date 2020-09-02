import { IUserRepository } from '../IUserRepository'
import { UserModel } from 'src/db/models/User'
import User from 'src/db/schemas/User'
import { CreateUserRequestDTO } from 'src/useCases/createUser/CreateUserDTO'

export class MongoUsersRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserModel> {
    const user = await User.findOne({ email: email })
    return user
  }

  async findById(id: string): Promise<UserModel> {
    const user = await User.findById(id)
    return user
  }

  async save(user: CreateUserRequestDTO): Promise<void> {
    await User.create(user)
  }

  async delete(id: string): Promise<void> {
    await User.findByIdAndDelete(id)
  }
}

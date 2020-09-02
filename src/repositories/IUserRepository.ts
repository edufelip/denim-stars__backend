import { UserModel } from 'src/db/models/User'
import { CreateUserRequestDTO } from 'src/useCases/createUser/CreateUserDTO'

export interface IUserRepository {
  findByEmail(email: string): Promise<UserModel>
  findById(id: string): Promise<UserModel>
  save(user: CreateUserRequestDTO): Promise<void>
  delete(id: string): Promise<void>
}

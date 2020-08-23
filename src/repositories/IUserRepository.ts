import { User } from '@models/User'

export interface IUserRepository {
  findByEmail(email: string): Promise<User>
  save(user: User): Promise<void>
}

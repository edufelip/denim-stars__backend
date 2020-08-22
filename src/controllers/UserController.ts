import { User } from '@models/User'

export class UserController {
  show (req, res) {
    const user = new User()
    console.log(user.email)
  }
}

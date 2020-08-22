import { User } from '../models/User'

test('it should pass', () => {
  const user = new User()
  user.name = 'Edu'
  expect(user.name).toEqual('Edu')
})

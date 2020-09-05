import factory from 'factory-girl'
import User from '@schemas/User'

factory.define('User', User, {
  name: 'example name',
  email: 'example_email@yahoo.com',
  password: 'examplepassword123'
})

export default factory

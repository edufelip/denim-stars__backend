import factory from 'factory-girl'
import User from '@schemas/User'
import Product from '@schemas/Product'
import faker from 'faker'

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

factory.define('Product', Product, {
  name: 'example jeans',
  price: '$99.99'
})

export default factory

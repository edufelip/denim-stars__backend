import factory from 'factory-girl'
import User from '@schemas/User'
import Product from '@schemas/Product'

factory.define('User', User, {
  name: 'example name',
  email: 'example_email@yahoo.com',
  password: 'examplepassword123'
})

factory.define('Product', Product, {
  name: 'example jeans',
  price: '$99.99'
})

export default factory

import { Router } from 'express'
import { createUserController } from '@controllers/createUser'
import { updateUserController } from '@controllers/updateUser'
import { deleteUserController } from '@controllers/deleteUser'
import User from '@schemas/User'

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.find()
  return res.json(users)
})

router.get('/new', (req, res) => {
  return res.json('new user form')
})

router.post('/', (req, res) => {
  return createUserController.handle(req, res)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const user = await User.findById(id)
  return res.json(user)
})

router.get('/:id/edit', (req, res) => {
  return res.json('edit form to single user')
})

router.put('/:id', (req, res) => {
  return updateUserController.handle(req, res)
})

router.delete('/:id', (req, res) => {
  return deleteUserController.handle(req, res)
})

export { router }

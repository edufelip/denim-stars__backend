import { createProductController } from '@controllers/createProduct'
import { deleteUserController } from '@controllers/deleteUser'
import { updateUserController } from '@controllers/updateUser'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  return res.json('list all products')
})

router.get('/new', (req, res) => {
  return res.json('new product form')
})

router.post('/', (req, res) => {
  return createProductController.handle(req, res)
})

router.get('/:id', (req, res) => {
  return res.json('show certain product')
})

router.get('/:id/edit', (req, res) => {
  return res.json('edit form to single product')
})

router.put('/:id', (req, res) => {
  return updateUserController.handle(req, res)
})

router.delete('/:id', (req, res) => {
  return deleteUserController.handle(req, res)
})

export { router }

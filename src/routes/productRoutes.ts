import { createProductController } from '@controllers/createProduct'
import { updateProductController } from '@controllers/updateProduct'
import { deleteProductController } from '@controllers/deleteProduct'
import Product from '@schemas/Product'
import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  const products = await Product.find({})
  return res.json(products)
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
  return updateProductController.handle(req, res)
})

router.delete('/:id', (req, res) => {
  return deleteProductController.handle(req, res)
})

export { router }

import { Router } from 'express'
import Stock from '@schemas/Stock'
import { createSizeController } from '@controllers/createSize'
import { deleteSizeController } from '@controllers/deleteSize'

const router = Router()

router.get('/', async (req, res) => {
  const stock = await Stock.find().sort('productId')
  return res.json(stock)
})

router.get('/new', (req, res) => {
  return res.json('new size form')
})

router.post('/', (req, res) => {
  return createSizeController.handle(req, res)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const size = await Stock.findById(id)
  return res.json(size)
})

router.delete('/:id', (req, res) => {
  return deleteSizeController.handle(req, res)
})

export { router }

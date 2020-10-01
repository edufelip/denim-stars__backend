import { Router } from 'express'
import Stock from '@schemas/Stock'
import { createStockElementController } from '@controllers/createStockElement'
import { updateStockElementController } from '@controllers/updateStockElement'
import { deleteStockElementController } from '@controllers/deleteStockElement'

const router = Router()

router.get('/', async (req, res) => {
  const stock = await Stock.find().sort('productId')
  return res.json(stock)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const stock = await Stock.findById(id)
  return res.json(stock)
})

router.get('/new', (req, res) => {
  return res.json('add size to product form')
})

router.post('/', (req, res) => {
  return createStockElementController.handle(req, res)
})

router.put('/:id', (req, res) => {
  return updateStockElementController.handle(req, res)
})

router.get('/:id/edit', (req, res) => {
  return res.json('edit form for a single stock element (update amount)')
})

router.delete('/:id', (req, res) => {
  return deleteStockElementController.handle(req, res)
})

export { router }

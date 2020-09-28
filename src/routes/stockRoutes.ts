import { Router } from 'express'
import Stock from '@schemas/Stock'
import { addSizeToProductController } from '@controllers/addSizeToProduct'
import { updateProductAmountController } from '@controllers/updateProductAmount'

const router = Router()

router.get('/', async (req, res) => {
  const stock = await Stock.find().sort('productId')
  return res.json(stock)
})

router.get('/new', (req, res) => {
  return res.json('add size to product form')
})

router.post('/', (req, res) => {
  return addSizeToProductController.handle(req, res)
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const stock = await Stock.find({
    productId: id
  })
  return res.json(stock)
})

router.post('/:productId', async (req, res) => {
  return updateProductAmountController.handle(req, res)
})

// router.delete('/:id', (req, res) => {
//   return deleteSizeController.handle(req, res)
// })

export { router }

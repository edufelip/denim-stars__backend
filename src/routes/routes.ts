import { Router } from 'express'
import { createUserController } from '@controllers/createUser'

const router = Router()

router.get('/', (req, res) => {
  return res.json('foi')
})

router.post('/', (req, res) => {
  return createUserController.handle(req, res)
})

export { router }

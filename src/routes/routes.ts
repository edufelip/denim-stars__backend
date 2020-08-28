import { Router } from 'express'
import { createUserController } from '@controllers/createUser'

const router = Router()

router.get('/', (req, res) => {
  return res.json('foi')
})

export { router }

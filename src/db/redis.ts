import 'dotenv/config'
import { QueueOptions } from 'bull'

const redisConfig: QueueOptions = {
  redis: {
    port: parseInt(<string>process.env.REDIS_PORT, 10),
    host: process.env.REDIS_HOST
  }
}

export default redisConfig

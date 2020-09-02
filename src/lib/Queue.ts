import Bull, { Job, JobOptions } from 'bull'
import redisConfig from '../db/redis'

import * as jobs from './jobs'
import { IMessage } from 'src/providers/IMailProvider'

interface IQueue {
  bull: Bull.Queue
  name: string
  handle(message: IMessage): Promise<void>
  options?: JobOptions
}

const queues = Object.values(jobs).map((job) => ({
  bull: new Bull(job.key, redisConfig),
  name: job.key,
  handle: job.handle,
  options: job.options
}))

export default {
  queues,
  add(name: string, data: IMessage): Promise<Job> {
    const queue: IQueue = this.queues.find((queue: IQueue) => queue.name === name)
    return queue.bull.add(data, queue.options)
  },
  process(): void {
    return this.queues.forEach((queue: IQueue) => {
      queue.bull.process((job: Job) => {
        queue.handle(job.data)
      })
      queue.bull.on('failed', (job: Job, err: Error) => {
        console.log('job failed', queue.name, job.data)
        console.log(err)
      })
    })
  }
}

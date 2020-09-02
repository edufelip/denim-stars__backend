import { MailtrapMailProvider } from '../../providers/implementations/MailtrapMailProvider'
import { IMessage } from '../../providers/IMailProvider'

const mailtrapMailProvider = new MailtrapMailProvider()

export default {
  key: 'RegistrationMail',
  options: { priority: 1 },
  async handle(message: IMessage): Promise<void> {
    await mailtrapMailProvider.sendMail(message)
  }
}

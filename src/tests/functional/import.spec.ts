import mongoose from 'mongoose'
import { Readable } from 'stream'

import Contact from '@schemas/User'
import Tag from '@schemas/Tag'

describe('Import', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialized')
    }
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })
  beforeEach(async () => {
    await Contact.deleteMany({})
  })
  it('should be able to import new contacts', async () => {
    const contactsFileStream = Readable.from([
      'edu_felip@hotmail.com\n',
      'fimfomfum@hotmail.com\n'
    ])

    // const importContacts = new ImportContactsService()

    // await importContacts.run(contactsFileStream, ['Students', 'Class A'])

    const createdTags = await Tag.find({}).lean()

    expect(createdTags).toEqual([
      expect.objectContaining({ title: 'Students' }),
      expect.objectContaining({ title: 'Class A' })
    ])

    const createdTagsIds = createdTags.map(tag => tag._id)
    const createdContacts = await Contact.find({}).lean()

    expect(createdContacts).toEqual([
      expect.objectContaining({
        email: 'edu_felip@hotmail.com',
        tags: createdTagsIds
      }),
      expect.objectContaining({
        email: 'fimfomfum@hotmail.com',
        tags: createdTagsIds
      })
    ])

    await Contact.create({ email: 'edu_felip@hotmail.com' })
    const list = await Contact.find({})
    expect(list).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          email: 'edu_felip@hotmail.com'
        })
      ])
    )
  })
})

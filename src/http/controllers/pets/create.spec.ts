import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create pet', async () => {
    const { organization } = await createAndAuthenticateOrganization(app)

    const response = await request(app.server)
      .post(`/pets/${organization.id}`)
      .send({
        name: 'Doly',
      })

    expect(response.statusCode).toEqual(201)
  })
})

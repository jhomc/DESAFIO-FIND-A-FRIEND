import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to search pet', async () => {
    // criar organizacao -> authentica -> cria pet -> procura pet
    const { organization } = await createAndAuthenticateOrganization(app)

    await request(app.server).post(`/pets/${organization.id}`).send({
      name: 'Doly',
      size: 'Grande',
    })

    await request(app.server).post(`/pets/${organization.id}`).send({
      name: 'Montanha',
      size: 'Pequeno',
    })

    const response = await request(app.server)
      .get('/pets/search')
      .query({
        query: JSON.stringify({
          city: 'Curitiba',
          name: 'Doly',
          size: 'Grande',
        }),
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Doly',
      }),
    ])
  })
})

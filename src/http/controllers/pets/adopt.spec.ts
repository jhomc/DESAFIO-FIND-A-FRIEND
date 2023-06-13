import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Adopt pet e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to adopt pet', async () => {
    const { organization } = await createAndAuthenticateOrganization(app)

    const pet = await prisma.pet.create({
      data: {
        name: 'Doly',
        organization_id: organization.id,
      },
    })

    const response = await request(app.server).get(`/pets/adopt/${pet.id}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.organization).toEqual(
      expect.objectContaining({
        name: 'Jhon Org',
        phone: '41996196231',
      }),
    )
  })
})

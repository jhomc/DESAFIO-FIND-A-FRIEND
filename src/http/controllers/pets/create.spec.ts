import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
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
    const organization = await prisma.organization.create({
      data: {
        name: 'Jhon Org',
        email: 'jhon.org@gmail.com',
        password_hash: await hash('123456', 6),
        street: 'Test street',
        phone: '41996196231',
        cep: 81650220,
        address_number: '312, house 5',
        city: 'Curitiba',
      },
    })

    // const token = await request(app.server).post('/sessions').send({
    //   email: 'jhon.org@gmail.com',
    //   password: '123456',
    // })

    const response = await request(app.server)
      .post(`/pets/${organization.id}`)
      .send({
        name: 'Doly',
      })

    expect(response.statusCode).toEqual(201)
  })
})

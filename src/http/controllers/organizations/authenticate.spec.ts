import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate', async () => {
    await request(app.server).post('/organization').send({
      name: 'Jhon Org',
      email: 'jhon.org@gmail.com',
      password: '123456',
      street: 'Test street',
      phone: '41996196231',
      cep: 81650220,
      address_number: '312, house 5',
      city: 'Curitiba',
    })
    const response = await request(app.server).post('/sessions').send({
      email: 'jhon.org@gmail.com',
      password: '123456',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})

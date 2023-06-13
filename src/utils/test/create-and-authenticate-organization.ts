import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
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

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'jhon.org@gmail.com',
    password: '123456',
  })

  const { token } = authResponse.body

  return {
    token,
    organization,
  }
}

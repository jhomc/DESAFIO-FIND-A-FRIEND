import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { adopt } from './adopt'
import { details } from './details'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/search', search)
  app.get('/pets/adopt/:petId', adopt)
  app.get('/pets/details/:petId', details)

  // Authenticated only
  app.post('/pets/:organizationId', { onRequest: [verifyJWT] }, create)
}

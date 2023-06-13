import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { adopt } from './adopt'
import { details } from './details'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/:organizationId', create)
  app.get('/pets/search', search)
  app.get('/pets/adopt/:petId', adopt)
  app.get('/pets/details/:petId', details)
}

import { FastifyInstance } from 'fastify'
import { create } from './create'
import { search } from './search'
import { adopt } from './adopt'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/:organizationId', create)
  app.get('/pets/search', search)
  app.post('/pets/adopt/:petId', adopt)
}

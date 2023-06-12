import { InvalidCityError } from '@/use-case/errors/invalid-city-error'
import { makeSearchPetsUseCase } from '@/use-case/factories/make-search-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchPetQuerySchema = z.object({
    query: z.string(),
  })

  const { query } = searchPetQuerySchema.parse(request.query)

  try {
    const searchPetsUseCase = makeSearchPetsUseCase()
    const { pets } = await searchPetsUseCase.execute({
      query,
    })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof InvalidCityError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}

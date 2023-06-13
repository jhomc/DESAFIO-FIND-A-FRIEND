import { makeAdoptPetUseCase } from '@/use-case/factories/make-adopt-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function adopt(request: FastifyRequest, reply: FastifyReply) {
  const adoptPetParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = adoptPetParamsSchema.parse(request.params)

  const adoptPetsUseCase = makeAdoptPetUseCase()
  const { organization } = await adoptPetsUseCase.execute({
    petId,
  })

  return reply.status(200).send({ organization })
}

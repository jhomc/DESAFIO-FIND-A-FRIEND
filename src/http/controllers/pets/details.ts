import { makeDetailsPetUseCase } from '@/use-case/factories/make-details-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(request: FastifyRequest, reply: FastifyReply) {
  const detailsPetParamsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = detailsPetParamsSchema.parse(request.params)

  const detailsPetUseCase = makeDetailsPetUseCase()
  const { pet } = await detailsPetUseCase.execute({
    petId,
  })

  return reply.status(200).send({ pet })
}

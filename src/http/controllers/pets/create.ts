import { makeCreatePetUseCase } from '@/use-case/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    size: z.string().optional(),
    description: z.string().optional(),
    energy: z.number().optional(),
    ambient: z.string().optional(),
    age: z.string().optional(),
    imgUrl: z.string().optional(),
  })

  const createPetQuerySchema = z.object({
    organizationId: z.string().uuid(),
  })

  const { name, age, ambient, description, energy, imgUrl, size } =
    createPetBodySchema.parse(request.body)

  const { organizationId } = createPetQuerySchema.parse(request.params)

  const createPetUseCase = makeCreatePetUseCase()
  await createPetUseCase.execute({
    name,
    organizationId,
    age,
    ambient,
    description,
    energy,
    imgUrl,
    size,
  })

  return reply.status(201).send()
}

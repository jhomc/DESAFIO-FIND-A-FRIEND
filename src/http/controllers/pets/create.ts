import { makeCreatePetUseCase } from '@/use-case/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    size: z.string().nullable(),
    description: z.string().nullable(),
    energy: z.number().nullable(),
    ambient: z.string().nullable(),
    age: z.string().nullable(),
    imgUrl: z.string().nullable(),
  })

  const createPetQuerySchema = z.object({
    organizationId: z.string().uuid(),
  })

  const { name, age, ambient, description, energy, imgUrl, size } =
    createPetBodySchema.parse(request.body)

  const { organizationId } = createPetQuerySchema.parse(request.params)

  try {
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
  } catch (err) {
    console.log(err)
  }

  return reply.status(201).send()
}

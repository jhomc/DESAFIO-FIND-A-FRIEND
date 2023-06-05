import { makeCreateOrganizationUseCase } from '@/use-case/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrganizationBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    street: z.string(),
    cep: z.number().min(8),
    address_number: z.string(),
    phone: z.string(),
  })

  const { name, email, password, street, address_number, cep, phone } =
    createOrganizationBodySchema.parse(request.body)

  try {
    const organizationUseCase = makeCreateOrganizationUseCase()
    await organizationUseCase.execute({
      name,
      password,
      email,
      phone,
      street,
      address_number,
      cep,
    })
  } catch (error) {
    console.error(error)
  }

  return reply.status(201).send()
}

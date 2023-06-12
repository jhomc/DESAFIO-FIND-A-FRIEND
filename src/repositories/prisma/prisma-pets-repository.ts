import { Prisma } from '.prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async findByParams(organizationIds: string[], query: string) {
    const parsedQuery = JSON.parse(query)

    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: organizationIds,
        },
        name: parsedQuery.name ?? undefined,
        description: parsedQuery.description ?? undefined,
        size: parsedQuery.size ?? undefined,
        age: parsedQuery.age ?? undefined,
        energy:
          parsedQuery.energy != null ? parseInt(parsedQuery.energy) : undefined,
      },

      select: {
        name: true,
        age: true,
        description: true,
        size: true,
        imgUrl: true,
        energy: true,
        ambient: true,
        created_at: true,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}

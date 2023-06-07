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

  async findByParams(organizationIds: string[], query: Record<string, string>) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: organizationIds,
        },
        name: query.name ?? undefined,
        description: query.description ?? undefined,
        size: query.size ?? undefined,
        age: query.age ?? undefined,
        energy: parseInt(query.energy) ?? undefined,
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

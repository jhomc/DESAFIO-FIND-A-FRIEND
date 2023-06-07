import { Prisma } from '.prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findByParams(
    organizationIds: string[],
    name?: string | undefined,
    description?: string | undefined,
    size?: string | undefined,
    age?: string | undefined,
    energy?: number | undefined,
  ) {
    const pets = await prisma.pet.findMany({
      where: {
        organization_id: {
          in: organizationIds,
        },
        name: name ?? undefined,
        description: description ?? undefined,
        size: size ?? undefined,
        age: age ?? undefined,
        energy: energy ?? undefined,
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

import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findByParams(
    organizationIds: string[],
    name?: string,
    description?: string,
    size?: string,
    age?: string,
    energy?: number,
  ): Promise<Pet[] | null>
}

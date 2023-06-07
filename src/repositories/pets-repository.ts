import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findByParams(
    organizationIds: string[],
    query?: Record<string, string>,
  ): Promise<Pet[] | null>
}

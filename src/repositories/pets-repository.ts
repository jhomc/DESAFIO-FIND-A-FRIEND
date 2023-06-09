import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findDetailsById(
    id: string,
  ): Promise<Omit<Pet, 'id' | 'organization_id'> | null>
  findByParams(
    organizationIds: string[],
    query: string,
  ): Promise<Omit<Pet, 'id' | 'organization_id'>[] | null>
}

import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetsUseCase } from '../fetch-pets'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeSearchPetsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsUseCase(petsRepository, organizationsRepository)

  return useCase
}

import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AdoptUseCase } from '../adopt'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeAdoptPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const organizationsRpository = new PrismaOrganizationsRepository()
  const useCase = new AdoptUseCase(petsRepository, organizationsRpository)

  return useCase
}

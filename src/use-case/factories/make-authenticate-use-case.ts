import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const organizationsRpository = new PrismaOrganizationsRepository()
  const useCase = new AuthenticateUseCase(organizationsRpository)

  return useCase
}

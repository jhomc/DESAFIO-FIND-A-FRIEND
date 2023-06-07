import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    if (!organization) {
      return null
    }

    return organization
  }

  async findByCity(city: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        city,
      },
    })

    return organizations
  }

  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
}

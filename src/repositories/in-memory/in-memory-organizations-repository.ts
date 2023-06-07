import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async findByCity(city: string) {
    const organizations = this.items.filter((org) => org.city === city)

    return organizations
  }

  async findByEmail(email: string) {
    const organization = this.items.find((org) => org.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      street: data.street,
      address_number: data.address_number,
      cep: data.cep,
      city: data.city,
      created_at: new Date(),
    }

    this.items.push(organization)

    return organization
  }
}

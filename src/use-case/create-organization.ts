import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'

interface OrganizationUseCasRequest {
  name: string
  email: string
  password: string
  street: string
  cep: number
  address_number: string
  phone: string
}

interface OrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    street,
    address_number,
    cep,
  }: OrganizationUseCasRequest): Promise<OrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      phone,
      street,
      address_number,
      cep,
    })

    return { organization }
  }
}

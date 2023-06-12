import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { InvalidCityError } from './errors/invalid-city-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsUseCaseRequest {
  query: string
}

interface FetchPetsUseCaseResponse {
  pets: Omit<Pet, 'id' | 'organization_id' | 'organization'>[]
}

export class FetchPetsUseCase {
  constructor(
    private petsRpository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    query,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const parsedQuery = JSON.parse(query)

    if (!parsedQuery.city) {
      throw new InvalidCityError()
    }

    const organizations = await this.organizationsRepository.findByCity(
      parsedQuery.city,
    )

    if (!organizations) {
      throw new InvalidCityError()
    }

    const organizationIds = organizations.map((organization) => organization.id)

    const pets = await this.petsRpository.findByParams(organizationIds, query)

    if (!pets) {
      throw new ResourceNotFoundError()
    }

    return { pets }
  }
}

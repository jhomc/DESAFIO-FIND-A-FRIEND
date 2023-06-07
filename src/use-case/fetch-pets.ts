import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { InvalidCityError } from './errors/invalid-city-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchPetsUseCaseRequest {
  city: string
  query?: {
    name?: string
    description?: string
    size?: string
    age?: string
    energy?: string
  }
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(
    private petsRpository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    city,
    query,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const organizations = await this.organizationsRepository.findByCity(city)

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

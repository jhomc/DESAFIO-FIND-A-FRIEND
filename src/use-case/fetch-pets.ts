import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsUseCaseRequest {
  city: string
  name?: string
  description?: string
  size?: string
  age?: string
  energy?: number
}

interface FetchPetsUseCaseResponse {
  pets: Pet[] | null
}

export class FetchPetsUseCase {
  constructor(
    private petsRpository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    city,
    name,
    description,
    size,
    age,
    energy,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const organizations = await this.organizationsRepository.findByCity(city)

    if (!organizations) {
      throw new Error()
      // TODO: Create invalid city error
    }

    const organizationIds = organizations.map((organization) => organization.id)

    const pets = await this.petsRpository.findByParams(
      organizationIds,
      name,
      description,
      size,
      age,
      energy,
    )

    return { pets }
  }
}

import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface AdoptUseCaseRequest {
  petId: string
}

interface AdoptUseCaseResponse {
  organization: {
    name: string
    phone: string
  }
}

export class AdoptUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({ petId }: AdoptUseCaseRequest): Promise<AdoptUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const foundOrganization = await this.organizationsRepository.findById(
      pet.organization_id,
    )

    if (!foundOrganization) {
      throw new ResourceNotFoundError()
    }

    const organization = {
      name: foundOrganization.name,
      phone: foundOrganization.phone,
    }

    return { organization }
  }
}

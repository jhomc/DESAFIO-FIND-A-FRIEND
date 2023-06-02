import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  name: string
  size?: string | null
  description?: string | null
  energy?: number | null
  ambient?: string | null
  age?: string | null
  imgUrl?: string | null
  organizationId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}
export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    name,
    age,
    ambient,
    description,
    energy,
    imgUrl,
    size,
    organizationId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      name,
      age,
      ambient,
      description,
      energy,
      imgUrl,
      size,
      organization_id: organizationId,
    })

    return { pet }
  }
}

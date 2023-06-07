import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { GetPetDetailsUseCase } from './get-pet-details'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to fetch a list of pets', async () => {
    const organization = await organizationsRepository.create({
      name: 'Jhon Org',
      email: 'jhon.org@gmail.com',
      password_hash: await hash('123456', 6),
      street: 'Test street',
      phone: '41996196231',
      cep: 81650220,
      address_number: '312, house 5',
      city: 'Curitiba',
    })

    const createdPet = await petsRepository.create({
      name: 'Caramelo',
      size: 'Grande',
      organization_id: organization.id,
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet).toEqual(
      expect.objectContaining({
        name: 'Caramelo',
        size: 'Grande',
      }),
    )
  })
})

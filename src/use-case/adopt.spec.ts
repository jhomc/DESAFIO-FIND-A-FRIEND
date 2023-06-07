import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { AdoptUseCase } from './adopt'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: AdoptUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new AdoptUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to get organization data when trying to adopt a pet', async () => {
    const createdOrganization = await organizationsRepository.create({
      name: 'Jhon Org',
      email: 'jhon.org@gmail.com',
      password_hash: await hash('123456', 6),
      street: 'Test street',
      phone: '41996196231',
      cep: 81650220,
      address_number: '312, house 5',
      city: 'Curitiba',
    })

    const pet = await petsRepository.create({
      name: 'Caramelo',
      size: 'Grande',
      organization_id: createdOrganization.id,
    })

    const { organization } = await sut.execute({
      petId: pet.id,
    })

    expect(organization).toEqual(
      expect.objectContaining({
        name: 'Jhon Org',
        phone: '41996196231',
      }),
    )
  })
})

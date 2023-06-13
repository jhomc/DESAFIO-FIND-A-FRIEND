import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { hash } from 'bcryptjs'
import { FetchPetsUseCase } from './fetch-pets'
import { InvalidCityError } from './errors/invalid-city-error'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: FetchPetsUseCase

describe('Fetch Pets Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new FetchPetsUseCase(petsRepository, organizationsRepository)
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

    await petsRepository.create({
      name: 'Caramelo',
      size: 'Grande',
      organization_id: organization.id,
    })

    await petsRepository.create({
      name: 'Doly',
      size: 'Pequeno',
      organization_id: organization.id,
    })

    const { pets } = await sut.execute({
      query: JSON.stringify({
        city: 'Curitiba',
      }),
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to filter pet by attributes', async () => {
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

    await petsRepository.create({
      name: 'Caramelo',
      size: 'Grande',
      organization_id: organization.id,
    })

    await petsRepository.create({
      name: 'Doly',
      size: 'Pequeno',
      organization_id: organization.id,
    })

    const { pets } = await sut.execute({
      query: JSON.stringify({
        city: 'Curitiba',
        size: 'Grande',
      }),
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ name: 'Caramelo' })])
  })

  it('should not be able to find pets without city', async () => {
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

    await petsRepository.create({
      name: 'Caramelo',
      size: 'Grande',
      organization_id: organization.id,
    })

    await expect(() =>
      sut.execute({
        query: JSON.stringify({
          size: 'Grande',
        }),
      }),
    ).rejects.toBeInstanceOf(InvalidCityError)
  })
})

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { CreateOrganizationUseCase } from './create-organization'
import { beforeEach, describe, expect, it } from 'vitest'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create organization', async () => {
    const { organization } = await sut.execute({
      name: 'Jhon Org',
      email: 'jhon.org@gmail.com',
      password: '123456',
      street: 'Test street',
      phone: '41996196231',
      cep: 81650220,
      address_number: '312, house 5',
    })

    expect(organization.id).toEqual(expect.any(String))
  })
})

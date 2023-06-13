import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findByParams(organizationIds: string[], query: string) {
    const parsedQuery = JSON.parse(query)
    const { name, description, size, age, energy } = parsedQuery ?? {}
    const pets = this.items.filter((pet) => {
      return (
        (!organizationIds || organizationIds.includes(pet.organization_id)) &&
        (!name || pet.name.includes(name)) &&
        (!description || pet.description === description) &&
        (!size || pet.size === size) &&
        (!age || pet.age === age) &&
        (!energy || pet.energy === parseInt(energy))
      )
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      size: data.size ?? null,
      age: data.age ?? null,
      description: data.description ?? null,
      ambient: data.ambient ?? null,
      energy: data.energy ?? null,
      imgUrl: data.imgUrl ?? null,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}

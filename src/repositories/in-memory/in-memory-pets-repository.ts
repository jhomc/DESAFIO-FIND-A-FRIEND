import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      name: data.name,
      size: data.size !== undefined ? data.size : null,
      age: data.age !== undefined ? data.age : null,
      description: data.description !== undefined ? data.description : null,
      ambient: data.ambient !== undefined ? data.ambient : null,
      energy: data.energy ?? null,
      imgUrl: data.imgUrl !== undefined ? data.imgUrl : null,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}

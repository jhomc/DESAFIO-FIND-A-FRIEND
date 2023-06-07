export class InvalidCityError extends Error {
  constructor() {
    super('No organizations found for the informed city!')
  }
}

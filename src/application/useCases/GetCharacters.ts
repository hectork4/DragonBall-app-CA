import { CharacterRepository } from '../../domain/repositories/CharacterRepository';

export class GetCharacters {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(limit: number) {
    return this.characterRepository.getCharacters(limit);
  }
}

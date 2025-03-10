import { CharacterRepository } from '../../domain/repositories/CharacterRepository';

export class GetCharactersByName {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(name: string) {
    return this.characterRepository.searchCharacters(name);
  }
}

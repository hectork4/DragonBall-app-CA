import { CharacterRepository } from '../../domain/repositories/CharacterRepository';

export class GetCharacterDetails {
  constructor(private characterRepository: CharacterRepository) {}

  async execute(id: string) {
    return this.characterRepository.getCharacterDetails(id);
  }
}

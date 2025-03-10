import { Character } from '../entities/Character';

export interface CharacterRepository {
  getCharacters(limit: number): Promise<Character[]>;
  searchCharacters(name: string): Promise<Character[]>;
  getCharacterDetails(id: string): Promise<Character>;
}

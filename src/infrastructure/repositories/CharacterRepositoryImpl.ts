import { CharacterRepository } from '../../domain/repositories/CharacterRepository';
import { Character } from '../../domain/entities/Character';
import { DragonBallApi } from '../api/DragonBallApi';
import { loadFromCache, saveToCache } from '../../utils/cacheHelpers';

export class CharacterRepositoryImpl implements CharacterRepository {
  async getCharacters(limit: number): Promise<Character[]> {
    const cacheKey = `characters_${limit}`;
    const cachedCharacters = loadFromCache<Character[]>(cacheKey);
    if (cachedCharacters) {
      return cachedCharacters;
    }

    const characters = await DragonBallApi.getCharacters(limit);
    saveToCache(cacheKey, characters);
    return characters;
  }

  async searchCharacters(name: string): Promise<Character[]> {
    const cacheKey = `search_${name}`;
    const cachedCharacters = loadFromCache<Character[]>(cacheKey);
    if (cachedCharacters) {
      return cachedCharacters;
    }

    const characters = await DragonBallApi.searchCharacters(name);
    saveToCache(cacheKey, characters);
    return characters;
  }

  async getCharacterDetails(id: string): Promise<Character> {
    const cacheKey = `character_${id}`;
    const cachedCharacter = loadFromCache<Character>(cacheKey);
    if (cachedCharacter) {
      return cachedCharacter;
    }

    const character = await DragonBallApi.getCharacterDetails(id);
    saveToCache(cacheKey, character);
    return character;
  }
}

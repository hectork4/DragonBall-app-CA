import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CharacterRepositoryImpl } from '../../../infrastructure/repositories/CharacterRepositoryImpl';
import { Character } from '../../../domain/entities/Character';
import { loadFromCache, saveToCache } from '../../../utils/cacheHelpers';
import { DragonBallApi } from '../../../infrastructure/api/DragonBallApi';

vi.mock('../../../utils/cacheHelpers');
vi.mock('../../../infrastructure/api/DragonBallApi');

describe('CharacterRepositoryImpl', () => {
  let repository: CharacterRepositoryImpl;

  beforeEach(() => {
    repository = new CharacterRepositoryImpl();
    vi.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('should return cached characters if available', async () => {
      const cachedCharacters: Character[] = [
        {
          id: '1',
          name: 'Goku',
          image: '',
          description: '',
          transformations: [],
        },
      ];
      (loadFromCache as jest.Mock).mockReturnValue(cachedCharacters);

      const result = await repository.getCharacters(50);

      expect(result).toEqual(cachedCharacters);
      expect(loadFromCache).toHaveBeenCalledWith('characters_50');
      expect(DragonBallApi.getCharacters).not.toHaveBeenCalled();
    });

    it('should fetch and cache characters if not cached', async () => {
      const fetchedCharacters: Character[] = [
        {
          id: '1',
          name: 'Goku',
          image: '',
          description: '',
          transformations: [],
        },
      ];
      (loadFromCache as jest.Mock).mockReturnValue(null);
      (DragonBallApi.getCharacters as jest.Mock).mockResolvedValue(
        fetchedCharacters,
      );

      const result = await repository.getCharacters(50);

      expect(result).toEqual(fetchedCharacters);
      expect(loadFromCache).toHaveBeenCalledWith('characters_50');
      expect(DragonBallApi.getCharacters).toHaveBeenCalledWith(50);
      expect(saveToCache).toHaveBeenCalledWith(
        'characters_50',
        fetchedCharacters,
      );
    });
  });

  describe('searchCharacters', () => {
    it('should return cached characters if available', async () => {
      const cachedCharacters: Character[] = [
        {
          id: '1',
          name: 'Goku',
          image: '',
          description: '',
          transformations: [],
        },
      ];
      (loadFromCache as jest.Mock).mockReturnValue(cachedCharacters);

      const result = await repository.searchCharacters('Goku');

      expect(result).toEqual(cachedCharacters);
      expect(loadFromCache).toHaveBeenCalledWith('search_Goku');
      expect(DragonBallApi.searchCharacters).not.toHaveBeenCalled();
    });

    it('should fetch and cache characters if not cached', async () => {
      const fetchedCharacters: Character[] = [
        {
          id: '1',
          name: 'Goku',
          image: '',
          description: '',
          transformations: [],
        },
      ];
      (loadFromCache as jest.Mock).mockReturnValue(null);
      (DragonBallApi.searchCharacters as jest.Mock).mockResolvedValue(
        fetchedCharacters,
      );

      const result = await repository.searchCharacters('Goku');

      expect(result).toEqual(fetchedCharacters);
      expect(loadFromCache).toHaveBeenCalledWith('search_Goku');
      expect(DragonBallApi.searchCharacters).toHaveBeenCalledWith('Goku');
      expect(saveToCache).toHaveBeenCalledWith(
        'search_Goku',
        fetchedCharacters,
      );
    });
  });

  describe('getCharacterDetails', () => {
    it('should return cached character if available', async () => {
      const cachedCharacter: Character = {
        id: '1',
        name: 'Goku',
        image: '',
        description: '',
        transformations: [],
      };
      (loadFromCache as jest.Mock).mockReturnValue(cachedCharacter);

      const result = await repository.getCharacterDetails('1');

      expect(result).toEqual(cachedCharacter);
      expect(loadFromCache).toHaveBeenCalledWith('character_1');
      expect(DragonBallApi.getCharacterDetails).not.toHaveBeenCalled();
    });

    it('should fetch and cache character if not cached', async () => {
      const fetchedCharacter: Character = {
        id: '1',
        name: 'Goku',
        image: '',
        description: '',
        transformations: [],
      };
      (loadFromCache as jest.Mock).mockReturnValue(null);
      (DragonBallApi.getCharacterDetails as jest.Mock).mockResolvedValue(
        fetchedCharacter,
      );

      const result = await repository.getCharacterDetails('1');

      expect(result).toEqual(fetchedCharacter);
      expect(loadFromCache).toHaveBeenCalledWith('character_1');
      expect(DragonBallApi.getCharacterDetails).toHaveBeenCalledWith('1');
      expect(saveToCache).toHaveBeenCalledWith('character_1', fetchedCharacter);
    });
  });
});

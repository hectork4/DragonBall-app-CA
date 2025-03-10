import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { DragonBallApi } from '../../../infrastructure/api/DragonBallApi';

vi.mock('axios');

describe('DragonBallApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCharacters', () => {
    it('should fetch characters with limit', async () => {
      const characters = [{ id: '1', name: 'Goku' }];
      (axios.get as jest.Mock).mockResolvedValue({
        data: { items: characters },
      });

      const result = await DragonBallApi.getCharacters(50);

      expect(result).toEqual(characters);
      expect(axios.get).toHaveBeenCalledWith(
        'https://dragonball-api.com/api/characters?limit=50',
      );
    });
  });

  describe('searchCharacters', () => {
    it('should search characters by name', async () => {
      const characters = [{ id: '1', name: 'Goku' }];
      (axios.get as jest.Mock).mockResolvedValue({ data: characters });

      const result = await DragonBallApi.searchCharacters('Goku');

      expect(result).toEqual(characters);
      expect(axios.get).toHaveBeenCalledWith(
        'https://dragonball-api.com/api/characters?name=Goku',
      );
    });
  });

  describe('getCharacterDetails', () => {
    it('should fetch character details by id', async () => {
      const character = { id: '1', name: 'Goku' };
      (axios.get as jest.Mock).mockResolvedValue({ data: character });

      const result = await DragonBallApi.getCharacterDetails('1');

      expect(result).toEqual(character);
      expect(axios.get).toHaveBeenCalledWith(
        'https://dragonball-api.com/api/characters/1',
      );
    });
  });
});

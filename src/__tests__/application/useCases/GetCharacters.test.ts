import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetCharacters } from '../../../application/useCases/GetCharacters';
import { CharacterRepository } from '../../../domain/repositories/CharacterRepository';
import { Character } from '../../../domain/entities/Character';

class MockCharacterRepository implements CharacterRepository {
  getCharacters = vi.fn();
  searchCharacters = vi.fn();
  getCharacterDetails = vi.fn();
}

describe('GetCharacters', () => {
  let getCharacters: GetCharacters;
  let mockCharacterRepository: MockCharacterRepository;

  beforeEach(() => {
    mockCharacterRepository = new MockCharacterRepository();
    getCharacters = new GetCharacters(mockCharacterRepository);
  });

  it('should return characters when executed with a valid limit', async () => {
    const characters: Character[] = [
      {
        id: '1',
        name: 'Goku',
        image: 'https://example.com/goku.jpg',
        description: 'A powerful Saiyan warrior',
        transformations: [],
      },
      {
        id: '2',
        name: 'Vegeta',
        image: 'https://example.com/vegeta.jpg',
        description: 'The prince of all Saiyans',
        transformations: [],
      },
    ];

    mockCharacterRepository.getCharacters.mockResolvedValue(characters);

    const result = await getCharacters.execute(50);

    expect(result).toEqual(characters);
    expect(mockCharacterRepository.getCharacters).toHaveBeenCalledWith(50);
  });

  it('should throw an error when the repository fails', async () => {
    mockCharacterRepository.getCharacters.mockRejectedValue(
      new Error('Failed to fetch characters'),
    );

    await expect(getCharacters.execute(50)).rejects.toThrow(
      'Failed to fetch characters',
    );
    expect(mockCharacterRepository.getCharacters).toHaveBeenCalledWith(50);
  });
});

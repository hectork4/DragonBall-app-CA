import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetCharactersByName } from '../../../application/useCases/GetCharactersByName';
import { CharacterRepository } from '../../../domain/repositories/CharacterRepository';
import { Character } from '../../../domain/entities/Character';

class MockCharacterRepository implements CharacterRepository {
  getCharacters = vi.fn();
  searchCharacters = vi.fn();
  getCharacterDetails = vi.fn();
}

describe('GetCharactersByName', () => {
  let getCharactersByName: GetCharactersByName;
  let mockCharacterRepository: MockCharacterRepository;

  beforeEach(() => {
    mockCharacterRepository = new MockCharacterRepository();
    getCharactersByName = new GetCharactersByName(mockCharacterRepository);
  });

  it('should return characters when executed with a valid name', async () => {
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
        name: 'Gohan',
        image: 'https://example.com/gohan.jpg',
        description: 'Son of Goku',
        transformations: [],
      },
    ];

    mockCharacterRepository.searchCharacters.mockResolvedValue(characters);

    const result = await getCharactersByName.execute('Goku');

    expect(result).toEqual(characters);
    expect(mockCharacterRepository.searchCharacters).toHaveBeenCalledWith(
      'Goku',
    );
  });

  it('should throw an error when the repository fails', async () => {
    mockCharacterRepository.searchCharacters.mockRejectedValue(
      new Error('Failed to search characters'),
    );

    await expect(getCharactersByName.execute('Goku')).rejects.toThrow(
      'Failed to search characters',
    );
    expect(mockCharacterRepository.searchCharacters).toHaveBeenCalledWith(
      'Goku',
    );
  });
});

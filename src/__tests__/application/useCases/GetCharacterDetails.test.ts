import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetCharacterDetails } from '../../../application/useCases/GetCharacterDetails';
import { CharacterRepository } from '../../../domain/repositories/CharacterRepository';
import { Character } from '../../../domain/entities/Character';

class MockCharacterRepository implements CharacterRepository {
  getCharacters = vi.fn();
  searchCharacters = vi.fn();
  getCharacterDetails = vi.fn();
}

describe('GetCharacterDetails', () => {
  let getCharacterDetails: GetCharacterDetails;
  let mockCharacterRepository: MockCharacterRepository;

  beforeEach(() => {
    mockCharacterRepository = new MockCharacterRepository();
    getCharacterDetails = new GetCharacterDetails(mockCharacterRepository);
  });

  it('should return character details when executed with a valid id', async () => {
    const character: Character = {
      id: '1',
      name: 'Goku',
      image: 'https://example.com/goku.jpg',
      description: 'A powerful Saiyan warrior',
      transformations: [],
    };

    mockCharacterRepository.getCharacterDetails.mockResolvedValue(character);

    const result = await getCharacterDetails.execute('1');

    expect(result).toEqual(character);
    expect(mockCharacterRepository.getCharacterDetails).toHaveBeenCalledWith(
      '1',
    );
  });

  it('should throw an error when executed with an invalid id', async () => {
    mockCharacterRepository.getCharacterDetails.mockRejectedValue(
      new Error('Character not found'),
    );

    await expect(getCharacterDetails.execute('invalid-id')).rejects.toThrow(
      'Character not found',
    );
    expect(mockCharacterRepository.getCharacterDetails).toHaveBeenCalledWith(
      'invalid-id',
    );
  });
});

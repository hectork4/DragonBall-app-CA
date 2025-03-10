import { describe, it, expect, vi } from 'vitest';
import { CharacterRepository } from '../../../domain/repositories/CharacterRepository';

class MockCharacterRepository implements CharacterRepository {
  getCharacters = vi
    .fn()
    .mockResolvedValue([
      {
        id: '1',
        name: 'Goku',
        description: 'A powerful Saiyan warrior',
        image: '',
        transformations: [],
      },
    ]);
  searchCharacters = vi
    .fn()
    .mockResolvedValue([
      {
        id: '1',
        name: 'Goku',
        description: 'A powerful Saiyan warrior',
        image: '',
        transformations: [],
      },
    ]);
  getCharacterDetails = vi
    .fn()
    .mockResolvedValue({
      id: '1',
      name: 'Goku',
      description: 'A powerful Saiyan warrior',
      image: '',
      transformations: [],
    });
}

describe('CharacterRepository', () => {
  let repository: CharacterRepository;

  beforeEach(() => {
    repository = new MockCharacterRepository();
  });

  it('should fetch characters with limit', async () => {
    const characters = await repository.getCharacters(50);

    expect(characters).toEqual([
      {
        id: '1',
        name: 'Goku',
        description: 'A powerful Saiyan warrior',
        image: '',
        transformations: [],
      },
    ]);
    expect(repository.getCharacters).toHaveBeenCalledWith(50);
  });

  it('should search characters by name', async () => {
    const characters = await repository.searchCharacters('Goku');

    expect(characters).toEqual([
      {
        id: '1',
        name: 'Goku',
        description: 'A powerful Saiyan warrior',
        image: '',
        transformations: [],
      },
    ]);
    expect(repository.searchCharacters).toHaveBeenCalledWith('Goku');
  });

  it('should fetch character details by id', async () => {
    const character = await repository.getCharacterDetails('1');

    expect(character).toEqual({
      id: '1',
      name: 'Goku',
      description: 'A powerful Saiyan warrior',
      image: '',
      transformations: [],
    });
    expect(repository.getCharacterDetails).toHaveBeenCalledWith('1');
  });
});

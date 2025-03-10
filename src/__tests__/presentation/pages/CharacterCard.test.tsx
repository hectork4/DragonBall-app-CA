import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';

import '@testing-library/jest-dom';
import { useCharacters } from '../../../hooks/useCharacter';
import { FavoriteContext } from '../../../infrastructure/store/FavoriteStore';
import CharactersPage from '../../../presentation/pages/CharactersPage';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

vi.mock('../../../hooks/useCharacter');

const mockSession = {
  favorites: [],
  addFavorite: vi.fn(),
  removeFavorite: vi.fn(),
};

describe('Home Component', () => {
  let charactersData: { id: string; name: string }[];

  beforeEach(() => {
    charactersData = [
      { id: '1', name: 'Character 1' },
      { id: '2', name: 'Character 2' },
      { id: '3', name: 'Character 3' },
    ];

    (useCharacters as jest.Mock).mockImplementation(() => ({
      characters: charactersData,
      loading: false,
      filterWord: '',
      handleFilter: vi.fn(),
      fetchCharactersByName: vi.fn(),
    }));
  });

  it('renders the correct number of results', () => {
    render(
      <MemoryRouter>
        {' '}
        <FavoriteContext.Provider value={mockSession}>
          <CharactersPage />
        </FavoriteContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getAllByText(/Character/i)).toHaveLength(3);
    expect(screen.getByText(/3 RESULTS/)).toBeInTheDocument();
  });

  it('filters characters when showFavorites is true', () => {
    (useCharacters as jest.Mock).mockImplementation(() => ({
      characters: charactersData,
      loading: false,
      filterWord: '',
      handleFilter: vi.fn(),
      fetchCharactersByName: vi.fn(),
      favorites: ['1'],
    }));

    render(
      <MemoryRouter initialEntries={['/favorites']}>
        <Routes>
          <Route
            path="/favorites"
            element={
              <FavoriteContext.Provider value={mockSession}>
                <CharactersPage />
              </FavoriteContext.Provider>
            }
          />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('1 RESULTS')).toBeInTheDocument();
    expect(screen.getAllByText(/Character/i)).toHaveLength(1);
  });

  it('renders the spinner when loading is true and no characters are available', () => {
    (useCharacters as jest.Mock).mockImplementationOnce(() => ({
      characters: [],
      loading: true,
      filterWord: '',
      handleFilter: vi.fn(),
      fetchCharactersByName: vi.fn(),
    }));

    render(
      <MemoryRouter>
        {' '}
        <FavoriteContext.Provider value={mockSession}>
          <CharactersPage />
        </FavoriteContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});

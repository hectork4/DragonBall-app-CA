import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCharacters } from '../../hooks/useCharacter';
import { GetCharacters } from '../../application/useCases/GetCharacters';
import { GetCharactersByName } from '../../application/useCases/GetCharactersByName';
import { useFavoriteContext } from '../../infrastructure/store/FavoriteStore';

vi.mock('../../infrastructure/repositories/CharacterRepositoryImpl');
vi.mock('../../application/useCases/GetCharacters');
vi.mock('../../application/useCases/GetCharactersByName');
vi.mock('../../infrastructure/store/FavoriteStore');

const TestComponent = () => {
  const { characters, handleFilter, loading, handleToggleFavorite, favorites } =
    useCharacters();

  return (
    <div>
      {loading && <div data-testid="loading">Loading...</div>}
      <ul>
        {characters.map((char) => (
          <li key={char.id}>{char.name}</li>
        ))}
      </ul>
      <button onClick={() => handleFilter('Goku', true)}>
        Filter with Enter
      </button>
      <button onClick={() => handleFilter('Goku', false)}>
        Filter without Enter
      </button>
      <button onClick={() => handleFilter('', true)}>
        Filter with Empty String
      </button>
      <button onClick={() => handleToggleFavorite('1')}>Toggle Favorite</button>
      <div data-testid="favorites">{favorites.length}</div>
    </div>
  );
};

describe('useCharacters', () => {
  const mockAddFavorite = vi.fn();
  const mockRemoveFavorite = vi.fn();
  const mockFavorites = ['1'];

  beforeEach(() => {
    mockAddFavorite.mockClear();
    mockRemoveFavorite.mockClear();

    (useFavoriteContext as jest.Mock).mockReturnValue({
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      favorites: mockFavorites,
    });

    (GetCharacters as jest.Mock).mockImplementation(() => ({
      execute: vi.fn().mockResolvedValue([{ id: '1', name: 'Goku' }]),
    }));

    (GetCharactersByName as jest.Mock).mockImplementation(() => ({
      execute: vi.fn().mockResolvedValue([{ id: '1', name: 'Goku' }]),
    }));
  });

  it('should fetch characters on mount', async () => {
    render(<TestComponent />);

    await waitFor(() => {
      expect(screen.getByText('Goku')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should handle filter and fetch characters by name', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Filter with Enter'));

    await waitFor(() => {
      expect(screen.getByText('Goku')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should execute removeFavorite when handleToggleFavorite is called and the character is in favorites', () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Toggle Favorite'));

    expect(mockRemoveFavorite).toHaveBeenCalledWith('1');
  });

  it('should handle filter and fetch characters by name with Enter', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Filter with Enter'));

    await waitFor(() => {
      expect(screen.getByText('Goku')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should handle filter and fetch characters by name without Enter', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Filter without Enter'));

    // Wait for the timeout to complete
    await waitFor(
      () => {
        expect(screen.getByText('Goku')).toBeInTheDocument();
      },
      { timeout: 2500 },
    );

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should fetch characters when filter word is empty', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Filter with Empty String'));

    await waitFor(() => {
      expect(screen.getByText('Goku')).toBeInTheDocument();
    });

    expect(GetCharacters).toHaveBeenCalled();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should clear the previous timeout when handleFilter is called again before the timeout expires', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Filter without Enter'));

    // Call handleFilter again before the timeout expires
    fireEvent.click(screen.getByText('Filter without Enter'));

    // Wait for the timeout to complete
    await waitFor(
      () => {
        expect(screen.getByText('Goku')).toBeInTheDocument();
      },
      { timeout: 2500 },
    );

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should execute addFavorite when handleToggleFavorite is called and the character is not in favorites', () => {
    (useFavoriteContext as jest.Mock).mockReturnValue({
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      favorites: [],
    });
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Toggle Favorite'));

    expect(mockAddFavorite).toHaveBeenCalledWith('1');
  });
});

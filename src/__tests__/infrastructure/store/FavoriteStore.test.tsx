import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  FavoriteProvider,
  useFavoriteContext,
} from '../../../infrastructure/store/FavoriteStore';

const TestComponent = () => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteContext();

  return (
    <div>
      <ul>
        {favorites.map((fav) => (
          <li key={fav}>{fav}</li>
        ))}
      </ul>
      <button onClick={() => addFavorite('1')}>Add Favorite</button>
      <button onClick={() => removeFavorite('1')}>Remove Favorite</button>
    </div>
  );
};

describe('FavoriteStore', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify(['1', '2']));
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('adds a favorite', () => {
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    fireEvent.click(screen.getByText('Add Favorite'));

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(localStorage.getItem('favorites')).toEqual(JSON.stringify(['1']));
  });

  it('removes a favorite', () => {
    localStorage.setItem('favorites', JSON.stringify(['1', '2']));
    render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>,
    );

    fireEvent.click(screen.getByText('Remove Favorite'));

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(localStorage.getItem('favorites')).toEqual(JSON.stringify(['2']));
  });

  it('throws an error when useFavoriteContext is used outside of FavoriteProvider', () => {
    const consoleError = console.error;
    console.error = vi.fn(); // Suppress error output in test

    expect(() => render(<TestComponent />)).toThrow(
      'useFavoriteContext must be used within a FavoriteProvider',
    );

    console.error = consoleError; // Restore original console.error
  });
});

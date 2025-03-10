import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import { useFavoriteContext } from '../../../infrastructure/store/FavoriteStore';
import Fav from '../../../presentation/components/Fav';

vi.mock('../../../infrastructure/store/FavoriteStore');

describe('Fav Component', () => {
  const mockAddFavorite = vi.fn();
  const mockRemoveFavorite = vi.fn();
  const mockFavorites = ['1'];

  beforeEach(() => {
    (useFavoriteContext as jest.Mock).mockReturnValue({
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      favorites: mockFavorites,
    });
  });

  it('renders favorite button with correct label and emoji when character is a favorite', () => {
    render(<Fav id="1" isHovered={false} />);

    const button = screen.getByRole('button', {
      name: /Remove Character from favorites button/i,
    });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('♥')).toBeInTheDocument();
  });

  it('renders favorite button with correct label and emoji when character is not a favorite', () => {
    (useFavoriteContext as jest.Mock).mockReturnValueOnce({
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      favorites: [],
    });

    render(<Fav id="2" isHovered={false} />);

    const button = screen.getByRole('button', {
      name: /Add Character to favorites button/i,
    });
    expect(button).toBeInTheDocument();
    expect(screen.getByText('♡')).toBeInTheDocument();
  });

  it('toggles favorite status on button click', () => {
    render(<Fav id="1" isHovered={false} />);

    const button = screen.getByRole('button', {
      name: /Remove Character from favorites button/i,
    });
    fireEvent.click(button);

    expect(mockRemoveFavorite).toHaveBeenCalledWith('1');
    expect(mockAddFavorite).not.toHaveBeenCalled();

    (useFavoriteContext as jest.Mock).mockReturnValueOnce({
      addFavorite: mockAddFavorite,
      removeFavorite: mockRemoveFavorite,
      favorites: [],
    });

    render(<Fav id="2" isHovered={false} />);

    const addButton = screen.getByRole('button', {
      name: /Add Character to favorites button/i,
    });
    fireEvent.click(addButton);

    expect(mockAddFavorite).toHaveBeenCalledWith('2');
  });

  it('changes color on hover', () => {
    render(<Fav id="1" isHovered={true} />);

    const span = screen.getByText('♥');
    expect(span).toHaveStyle({ color: 'rgb(255, 255, 255)' });

    render(<Fav id="1" isHovered={false} />);

    const spanNotHovered = screen.getAllByText('♥')[1];
    expect(spanNotHovered).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });
});

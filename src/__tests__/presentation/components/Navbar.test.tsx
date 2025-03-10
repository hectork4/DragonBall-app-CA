import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import { useCharacters } from '../../../hooks/useCharacter';
import Navbar from '../../../presentation/components/Navbar';

vi.mock('../../../hooks/useCharacter');

describe('Navbar Component', () => {
  const mockFavorites = ['1', '2'];

  beforeEach(() => {
    (useCharacters as jest.Mock).mockReturnValue({
      favorites: mockFavorites,
    });
  });

  it('renders the logo and favorites count', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const logo = screen.getByAltText('Dragon Ball Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', expect.stringContaining('logo.png'));

    const favoritesCount = screen.getByLabelText(
      `Favorites: ${mockFavorites.length} items`,
    );
    expect(favoritesCount).toBeInTheDocument();
    expect(favoritesCount).toHaveTextContent(`❤️ ${mockFavorites.length}`);
  });

  it('navigates to home page on logo click', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', { name: /Dragon Ball Logo/i });
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('navigates to favorites page on favorites link click', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const favoritesLink = screen.getByRole('link', {
      name: /Favorites: 2 items/i,
    });
    expect(favoritesLink).toHaveAttribute('href', '/favorites');
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

import '@testing-library/jest-dom';
import { Character } from '../../../domain/entities/Character';
import CharacterCard from '../../../presentation/components/CharacterCard';
import { FavoriteProvider } from '../../../infrastructure/store/FavoriteStore';

vi.mock('../../presentation/components/Fav', () => ({
  __esModule: true,
  default: ({ isHovered }: { id: string; isHovered: boolean }) => (
    <div data-testid="fav" data-hovered={isHovered}>
      {isHovered ? '★' : '☆'}
    </div>
  ),
}));

describe('CharacterCard Component', () => {
  const character: Character = {
    id: '1',
    name: 'Goku',
    image: 'https://example.com/goku.jpg',
    description: 'A powerful Saiyan warrior',
    transformations: [],
  };

  it('renders character card', () => {
    render(
      <MemoryRouter>
        <FavoriteProvider>
          <CharacterCard
            character={character}
            onToggleFavorite={vi.fn()}
            favorite={false}
          />
        </FavoriteProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Goku')).toBeInTheDocument();
    expect(screen.getByAltText('Goku')).toBeInTheDocument();
  });

  it('shows favorite icon correctly', () => {
    render(
      <MemoryRouter>
        <FavoriteProvider>
          <CharacterCard
            character={character}
            onToggleFavorite={vi.fn()}
            favorite={false}
          />
        </FavoriteProvider>
      </MemoryRouter>,
    );

    const characterWrapper = screen.getByText('Goku').closest('div');
    expect(characterWrapper).toBeInTheDocument();

    fireEvent.mouseOver(characterWrapper!);
    expect(screen.getByText('♡')).toBeInTheDocument();
  });

  it('navigates to character details page on click', () => {
    render(
      <MemoryRouter>
        <FavoriteProvider>
          <CharacterCard
            character={character}
            onToggleFavorite={vi.fn()}
            favorite={false}
          />
        </FavoriteProvider>
      </MemoryRouter>,
    );

    const linkElement = screen.getByRole('link', { name: /Goku/i });
    expect(linkElement).toHaveAttribute('href', '/character/1');
  });
});

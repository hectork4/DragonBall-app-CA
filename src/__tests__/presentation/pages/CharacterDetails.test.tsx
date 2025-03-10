import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect, beforeEach } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import '@testing-library/jest-dom';
import { useCharacterDetails } from '../../../hooks/useCharacterDetail';
import CharacterDetailsPage from '../../../presentation/pages/CharacterDetailsPage';
import { FavoriteProvider } from '../../../infrastructure/store/FavoriteStore';

vi.mock('../../../hooks/useCharacterDetail');

describe('CharacterDetailsPage Component', () => {
  let characterData: {
    id: string;
    name: string;
    image: string;
    description: string;
    transformations: { id: string; name: string; image: string; ki: number }[];
  };

  beforeEach(() => {
    characterData = {
      id: '1',
      name: 'Goku',
      image: 'https://example.com/goku.jpg',
      description: 'A powerful Saiyan warrior',
      transformations: [
        {
          id: '1',
          name: 'Super Saiyan',
          image: 'https://example.com/ssj.jpg',
          ki: 1000,
        },
      ],
    };

    (useCharacterDetails as jest.Mock).mockImplementation(() => ({
      character: characterData,
      loading: false,
    }));
  });

  it('renders character details', () => {
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <FavoriteProvider>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </FavoriteProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Goku')).toBeInTheDocument();
    expect(screen.getByText('A powerful Saiyan warrior')).toBeInTheDocument();
    expect(screen.getByText('Transformations')).toBeInTheDocument();
    expect(screen.getByText('Super Saiyan')).toBeInTheDocument();
    expect(screen.getByText('KI: 1000')).toBeInTheDocument();
  });

  it('renders the spinner when loading is true', () => {
    (useCharacterDetails as jest.Mock).mockImplementationOnce(() => ({
      character: null,
      loading: true,
    }));

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders "Character not found" when character is null', () => {
    (useCharacterDetails as jest.Mock).mockImplementationOnce(() => ({
      character: null,
      loading: false,
    }));

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetailsPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText('Character not found')).toBeInTheDocument();
  });

  it('renders character details without transformations', () => {
    const characterWithoutTransformations = {
      ...characterData,
      transformations: [],
    };

    (useCharacterDetails as jest.Mock).mockImplementationOnce(() => ({
      character: characterWithoutTransformations,
      loading: false,
    }));

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <FavoriteProvider>
          <Routes>
            <Route path="/character/:id" element={<CharacterDetailsPage />} />
          </Routes>
        </FavoriteProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Goku')).toBeInTheDocument();
    expect(screen.getByText('A powerful Saiyan warrior')).toBeInTheDocument();
    expect(screen.queryByText('Transformations')).not.toBeInTheDocument();
  });
});

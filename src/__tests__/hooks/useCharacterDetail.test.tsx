import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCharacterDetails } from '../../hooks/useCharacterDetail';
import { GetCharacterDetails } from '../../application/useCases/GetCharacterDetails';

vi.mock('../../infrastructure/repositories/CharacterRepositoryImpl');
vi.mock('../../application/useCases/GetCharacterDetails');

const TestComponent = ({ id }: { id: string | undefined }) => {
  const { character, loading } = useCharacterDetails(id);
  console.log(character, false);
  if (loading) {
    return <div data-testid="loading">Loading...</div>;
  }

  if (!character) {
    return <div data-testid="no-character">No character found</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <p>{character.description}</p>
    </div>
  );
};

describe('useCharacterDetails', () => {
  const mockCharacter = {
    id: '1',
    name: 'Goku',
    description: 'A powerful Saiyan warrior',
  };

  beforeEach(() => {
    (GetCharacterDetails as jest.Mock).mockImplementation(() => ({
      execute: vi.fn().mockResolvedValue(mockCharacter),
    }));
  });

  it('should fetch character details on mount', async () => {
    render(<TestComponent id="1" />);

    await waitFor(() => {
      expect(screen.getByText('Goku')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });

  it('should show no character found if id is defined', async () => {
    render(<TestComponent id="2" />);

    await waitFor(() => {
      expect(screen.getByTestId('no-character')).toBeInTheDocument();
    });
  });

  it('should show no character found if character is null', async () => {
    (GetCharacterDetails as jest.Mock).mockImplementation(() => ({
      execute: vi.fn().mockResolvedValue(null),
    }));

    render(<TestComponent id="1" />);

    await waitFor(() => {
      expect(screen.getByTestId('no-character')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AppRoutes from '../routes';
import CharactersPage from '../presentation/pages/CharactersPage';
import CharacterDetailsPage from '../presentation/pages/CharacterDetailsPage';
import Navbar from '../presentation/components/Navbar';

vi.mock('../presentation/pages/CharactersPage');
vi.mock('../presentation/pages/CharacterDetailsPage');
vi.mock('../presentation/components/Navbar');

describe('AppRoutes', () => {
  beforeEach(() => {
    (CharactersPage as jest.Mock).mockImplementation(() => (
      <div>Characters Page</div>
    ));
    (CharacterDetailsPage as jest.Mock).mockImplementation(() => (
      <div>Character Details Page</div>
    ));
    (Navbar as jest.Mock).mockImplementation(() => <div>Navbar</div>);
  });

  it('should render CharactersPage at root path', () => {
    render(<AppRoutes />);

    expect(screen.getByText('Characters Page')).toBeInTheDocument();
  });

  it('should render CharacterDetailsPage at /character/:id path', () => {
    window.history.pushState({}, 'Test page', '/character/1');
    render(<AppRoutes />);

    expect(screen.getByText('Character Details Page')).toBeInTheDocument();
  });

  it('should render Navbar on all routes', () => {
    render(<AppRoutes />);

    expect(screen.getByText('Navbar')).toBeInTheDocument();
  });
});

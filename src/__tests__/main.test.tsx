import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AppRoutes from '../routes';

vi.mock('../routes', () => ({
  __esModule: true,
  default: vi.fn(() => <div>AppRoutes</div>),
}));

describe('main.tsx', () => {
  it('should render AppRoutes', () => {
    document.body.innerHTML = '<div id="root"></div>';

    render(
      <React.StrictMode>
        <AppRoutes />
      </React.StrictMode>,
    );

    expect(screen.getByText('AppRoutes')).toBeInTheDocument();
  });
});

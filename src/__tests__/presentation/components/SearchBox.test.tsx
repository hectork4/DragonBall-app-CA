import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import '@testing-library/jest-dom';
import SearchBox from '../../../presentation/components/SearchBox';

describe('SearchBox Component', () => {
  const mockOnSearchChange = vi.fn();

  it('renders search input with placeholder', () => {
    render(<SearchBox onSearchChange={mockOnSearchChange} filterWord="" />);

    const input = screen.getByPlaceholderText('SEARCH A CHARACTER');
    expect(input).toBeInTheDocument();
  });

  it('calls onSearchChange on input change', () => {
    render(<SearchBox onSearchChange={mockOnSearchChange} filterWord="" />);

    const input = screen.getByPlaceholderText('SEARCH A CHARACTER');
    fireEvent.change(input, { target: { value: 'Goku' } });

    expect(mockOnSearchChange).toHaveBeenCalledWith('Goku');
  });

  it('calls onSearchChange with isEnterPressed true on Enter key press', () => {
    render(<SearchBox onSearchChange={mockOnSearchChange} filterWord="Goku" />);

    const input = screen.getByPlaceholderText('SEARCH A CHARACTER');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockOnSearchChange).toHaveBeenCalledWith('Goku', true);
  });
});

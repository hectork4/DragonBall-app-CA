import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Spinner from '../../../presentation/components/Spinner';

describe('Spinner Component', () => {
  it('should render the spinner', () => {
    render(<Spinner />);

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBeInTheDocument();

    const divs = spinner.querySelectorAll('div');
    expect(divs).toHaveLength(4);
  });
});

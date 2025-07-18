import React from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Badge } from './Badge';

// jest-axe is now automatically setup in jest.setup.js

describe('Badge', () => {
  it('renders correctly', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies different color schemes', () => {
    const { rerender } = render(<Badge colorScheme="success">Success</Badge>);
    expect(screen.getByText('Success')).toBeInTheDocument();
    
    rerender(<Badge colorScheme="error">Error</Badge>);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(<Badge>Accessible Badge</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should not have accessibility violations with semantic colors', async () => {
    const { container } = render(<Badge colorScheme="warning">Warning Badge</Badge>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('provides appropriate aria labels for semantic badges', () => {
    render(<Badge colorScheme="error">Error State</Badge>);
    expect(screen.getByText('Error State')).toHaveAttribute('aria-label', 'error: Error State');
  });
});

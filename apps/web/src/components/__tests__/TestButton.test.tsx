// Example React component test for web application

import { ChakraProvider } from '@chakra-ui/react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

// Mock component for testing
const TestButton: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}> = ({ onClick, children, variant = 'primary', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant}`}
      data-testid="test-button"
    >
      {children}
    </button>
  );
};

// Test wrapper with providers
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

// Extend Jest matchers
expect.extend(toHaveNoViolations as any);

describe('TestButton Component', () => {
  it('renders correctly with default props', () => {
    render(
      <TestWrapper>
        <TestButton>Click me</TestButton>
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('btn-primary');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn();
    
    render(
      <TestWrapper>
        <TestButton onClick={handleClick}>Click me</TestButton>
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    fireEvent.click(button);

    await waitFor(() => {
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    
    render(
      <TestWrapper>
        <TestButton onClick={handleClick} disabled>
          Click me
        </TestButton>
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('applies correct variant class', () => {
    render(
      <TestWrapper>
        <TestButton variant="secondary">Secondary button</TestButton>
      </TestWrapper>
    );

    const button = screen.getByTestId('test-button');
    expect(button).toHaveClass('btn-secondary');
    expect(button).not.toHaveClass('btn-primary');
  });

  it('should not have accessibility violations', async () => {
    const { container } = render(
      <TestWrapper>
        <TestButton>Accessible button</TestButton>
      </TestWrapper>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe('keyboard navigation', () => {
    it('responds to Enter key', () => {
      const handleClick = jest.fn();
      
      render(
        <TestWrapper>
          <TestButton onClick={handleClick}>Press Enter</TestButton>
        </TestWrapper>
      );

      const button = screen.getByTestId('test-button');
      button.focus();
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('responds to Space key', () => {
      const handleClick = jest.fn();
      
      render(
        <TestWrapper>
          <TestButton onClick={handleClick}>Press Space</TestButton>
        </TestWrapper>
      );

      const button = screen.getByTestId('test-button');
      button.focus();
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});

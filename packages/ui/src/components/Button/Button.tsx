import React from 'react';
import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  forwardRef,
  Spinner,
  useStyleConfig,
} from '@chakra-ui/react';

export interface ButtonProps extends Omit<ChakraButtonProps, 'size' | 'variant'> {
  /**
   * Button variant based on Design System
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * If true, button will be disabled
   */
  isDisabled?: boolean;
  /**
   * If true, button will show loading state
   */
  isLoading?: boolean;
  /**
   * Loading text to show when isLoading is true
   */
  loadingText?: string;
  /**
   * Icon to display on the left side of the button
   */
  leftIcon?: React.ReactElement;
  /**
   * Icon to display on the right side of the button
   */
  rightIcon?: React.ReactElement;
  /**
   * If true, button will take full width of container
   */
  isFullWidth?: boolean;
  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string;
  /**
   * ARIA describedby for accessibility
   */
  'aria-describedby'?: string;
}

/**
 * Button component that follows Merajut ASA Design System.
 * Provides consistent styling, accessibility, and interaction patterns.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Submit Campaign
 * </Button>
 * ```
 */
export const Button = forwardRef<ButtonProps, 'button'>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    isDisabled = false,
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    isFullWidth = false,
    children,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
    ...rest
  } = props;

  // Map our design system variants to Chakra variants
  const getChakraVariant = (designVariant: string) => {
    switch (designVariant) {
      case 'primary':
        return 'primary';
      case 'secondary':
        return 'secondary';
      case 'outline':
        return 'outline';
      case 'ghost':
        return 'ghost';
      case 'danger':
        return 'danger';
      default:
        return 'primary';
    }
  };

  // Get custom styles for danger variant
  const dangerStyles = variant === 'danger' ? {
    bg: 'semantic.error',
    color: 'neutral.white',
    _hover: {
      bg: '#C53030',
      _disabled: {
        bg: 'semantic.error',
      },
    },
    _active: {
      bg: '#9B2C2C',
    },
    _disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  } : {};

  return (
    <ChakraButton
      ref={ref}
      variant={getChakraVariant(variant)}
      size={size}
      isDisabled={isDisabled}
      isLoading={isLoading}
      loadingText={loadingText}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      width={isFullWidth ? 'full' : 'auto'}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      // Apply custom styles for danger variant
      sx={variant === 'danger' ? dangerStyles : {}}
      // Loading spinner
      spinner={<Spinner size="sm" />}
      // Ensure proper focus management
      _focus={{
        boxShadow: '0 0 0 2px #1A6BCC',
        outline: 'none',
      }}
      _focusVisible={{
        boxShadow: '0 0 0 2px #1A6BCC',
        outline: 'none',
      }}
      {...rest}
    >
      {children}
    </ChakraButton>
  );
});

Button.displayName = 'Button';

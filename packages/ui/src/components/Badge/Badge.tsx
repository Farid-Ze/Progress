import React from 'react';
import {
  Badge as ChakraBadge,
  BadgeProps as ChakraBadgeProps,
  useStyleConfig,
  forwardRef,
} from '@chakra-ui/react';

export interface BadgeProps extends Omit<ChakraBadgeProps, 'size'> {
  /**
   * The visual style of the badge
   */
  variant?: 'solid' | 'subtle' | 'outline';
  /**
   * The color scheme of the badge
   */
  colorScheme?: 'blue' | 'teal' | 'coral' | 'gold' | 'success' | 'warning' | 'error' | 'info';
  /**
   * How large should the badge be
   */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Badge component for indicating status, counts, or labels.
 * Implements WCAG AA contrast requirements.
 */
export const Badge = forwardRef<BadgeProps, 'span'>((props, ref) => {
  const {
    variant = 'subtle',
    colorScheme = 'blue',
    size = 'md',
    children,
    ...rest
  } = props;

  // Get styles from the theme
  const styles = useStyleConfig('Badge', { variant, colorScheme, size });

  // Map color schemes to semantic meanings for screen readers if appropriate
  let ariaLabel;
  if (typeof children === 'string' && (
    colorScheme === 'success' || 
    colorScheme === 'warning' || 
    colorScheme === 'error' || 
    colorScheme === 'info'
  )) {
    ariaLabel = `${colorScheme}: ${children}`;
  }

  return (
    <ChakraBadge
      ref={ref}
      variant={variant}
      colorScheme={colorScheme}
      aria-label={ariaLabel}
      sx={styles}
      {...rest}
    >
      {children}
    </ChakraBadge>
  );
});

Badge.displayName = 'Badge';

export default Badge;

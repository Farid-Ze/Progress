import React from 'react';
import {
  Tag as ChakraTag,
  TagProps as ChakraTagProps,
  TagLabel,
  TagCloseButton,
  useStyleConfig,
  forwardRef,
} from '@chakra-ui/react';

export interface TagProps extends Omit<ChakraTagProps, 'size'> {
  /**
   * The visual style of the tag
   */
  variant?: 'solid' | 'subtle' | 'outline';
  /**
   * The color scheme of the tag
   */
  colorScheme?: 'blue' | 'teal' | 'coral' | 'gold';
  /**
   * How large should the tag be
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * If true, adds a close button to the tag
   */
  isClosable?: boolean;
  /**
   * Callback when tag is closed
   */
  onClose?: () => void;
  /**
   * Label for the close button for screen readers
   */
  closeButtonLabel?: string;
}

/**
 * Tag component for content categorization and filtering.
 * Implements WCAG AA contrast requirements.
 */
export const Tag = forwardRef<TagProps, 'span'>((props, ref) => {
  const {
    variant = 'subtle',
    colorScheme = 'blue',
    size = 'md',
    isClosable = false,
    onClose,
    closeButtonLabel = 'Remove',
    children,
    ...rest
  } = props;

  // Get styles from the theme
  const styles = useStyleConfig('Tag', { variant, colorScheme, size });

  return (
    <ChakraTag
      ref={ref}
      variant={variant}
      colorScheme={colorScheme}
      size={size}
      sx={styles}
      {...rest}
    >
      <TagLabel>{children}</TagLabel>
      {isClosable && (
        <TagCloseButton 
          onClick={onClose} 
          aria-label={`${closeButtonLabel} ${typeof children === 'string' ? children : ''}`}
        />
      )}
    </ChakraTag>
  );
});

Tag.displayName = 'Tag';

export default Tag;

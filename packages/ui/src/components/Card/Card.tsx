import {
  Box,
  BoxProps,
  Heading,
  Text,
  Image,
  Flex,
  useStyleConfig,
  forwardRef,
} from '@chakra-ui/react';
import React from 'react';

export interface CardProps extends Omit<BoxProps, 'title'> {
  /**
   * Card variant
   */
  variant?: 'elevated' | 'outline' | 'filled' | 'unstyled';
  /**
   * Card title
   */
  title?: React.ReactNode;
  /**
   * Card subtitle
   */
  subtitle?: React.ReactNode;
  /**
   * Image source URL
   */
  imageUrl?: string;
  /**
   * Image alt text
   */
  imageAlt?: string;
  /**
   * Card footer content
   */
  footer?: React.ReactNode;
  /**
   * If true, the card will be interactive (hover effects, pointer cursor)
   */
  isInteractive?: boolean;
  /**
   * If true, applies a loading skeleton state
   */
  isLoading?: boolean;
  /**
   * Heading level for the card title (for proper document outline)
   */
  headingLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Card component for displaying content in a contained, structured way.
 * Used for campaign listings, user profiles, and content grouping.
 */
export const Card = forwardRef<CardProps, 'div'>((props, ref) => {
  const {
    variant = 'elevated',
    title,
    subtitle,
    imageUrl,
    imageAlt = '',
    footer,
    isInteractive = false,
    isLoading = false,
    headingLevel = 'h3',
    children,
    ...rest
  } = props;

  // Get styles from the theme
  const styles = useStyleConfig('Card', { variant });

  // Handle loading state
  if (isLoading) {
    return (
      <Box
        ref={ref}
        role="status"
        aria-busy="true"
        aria-label="Loading card content"
        sx={{
          ...styles,
          opacity: 0.7,
        }}
        {...rest}
      >
        <Box height="200px" bg="neutral.misty" borderRadius="md" />
        <Box padding="4">
          <Box height="24px" width="70%" bg="neutral.misty" mb="2" borderRadius="sm" />
          <Box height="16px" width="40%" bg="neutral.misty" mb="4" borderRadius="sm" />
          <Box height="60px" bg="neutral.misty" borderRadius="sm" />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      sx={{
        ...styles,
        cursor: isInteractive ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        _hover: isInteractive ? {
          transform: 'translateY(-4px)',
          boxShadow: 'lg',
        } : undefined,
      }}
      tabIndex={isInteractive ? 0 : undefined}
      role={isInteractive ? 'button' : undefined}
      {...rest}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={imageAlt}
          borderTopRadius={variant !== 'unstyled' ? 'md' : undefined}
          width="100%"
          height="200px"
          objectFit="cover"
          // Prevent layout shifts during image loading
          fallback={<Box height="200px" bg="neutral.misty" />}
        />
      )}

      <Box padding="4">
        {title && (
          <Heading 
            as={headingLevel} 
            size={headingLevel === 'h2' ? 'lg' : headingLevel === 'h3' ? 'md' : 'sm'}
            mb={subtitle ? "1" : "3"}
          >
            {title}
          </Heading>
        )}
        
        {subtitle && (
          <Text fontSize="sm" color="neutral.stormCloud" mb="3">
            {subtitle}
          </Text>
        )}

        <Box>{children}</Box>
      </Box>

      {footer && (
        <Flex 
          borderTop="1px solid" 
          borderColor="neutral.misty"
          padding="3"
          alignItems="center"
          justifyContent="space-between"
        >
          {footer}
        </Flex>
      )}
    </Box>
  );
});

Card.displayName = 'Card';

export default Card;

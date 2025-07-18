import React from 'react';
import { Box, Container, ContainerProps } from '@chakra-ui/react';
import { Navigation, NavigationProps } from '../Navigation';

export interface LayoutProps {
  /**
   * Navigation props
   */
  navigationProps: NavigationProps;
  /**
   * Container props for controlling width and padding
   */
  containerProps?: ContainerProps;
  /**
   * Footer content
   */
  footer?: React.ReactNode;
  /**
   * Main content
   */
  children: React.ReactNode;
}

/**
 * Main layout component that provides consistent page structure with proper semantics.
 */
export const Layout: React.FC<LayoutProps> = ({
  navigationProps,
  containerProps,
  footer,
  children,
}) => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navigation {...navigationProps} />
      
      <Box as="main" id="main-content" flex="1" py={{ base: "4", md: "8" }}>
        <Container maxW="container.xl" {...containerProps}>
          {children}
        </Container>
      </Box>
      
      {footer && (
        <Box as="footer" role="contentinfo" bg="neutral.deepSpace" color="white">
          {footer}
        </Box>
      )}
    </Box>
  );
};

export default Layout;

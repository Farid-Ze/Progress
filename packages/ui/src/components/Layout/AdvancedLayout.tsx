import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Grid,
  GridItem,
  Flex,
  useBreakpointValue,
  SystemStyleObject,
} from '@chakra-ui/react';
import { Breadcrumb, BreadcrumbItemData } from '../Breadcrumb';

export interface PageLayoutProps {
  /**
   * Page content
   */
  children: React.ReactNode;
  /**
   * Page title for SEO and accessibility
   */
  title?: string;
  /**
   * Page description for SEO
   */
  description?: string;
  /**
   * Breadcrumb navigation items
   */
  breadcrumbs?: BreadcrumbItemData[];
  /**
   * Sidebar content
   */
  sidebar?: React.ReactNode;
  /**
   * If true, page uses full width
   */
  isFullWidth?: boolean;
  /**
   * Container max width
   */
  maxWidth?: string;
  /**
   * If true, shows breadcrumb navigation
   */
  showBreadcrumbs?: boolean;
  /**
   * Custom header content
   */
  header?: React.ReactNode;
  /**
   * Custom footer content
   */
  footer?: React.ReactNode;
  /**
   * Background color or pattern
   */
  background?: string;
  /**
   * Custom padding
   */
  padding?: SystemStyleObject['padding'];
}

/**
 * Main page layout component with consistent structure and responsive design.
 * Provides semantic HTML structure and accessibility features.
 * 
 * @example
 * ```tsx
 * <PageLayout
 *   title="Campaign Details"
 *   description="View and support this campaign"
 *   breadcrumbs={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Campaigns', href: '/campaigns' },
 *     { label: 'Education', isCurrentPage: true }
 *   ]}
 *   sidebar={<CampaignSidebar />}
 * >
 *   <CampaignContent />
 * </PageLayout>
 * ```
 */
export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  description,
  breadcrumbs,
  sidebar,
  isFullWidth = false,
  maxWidth = '1200px',
  showBreadcrumbs = true,
  header,
  footer,
  background,
  padding = { base: 4, md: 6, lg: 8 },
}) => {
  const sidebarWidth = useBreakpointValue({ base: 'full', lg: '300px' });
  const contentWidth = useBreakpointValue({ 
    base: 'full', 
    lg: sidebar ? `calc(100% - ${sidebarWidth} - 2rem)` : 'full' 
  });

  return (
    <Box
      as="main"
      id="main-content"
      minHeight="100vh"
      background={background || 'neutral.white'}
      role="main"
      aria-label={title ? `${title} page` : 'Main content'}
    >
      {/* Skip Link for Accessibility */}
      <Box
        as="a"
        href="#main-content"
        position="absolute"
        top="-40px"
        left="6px"
        zIndex="skipLink"
        bg="neutral.white"
        color="primary.asa-blue"
        padding="8px"
        borderRadius="md"
        border="2px solid"
        borderColor="primary.asa-blue"
        textDecoration="none"
        _focus={{
          top: '6px',
        }}
        className="skip-link"
      >
        Skip to main content
      </Box>

      {/* Header */}
      {header && (
        <Box as="header" width="full">
          {header}
        </Box>
      )}

      {/* Main Content Container */}
      <Container
        maxW={isFullWidth ? 'full' : maxWidth}
        px={isFullWidth ? 0 : (padding as any)}
        py={padding as any}
      >
        {/* Breadcrumb Navigation */}
        {showBreadcrumbs && breadcrumbs && breadcrumbs.length > 0 && (
          <Box mb={6}>
            <Breadcrumb
              items={breadcrumbs}
              showHomeIcon
              isResponsive
            />
          </Box>
        )}

        {/* Page Title for Screen Readers */}
        {title && (
          <Box
            as="h1"
            fontSize="heading-1"
            fontWeight="bold"
            color="neutral.deep-space"
            mb={description ? 2 : 6}
            className="sr-only"
          >
            {title}
          </Box>
        )}

        {/* Page Description */}
        {description && (
          <Box
            as="p"
            fontSize="body-large"
            color="neutral.storm-cloud"
            mb={6}
            className="sr-only"
          >
            {description}
          </Box>
        )}

        {/* Content Layout */}
        {sidebar ? (
          <Grid
            templateColumns={{ base: '1fr', lg: `${contentWidth} ${sidebarWidth}` }}
            gap={8}
            alignItems="flex-start"
          >
            {/* Main Content */}
            <GridItem>
              <Box as="section" aria-label="Main content">
                {children}
              </Box>
            </GridItem>

            {/* Sidebar */}
            <GridItem>
              <Box
                as="aside"
                position={{ base: 'relative', lg: 'sticky' }}
                top={{ base: 'auto', lg: 8 }}
                aria-label="Sidebar content"
              >
                {sidebar}
              </Box>
            </GridItem>
          </Grid>
        ) : (
          <Box as="section" aria-label="Main content">
            {children}
          </Box>
        )}
      </Container>

      {/* Footer */}
      {footer && (
        <Box as="footer" width="full" mt="auto">
          {footer}
        </Box>
      )}
    </Box>
  );
};

// Section Layout Component
export interface SectionLayoutProps {
  /**
   * Section content
   */
  children: React.ReactNode;
  /**
   * Section title
   */
  title?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Section variant
   */
  variant?: 'default' | 'featured' | 'subtle';
  /**
   * Section spacing
   */
  spacing?: 'compact' | 'normal' | 'spacious';
  /**
   * Custom background
   */
  background?: string;
  /**
   * If true, section has full width
   */
  isFullWidth?: boolean;
  /**
   * Section ID for anchor links
   */
  id?: string;
}

/**
 * Section layout component for organizing content within pages.
 * Provides consistent spacing and semantic structure.
 */
export const SectionLayout: React.FC<SectionLayoutProps> = ({
  children,
  title,
  description,
  variant = 'default',
  spacing = 'normal',
  background,
  isFullWidth = false,
  id,
}) => {
  const spacingValues = {
    compact: { py: 8, px: 4 },
    normal: { py: 12, px: 6 },
    spacious: { py: 16, px: 8 },
  };

  const variantStyles = {
    default: {
      bg: 'transparent',
    },
    featured: {
      bg: 'neutral.cloud',
      borderRadius: 'lg',
      border: '1px solid',
      borderColor: 'neutral.misty',
    },
    subtle: {
      bg: 'neutral.cloud',
      borderRadius: 'md',
    },
  };

  return (
    <Box
      as="section"
      id={id}
      width={isFullWidth ? 'full' : 'auto'}
      {...spacingValues[spacing]}
      {...variantStyles[variant]}
      background={background}
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      {title && (
        <VStack spacing={4} align="stretch" mb={8}>
          <Box
            as="h2"
            id={`${id}-title`}
            fontSize="heading-2"
            fontWeight="bold"
            color="neutral.deep-space"
          >
            {title}
          </Box>
          {description && (
            <Box
              as="p"
              fontSize="body-large"
              color="neutral.storm-cloud"
              maxW="600px"
            >
              {description}
            </Box>
          )}
        </VStack>
      )}
      {children}
    </Box>
  );
};

// Card Grid Layout Component
export interface CardGridLayoutProps {
  /**
   * Grid items
   */
  children: React.ReactNode;
  /**
   * Number of columns
   */
  columns?: { base?: number; md?: number; lg?: number; xl?: number };
  /**
   * Grid gap
   */
  gap?: number | string;
  /**
   * If true, cards have equal height
   */
  equalHeight?: boolean;
  /**
   * Loading state
   */
  isLoading?: boolean;
  /**
   * Number of loading skeletons to show
   */
  loadingCount?: number;
  /**
   * Custom loading component
   */
  loadingComponent?: React.ReactNode;
}

/**
 * Grid layout component optimized for card displays.
 * Provides responsive grid with loading states and equal height options.
 */
export const CardGridLayout: React.FC<CardGridLayoutProps> = ({
  children,
  columns = { base: 1, md: 2, lg: 3, xl: 4 },
  gap = 6,
  equalHeight = false,
  isLoading = false,
  loadingCount = 8,
  loadingComponent,
}) => {
  const templateColumns = {
    base: `repeat(${columns.base || 1}, 1fr)`,
    md: `repeat(${columns.md || 2}, 1fr)`,
    lg: `repeat(${columns.lg || 3}, 1fr)`,
    xl: `repeat(${columns.xl || 4}, 1fr)`,
  };

  if (isLoading) {
    return (
      <Grid
        templateColumns={templateColumns}
        gap={gap}
        alignItems={equalHeight ? 'stretch' : 'flex-start'}
      >
        {Array.from({ length: loadingCount }).map((_, index) => (
          <GridItem key={index}>
            {loadingComponent || (
              <Box
                height="300px"
                bg="neutral.misty"
                borderRadius="lg"
                opacity={0.6}
                animation="pulse 2s infinite"
              />
            )}
          </GridItem>
        ))}
      </Grid>
    );
  }

  return (
    <Grid
      templateColumns={templateColumns}
      gap={gap}
      alignItems={equalHeight ? 'stretch' : 'flex-start'}
    >
      {children}
    </Grid>
  );
};

// Flex Layout Component
export interface FlexLayoutProps {
  /**
   * Flex content
   */
  children: React.ReactNode;
  /**
   * Flex direction
   */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /**
   * Flex wrap
   */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /**
   * Justify content
   */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  /**
   * Align items
   */
  align?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  /**
   * Gap between items
   */
  gap?: number | string;
  /**
   * Responsive breakpoints
   */
  responsive?: {
    direction?: { base?: string; md?: string; lg?: string };
    wrap?: { base?: string; md?: string; lg?: string };
    justify?: { base?: string; md?: string; lg?: string };
    align?: { base?: string; md?: string; lg?: string };
  };
}

/**
 * Flexible layout component with responsive options.
 * Provides common flex patterns with responsive breakpoints.
 */
export const FlexLayout: React.FC<FlexLayoutProps> = ({
  children,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'flex-start',
  align = 'flex-start',
  gap = 4,
  responsive,
}) => {
  return (
    <Flex
      direction={(responsive?.direction || direction) as any}
      wrap={(responsive?.wrap || wrap) as any}
      justify={responsive?.justify || justify}
      align={responsive?.align || align}
      gap={gap}
    >
      {children}
    </Flex>
  );
};

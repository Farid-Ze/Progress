import {
  Breadcrumb as ChakraBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  // BreadcrumbSeparator, - Removed unused
  Box,
  Text,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import React from 'react';

// Icons as React components
const ChevronRightIcon = ({ color = 'currentColor' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HomeIcon = ({ color = 'currentColor' }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export interface BreadcrumbItemData {
  /**
   * Label to display
   */
  label: string;
  /**
   * URL to navigate to
   */
  href?: string;
  /**
   * If true, this is the current page
   */
  isCurrentPage?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
}

interface EllipsisItem {
  label: string;
  isEllipsis: true;
}

export interface BreadcrumbProps {
  /**
   * Array of breadcrumb items
   */
  items: BreadcrumbItemData[];
  /**
   * Custom separator
   */
  separator?: React.ReactElement;
  /**
   * If true, shows home icon for first item
   */
  showHomeIcon?: boolean;
  /**
   * Max items to show on mobile
   */
  maxItems?: number;
  /**
   * If true, shows only last few items on mobile
   */
  isResponsive?: boolean;
}

/**
 * Breadcrumb component for navigation hierarchy.
 * Follows accessibility guidelines with proper ARIA attributes.
 * 
 * @example
 * ```tsx
 * <Breadcrumb
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Campaigns', href: '/campaigns' },
 *     { label: 'Education', href: '/campaigns/education' },
 *     { label: 'Community Library', isCurrentPage: true }
 *   ]}
 *   showHomeIcon
 * />
 * ```
 */
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = <ChevronRightIcon color="#6C7693" />,
  showHomeIcon = false,
  maxItems = 3,
  isResponsive = true,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Responsive logic: show only last few items on mobile
  const getVisibleItems = (): (BreadcrumbItemData | EllipsisItem)[] => {
    if (!isResponsive || !isMobile || items.length <= maxItems) {
      return items;
    }

    const visibleItems = items.slice(-maxItems);
    
    // Add ellipsis indicator if items were truncated
    if (items.length > maxItems) {
      return [
        { label: '...', isEllipsis: true as const },
        ...visibleItems,
      ];
    }

    return visibleItems;
  };

  const visibleItems = getVisibleItems();

  return (
    <Box
      as="nav"
      aria-label="Breadcrumb navigation"
      role="navigation"
      py={2}
    >
      <ChakraBreadcrumb
        spacing={2}
        separator={separator}
        fontSize="body-small"
        fontWeight="medium"
      >
        {visibleItems.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === visibleItems.length - 1;
          const isEllipsis = 'isEllipsis' in item && item.isEllipsis;

          if (isEllipsis) {
            return (
              <BreadcrumbItem key="ellipsis">
                <Text color="neutral.storm-cloud">...</Text>
              </BreadcrumbItem>
            );
          }

          const breadcrumbItem = item as BreadcrumbItemData;

          return (
            <BreadcrumbItem
              key={`${breadcrumbItem.label}-${index}`}
              isCurrentPage={breadcrumbItem.isCurrentPage || isLast}
            >
              {breadcrumbItem.isCurrentPage || isLast ? (
                <HStack spacing={1}>
                  {showHomeIcon && isFirst && (
                    <Box color="neutral.storm-cloud">
                      <HomeIcon />
                    </Box>
                  )}
                  <Text
                    color="neutral.deep-space"
                    fontWeight="semibold"
                    aria-current="page"
                  >
                    {breadcrumbItem.label}
                  </Text>
                </HStack>
              ) : (
                <BreadcrumbLink
                  href={breadcrumbItem.href}
                  onClick={breadcrumbItem.onClick}
                  color="neutral.storm-cloud"
                  _hover={{
                    color: 'primary.asa-blue',
                    textDecoration: 'underline',
                  }}
                  _focus={{
                    outline: 'none',
                    boxShadow: '0 0 0 2px #1A6BCC',
                    borderRadius: 'sm',
                  }}
                  _focusVisible={{
                    outline: 'none',
                    boxShadow: '0 0 0 2px #1A6BCC',
                    borderRadius: 'sm',
                  }}
                >
                  <HStack spacing={1}>
                    {showHomeIcon && isFirst && (
                      <Box>
                        <HomeIcon />
                      </Box>
                    )}
                    <Text>{breadcrumbItem.label}</Text>
                  </HStack>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </ChakraBreadcrumb>
    </Box>
  );
};

// Helper function to generate breadcrumb items from URL path
export const generateBreadcrumbsFromPath = (
  pathname: string,
  routeLabels: Record<string, string> = {}
): BreadcrumbItemData[] => {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItemData[] = [
    { label: 'Home', href: '/' },
  ];

  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    items.push({
      label,
      href: isLast ? undefined : currentPath,
      isCurrentPage: isLast,
    });
  });

  return items;
};

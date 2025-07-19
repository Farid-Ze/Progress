import {
  Box,
  Flex,
  Button,
  IconButton,
  Image,
  Link,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  HStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import { useReducedMotion } from '../../hooks';

// Icons would be imported from your icon library
const MenuIcon = () => <span aria-hidden="true">☰</span>;

export interface NavigationItem {
  label: string;
  href: string;
  isActive?: boolean;
  isExternal?: boolean;
}

export interface NavigationProps {
  /**
   * Logo image src
   */
  logoSrc: string;
  /**
   * Logo alt text
   */
  logoAlt: string;
  /**
   * Navigation items
   */
  items: NavigationItem[];
  /**
   * Actions to display in the navigation
   */
  actions?: React.ReactNode;
  /**
   * If true, the navigation will be fixed to the top of the viewport
   */
  isFixed?: boolean;
  /**
   * Callback for logo click
   */
  onLogoClick?: () => void;
}

/**
 * Main navigation component with responsive behavior and accessibility features.
 */
export const Navigation: React.FC<NavigationProps> = ({
  logoSrc,
  logoAlt,
  items,
  actions,
  isFixed = false,
  onLogoClick,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Skip link for keyboard users to bypass navigation
  const [skipLinkFocused, setSkipLinkFocused] = useState(false);

  return (
    <Box as="header" role="banner">
      {/* Skip link for accessibility */}
      <Link
        href="#main-content"
        position="absolute"
        top={skipLinkFocused ? "4" : "-40px"}
        left="4"
        padding="2"
        zIndex="skipLink"
        bg="brand.blue.500"
        color="white"
        borderRadius="md"
        fontWeight="medium"
        onFocus={() => setSkipLinkFocused(true)}
        onBlur={() => setSkipLinkFocused(false)}
        transition={prefersReducedMotion ? 'none' : 'top 0.2s ease-in-out'}
      >
        Skip to main content
      </Link>

      <Box
        as="nav"
        aria-label="Main Navigation"
        position={isFixed ? "fixed" : "relative"}
        top="0"
        width="100%"
        zIndex="banner"
        bg="white"
        boxShadow="sm"
        py="3"
        px={{ base: "4", md: "6", lg: "8" }}
      >
        <Flex justify="space-between" align="center">
          <Link 
            href="/"
            onClick={onLogoClick}
            display="flex"
            alignItems="center"
            aria-label="Merajut ASA, back to home"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              height={{ base: "32px", md: "40px" }}
              width="auto"
            />
          </Link>

          {/* Desktop navigation */}
          {!isMobile && (
            <HStack spacing="8" display={{ base: "none", md: "flex" }}>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  isExternal={item.isExternal}
                  fontWeight="medium"
                  color={item.isActive ? "brand.blue.500" : "neutral.deepSpace"}
                  borderBottom="2px solid"
                  borderColor={item.isActive ? "brand.blue.500" : "transparent"}
                  _hover={{
                    textDecoration: "none",
                    color: "brand.blue.500",
                    borderColor: item.isActive ? "brand.blue.500" : "brand.blue.200",
                  }}
                  transition={prefersReducedMotion ? 'none' : 'all 0.2s ease-in-out'}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </HStack>
          )}

          <HStack spacing="4">
            {!isMobile && actions}
            
            {/* Mobile menu button */}
            {isMobile && (
              <IconButton
                aria-label="Open menu"
                icon={<MenuIcon />}
                variant="ghost"
                onClick={onOpen}
                display={{ base: "flex", md: "none" }}
              />
            )}
          </HStack>
        </Flex>
      </Box>

      {/* Mobile drawer navigation */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton aria-label="Close menu" />
          <DrawerHeader borderBottomWidth="1px">Merajut ASA</DrawerHeader>
          <DrawerBody>
            <VStack spacing="4" align="stretch" mt="6">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  isExternal={item.isExternal}
                  fontWeight="medium"
                  fontSize="lg"
                  py="2"
                  color={item.isActive ? "brand.blue.500" : "neutral.deepSpace"}
                  _hover={{
                    textDecoration: "none",
                    color: "brand.blue.500",
                  }}
                  onClick={onClose}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
              {actions && (
                <Box pt="6">
                  {actions}
                </Box>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navigation;

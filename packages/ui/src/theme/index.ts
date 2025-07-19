import { extendTheme } from '@chakra-ui/react';

import {
  colors,
  typography,
  spacing,
  breakpoints,
  borderRadius,
  shadows,
  transitions,
  zIndices,
  accessibilityTokens,
} from './tokens';

// Component styles based on Design System specifications
const components = {
  Button: {
    baseStyle: {
      fontWeight: 'medium',
      borderRadius: 'md',
      transition: transitions.all,
      minHeight: accessibilityTokens.minTouchTarget,
      minWidth: accessibilityTokens.minTouchTarget,
      // Focus styles for accessibility
      _focus: {
        boxShadow: `0 0 0 ${accessibilityTokens.focusRing.width} ${accessibilityTokens.focusRing.color}`,
        outline: 'none',
      },
      _focusVisible: {
        boxShadow: `0 0 0 ${accessibilityTokens.focusRing.width} ${accessibilityTokens.focusRing.color}`,
        outline: 'none',
      },
    },
    variants: {
      primary: {
        bg: colors.primary['asa-blue'],
        color: colors.neutral.white,
        _hover: {
          bg: '#1557A3',
          _disabled: {
            bg: colors.primary['asa-blue'],
          },
        },
        _active: {
          bg: '#124489',
        },
        _disabled: {
          opacity: 0.6,
          cursor: 'not-allowed',
        },
      },
      secondary: {
        bg: colors.primary['asa-teal'],
        color: colors.neutral.white,
        _hover: {
          bg: '#008A87',
          _disabled: {
            bg: colors.primary['asa-teal'],
          },
        },
        _active: {
          bg: '#006B69',
        },
        _disabled: {
          opacity: 0.6,
          cursor: 'not-allowed',
        },
      },
      outline: {
        border: '2px solid',
        borderColor: colors.primary['asa-blue'],
        color: colors.primary['asa-blue'],
        bg: 'transparent',
        _hover: {
          bg: colors.primary['asa-blue'],
          color: colors.neutral.white,
          _disabled: {
            bg: 'transparent',
            color: colors.primary['asa-blue'],
          },
        },
        _active: {
          bg: '#124489',
          color: colors.neutral.white,
        },
        _disabled: {
          opacity: 0.6,
          cursor: 'not-allowed',
        },
      },
      ghost: {
        bg: 'transparent',
        color: colors.primary['asa-blue'],
        _hover: {
          bg: colors.neutral.cloud,
          _disabled: {
            bg: 'transparent',
          },
        },
        _active: {
          bg: colors.neutral.misty,
        },
        _disabled: {
          opacity: 0.6,
          cursor: 'not-allowed',
        },
      },
    },
    sizes: {
      sm: {
        fontSize: typography.fontSizes['body-small'],
        px: 4,
        py: 2,
      },
      md: {
        fontSize: typography.fontSizes.body,
        px: 6,
        py: 3,
      },
      lg: {
        fontSize: typography.fontSizes['body-large'],
        px: 8,
        py: 4,
      },
    },
    defaultProps: {
      variant: 'primary',
      size: 'md',
    },
  },

  Card: {
    baseStyle: {
      borderRadius: borderRadius.lg,
      overflow: 'hidden',
      transition: transitions.all,
      // Focus styles for interactive cards
      _focus: {
        boxShadow: `${shadows.md}, 0 0 0 ${accessibilityTokens.focusRing.width} ${accessibilityTokens.focusRing.color}`,
        outline: 'none',
      },
      _focusVisible: {
        boxShadow: `${shadows.md}, 0 0 0 ${accessibilityTokens.focusRing.width} ${accessibilityTokens.focusRing.color}`,
        outline: 'none',
      },
    },
    variants: {
      elevated: {
        bg: colors.neutral.white,
        boxShadow: shadows.base,
        _hover: {
          boxShadow: shadows.md,
          transform: 'translateY(-2px)',
        },
      },
      outline: {
        bg: colors.neutral.white,
        border: '1px solid',
        borderColor: colors.accessible['border-primary'],
        _hover: {
          borderColor: colors.accessible['border-secondary'],
        },
      },
      filled: {
        bg: colors.neutral.cloud,
        border: 'none',
      },
      unstyled: {
        bg: 'transparent',
        border: 'none',
        boxShadow: 'none',
      },
    },
    defaultProps: {
      variant: 'elevated',
    },
  },

  Input: {
    baseStyle: {
      field: {
        borderRadius: borderRadius.md,
        transition: transitions.colors,
        minHeight: accessibilityTokens.minTouchTarget,
        // Accessibility focus styles
        _focus: {
          borderColor: colors.primary['asa-blue'],
          boxShadow: `0 0 0 1px ${colors.primary['asa-blue']}`,
        },
        _invalid: {
          borderColor: colors.semantic.error,
          boxShadow: `0 0 0 1px ${colors.semantic.error}`,
        },
        _disabled: {
          opacity: 0.6,
          cursor: 'not-allowed',
          bg: colors.neutral.misty,
        },
      },
    },
    variants: {
      outline: {
        field: {
          border: '2px solid',
          borderColor: colors.accessible['border-primary'],
          bg: colors.neutral.white,
          _hover: {
            borderColor: colors.accessible['border-secondary'],
          },
        },
      },
      filled: {
        field: {
          border: 'none',
          bg: colors.neutral.cloud,
          _hover: {
            bg: colors.neutral.misty,
          },
        },
      },
    },
    defaultProps: {
      variant: 'outline',
    },
  },

  // Alert component for notifications and status messages
  Alert: {
    baseStyle: {
      container: {
        borderRadius: borderRadius.md,
        padding: 4,
        display: 'flex',
        alignItems: 'flex-start',
      },
      icon: {
        marginRight: 3,
        marginTop: 1,
        flexShrink: 0,
      },
    },
    variants: {
      success: {
        container: {
          bg: '#F0FDF4',
          color: '#166534',
          border: '1px solid #22C55E',
        },
      },
      error: {
        container: {
          bg: '#FEF2F2',
          color: '#DC2626',
          border: '1px solid #EF4444',
        },
      },
      warning: {
        container: {
          bg: '#FFFBEB',
          color: '#D97706',
          border: '1px solid #F59E0B',
        },
      },
      info: {
        container: {
          bg: '#EFF6FF',
          color: '#1D4ED8',
          border: '1px solid #3B82F6',
        },
      },
    },
    defaultProps: {
      variant: 'info',
    },
  },

  // Heading component with proper hierarchy
  Heading: {
    baseStyle: {
      fontFamily: typography.fonts.primary,
      fontWeight: typography.fontWeights.bold,
      lineHeight: typography.lineHeights.tight,
      color: colors.accessible['text-primary'],
    },
    sizes: {
      display: {
        fontSize: typography.fontSizes.display,
        lineHeight: typography.lineHeights.tight,
      },
      xl: {
        fontSize: typography.fontSizes['heading-1'],
        lineHeight: typography.lineHeights.snug,
      },
      lg: {
        fontSize: typography.fontSizes['heading-2'],
        lineHeight: typography.lineHeights.normal,
      },
      md: {
        fontSize: typography.fontSizes['heading-3'],
        lineHeight: typography.lineHeights.relaxed,
      },
      sm: {
        fontSize: typography.fontSizes['heading-4'],
        lineHeight: typography.lineHeights.relaxed,
      },
    },
    defaultProps: {
      size: 'md',
    },
  },

  // Text component
  Text: {
    baseStyle: {
      fontFamily: typography.fonts.primary,
      color: colors.accessible['text-primary'],
      lineHeight: typography.lineHeights.loose,
    },
    variants: {
      body: {
        fontSize: typography.fontSizes.body,
      },
      'body-large': {
        fontSize: typography.fontSizes['body-large'],
      },
      'body-small': {
        fontSize: typography.fontSizes['body-small'],
      },
      caption: {
        fontSize: typography.fontSizes.caption,
        color: colors.accessible['text-tertiary'],
        fontWeight: typography.fontWeights.medium,
      },
      secondary: {
        color: colors.accessible['text-secondary'],
      },
      tertiary: {
        color: colors.accessible['text-tertiary'],
      },
    },
    defaultProps: {
      variant: 'body',
    },
  },
};

// Custom theme configuration
export const theme = extendTheme({
  // Design tokens
  colors: {
    primary: colors.primary,
    neutral: colors.neutral,
    semantic: colors.semantic,
  },
  fonts: {
    heading: typography.fonts.primary,
    body: typography.fonts.primary,
    mono: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  fontSizes: typography.fontSizes,
  fontWeights: typography.fontWeights,
  lineHeights: typography.lineHeights,
  space: spacing,
  breakpoints,
  radii: borderRadius,
  shadows,
  zIndices,

  // Global styles
  styles: {
    global: () => ({
      // Ensure proper focus management
      '*:focus': {
        outline: 'none',
      },
      '*:focus-visible': {
        outline: `${accessibilityTokens.focusRing.width} ${accessibilityTokens.focusRing.style} ${accessibilityTokens.focusRing.color}`,
        outlineOffset: accessibilityTokens.focusRing.offset,
      },
      // Respect reduced motion preference
      '@media (prefers-reduced-motion: reduce)': {
        '*': {
          animationDuration: '0.01ms !important',
          animationIterationCount: '1 !important',
          transitionDuration: '0.01ms !important',
        },
      },
      body: {
        fontFamily: typography.fonts.primary,
        color: colors.accessible['text-primary'],
        bg: colors.accessible['bg-primary'],
        // Improve text rendering
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      },
      // Skip links for keyboard navigation
      '.skip-link': {
        position: 'absolute',
        top: '-40px',
        left: '6px',
        background: colors.neutral.white,
        color: colors.primary['asa-blue'],
        padding: '8px',
        textDecoration: 'none',
        borderRadius: borderRadius.md,
        border: `2px solid ${colors.primary['asa-blue']}`,
        zIndex: zIndices.skipLink,
        _focus: {
          top: '6px',
        },
      },
      // Screen reader only utility class
      '.sr-only': accessibilityTokens.srOnly,
    }),
  },

  // Component styles
  components,

  // Semantic tokens for consistent theming
  semanticTokens: {
    colors: {
      'chakra-body-bg': colors.accessible['bg-primary'],
      'chakra-body-text': colors.accessible['text-primary'],
    },
  },

  // Configuration
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
    disableTransitionOnChange: false,
  },
});

export default theme;

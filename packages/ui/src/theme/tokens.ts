/**
 * Design tokens for Merajut ASA Design System
 * Based on ui-ux-design-system.md specifications
 */

export const colors = {
  // Primary Colors
  primary: {
    'asa-blue': '#1A6BCC',
    'asa-teal': '#00A9A5',
    'asa-coral': '#FF6B5B',
    'asa-gold': '#FFB549',
  },
  
  // Neutral Colors
  neutral: {
    'deep-space': '#121826',
    'midnight': '#242D40',
    'storm-cloud': '#6C7693',
    'misty': '#DDE1EB',
    'cloud': '#F5F7FC',
    'white': '#FFFFFF',
  },
  
  // Semantic Colors
  semantic: {
    success: '#0CAF60',
    warning: '#FFB549',
    error: '#E53935',
    info: '#2196F3',
  },
  
  // Accessible color combinations (WCAG 2.1 AA compliant)
  accessible: {
    'text-primary': '#121826',
    'text-secondary': '#242D40',
    'text-tertiary': '#6C7693',
    'text-inverse': '#FFFFFF',
    'bg-primary': '#FFFFFF',
    'bg-secondary': '#F5F7FC',
    'bg-tertiary': '#DDE1EB',
    'border-primary': '#DDE1EB',
    'border-secondary': '#6C7693',
  },
};

export const typography = {
  fonts: {
    primary: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    secondary: '"Merriweather", Georgia, Times, serif',
  },
  
  fontSizes: {
    display: '3rem',      // 48px
    'heading-1': '2rem',  // 32px
    'heading-2': '1.5rem', // 24px
    'heading-3': '1.25rem', // 20px
    'heading-4': '1.125rem', // 18px
    'body-large': '1.125rem', // 18px
    'body': '1rem',       // 16px
    'body-small': '0.875rem', // 14px
    'caption': '0.75rem', // 12px
  },
  
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeights: {
    tight: 1.2,
    snug: 1.25,
    normal: 1.3,
    relaxed: 1.4,
    loose: 1.5,
  },
};

export const spacing = {
  0: '0',
  1: '0.25rem',  // 4px
  2: '0.5rem',   // 8px
  3: '0.75rem',  // 12px
  4: '1rem',     // 16px
  5: '1.25rem',  // 20px
  6: '1.5rem',   // 24px
  8: '2rem',     // 32px
  10: '2.5rem',  // 40px
  12: '3rem',    // 48px
  16: '4rem',    // 64px
  20: '5rem',    // 80px
  24: '6rem',    // 96px
  32: '8rem',    // 128px
};

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '992px',
  xl: '1280px',
  '2xl': '1536px',
};

export const borderRadius = {
  none: '0',
  sm: '0.125rem',  // 2px
  base: '0.25rem', // 4px
  md: '0.375rem',  // 6px
  lg: '0.5rem',    // 8px
  xl: '0.75rem',   // 12px
  '2xl': '1rem',   // 16px
  '3xl': '1.5rem', // 24px
  full: '9999px',
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
};

export const transitions = {
  // Respect prefers-reduced-motion
  all: 'all 0.2s ease-in-out',
  colors: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
  transform: 'transform 0.2s ease-in-out',
  opacity: 'opacity 0.2s ease-in-out',
};

export const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Accessibility helpers
export const accessibilityTokens = {
  // Minimum touch target size (44x44px)
  minTouchTarget: '44px',
  
  // Focus styles
  focusRing: {
    width: '2px',
    style: 'solid',
    color: colors.primary['asa-blue'],
    offset: '2px',
  },
  
  // Screen reader only styles
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  },
};

// Performance budget helpers
export const performanceTokens = {
  // Animation duration based on reduced motion preference
  animationDuration: {
    fast: '0.1s',
    normal: '0.2s',
    slow: '0.3s',
    none: '0s', // For reduced motion
  },
  
  // Image optimization
  imageOptimization: {
    quality: 80,
    formats: ['webp', 'jpg', 'png'],
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  },
};

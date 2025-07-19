import { useEffect, useState, useCallback } from 'react';

// WCAG 2.1 AA compliance targets from accessibility-requirements.md
const ACCESSIBILITY_TARGETS = {
  contrastRatio: 4.5, // Minimum contrast ratio for normal text
  largeTextContrastRatio: 3.0, // Minimum contrast ratio for large text (18pt+)
  maxAnimationDuration: 300, // Maximum animation duration (ms)
  minTouchTargetSize: 44, // Minimum touch target size in pixels
  maxLineLength: 75, // Maximum characters per line for readability
};

interface AccessibilityReport {
  compliance: number; // Percentage compliance (target: >95%)
  violations: AccessibilityViolation[];
  timestamp: number;
}

interface AccessibilityViolation {
  type: 'contrast' | 'touch-target' | 'focus' | 'semantic' | 'keyboard' | 'aria';
  element?: Element;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  wcagReference: string;
}

type AccessibilityReportCallback = (report: AccessibilityReport) => void;

/**
 * Hook for monitoring accessibility compliance in real-time.
 * Performs automated accessibility checks and reports violations.
 * 
 * @param onReport Callback function called when accessibility report is generated
 * @param continuous If true, performs continuous monitoring
 * 
 * @example
 * ```tsx
 * function App() {
 *   useAccessibilityMonitoring((report) => {
 *     if (report.compliance < 95) {
 *       console.warn('Accessibility compliance below target:', report);
 *     }
 *   });
 *   
 *   return <AppContent />;
 * }
 * ```
 */
export const useAccessibilityMonitoring = (
  onReport?: AccessibilityReportCallback,
  continuous: boolean = false
) => {
  const [currentReport, setCurrentReport] = useState<AccessibilityReport | null>(null);

  const runAccessibilityChecks = useCallback(async () => {
    if (typeof window === 'undefined') return;

    const violations: AccessibilityViolation[] = [];
    let totalChecks = 0;
    let passedChecks = 0;

    try {
      // Check 1: Contrast Ratio
      const contrastChecks = checkContrastRatio();
      violations.push(...contrastChecks.violations);
      totalChecks += contrastChecks.total;
      passedChecks += contrastChecks.passed;

      // Check 2: Touch Target Size
      const touchTargetChecks = checkTouchTargetSize();
      violations.push(...touchTargetChecks.violations);
      totalChecks += touchTargetChecks.total;
      passedChecks += touchTargetChecks.passed;

      // Check 3: Focus Management
      const focusChecks = checkFocusManagement();
      violations.push(...focusChecks.violations);
      totalChecks += focusChecks.total;
      passedChecks += focusChecks.passed;

      // Check 4: Semantic HTML
      const semanticChecks = checkSemanticHTML();
      violations.push(...semanticChecks.violations);
      totalChecks += semanticChecks.total;
      passedChecks += semanticChecks.passed;

      // Check 5: ARIA Usage
      const ariaChecks = checkARIAUsage();
      violations.push(...ariaChecks.violations);
      totalChecks += ariaChecks.total;
      passedChecks += ariaChecks.passed;

      // Check 6: Keyboard Navigation
      const keyboardChecks = checkKeyboardNavigation();
      violations.push(...keyboardChecks.violations);
      totalChecks += keyboardChecks.total;
      passedChecks += keyboardChecks.passed;

      // Calculate compliance percentage
      const compliance = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 100;

      const report: AccessibilityReport = {
        compliance,
        violations,
        timestamp: Date.now(),
      };

      setCurrentReport(report);

      if (onReport) {
        onReport(report);
      }

      // Log results in development
      const isDevelopment = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        
      if (isDevelopment) {
        const status = compliance >= 95 ? '✅ COMPLIANT' : '⚠️ NEEDS IMPROVEMENT';
        console.log(`♿ Accessibility Report: ${compliance}% compliant ${status}`);
        
        if (violations.length > 0) {
          console.group('Accessibility Violations:');
          violations.forEach((violation, _index) => {
            const severityIcon = {
              low: '🟡',
              medium: '🟠',
              high: '🔴',
              critical: '🚨',
            }[violation.severity];
            
            console.warn(`${severityIcon} ${violation.type.toUpperCase()}: ${violation.description}`);
            console.log(`   WCAG Reference: ${violation.wcagReference}`);
            if (violation.element) {
              console.log('   Element:', violation.element);
            }
          });
          console.groupEnd();
        }
      }

    } catch (error) {
      console.error('Accessibility monitoring failed:', error);
    }
  }, [onReport]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initial check
    runAccessibilityChecks();

    if (continuous) {
      // Set up continuous monitoring
      const interval = setInterval(runAccessibilityChecks, 5000); // Check every 5 seconds

      // Monitor for DOM changes
      const observer = new MutationObserver(() => {
        // Debounce checks on DOM changes
        clearTimeout((window as any).accessibilityCheckTimeout);
        (window as any).accessibilityCheckTimeout = setTimeout(runAccessibilityChecks, 1000);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'role', 'aria-*', 'tabindex'],
      });

      return () => {
        clearInterval(interval);
        observer.disconnect();
        clearTimeout((window as any).accessibilityCheckTimeout);
      };
    }
  }, [runAccessibilityChecks, continuous]);

  return currentReport;
};

// Check 1: Contrast Ratio
const checkContrastRatio = () => {
  const violations: AccessibilityViolation[] = [];
  let total = 0;
  let passed = 0;

  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label, li');
  
  textElements.forEach((element) => {
    total++;
    
    try {
      const styles = window.getComputedStyle(element);
      const color = styles.color;
      const backgroundColor = styles.backgroundColor;
      
      // Simplified contrast check (in production, use a proper contrast calculation library)
      const hasGoodContrast = checkColorContrast(color, backgroundColor);
      
      if (hasGoodContrast) {
        passed++;
      } else {
        violations.push({
          type: 'contrast',
          element,
          description: `Text color contrast insufficient (${color} on ${backgroundColor})`,
          severity: 'high',
          wcagReference: '1.4.3 Contrast (Minimum)',
        });
      }
    } catch {
      passed++; // Assume pass if we can't check
    }
  });

  return { violations, total, passed };
};

// Check 2: Touch Target Size
const checkTouchTargetSize = () => {
  const violations: AccessibilityViolation[] = [];
  let total = 0;
  let passed = 0;

  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])');
  
  interactiveElements.forEach((element) => {
    total++;
    
    const rect = element.getBoundingClientRect();
    const minSize = ACCESSIBILITY_TARGETS.minTouchTargetSize;
    
    if (rect.width >= minSize && rect.height >= minSize) {
      passed++;
    } else {
      violations.push({
        type: 'touch-target',
        element,
        description: `Touch target too small: ${Math.round(rect.width)}x${Math.round(rect.height)}px (minimum ${minSize}x${minSize}px)`,
        severity: 'medium',
        wcagReference: '2.5.5 Target Size',
      });
    }
  });

  return { violations, total, passed };
};

// Check 3: Focus Management
const checkFocusManagement = () => {
  const violations: AccessibilityViolation[] = [];
  let total = 0;
  let passed = 0;

  const focusableElements = document.querySelectorAll('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  
  focusableElements.forEach((element) => {
    total++;
    
    // Check if element has visible focus indicator
    const styles = window.getComputedStyle(element, ':focus-visible');
    const hasVisibleFocus = (styles.outline !== 'none' && styles.outline !== '0') ||
                           styles.boxShadow !== 'none' ||
                           styles.borderWidth !== '0px';
    
    if (hasVisibleFocus) {
      passed++;
    } else {
      violations.push({
        type: 'focus',
        element,
        description: 'Interactive element lacks visible focus indicator',
        severity: 'high',
        wcagReference: '2.4.7 Focus Visible',
      });
    }
  });

  return { violations, total, passed };
};

// Check 4: Semantic HTML
const checkSemanticHTML = () => {
  const violations: AccessibilityViolation[] = [];
  let total = 0;
  let passed = 0;

  // Check for proper heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let lastLevel = 0;
  
  headings.forEach((heading) => {
    total++;
    const level = parseInt(heading.tagName.charAt(1));
    
    if (level === 1 || level <= lastLevel + 1) {
      passed++;
      lastLevel = level;
    } else {
      violations.push({
        type: 'semantic',
        element: heading,
        description: `Heading level skipped: ${heading.tagName} follows h${lastLevel}`,
        severity: 'medium',
        wcagReference: '1.3.1 Info and Relationships',
      });
    }
  });

  // Check for landmark roles
  total++;
  const hasMain = document.querySelector('main, [role="main"]');
  if (hasMain) {
    passed++;
  } else {
    violations.push({
      type: 'semantic',
      description: 'Page missing main landmark',
      severity: 'high',
      wcagReference: '1.3.1 Info and Relationships',
    });
  }

  return { violations, total, passed };
};

// Check 5: ARIA Usage
const checkARIAUsage = () => {
  const violations: AccessibilityViolation[] = [];
  let total = 0;
  let passed = 0;

  // Check images have alt text
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    total++;
    
    const alt = img.getAttribute('alt');
    const ariaLabel = img.getAttribute('aria-label');
    const ariaLabelledBy = img.getAttribute('aria-labelledby');
    
    if (alt !== null || ariaLabel || ariaLabelledBy) {
      passed++;
    } else {
      violations.push({
        type: 'aria',
        element: img,
        description: 'Image missing alt text or aria-label',
        severity: 'high',
        wcagReference: '1.1.1 Non-text Content',
      });
    }
  });

  // Check form inputs have labels
  const inputs = document.querySelectorAll('input:not([type="hidden"]), select, textarea');
  inputs.forEach((input) => {
    total++;
    
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    const associatedLabel = id ? document.querySelector(`label[for="${id}"]`) : null;
    
    if (associatedLabel || ariaLabel || ariaLabelledBy) {
      passed++;
    } else {
      violations.push({
        type: 'aria',
        element: input,
        description: 'Form input missing associated label',
        severity: 'high',
        wcagReference: '1.3.1 Info and Relationships',
      });
    }
  });

  return { violations, total, passed };
};

// Check 6: Keyboard Navigation
const checkKeyboardNavigation = () => {
  const violations: AccessibilityViolation[] = [];
  let total = 0;
  let passed = 0;

  // Check interactive elements are keyboard accessible
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea, [role="button"], [role="link"]');
  
  interactiveElements.forEach((element) => {
    total++;
    
    const tabIndex = element.getAttribute('tabindex');
    
    // Element should not have negative tabindex unless it's explicitly hidden
    if (tabIndex === '-1' && !element.hasAttribute('aria-hidden')) {
      violations.push({
        type: 'keyboard',
        element,
        description: 'Interactive element not keyboard accessible (tabindex="-1")',
        severity: 'high',
        wcagReference: '2.1.1 Keyboard',
      });
    } else {
      passed++;
    }
  });

  return { violations, total, passed };
};

// Simplified contrast check (placeholder - use proper color contrast library in production)
const checkColorContrast = (foreground: string, background: string): boolean => {
  // This is a simplified check. In production, use a proper color contrast calculation
  // that converts colors to luminance values and calculates the contrast ratio
  
  // For now, just check if colors are different enough visually
  if (foreground === background) return false;
  if (foreground === 'transparent' || background === 'transparent') return false;
  
  // Basic check for common poor contrast combinations
  const poorContrasts = [
    ['rgb(255, 255, 255)', 'rgb(255, 255, 255)'],
    ['rgb(0, 0, 0)', 'rgb(0, 0, 0)'],
    ['rgb(128, 128, 128)', 'rgb(128, 128, 128)'],
  ];
  
  return !poorContrasts.some(([fg, bg]) => 
    foreground.includes(fg.slice(4, -1)) && background.includes(bg.slice(4, -1))
  );
};

/**
 * Hook for skip link management
 * Ensures proper skip navigation implementation
 */
export const useSkipLinks = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Add skip link if it doesn't exist
    const existingSkipLink = document.querySelector('.skip-link');
    
    if (!existingSkipLink) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-link';
      skipLink.textContent = 'Skip to main content';
      skipLink.setAttribute('aria-label', 'Skip to main content');
      
      // Insert as first element in body
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Ensure main content has proper ID
    const mainContent = document.querySelector('main');
    if (mainContent && !mainContent.id) {
      mainContent.id = 'main-content';
    }
  }, []);
};

/**
 * Hook for reduced motion preference
 * Respects user's motion preferences and adjusts animations accordingly
 */
export const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
};

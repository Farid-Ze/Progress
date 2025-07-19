import { useEffect } from 'react';

// Performance budgets from tech-arch-blueprint-v2.md
const PERFORMANCE_BUDGETS = {
  LCP: 1500, // < 1.5s
  FID: 100,  // < 100ms
  CLS: 0.1,  // < 0.1
  TTFB: 200, // < 200ms
  FCP: 1000, // < 1.0s
};

// Define Metric interface for type safety
interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

interface PerformanceReport {
  metric: Metric;
  isBudgetExceeded: boolean;
  budgetValue: number;
  exceedancePercentage?: number;
}

type PerformanceReportCallback = (report: PerformanceReport) => void;

/**
 * Custom hook for monitoring Web Vitals performance metrics.
 * Automatically reports metrics and budget violations.
 * 
 * @param onReport Callback function called when metrics are reported
 * @param reportToAnalytics If true, sends metrics to analytics service
 * 
 * @example
 * ```tsx
 * function MyApp() {
 *   usePerformanceMonitoring((report) => {
 *     if (report.isBudgetExceeded) {
 *       console.warn(`Performance budget exceeded: ${report.metric.name}`);
 *     }
 *   });
 *   
 *   return <AppContent />;
 * }
 * ```
 */
export const usePerformanceMonitoring = (
  onReport?: PerformanceReportCallback,
  shouldReportToAnalytics: boolean = true
) => {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    const reportMetric = (metric: Metric) => {
      // Get budget for this metric
      const budgetValue = PERFORMANCE_BUDGETS[metric.name as keyof typeof PERFORMANCE_BUDGETS];
      
      if (!budgetValue) {
        console.warn(`No performance budget defined for metric: ${metric.name}`);
        return;
      }

      // Check if budget is exceeded
      const isBudgetExceeded = metric.value > budgetValue;
      const exceedancePercentage = isBudgetExceeded 
        ? Math.round(((metric.value - budgetValue) / budgetValue) * 100)
        : undefined;

      const report: PerformanceReport = {
        metric,
        isBudgetExceeded,
        budgetValue,
        exceedancePercentage,
      };

      // Call custom report handler
      if (onReport) {
        onReport(report);
      }

      // Log performance metrics in development
      const isDevelopment = typeof window !== 'undefined' && 
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
        
      if (isDevelopment) {
        const status = isBudgetExceeded ? '❌ EXCEEDED' : '✅ WITHIN BUDGET';
        const exceedanceText = exceedancePercentage 
          ? ` (+${exceedancePercentage}%)`
          : '';
        
        console.log(
          `🔍 Web Vitals - ${metric.name}: ${Math.round(metric.value)}${getMetricUnit(metric.name)} ` +
          `(Budget: ${budgetValue}${getMetricUnit(metric.name)}) ${status}${exceedanceText}`
        );
      }

      // Report to analytics service
      if (shouldReportToAnalytics) {
        reportToAnalyticsService(report);
      }
    };

    // Manual Web Vitals implementation for better compatibility
    const observePerformance = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            
            reportMetric({
              name: 'LCP',
              value: lastEntry.startTime,
              rating: lastEntry.startTime <= 2500 ? 'good' : lastEntry.startTime <= 4000 ? 'needs-improvement' : 'poor',
              delta: lastEntry.startTime,
              id: 'lcp-' + Date.now(),
              entries: entries as PerformanceEntry[],
            });
          });
          lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

          // First Contentful Paint (FCP)
          const fcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1] as any;
            
            reportMetric({
              name: 'FCP',
              value: lastEntry.startTime,
              rating: lastEntry.startTime <= 1800 ? 'good' : lastEntry.startTime <= 3000 ? 'needs-improvement' : 'poor',
              delta: lastEntry.startTime,
              id: 'fcp-' + Date.now(),
              entries: entries as PerformanceEntry[],
            });
          });
          fcpObserver.observe({ type: 'paint', buffered: true });

          // First Input Delay (FID)
          const fidObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach((entry: any) => {
              reportMetric({
                name: 'FID',
                value: entry.processingStart - entry.startTime,
                rating: entry.processingStart - entry.startTime <= 100 ? 'good' : 
                        entry.processingStart - entry.startTime <= 300 ? 'needs-improvement' : 'poor',
                delta: entry.processingStart - entry.startTime,
                id: 'fid-' + Date.now(),
                entries: [entry] as PerformanceEntry[],
              });
            });
          });
          fidObserver.observe({ type: 'first-input', buffered: true });

        } catch (error) {
          console.warn('Performance monitoring setup failed:', error);
        }
      }

      // Navigation timing for TTFB
      if ('performance' in window && 'timing' in window.performance) {
        const timing = window.performance.timing;
        const ttfb = timing.responseStart - timing.requestStart;
        
        reportMetric({
          name: 'TTFB',
          value: ttfb,
          rating: ttfb <= 600 ? 'good' : ttfb <= 1500 ? 'needs-improvement' : 'poor',
          delta: ttfb,
          id: 'ttfb-' + Date.now(),
          entries: [],
        });
      }
    };

    // Initialize performance monitoring
    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', observePerformance);
    } else {
      observePerformance();
    }

    // Cleanup
    return () => {
      if (document.readyState === 'loading') {
        window.removeEventListener('DOMContentLoaded', observePerformance);
      }
    };
  }, [onReport, shouldReportToAnalytics]);
};

/**
 * Get the appropriate unit for a metric
 */
const getMetricUnit = (metricName: string): string => {
  switch (metricName) {
    case 'CLS':
      return ''; // CLS is unitless
    case 'FID':
    case 'LCP':
    case 'FCP':
    case 'TTFB':
      return 'ms';
    default:
      return '';
  }
};

/**
 * Send performance metrics to analytics service
 * This is a placeholder - implement with your analytics provider
 */
const reportToAnalyticsService = (report: PerformanceReport) => {
  // Example: Send to Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'web_vitals', {
      metric_name: report.metric.name,
      metric_value: Math.round(report.metric.value),
      metric_rating: report.metric.rating,
      budget_exceeded: report.isBudgetExceeded,
      page_location: window.location.href,
    });
  }

  // Example: Send to custom analytics endpoint
  if (typeof window !== 'undefined') {
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: {
          name: report.metric.name,
          value: report.metric.value,
          rating: report.metric.rating,
          delta: report.metric.delta,
          id: report.metric.id,
        },
        budgetExceeded: report.isBudgetExceeded,
        budgetValue: report.budgetValue,
        exceedancePercentage: report.exceedancePercentage,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }),
    }).catch((error) => {
      console.warn('Failed to send performance metrics to analytics:', error);
    });
  }
};

/**
 * Hook for performance budget monitoring with alerts
 * Shows visual warnings when performance budgets are exceeded
 */
export const usePerformanceBudgetAlerts = (
  enabled: boolean = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
) => {
  usePerformanceMonitoring(
    (report) => {
      if (!enabled || !report.isBudgetExceeded) return;

      // Create visual alert for budget violations
      const alertMessage = `⚠️ Performance Budget Exceeded!\n` +
        `${report.metric.name}: ${Math.round(report.metric.value)}${getMetricUnit(report.metric.name)} ` +
        `(Budget: ${report.budgetValue}${getMetricUnit(report.metric.name)}) ` +
        `+${report.exceedancePercentage}%`;

      // Show console warning
      console.warn(alertMessage);

      // Show toast notification (if toast system is available)
      if (typeof window !== 'undefined' && (window as any).showToast) {
        (window as any).showToast({
          title: 'Performance Budget Exceeded',
          description: `${report.metric.name} exceeded budget by ${report.exceedancePercentage}%`,
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    },
    false // Don't report to analytics for budget alerts
  );
};

/**
 * Performance context values for debugging
 */
export interface PerformanceContext {
  metrics: Record<string, Metric>;
  budgets: typeof PERFORMANCE_BUDGETS;
  violations: PerformanceReport[];
}

/**
 * Hook to access current performance context
 */
export const usePerformanceContext = (): PerformanceContext => {
  const context: PerformanceContext = {
    metrics: {},
    budgets: PERFORMANCE_BUDGETS,
    violations: [],
  };

  usePerformanceMonitoring((report) => {
    context.metrics[report.metric.name] = report.metric;
    if (report.isBudgetExceeded) {
      context.violations.push(report);
    }
  });

  return context;
};

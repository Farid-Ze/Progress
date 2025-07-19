// Performance monitoring - Simple implementation
export interface PerformanceMetrics {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  url: string;
  timestamp: number;
}

export interface PerformanceBudgets {
  LCP: number; // Largest Contentful Paint
  FID: number; // First Input Delay
  CLS: number; // Cumulative Layout Shift
  FCP: number; // First Contentful Paint
  TTFB: number; // Time to First Byte
}

// Default performance budgets
export const defaultBudgets: PerformanceBudgets = {
  LCP: 2500,  // 2.5 seconds
  FID: 100,   // 100 milliseconds
  CLS: 0.1,   // 0.1 cumulative layout shift
  FCP: 1800,  // 1.8 seconds
  TTFB: 800,  // 800 milliseconds
};

// Simple performance monitoring class
export class PerformanceMonitor {
  private budgets: PerformanceBudgets;
  private metrics: PerformanceMetrics[] = [];

  constructor(budgets: PerformanceBudgets = defaultBudgets) {
    this.budgets = budgets;
  }

  // Mock performance measurement
  measurePerformance(): PerformanceMetrics[] {
    const mockMetrics: PerformanceMetrics[] = [
      {
        name: 'LCP',
        value: 2000,
        rating: 'good',
        delta: 0,
        id: 'lcp-1',
        url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: Date.now()
      },
      {
        name: 'FID',
        value: 50,
        rating: 'good',
        delta: 0,
        id: 'fid-1',
        url: typeof window !== 'undefined' ? window.location.href : '',
        timestamp: Date.now()
      }
    ];

    this.metrics = mockMetrics;
    return mockMetrics;
  }

  // Check if metrics meet budget requirements
  checkBudgets(): boolean {
    const latestMetrics = this.measurePerformance();
    
    for (const metric of latestMetrics) {
      const budgetValue = this.budgets[metric.name as keyof PerformanceBudgets];
      if (budgetValue && metric.value > budgetValue) {
        return false;
      }
    }
    
    return true;
  }

  // Get current metrics
  getMetrics(): PerformanceMetrics[] {
    return this.metrics;
  }

  // Set custom budgets
  setBudgets(budgets: Partial<PerformanceBudgets>): void {
    this.budgets = { ...this.budgets, ...budgets };
  }
}

// Export default instance
export const performanceMonitor = new PerformanceMonitor();

// Utility functions
export function getRating(value: number, thresholds: [number, number]): 'good' | 'needs-improvement' | 'poor' {
  if (value <= thresholds[0]) return 'good';
  if (value <= thresholds[1]) return 'needs-improvement';
  return 'poor';
}

export function formatMetric(metric: PerformanceMetrics): string {
  return `${metric.name}: ${metric.value}ms (${metric.rating})`;
}

// Browser compatibility check
export function isPerformanceSupported(): boolean {
  return typeof window !== 'undefined' && 
         'performance' in window && 
         'getEntriesByType' in window.performance;
}

// Start monitoring (mock implementation)
export function startPerformanceMonitoring(callback?: (metrics: PerformanceMetrics[]) => void): void {
  if (typeof window === 'undefined') return;
  
  // Mock monitoring - in real implementation, would use actual performance APIs
  setInterval(() => {
    const metrics = performanceMonitor.measurePerformance();
    if (callback) callback(metrics);
  }, 5000);
}

export default {
  PerformanceMonitor,
  performanceMonitor,
  defaultBudgets,
  getRating,
  formatMetric,
  isPerformanceSupported,
  startPerformanceMonitoring
};

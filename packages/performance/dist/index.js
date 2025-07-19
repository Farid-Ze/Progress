"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.performanceMonitor = exports.PerformanceMonitor = exports.defaultBudgets = void 0;
exports.getRating = getRating;
exports.formatMetric = formatMetric;
exports.isPerformanceSupported = isPerformanceSupported;
exports.startPerformanceMonitoring = startPerformanceMonitoring;
// Default performance budgets
exports.defaultBudgets = {
    LCP: 2500, // 2.5 seconds
    FID: 100, // 100 milliseconds
    CLS: 0.1, // 0.1 cumulative layout shift
    FCP: 1800, // 1.8 seconds
    TTFB: 800, // 800 milliseconds
};
// Simple performance monitoring class
class PerformanceMonitor {
    constructor(budgets = exports.defaultBudgets) {
        this.metrics = [];
        this.budgets = budgets;
    }
    // Mock performance measurement
    measurePerformance() {
        const mockMetrics = [
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
    checkBudgets() {
        const latestMetrics = this.measurePerformance();
        for (const metric of latestMetrics) {
            const budgetValue = this.budgets[metric.name];
            if (budgetValue && metric.value > budgetValue) {
                return false;
            }
        }
        return true;
    }
    // Get current metrics
    getMetrics() {
        return this.metrics;
    }
    // Set custom budgets
    setBudgets(budgets) {
        this.budgets = { ...this.budgets, ...budgets };
    }
}
exports.PerformanceMonitor = PerformanceMonitor;
// Export default instance
exports.performanceMonitor = new PerformanceMonitor();
// Utility functions
function getRating(value, thresholds) {
    if (value <= thresholds[0])
        return 'good';
    if (value <= thresholds[1])
        return 'needs-improvement';
    return 'poor';
}
function formatMetric(metric) {
    return `${metric.name}: ${metric.value}ms (${metric.rating})`;
}
// Browser compatibility check
function isPerformanceSupported() {
    return typeof window !== 'undefined' &&
        'performance' in window &&
        'getEntriesByType' in window.performance;
}
// Start monitoring (mock implementation)
function startPerformanceMonitoring(callback) {
    if (typeof window === 'undefined')
        return;
    // Mock monitoring - in real implementation, would use actual performance APIs
    setInterval(() => {
        const metrics = exports.performanceMonitor.measurePerformance();
        if (callback)
            callback(metrics);
    }, 5000);
}
exports.default = {
    PerformanceMonitor,
    performanceMonitor: exports.performanceMonitor,
    defaultBudgets: exports.defaultBudgets,
    getRating,
    formatMetric,
    isPerformanceSupported,
    startPerformanceMonitoring
};
//# sourceMappingURL=index.js.map
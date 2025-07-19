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
    LCP: number;
    FID: number;
    CLS: number;
    FCP: number;
    TTFB: number;
}
export declare const defaultBudgets: PerformanceBudgets;
export declare class PerformanceMonitor {
    private budgets;
    private metrics;
    constructor(budgets?: PerformanceBudgets);
    measurePerformance(): PerformanceMetrics[];
    checkBudgets(): boolean;
    getMetrics(): PerformanceMetrics[];
    setBudgets(budgets: Partial<PerformanceBudgets>): void;
}
export declare const performanceMonitor: PerformanceMonitor;
export declare function getRating(value: number, thresholds: [number, number]): 'good' | 'needs-improvement' | 'poor';
export declare function formatMetric(metric: PerformanceMetrics): string;
export declare function isPerformanceSupported(): boolean;
export declare function startPerformanceMonitoring(callback?: (metrics: PerformanceMetrics[]) => void): void;
declare const _default: {
    PerformanceMonitor: typeof PerformanceMonitor;
    performanceMonitor: PerformanceMonitor;
    defaultBudgets: PerformanceBudgets;
    getRating: typeof getRating;
    formatMetric: typeof formatMetric;
    isPerformanceSupported: typeof isPerformanceSupported;
    startPerformanceMonitoring: typeof startPerformanceMonitoring;
};
export default _default;
//# sourceMappingURL=index.d.ts.map
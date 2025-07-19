/**
 * Utility functions for TypeScript development
 * Provides type-safe utilities and helpers
 */
export declare function isString(value: unknown): value is string;
export declare function isNumber(value: unknown): value is number;
export declare function isBoolean(value: unknown): value is boolean;
export declare function isObject(value: unknown): value is Record<string, unknown>;
export declare function isArray<T>(value: unknown): value is T[];
export declare function isDefined<T>(value: T | null | undefined): value is T;
export declare function isNotEmpty<T>(value: T | null | undefined): value is T;
export declare function isValidEmail(email: string): boolean;
export declare function isValidUrl(url: string): boolean;
export declare function isValidId(id: string): boolean;
export declare function pick<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
export declare function omit<T extends Record<string, unknown>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
export declare function deepClone<T>(obj: T): T;
export declare function uniqueBy<T, K extends keyof T>(array: T[], key: K): T[];
export declare function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]>;
export declare function sleep(ms: number): Promise<void>;
export declare function retry<T>(fn: () => Promise<T>, maxAttempts?: number, delay?: number): Promise<T>;
export declare class AppError extends Error {
    code: string;
    statusCode: number;
    details?: Record<string, unknown> | undefined;
    constructor(code: string, message: string, statusCode?: number, details?: Record<string, unknown> | undefined);
}
export declare class ValidationError extends AppError {
    field: string;
    value?: unknown | undefined;
    constructor(message: string, field: string, value?: unknown | undefined);
}
export declare class NotFoundError extends AppError {
    constructor(resource: string, id?: string);
}
export declare function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number): T;
export declare function throttle<T extends (...args: unknown[]) => void>(func: T, limit: number): T;
export declare function formatDate(date: Date | string, locale?: string): string;
export declare function formatDateTime(date: Date | string, locale?: string): string;
export declare function getRelativeTime(date: Date | string, locale?: string): string;
export declare function formatCurrency(amount: number, currency?: string, locale?: string): string;
export declare function formatNumber(number: number, locale?: string): string;
export declare function assertString(value: unknown, message?: string): asserts value is string;
export declare function assertNumber(value: unknown, message?: string): asserts value is number;
export declare function assertBoolean(value: unknown, message?: string): asserts value is boolean;
export declare function assertDefined<T>(value: T | null | undefined, message?: string): asserts value is T;
//# sourceMappingURL=utils.d.ts.map
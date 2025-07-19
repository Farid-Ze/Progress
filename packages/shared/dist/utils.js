/**
 * Utility functions for TypeScript development
 * Provides type-safe utilities and helpers
 */
// ============================================================================
// Type Guards
// ============================================================================
export function isString(value) {
    return typeof value === 'string';
}
export function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
}
export function isBoolean(value) {
    return typeof value === 'boolean';
}
export function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export function isArray(value) {
    return Array.isArray(value);
}
export function isDefined(value) {
    return value !== null && value !== undefined;
}
export function isNotEmpty(value) {
    if (!isDefined(value))
        return false;
    if (isString(value))
        return value.trim().length > 0;
    if (isArray(value))
        return value.length > 0;
    if (isObject(value))
        return Object.keys(value).length > 0;
    return true;
}
// ============================================================================
// Validation Utilities
// ============================================================================
export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch {
        return false;
    }
}
export function isValidId(id) {
    return isString(id) && id.length > 0;
}
// ============================================================================
// Object Utilities
// ============================================================================
export function pick(obj, keys) {
    const result = {};
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
export function omit(obj, keys) {
    const result = { ...obj };
    keys.forEach(key => {
        delete result[key];
    });
    return result;
}
export function deepClone(obj) {
    if (obj === null || typeof obj !== 'object')
        return obj;
    if (obj instanceof Date)
        return new Date(obj.getTime());
    if (obj instanceof Array)
        return obj.map(item => deepClone(item));
    if (typeof obj === 'object') {
        const clonedObj = {};
        Object.keys(obj).forEach(key => {
            clonedObj[key] = deepClone(obj[key]);
        });
        return clonedObj;
    }
    return obj;
}
// ============================================================================
// Array Utilities
// ============================================================================
export function uniqueBy(array, key) {
    const seen = new Set();
    return array.filter(item => {
        const value = item[key];
        if (seen.has(value))
            return false;
        seen.add(value);
        return true;
    });
}
export function groupBy(array, key) {
    return array.reduce((groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {});
}
// ============================================================================
// Async Utilities
// ============================================================================
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export async function retry(fn, maxAttempts = 3, delay = 1000) {
    let lastError;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            return await fn();
        }
        catch (error) {
            lastError = error;
            if (attempt === maxAttempts)
                break;
            await sleep(delay * attempt);
        }
    }
    throw lastError;
}
// ============================================================================
// Error Handling
// ============================================================================
export class AppError extends Error {
    code;
    statusCode;
    details;
    constructor(code, message, statusCode = 500, details) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        this.name = 'AppError';
    }
}
export class ValidationError extends AppError {
    field;
    value;
    constructor(message, field, value) {
        super('VALIDATION_ERROR', message, 400, { field, value });
        this.field = field;
        this.value = value;
        this.name = 'ValidationError';
    }
}
export class NotFoundError extends AppError {
    constructor(resource, id) {
        super('NOT_FOUND', `${resource}${id ? ` with id ${id}` : ''} not found`, 404);
        this.name = 'NotFoundError';
    }
}
// ============================================================================
// Performance Utilities
// ============================================================================
export function debounce(func, wait) {
    let timeout;
    return ((...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    });
}
export function throttle(func, limit) {
    let inThrottle;
    return ((...args) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    });
}
// ============================================================================
// Date Utilities
// ============================================================================
export function formatDate(date, locale = 'id-ID') {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleDateString(locale);
}
export function formatDateTime(date, locale = 'id-ID') {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString(locale);
}
export function getRelativeTime(date, locale = 'id-ID') {
    const d = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays > 0)
        return formatter.format(-diffDays, 'day');
    if (diffHours > 0)
        return formatter.format(-diffHours, 'hour');
    if (diffMinutes > 0)
        return formatter.format(-diffMinutes, 'minute');
    return formatter.format(-diffSeconds, 'second');
}
// ============================================================================
// Currency Utilities
// ============================================================================
export function formatCurrency(amount, currency = 'IDR', locale = 'id-ID') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
    }).format(amount);
}
export function formatNumber(number, locale = 'id-ID') {
    return new Intl.NumberFormat(locale).format(number);
}
// ============================================================================
// Type Assertion Utilities
// ============================================================================
export function assertString(value, message) {
    if (!isString(value)) {
        throw new ValidationError(message || 'Value must be a string', 'value', value);
    }
}
export function assertNumber(value, message) {
    if (!isNumber(value)) {
        throw new ValidationError(message || 'Value must be a number', 'value', value);
    }
}
export function assertBoolean(value, message) {
    if (!isBoolean(value)) {
        throw new ValidationError(message || 'Value must be a boolean', 'value', value);
    }
}
export function assertDefined(value, message) {
    if (!isDefined(value)) {
        throw new ValidationError(message || 'Value must be defined', 'value', value);
    }
}
//# sourceMappingURL=utils.js.map
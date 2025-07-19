/**
 * Global type definitions for Merajut ASA platform
 * These types are available across all packages and applications
 */

// Additional utility types
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export {};

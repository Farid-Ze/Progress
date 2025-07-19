/**
 * Type-safe React hooks for Merajut ASA
 * Provides comprehensive type safety for React development
 */
export interface AsyncState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}
export interface UseAsyncOptions {
    immediate?: boolean;
    onSuccess?: (data: unknown) => void;
    onError?: (error: Error) => void;
}
export declare function useAsync<T>(asyncFunction: () => Promise<T>, dependencies?: React.DependencyList, options?: UseAsyncOptions): AsyncState<T> & {
    execute: () => Promise<void>;
    reset: () => void;
};
export declare function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void];
export declare function useDebounce<T>(value: T, delay: number): T;
export declare function usePrevious<T>(value: T): T | undefined;
export declare function useToggle(initialValue?: boolean): [boolean, () => void, (value: boolean) => void];
export interface UseCounterOptions {
    min?: number;
    max?: number;
    step?: number;
}
export declare function useCounter(initialValue?: number, options?: UseCounterOptions): {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    set: (value: number) => void;
};
export declare function useBoolean(initialValue?: boolean): {
    value: boolean;
    setTrue: () => void;
    setFalse: () => void;
    toggle: () => void;
    setValue: (value: boolean) => void;
};
export declare function useArray<T>(initialValue?: T[]): {
    value: T[];
    push: (...items: T[]) => void;
    remove: (index: number) => void;
    clear: () => void;
    set: (newArray: T[]) => void;
    update: (index: number, item: T) => void;
    filter: (predicate: (item: T, index: number) => boolean) => void;
};
export declare function useCopyToClipboard(): {
    copy: (text: string) => Promise<boolean>;
    copied: boolean;
};
export declare function useOutsideClick<T extends HTMLElement>(callback: () => void): React.RefObject<T>;
export interface WindowSize {
    width: number | undefined;
    height: number | undefined;
}
export declare function useWindowSize(): WindowSize;
export declare function useMediaQuery(query: string): boolean;
export declare function useIntersectionObserver(options?: IntersectionObserverInit): [React.RefObject<Element>, boolean];
export interface UseFormOptions<T> {
    initialValues: T;
    validate?: (values: T) => Partial<Record<keyof T, string>>;
    onSubmit?: (values: T) => void | Promise<void>;
}
export declare function useForm<T extends Record<string, unknown>>(options: UseFormOptions<T>): {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    setValue: (name: keyof T, value: T[keyof T]) => void;
    setFieldTouched: (name: keyof T) => void;
    validate: () => boolean;
    handleSubmit: (event?: React.FormEvent) => Promise<void>;
    reset: () => void;
};
//# sourceMappingURL=index.d.ts.map
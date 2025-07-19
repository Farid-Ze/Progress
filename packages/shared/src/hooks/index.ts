/**
 * Type-safe React hooks for Merajut ASA
 * Provides comprehensive type safety for React development
 */

import { useCallback, useEffect, useRef, useState } from 'react';

// ============================================================================
// Async State Hook
// ============================================================================

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

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  dependencies: React.DependencyList = [],
  options: UseAsyncOptions = {}
): AsyncState<T> & { execute: () => Promise<void>; reset: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
      options.onSuccess?.(data);
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      setState({ data: null, loading: false, error: err });
      options.onError?.(err);
    }
  }, dependencies);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (options.immediate !== false) {
      execute();
    }
  }, [execute, options.immediate]);

  return { ...state, execute, reset };
}

// ============================================================================
// Local Storage Hook
// ============================================================================

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue(prev => {
        const valueToStore = typeof newValue === 'function' 
          ? (newValue as (prev: T) => T)(prev)
          : newValue;
        
        if (typeof window !== 'undefined') {
          try {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          } catch (error) {
            console.warn(`Failed to save to localStorage:`, error);
          }
        }
        
        return valueToStore;
      });
    },
    [key]
  );

  const removeStoredValue = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key);
        setValue(defaultValue);
      } catch (error) {
        console.warn(`Failed to remove from localStorage:`, error);
      }
    }
  }, [key, defaultValue]);

  return [value, setStoredValue, removeStoredValue];
}

// ============================================================================
// Debounced Value Hook
// ============================================================================

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// ============================================================================
// Previous Value Hook
// ============================================================================

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  
  useEffect(() => {
    ref.current = value;
  });
  
  return ref.current;
}

// ============================================================================
// Toggle Hook
// ============================================================================

export function useToggle(
  initialValue = false
): [boolean, () => void, (value: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue(v => !v), []);
  const setToggle = useCallback((value: boolean) => setValue(value), []);

  return [value, toggle, setToggle];
}

// ============================================================================
// Counter Hook
// ============================================================================

export interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

export function useCounter(
  initialValue = 0,
  options: UseCounterOptions = {}
): {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
} {
  const { min, max, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(prev => {
      const next = prev + step;
      return max !== undefined ? Math.min(next, max) : next;
    });
  }, [step, max]);

  const decrement = useCallback(() => {
    setCount(prev => {
      const next = prev - step;
      return min !== undefined ? Math.max(next, min) : next;
    });
  }, [step, min]);

  const reset = useCallback(() => setCount(initialValue), [initialValue]);

  const set = useCallback((value: number) => {
    setCount(value);
  }, []);

  return { count, increment, decrement, reset, set };
}

// ============================================================================
// Boolean State Hook
// ============================================================================

export function useBoolean(
  initialValue = false
): {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: (value: boolean) => void;
} {
  const [value, setValue] = useState(initialValue);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(v => !v), []);

  return { value, setTrue, setFalse, toggle, setValue };
}

// ============================================================================
// Array State Hook
// ============================================================================

export function useArray<T>(
  initialValue: T[] = []
): {
  value: T[];
  push: (...items: T[]) => void;
  remove: (index: number) => void;
  clear: () => void;
  set: (newArray: T[]) => void;
  update: (index: number, item: T) => void;
  filter: (predicate: (item: T, index: number) => boolean) => void;
} {
  const [value, setValue] = useState<T[]>(initialValue);

  const push = useCallback((...items: T[]) => {
    setValue(prev => [...prev, ...items]);
  }, []);

  const remove = useCallback((index: number) => {
    setValue(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setValue([]), []);

  const set = useCallback((newArray: T[]) => setValue(newArray), []);

  const update = useCallback((index: number, item: T) => {
    setValue(prev => prev.map((prevItem, i) => i === index ? item : prevItem));
  }, []);

  const filter = useCallback((predicate: (item: T, index: number) => boolean) => {
    setValue(prev => prev.filter(predicate));
  }, []);

  return { value, push, remove, clear, set, update, filter };
}

// ============================================================================
// Copy to Clipboard Hook
// ============================================================================

export function useCopyToClipboard(): {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
} {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      setCopied(false);
      return false;
    }
  }, []);

  return { copy, copied };
}

// ============================================================================
// Outside Click Hook
// ============================================================================

export function useOutsideClick<T extends HTMLElement>(
  callback: () => void
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [callback]);

  return ref;
}

// ============================================================================
// Window Size Hook
// ============================================================================

export interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(): WindowSize {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// ============================================================================
// Media Query Hook
// ============================================================================

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    const updateMatch = () => setMatches(media.matches);
    updateMatch();

    if (media.addListener) {
      media.addListener(updateMatch);
      return () => media.removeListener(updateMatch);
    } else {
      media.addEventListener('change', updateMatch);
      return () => media.removeEventListener('change', updateMatch);
    }
  }, [query]);

  return matches;
}

// ============================================================================
// Intersection Observer Hook
// ============================================================================

export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<Element>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<Element>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry) {
        setIsIntersecting(entry.isIntersecting);
      }
    }, options);

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
}

// ============================================================================
// Form Hook
// ============================================================================

export interface UseFormOptions<T> {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit?: (values: T) => void | Promise<void>;
}

export function useForm<T extends Record<string, unknown>>(
  options: UseFormOptions<T>
) {
  const [values, setValues] = useState<T>(options.initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((name: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  }, [errors]);

  const setFieldTouched = useCallback((name: keyof T) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  }, []);

  const validate = useCallback(() => {
    if (!options.validate) return true;
    
    const validationErrors = options.validate(values);
    setErrors(validationErrors);
    
    return Object.keys(validationErrors).length === 0;
  }, [values, options.validate]);

  const handleSubmit = useCallback(async (event?: React.FormEvent) => {
    event?.preventDefault();
    
    if (!validate() || !options.onSubmit) return;
    
    setIsSubmitting(true);
    try {
      await options.onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [validate, options.onSubmit, values]);

  const reset = useCallback(() => {
    setValues(options.initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [options.initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setFieldTouched,
    validate,
    handleSubmit,
    reset,
  };
}

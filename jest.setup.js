// Global test setup for the entire workspace

// Extend Jest matchers for better assertions
import 'jest-extended';

// Configure Jest DOM matchers for React components
import '@testing-library/jest-dom';

// Configure axe for accessibility testing
import { configureAxe } from 'jest-axe';

// Configure fetch for testing APIs
import 'whatwg-fetch';

// Global test configuration
beforeAll(() => {
  // Configure console error/warning handling in tests
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args) => {
    // Filter out React Testing Library warnings that are expected
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
  
  console.warn = (...args) => {
    // Filter out specific warnings that are expected in tests
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('componentWillReceiveProps') ||
       args[0].includes('componentWillUpdate'))
    ) {
      return;
    }
    originalWarn.call(console, ...args);
  };
});

// Configure accessibility testing
const axeConfig = configureAxe({
  rules: {
    // Disable color-contrast rule for tests (often false positives)
    'color-contrast': { enabled: false },
    // Disable landmark rules for test components
    'region': { enabled: false }
  }
});

// Global test utilities
global.axeConfig = axeConfig;

// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3001';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.REDIS_URL = 'redis://localhost:6379';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';

// Global timeout for tests
jest.setTimeout(30000);

// Mock Next.js router for tests
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn(),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    };
  },
}));

// Mock Next.js navigation for App Router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver for components that use it
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock ResizeObserver for components that use it
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Clean up after each test
afterEach(() => {
  // Clean up any timers
  jest.clearAllTimers();
  
  // Clean up any mocks
  jest.clearAllMocks();
});

// Clean up after all tests
afterAll(() => {
  // Restore console methods
  jest.restoreAllMocks();
});

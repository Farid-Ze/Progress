// Jest setup specifically for the web application

// Import global setup using ES6 imports
import '../../../jest.setup.js';

// Configure React Testing Library
import { configure, prettyDOM } from '@testing-library/react';

// Configure Testing Library for better debugging
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 5000,
  // Show suggestions for better queries
  getElementError: (message, container) => {
    const prettifiedDOM = prettyDOM(container);
    const error = new Error(
      [
        message,
        `Here's the full DOM for debugging:`,
        prettifiedDOM,
      ].join('\n\n')
    );
    return error;
  },
});

// Mock Next.js Image component for tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock Next.js Link component for tests
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// Mock Chakra UI's useColorMode hook
jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useColorMode: () => ({
    colorMode: 'light',
    toggleColorMode: jest.fn(),
    setColorMode: jest.fn(),
  }),
  useColorModeValue: (light, _dark) => light,
}));

// Mock window.location for tests
delete window.location;
window.location = {
  href: 'http://localhost:3000',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/',
  search: '',
  hash: '',
  assign: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
};

// Mock localStorage for tests
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock sessionStorage for tests
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.sessionStorage = sessionStorageMock;

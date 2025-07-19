module.exports = {
  // Use TypeScript preset for better TypeScript support
  preset: 'ts-jest',
  
  // Test environment
  testEnvironment: 'node',
  
  // Root directory for tests
  rootDir: '.',
  
  // Test match patterns
  testMatch: [
    '<rootDir>/apps/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/apps/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/packages/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/packages/**/*.{test,spec}.{js,jsx,ts,tsx}'
  ],
  
  // Transform patterns
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json'
    }],
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  
  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  
  // Module name mapping for path aliases
  moduleNameMapper: {
    '^@merajut-asa/shared$': '<rootDir>/packages/shared/src',
    '^@merajut-asa/ui$': '<rootDir>/packages/ui/src',
    '^@merajut-asa/performance$': '<rootDir>/packages/performance/src',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // Coverage configuration
  collectCoverage: false, // Enable when needed
  collectCoverageFrom: [
    'apps/**/*.{ts,tsx}',
    'packages/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/build/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.js',
    '!**/babel.config.js'
  ],
  
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Test path ignore patterns
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/.next/',
    '/coverage/'
  ],
  
  // Global test timeout
  testTimeout: 10000,
  
  // Projects configuration for workspace testing
  projects: [
    {
      displayName: 'api-gateway',
      testMatch: ['<rootDir>/apps/api-gateway/**/*.{test,spec}.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      moduleNameMapper: {
        '^@merajut-asa/shared$': '<rootDir>/packages/shared/src'
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/api-gateway/tsconfig.json'
        }]
      }
    },
    {
      displayName: 'auth-service',
      testMatch: ['<rootDir>/apps/services/auth-service/**/*.{test,spec}.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      moduleNameMapper: {
        '^@merajut-asa/shared$': '<rootDir>/packages/shared/src'
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/services/auth-service/tsconfig.json'
        }]
      }
    },
    {
      displayName: 'campaign-service',
      testMatch: ['<rootDir>/apps/services/campaign-service/**/*.{test,spec}.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      moduleNameMapper: {
        '^@merajut-asa/shared$': '<rootDir>/packages/shared/src'
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/services/campaign-service/tsconfig.json'
        }]
      }
    },
    {
      displayName: 'community-service',
      testMatch: ['<rootDir>/apps/services/community-service/**/*.{test,spec}.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      moduleNameMapper: {
        '^@merajut-asa/shared$': '<rootDir>/packages/shared/src'
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/services/community-service/tsconfig.json'
        }]
      }
    },
    {
      displayName: 'payment-service',
      testMatch: ['<rootDir>/apps/services/payment-service/**/*.{test,spec}.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      moduleNameMapper: {
        '^@merajut-asa/shared$': '<rootDir>/packages/shared/src'
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/services/payment-service/tsconfig.json'
        }]
      }
    },
    {
      displayName: 'user-service',
      testMatch: ['<rootDir>/apps/services/user-service/**/*.{test,spec}.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      moduleNameMapper: {
        '^@merajut-asa/shared$': '<rootDir>/packages/shared/src'
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/services/user-service/tsconfig.json'
        }]
      }
    },
    {
      displayName: 'web',
      testMatch: ['<rootDir>/apps/web/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      testEnvironment: 'jsdom',
      preset: 'ts-jest',
      setupFilesAfterEnv: ['<rootDir>/apps/web/jest.setup.js'],
      moduleNameMapper: {
        '^@merajut-asa/shared$': '<rootDir>/packages/shared/src',
        '^@merajut-asa/ui$': '<rootDir>/packages/ui/src',
        '^@/(.*)$': '<rootDir>/apps/web/src/$1'
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/apps/web/tsconfig.json',
          jsx: 'react-jsx'
        }]
      }
    },
    {
      displayName: 'ui-package',
      testMatch: ['<rootDir>/packages/ui/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      testEnvironment: 'jsdom',
      preset: 'ts-jest',
      setupFilesAfterEnv: ['<rootDir>/packages/ui/jest.setup.js'],
      moduleNameMapper: {
        '^@merajut-asa/shared$': '<rootDir>/packages/shared/src',
        '^@/(.*)$': '<rootDir>/packages/ui/src/$1'
      },
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/packages/ui/tsconfig.json',
          jsx: 'react-jsx'
        }]
      }
    },
    {
      displayName: 'shared-package',
      testMatch: ['<rootDir>/packages/shared/**/*.{test,spec}.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/packages/shared/tsconfig.json'
        }]
      }
    },
    {
      displayName: 'performance-package',
      testMatch: ['<rootDir>/packages/performance/**/*.{test,spec}.{js,ts}'],
      testEnvironment: 'node',
      preset: 'ts-jest',
      transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
          tsconfig: '<rootDir>/packages/performance/tsconfig.json'
        }]
      }
    }
  ],
  
  // Global configuration for all projects
  // Verbose output
  verbose: true,
  
  // Fail on deprecated warnings
  errorOnDeprecated: true,
  
  // Clear mocks between tests
  clearMocks: true,
  
  // Restore mocks after each test
  restoreMocks: true
};

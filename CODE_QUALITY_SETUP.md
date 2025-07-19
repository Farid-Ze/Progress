# Code Quality and Testing Setup

This document outlines the comprehensive ESLint, Prettier, and Jest configuration for the Merajut ASA platform.

## Overview

The project now includes:
- **ESLint** for code linting and quality checks
- **Prettier** for consistent code formatting
- **Jest** for comprehensive testing with React Testing Library
- **TypeScript** integration across all tools

## ESLint Configuration

### Features
- TypeScript support with `@typescript-eslint/parser` and `@typescript-eslint/eslint-plugin`
- React and React Hooks rules
- Import organization and validation
- Accessibility checks with `jsx-a11y`
- Jest testing rules

### Key Rules
- Import ordering and organization
- TypeScript strict checks
- React best practices
- Accessibility requirements
- Unused variable detection
- Console statement warnings

### Usage
```bash
# Lint all files
npm run lint

# Fix auto-fixable issues
npm run lint:fix

# Run turbo-based linting across packages
npm run lint:turbo
```

### Configuration Files
- `.eslintrc.js` - Main ESLint configuration
- Extends from recommended presets for TypeScript, React, and accessibility

## Prettier Configuration

### Features
- Consistent code formatting across TypeScript, JavaScript, JSON, and Markdown
- Integration with ESLint to avoid conflicts
- Custom rules for different file types

### Settings
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "jsxSingleQuote": true,
  "arrowParens": "avoid"
}
```

### Usage
```bash
# Check formatting
npm run format:check

# Fix formatting
npm run format

# Format specific files
npx prettier --write "src/**/*.{ts,tsx,js,jsx}"
```

### Configuration Files
- `.prettierrc.json` - Main Prettier configuration
- `.prettierignore` - Files to exclude from formatting

## Jest Testing Configuration

### Features
- Multi-project setup for monorepo
- TypeScript support with ts-jest
- React Testing Library for component testing
- Jest-axe for accessibility testing
- Supertest for API endpoint testing
- JSDOM environment for React components
- Node environment for backend services

### Project Structure
The Jest configuration includes separate projects for:
- **API Gateway** - Backend API testing
- **Services** - Microservice testing (auth, campaign, community, payment, user)
- **Web App** - React component and page testing
- **UI Package** - Component library testing
- **Shared Package** - Utility and type testing
- **Performance Package** - Performance monitoring testing

### Usage
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD
npm run test:ci

# Run specific project tests
npm test -- --selectProjects=web
npm test -- --selectProjects=ui-package
```

### Test File Examples

#### Component Testing
```typescript
// React component test
import { render, screen, fireEvent } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MyComponent from './MyComponent';

expect.extend(toHaveNoViolations);

test('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### API Testing
```typescript
// API endpoint test
import request from 'supertest';
import app from './app';

test('GET /api/campaigns', async () => {
  const response = await request(app)
    .get('/api/campaigns')
    .expect(200);
    
  expect(response.body.success).toBe(true);
});
```

#### Unit Testing
```typescript
// Utility function test
import { formatCurrency } from './utils';

test('formats currency correctly', () => {
  expect(formatCurrency(1000000, 'IDR')).toBe('Rp 1.000.000');
});
```

### Test Setup Files
- `jest.setup.js` - Global test configuration
- `apps/web/jest.setup.js` - Web app specific setup
- `packages/ui/jest.setup.js` - UI package specific setup

### Mock Configurations
Global mocks include:
- Next.js router and navigation
- Chakra UI color mode
- Window APIs (matchMedia, IntersectionObserver, ResizeObserver)
- localStorage and sessionStorage
- Environment variables

## IDE Integration

### VS Code Extensions
Recommended extensions for optimal development experience:
- ESLint
- Prettier - Code formatter
- Jest
- Jest Runner
- TypeScript Importer

### Settings
The project includes VS Code settings for:
- Auto-formatting on save
- ESLint integration
- TypeScript path mapping
- Jest test discovery

## Scripts Reference

### Package.json Scripts
```json
{
  "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
  "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
  "format": "prettier --write .",
  "format:check": "prettier --check .",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:ci": "jest --ci --coverage --watchAll=false"
}
```

### Turbo Scripts
```json
{
  "lint:turbo": "turbo run lint",
  "test:projects": "turbo run test",
  "type-check:turbo": "turbo run type-check"
}
```

## CI/CD Integration

### GitHub Actions
The configuration works with CI/CD pipelines:

```yaml
- name: Lint code
  run: npm run lint

- name: Check formatting
  run: npm run format:check

- name: Run tests
  run: npm run test:ci

- name: Type check
  run: npm run type-check
```

### Pre-commit Hooks
With Husky integration:
```json
{
  "pre-commit": "npm run lint:fix && npm run format && npm run type-check"
}
```

## Troubleshooting

### Common Issues

1. **ESLint Parser Errors**
   - Ensure TypeScript configuration is correct
   - Check that all TypeScript projects are included in `parserOptions.project`

2. **Jest Module Resolution**
   - Verify `moduleNameMapper` paths match your project structure
   - Check that all required dependencies are installed

3. **Prettier Conflicts**
   - ESLint and Prettier are configured to work together
   - Use `eslint-config-prettier` to disable conflicting rules

4. **Test Environment Issues**
   - React components require `jsdom` environment
   - Backend code requires `node` environment
   - Check project-specific Jest configurations

### Performance Optimization
- Use `--maxWorkers=50%` for Jest in CI environments
- Enable ESLint caching with `--cache`
- Use incremental TypeScript builds

## Best Practices

### Code Quality
1. Always run linting before committing
2. Use TypeScript strict mode
3. Write tests for new features
4. Ensure accessibility compliance
5. Follow import organization rules

### Testing
1. Test user interactions, not implementation details
2. Use accessibility testing with jest-axe
3. Mock external dependencies appropriately
4. Maintain good test coverage
5. Write descriptive test names

### Formatting
1. Let Prettier handle all formatting
2. Don't fight the formatter
3. Use consistent naming conventions
4. Organize imports logically

This setup provides a robust foundation for maintaining code quality and reliability across the entire Merajut ASA platform.

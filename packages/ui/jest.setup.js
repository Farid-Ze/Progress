const { configure } = require('@testing-library/react');
const { toHaveNoViolations } = require('jest-axe');

require('@testing-library/jest-dom');

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

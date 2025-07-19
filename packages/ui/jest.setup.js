import { configure } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

import '@testing-library/jest-dom';

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

// Add jest-axe matchers
expect.extend(toHaveNoViolations);

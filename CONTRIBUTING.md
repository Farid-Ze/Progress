# Contributing to Merajut ASA

Thank you for your interest in contributing to Merajut ASA! This guide will help you understand how to contribute effectively to our project.

## 🎯 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🤝 How to Contribute

### 1. Fork the Repository

Fork the repository to your own GitHub account and clone it locally:

```bash
git clone https://github.com/your-username/merajut-asa.git
cd merajut-asa
```

### 2. Set Up Development Environment

Follow the [Quick Start guide](README.md#quick-start) to set up your development environment.

### 3. Create a Branch

Create a new branch for your contribution:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
# or
git checkout -b docs/your-documentation-update
```

### 4. Make Your Changes

Make your changes following our coding standards and guidelines.

### 5. Test Your Changes

Ensure all tests pass:

```bash
npm run test
npm run test:e2e
npm run lint
npm run type-check
```

### 6. Commit Your Changes

Use conventional commit messages:

```bash
git commit -m "feat: add new campaign creation flow"
git commit -m "fix: resolve payment processing issue"
git commit -m "docs: update API documentation"
```

### 7. Push and Create Pull Request

Push your changes and create a pull request:

```bash
git push origin feature/your-feature-name
```

## 📝 Commit Message Format

We use [Conventional Commits](https://conventionalcommits.org/) for commit messages:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **security**: Security improvements

### Examples:

```bash
feat(auth): add OAuth2 integration
fix(payment): resolve Stripe webhook validation
docs(api): update GraphQL schema documentation
style(ui): improve button component styling
refactor(database): optimize campaign queries
perf(frontend): lazy load campaign images
test(auth): add unit tests for login flow
build(docker): update Node.js version to 18
ci(github): add performance testing workflow
chore(deps): update dependencies
security(auth): implement rate limiting
```

## 🎨 Coding Standards

### TypeScript Guidelines

- Use TypeScript for all new code
- Enable strict mode
- Prefer interfaces over types for object shapes
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

```typescript
// Good
interface CampaignData {
  title: string;
  description: string;
  goalAmount: number;
  endDate: Date;
}

/**
 * Creates a new campaign with the provided data
 * @param data - Campaign data
 * @returns Promise resolving to created campaign
 */
async function createCampaign(data: CampaignData): Promise<Campaign> {
  // Implementation
}

// Avoid
const createCampaign = (data: any) => {
  // Implementation
}
```

### React Guidelines

- Use functional components with hooks
- Prefer composition over inheritance
- Use TypeScript for props and state
- Implement proper error boundaries
- Use React.memo() for performance optimization

```typescript
// Good
interface CampaignCardProps {
  campaign: Campaign;
  onDonate: (amount: number) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDonate }) => {
  const handleDonate = useCallback((amount: number) => {
    onDonate(amount);
  }, [onDonate]);

  return (
    <div className="campaign-card">
      {/* Component content */}
    </div>
  );
};

export default React.memo(CampaignCard);
```

### CSS Guidelines

- Use Tailwind CSS for styling
- Create custom components for reusable styles
- Follow mobile-first approach
- Use CSS custom properties for theming
- Maintain consistent spacing and typography

```css
/* Good */
.btn-primary {
  @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200;
}

/* Use semantic class names */
.campaign-card {
  @apply bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200;
}
```

### Backend Guidelines

- Use TypeScript for all backend code
- Implement proper error handling
- Use validation for all inputs
- Follow RESTful API design principles
- Implement proper logging

```typescript
// Good
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const createCampaignValidator = [
  body('title').trim().isLength({ min: 1, max: 255 }).escape(),
  body('description').trim().isLength({ min: 1, max: 5000 }).escape(),
  body('goalAmount').isFloat({ min: 0.01 }),
  body('endDate').isISO8601().toDate(),
];

export const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const campaign = await campaignService.create(req.body);
    res.status(201).json(campaign);
  } catch (error) {
    next(error);
  }
};
```

## 🧪 Testing Guidelines

### Unit Tests

- Write unit tests for all business logic
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Aim for 80%+ code coverage

```typescript
// Good
describe('Campaign Service', () => {
  describe('createCampaign', () => {
    it('should create a campaign with valid data', async () => {
      // Arrange
      const campaignData = {
        title: 'Test Campaign',
        description: 'Test Description',
        goalAmount: 1000,
        endDate: new Date('2024-12-31'),
      };

      // Act
      const result = await campaignService.create(campaignData);

      // Assert
      expect(result).toBeDefined();
      expect(result.title).toBe(campaignData.title);
      expect(result.status).toBe('draft');
    });

    it('should throw error with invalid data', async () => {
      // Arrange
      const invalidData = { title: '' };

      // Act & Assert
      await expect(campaignService.create(invalidData)).rejects.toThrow(
        'Invalid campaign data'
      );
    });
  });
});
```

### Integration Tests

- Test API endpoints
- Test database operations
- Test external service integrations
- Use test databases

```typescript
// Good
describe('Campaign API', () => {
  beforeEach(async () => {
    await setupTestDatabase();
  });

  afterEach(async () => {
    await cleanupTestDatabase();
  });

  it('POST /api/campaigns should create a campaign', async () => {
    const campaignData = {
      title: 'Test Campaign',
      description: 'Test Description',
      goalAmount: 1000,
      endDate: '2024-12-31',
    };

    const response = await request(app)
      .post('/api/campaigns')
      .send(campaignData)
      .expect(201);

    expect(response.body.title).toBe(campaignData.title);
  });
});
```

### E2E Tests

- Test critical user flows
- Test across different browsers
- Use Page Object Model pattern
- Include accessibility testing

```typescript
// Good
import { test, expect } from '@playwright/test';

test.describe('Campaign Creation Flow', () => {
  test('should create a campaign successfully', async ({ page }) => {
    // Navigate to campaign creation page
    await page.goto('/campaigns/create');

    // Fill in campaign details
    await page.fill('[data-testid="title-input"]', 'Test Campaign');
    await page.fill('[data-testid="description-input"]', 'Test Description');
    await page.fill('[data-testid="goal-amount-input"]', '1000');
    await page.fill('[data-testid="end-date-input"]', '2024-12-31');

    // Submit form
    await page.click('[data-testid="submit-button"]');

    // Verify success
    await expect(page).toHaveURL(/\/campaigns\/.+/);
    await expect(page.locator('[data-testid="campaign-title"]')).toContainText('Test Campaign');
  });
});
```

## 🔒 Security Guidelines

### Authentication & Authorization

- Always validate user permissions
- Use JWT tokens with proper expiration
- Implement rate limiting
- Sanitize user inputs

### Data Protection

- Encrypt sensitive data
- Use HTTPS in production
- Implement proper session management
- Follow GDPR guidelines

### API Security

- Validate all inputs
- Use parameterized queries
- Implement CORS properly
- Add security headers

```typescript
// Good
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));
```

## 🎯 Performance Guidelines

### Frontend Performance

- Optimize images and assets
- Use lazy loading
- Implement code splitting
- Monitor Core Web Vitals

### Backend Performance

- Optimize database queries
- Use caching strategies
- Implement proper indexing
- Monitor response times

### Bundle Size

- Keep JavaScript bundles under 250KB
- Use tree shaking
- Optimize dependencies
- Monitor bundle analyzer

## ♿ Accessibility Guidelines

### WCAG Compliance

- Ensure WCAG 2.1 AA compliance
- Use semantic HTML
- Provide alternative text for images
- Ensure keyboard navigation

### Testing

- Use automated accessibility testing
- Test with screen readers
- Verify color contrast
- Test keyboard navigation

```typescript
// Good
<button
  aria-label="Donate to this campaign"
  onClick={handleDonate}
  className="btn-primary"
>
  Donate Now
</button>

<img
  src={campaign.image}
  alt={`Campaign image for ${campaign.title}`}
  loading="lazy"
/>
```

## 📊 Performance Monitoring

### Core Web Vitals

- Largest Contentful Paint (LCP) < 2.5s
- First Input Delay (FID) < 100ms
- Cumulative Layout Shift (CLS) < 0.1

### Monitoring Tools

- Use Lighthouse CI
- Monitor real user metrics
- Set up performance budgets
- Track error rates

## 🚀 Deployment Guidelines

### Staging

- Test all changes in staging
- Run E2E tests
- Verify performance metrics
- Check security scans

### Production

- Use blue-green deployments
- Monitor health checks
- Have rollback plan
- Notify stakeholders

## 📞 Getting Help

### Questions

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Join our Discord community
- Email us at dev@merajutasa.com

### Reporting Issues

- Use GitHub Issues
- Provide detailed reproduction steps
- Include relevant logs and screenshots
- Tag with appropriate labels

### Feature Requests

- Create a GitHub Issue
- Describe the problem you're solving
- Provide use cases
- Include mockups if applicable

## 🏆 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes
- Annual contributor awards
- LinkedIn recommendations

## 📄 License

By contributing to Merajut ASA, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Merajut ASA! Your efforts help make crowdfunding more accessible and effective for communities worldwide. 🙏

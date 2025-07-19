# CI/CD Pipeline Configuration

This repository uses GitHub Actions for continuous integration and deployment.

## Required Setup

### Environment Variables
- `NODE_VERSION`: Node.js version (currently set to '18')
- `DOCKER_REGISTRY`: Container registry (ghcr.io)
- `IMAGE_NAME`: Docker image name (merajut-asa)

### Optional Secrets (for enhanced features)

The following secrets are optional and enable additional functionality:

#### Security Scanning
- **`SNYK_TOKEN`**: Required for Snyk vulnerability scanning
  - Get your token from [Snyk.io](https://snyk.io)
  - Add to repository secrets at: Settings → Secrets and variables → Actions
  - If not configured, security scanning step will be skipped

#### Deployment Notifications
- **`SLACK_WEBHOOK`**: Required for Slack deployment notifications
  - Create webhook in your Slack workspace
  - Add to repository secrets
  - If not configured, notifications will be skipped

#### Performance Monitoring
- **`LHCI_GITHUB_APP_TOKEN`**: Required for Lighthouse CI performance audits
  - Configure Lighthouse CI GitHub App
  - Add token to repository secrets
  - If not configured, performance audits will be skipped

## Pipeline Stages

1. **Test and Lint**: Code quality checks and unit tests
2. **Security**: Vulnerability scanning (if configured)
3. **Build**: Create production builds
4. **Deploy Staging**: Deploy to staging environment (develop branch)
5. **Deploy Production**: Deploy to production (main branch)
6. **Performance**: Lighthouse audits (if configured)
7. **Notifications**: Slack alerts (if configured)

## Running Locally

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build project
npm run build

# Start development server
npm run dev
```

## Troubleshooting

- **"Context access might be invalid"** warnings: These are expected for optional secrets and won't break the pipeline
- **Security scanning failures**: Ensure SNYK_TOKEN is configured or accept that this step will be skipped
- **Deployment notification failures**: Ensure SLACK_WEBHOOK is configured or accept that notifications will be skipped

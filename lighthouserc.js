module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000',
        'http://localhost:3000/campaign/sample-campaign',
        'http://localhost:3000/auth/login',
        'http://localhost:3000/auth/register',
      ],
      startServerCommand: 'npm run build && npm run start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.85 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': ['warn', { minScore: 0.8 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],
        
        // Accessibility
        'color-contrast': 'error',
        'heading-order': 'error',
        'html-has-lang': 'error',
        'image-alt': 'error',
        'label': 'error',
        'link-name': 'error',
        
        // Best Practices
        'uses-https': 'error',
        'uses-http2': 'warn',
        'no-vulnerable-libraries': 'error',
        'is-on-https': 'error',
        
        // SEO
        'meta-description': 'error',
        'document-title': 'error',
        'robots-txt': 'warn',
        'canonical': 'warn',
        
        // PWA
        'service-worker': 'warn',
        'installable-manifest': 'warn',
        'splash-screen': 'warn',
        'themed-omnibox': 'warn',
        'content-width': 'warn',
        'viewport': 'error',
        
        // Performance Budget
        'resource-summary:document:size': ['error', { maxNumericValue: 50000 }],
        'resource-summary:script:size': ['error', { maxNumericValue: 250000 }],
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 50000 }],
        'resource-summary:image:size': ['warn', { maxNumericValue: 500000 }],
        'resource-summary:font:size': ['warn', { maxNumericValue: 100000 }],
        'resource-summary:total:size': ['warn', { maxNumericValue: 1000000 }],
        
        // Network
        'unused-css-rules': ['warn', { maxNumericValue: 20000 }],
        'unused-javascript': ['warn', { maxNumericValue: 40000 }],
        'render-blocking-resources': 'warn',
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        'efficient-animated-content': 'warn',
        'modern-image-formats': 'warn',
        'uses-optimized-images': 'warn',
        'uses-text-compression': 'error',
        'uses-responsive-images': 'warn',
        
        // Third-party
        'third-party-summary': 'warn',
        'third-party-facades': 'warn',
        
        // JavaScript
        'no-unload-listeners': 'error',
        'no-document-write': 'error',
        'dom-size': ['warn', { maxNumericValue: 1500 }],
        'critical-request-chains': 'warn',
        'user-timings': 'off',
        
        // Images
        'offscreen-images': 'warn',
        'properly-size-images': 'warn',
        'uses-webp-images': 'warn',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {
      port: 9090,
      storage: './lhci-data',
    },
  },
};

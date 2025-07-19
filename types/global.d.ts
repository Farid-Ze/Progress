/**
 * Global type definitions for Merajut ASA platform
 * These types are available across all packages and applications
 */

declare global {
  // Environment variables
  namespace NodeJS {
    interface ProcessEnv {
      // Common
      readonly NODE_ENV: 'development' | 'production' | 'test';
      PORT?: string;
      
      // Database
      DATABASE_URL: string;
      MONGODB_URI: string;
      REDIS_URL: string;
      
      // Authentication
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string;
      
      // Payment
      STRIPE_SECRET_KEY: string;
      STRIPE_WEBHOOK_SECRET: string;
      STRIPE_PUBLISHABLE_KEY: string;
      
      // Email
      SMTP_HOST: string;
      SMTP_PORT: string;
      SMTP_USER: string;
      SMTP_PASS: string;
      
      // File Upload
      UPLOAD_MAX_SIZE: string;
      ALLOWED_EXTENSIONS: string;
      
      // External APIs
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      FACEBOOK_CLIENT_ID: string;
      FACEBOOK_CLIENT_SECRET: string;
      
      // Analytics
      GOOGLE_ANALYTICS_ID?: string;
      MIXPANEL_TOKEN?: string;
      
      // Monitoring
      SENTRY_DSN?: string;
      NEW_RELIC_LICENSE_KEY?: string;
    }
  }

  // Extend Window for client-side globals
  interface Window {
    // Analytics
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    mixpanel?: {
      track: (event: string, properties?: Record<string, unknown>) => void;
      identify: (id: string) => void;
      people: {
        set: (properties: Record<string, unknown>) => void;
      };
    };
    
    // Performance monitoring
    webVitals?: {
      getCLS: (callback: (metric: unknown) => void) => void;
      getFID: (callback: (metric: unknown) => void) => void;
      getFCP: (callback: (metric: unknown) => void) => void;
      getLCP: (callback: (metric: unknown) => void) => void;
      getTTFB: (callback: (metric: unknown) => void) => void;
    };
    
    // Error tracking
    Sentry?: {
      captureException: (error: Error) => void;
      addBreadcrumb: (breadcrumb: Record<string, unknown>) => void;
    };
    
    // Accessibility
    axe?: {
      run: (context?: Element, options?: unknown) => Promise<unknown>;
    };
    
    // Development tools
    __MERAJUT_ASA_DEV_TOOLS__?: {
      store: unknown;
      debug: boolean;
    };
  }

  // Custom JSX namespace for component props
  namespace JSX {
    interface IntrinsicElements {
      // Custom elements for icons, animations, etc.
    }
  }
}

// Module augmentation for better type safety
declare module '*.svg' {
  const ReactComponent: any;
  const src: string;
  export { ReactComponent };
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.avif' {
  const content: string;
  export default content;
}

declare module '*.ico' {
  const content: string;
  export default content;
}

declare module '*.bmp' {
  const content: string;
  export default content;
}

// CSS Modules
declare module '*.module.css' {
  const classes: { [className: string]: string };
}

declare module '*.module.scss' {
  const classes: { [className: string]: string };
}

declare module '*.module.sass' {
  const classes: { [className: string]: string };
}

// JSON imports
declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}

// Web Workers
declare module 'worker-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
  }
  export default WebpackWorker;
}

// Extend fetch Response for better type safety
interface Response {
  json<T = unknown>(): Promise<T>;
}

// Make this a module
export {};

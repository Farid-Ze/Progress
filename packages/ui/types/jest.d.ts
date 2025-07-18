/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

declare module 'jest-axe' {
  export interface AxeMatchers<R = unknown> {
    toHaveNoViolations(): R;
  }
  export function axe(element: Element | Document): Promise<any>;
}

declare global {
  namespace jest {
    interface Matchers<R> extends AxeMatchers<R> {}
  }
}

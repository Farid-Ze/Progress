// Type declarations for jest-axe
declare module 'jest-axe' {
  export function axe(container: Element | Document): Promise<any>;
  export function toHaveNoViolations(received: any): any;
  export const configureAxe: (options: any) => any;
}

// Example test for shared utilities

import { formatCurrency, formatDate } from '../utils';

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly for IDR', () => {
      expect(formatCurrency(1000000, 'IDR')).toMatch(/Rp.*1\.000\.000/);
      expect(formatCurrency(500000, 'IDR')).toMatch(/Rp.*500\.000/);
      expect(formatCurrency(0, 'IDR')).toMatch(/Rp.*0/);
    });

    it('should format currency correctly for USD', () => {
      expect(formatCurrency(1000, 'USD', 'en-US')).toMatch(/\$1,000/);
      expect(formatCurrency(500.50, 'USD', 'en-US')).toMatch(/\$500\.50/);
    });

    it('should handle negative amounts', () => {
      expect(formatCurrency(-1000, 'IDR')).toMatch(/-.*Rp.*1\.000/);
    });
  });

  describe('formatDate', () => {
    it('should format date correctly with default locale', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date);
      expect(formatted).toMatch(/15\/1\/2024|15-1-2024/); // flexible matching for locale differences
    });

    it('should format date with custom locale', () => {
      const date = new Date('2024-01-15T10:30:00Z');
      const formatted = formatDate(date, 'en-US');
      expect(formatted).toMatch(/1\/15\/2024|15\/1\/2024/);
    });

    it('should handle string dates', () => {
      const dateStr = '2024-01-15T10:30:00Z';
      const formatted = formatDate(dateStr);
      expect(formatted).toMatch(/15\/1\/2024|15-1-2024/);
    });
  });
});

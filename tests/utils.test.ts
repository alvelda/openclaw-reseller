import { describe, it, expect } from 'vitest';
import { cn, generateOrderNumber } from '../src/lib/utils';

describe('Utils', () => {
  describe('cn (classnames)', () => {
    it('should merge class names', () => {
      expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      expect(cn('foo', true && 'bar', false && 'baz')).toBe('foo bar');
    });

    it('should merge tailwind classes correctly', () => {
      // Later class should override earlier
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });

    it('should handle arrays', () => {
      expect(cn(['foo', 'bar'])).toBe('foo bar');
    });

    it('should handle objects', () => {
      expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
    });

    it('should handle empty input', () => {
      expect(cn()).toBe('');
    });
  });

  describe('generateOrderNumber', () => {
    it('should generate order number with correct format', () => {
      const orderNumber = generateOrderNumber();
      expect(orderNumber).toMatch(/^OCM-\d{4}-\d{4}$/);
    });

    it('should include current year', () => {
      const orderNumber = generateOrderNumber();
      const year = new Date().getFullYear().toString();
      expect(orderNumber).toContain(year);
    });

    it('should generate unique order numbers', () => {
      const orderNumbers = new Set();
      for (let i = 0; i < 100; i++) {
        orderNumbers.add(generateOrderNumber());
      }
      // Should have high uniqueness (allowing some collisions due to randomness)
      expect(orderNumbers.size).toBeGreaterThan(90);
    });
  });
});

import { describe, it, expect } from 'vitest';
import { 
  products, 
  getProduct, 
  formatPrice, 
  getTierEmoji, 
  getTierColor 
} from '../src/lib/products';

describe('Products', () => {
  describe('products array', () => {
    it('should have 3 product tiers', () => {
      expect(products.length).toBe(3);
    });

    it('should have starter, pro, and max tiers', () => {
      const tiers = products.map(p => p.tier);
      expect(tiers).toContain('starter');
      expect(tiers).toContain('pro');
      expect(tiers).toContain('max');
    });

    it('should have valid prices for all products', () => {
      products.forEach(product => {
        expect(product.price).toBeGreaterThan(0);
        expect(typeof product.price).toBe('number');
      });
    });

    it('should have required fields for all products', () => {
      products.forEach(product => {
        expect(product.id).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.tier).toBeTruthy();
        expect(product.hardware).toBeTruthy();
        expect(product.software).toBeTruthy();
        expect(product.price).toBeTruthy();
      });
    });

    it('should have correct hardware specs', () => {
      const starter = products.find(p => p.tier === 'starter');
      expect(starter?.hardware.memory).toBe(16);
      
      const pro = products.find(p => p.tier === 'pro');
      expect(pro?.hardware.memory).toBe(24);
      
      const max = products.find(p => p.tier === 'max');
      expect(max?.hardware.memory).toBe(48);
    });
  });

  describe('getProduct', () => {
    it('should return product by id', () => {
      const starter = getProduct('starter');
      expect(starter).toBeDefined();
      expect(starter?.tier).toBe('starter');
    });

    it('should return undefined for invalid id', () => {
      const product = getProduct('invalid-id');
      expect(product).toBeUndefined();
    });
  });

  describe('formatPrice', () => {
    it('should format price in dollars', () => {
      expect(formatPrice(79800)).toBe('$798');
      expect(formatPrice(109800)).toBe('$1,098');
      expect(formatPrice(249800)).toBe('$2,498');
    });

    it('should handle zero', () => {
      expect(formatPrice(0)).toBe('$0');
    });

    it('should handle large numbers', () => {
      expect(formatPrice(1000000)).toBe('$10,000');
    });
  });

  describe('getTierEmoji', () => {
    it('should return correct emoji for each tier', () => {
      expect(getTierEmoji('starter')).toBe('🌱');
      expect(getTierEmoji('pro')).toBe('⚡');
      expect(getTierEmoji('max')).toBe('🚀');
    });
  });

  describe('getTierColor', () => {
    it('should return correct color classes for each tier', () => {
      expect(getTierColor('starter')).toContain('green');
      expect(getTierColor('pro')).toContain('blue');
      expect(getTierColor('max')).toContain('purple');
    });
  });
});

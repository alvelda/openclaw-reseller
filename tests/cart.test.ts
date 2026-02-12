import { describe, it, expect, beforeEach, vi } from 'vitest';
import { 
  getCart, 
  saveCart, 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  getCartTotal,
  getCartCount,
  CartItem
} from '../src/lib/cart';
import { products } from '../src/lib/products';

describe('Cart', () => {
  beforeEach(() => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    vi.mocked(localStorage.setItem).mockClear();
  });

  describe('getCart', () => {
    it('should return empty cart when localStorage is empty', () => {
      const cart = getCart();
      expect(cart.items).toEqual([]);
    });

    it('should return cart from localStorage', () => {
      const storedCart = { items: [{ productId: 'starter', quantity: 1 }] };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedCart));
      
      const cart = getCart();
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].productId).toBe('starter');
    });

    it('should handle invalid JSON in localStorage', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('invalid json');
      
      const cart = getCart();
      expect(cart.items).toEqual([]);
    });
  });

  describe('saveCart', () => {
    it('should save cart to localStorage', () => {
      const cart = { items: [{ productId: 'starter', quantity: 1 }] };
      saveCart(cart);
      
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'openclaw-cart',
        JSON.stringify(cart)
      );
    });
  });

  describe('addToCart', () => {
    it('should add new item to cart', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      
      const cart = addToCart('starter', 1);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].productId).toBe('starter');
      expect(cart.items[0].quantity).toBe(1);
    });

    it('should increase quantity for existing item', () => {
      const storedCart = { items: [{ productId: 'starter', quantity: 1 }] };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedCart));
      
      const cart = addToCart('starter', 2);
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].quantity).toBe(3);
    });

    it('should default to quantity 1', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null);
      
      const cart = addToCart('pro');
      expect(cart.items[0].quantity).toBe(1);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const storedCart = { items: [
        { productId: 'starter', quantity: 1 },
        { productId: 'pro', quantity: 2 }
      ]};
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedCart));
      
      const cart = removeFromCart('starter');
      expect(cart.items.length).toBe(1);
      expect(cart.items[0].productId).toBe('pro');
    });

    it('should handle removing non-existent item', () => {
      const storedCart = { items: [{ productId: 'starter', quantity: 1 }] };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedCart));
      
      const cart = removeFromCart('invalid');
      expect(cart.items.length).toBe(1);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const storedCart = { items: [{ productId: 'starter', quantity: 1 }] };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedCart));
      
      const cart = updateQuantity('starter', 5);
      expect(cart.items[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      const storedCart = { items: [{ productId: 'starter', quantity: 1 }] };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedCart));
      
      const cart = updateQuantity('starter', 0);
      expect(cart.items.length).toBe(0);
    });

    it('should remove item when quantity is negative', () => {
      const storedCart = { items: [{ productId: 'starter', quantity: 1 }] };
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedCart));
      
      const cart = updateQuantity('starter', -1);
      expect(cart.items.length).toBe(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const storedCart = { items: [
        { productId: 'starter', quantity: 1 },
        { productId: 'pro', quantity: 2 }
      ]};
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedCart));
      
      const cart = clearCart();
      expect(cart.items).toEqual([]);
    });
  });

  describe('getCartTotal', () => {
    it('should calculate total price', () => {
      const items: CartItem[] = [
        { productId: 'starter', quantity: 1 },
        { productId: 'pro', quantity: 2 }
      ];
      
      const total = getCartTotal(items, products);
      
      const starterPrice = products.find(p => p.id === 'starter')!.price;
      const proPrice = products.find(p => p.id === 'pro')!.price;
      const expected = starterPrice + (proPrice * 2);
      
      expect(total).toBe(expected);
    });

    it('should return 0 for empty cart', () => {
      const total = getCartTotal([], products);
      expect(total).toBe(0);
    });

    it('should handle invalid product ids', () => {
      const items: CartItem[] = [{ productId: 'invalid', quantity: 1 }];
      const total = getCartTotal(items, products);
      expect(total).toBe(0);
    });
  });

  describe('getCartCount', () => {
    it('should return total item count', () => {
      const items: CartItem[] = [
        { productId: 'starter', quantity: 1 },
        { productId: 'pro', quantity: 3 }
      ];
      
      expect(getCartCount(items)).toBe(4);
    });

    it('should return 0 for empty cart', () => {
      expect(getCartCount([])).toBe(0);
    });
  });
});

'use client';

import { Product } from './products';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const CART_KEY = 'openclaw-cart';

export function getCart(): CartState {
  if (typeof window === 'undefined') {
    return { items: [] };
  }
  const stored = localStorage.getItem(CART_KEY);
  if (!stored) {
    return { items: [] };
  }
  try {
    return JSON.parse(stored);
  } catch {
    return { items: [] };
  }
}

export function saveCart(cart: CartState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(productId: string, quantity: number = 1): CartState {
  const cart = getCart();
  const existing = cart.items.find(item => item.productId === productId);
  
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }
  
  saveCart(cart);
  return cart;
}

export function removeFromCart(productId: string): CartState {
  const cart = getCart();
  cart.items = cart.items.filter(item => item.productId !== productId);
  saveCart(cart);
  return cart;
}

export function updateQuantity(productId: string, quantity: number): CartState {
  const cart = getCart();
  const item = cart.items.find(item => item.productId === productId);
  
  if (item) {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }
    item.quantity = quantity;
    saveCart(cart);
  }
  
  return cart;
}

export function clearCart(): CartState {
  const cart = { items: [] };
  saveCart(cart);
  return cart;
}

export function getCartTotal(items: CartItem[], products: Product[]): number {
  return items.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}

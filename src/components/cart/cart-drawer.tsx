'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCart, updateQuantity, removeFromCart, getCartTotal, CartItem } from '@/lib/cart';
import { products, formatPrice, getTierEmoji } from '@/lib/products';
import { cn } from '@/lib/utils';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const updateCart = () => {
      const cart = getCart();
      setItems(cart.items);
    };

    updateCart();
    window.addEventListener('cart-updated', updateCart);
    return () => window.removeEventListener('cart-updated', updateCart);
  }, []);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
    setItems(getCart().items);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    setItems(getCart().items);
    window.dispatchEvent(new Event('cart-updated'));
  };

  const total = getCartTotal(items, products);

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl transform transition-transform',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button onClick={onClose}>
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
                <Link href="/products" onClick={onClose}>
                  <Button variant="outline" className="mt-4">
                    Browse Products
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const product = products.find(p => p.id === item.productId);
                  if (!product) return null;

                  return (
                    <div key={item.productId} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-2xl">
                        {getTierEmoji(product.tier)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.hardware.model}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-gray-200 flex items-center justify-center"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleRemove(item.productId)}
                            className="ml-auto text-red-500 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatPrice(product.price * item.quantity)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-sm text-gray-500">
                Shipping calculated at checkout
              </p>
              <Link href="/cart" onClick={onClose}>
                <Button className="w-full" size="lg">
                  View Cart & Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

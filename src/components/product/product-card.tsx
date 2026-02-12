'use client';

import Link from 'next/link';
import { Product, formatPrice, getTierEmoji, getTierColor } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { addToCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured }: ProductCardProps) {
  const handleAddToCart = () => {
    addToCart(product.id);
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-200 p-6 transition-all hover:shadow-lg hover:border-gray-300',
        featured && 'ring-2 ring-blue-600 border-blue-600'
      )}
    >
      {featured && (
        <div className="bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full inline-block mb-4">
          Most Popular
        </div>
      )}

      {/* Tier Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{getTierEmoji(product.tier)}</span>
        <span className={cn('px-2 py-1 rounded-full text-sm font-medium', getTierColor(product.tier))}>
          {product.tier.charAt(0).toUpperCase() + product.tier.slice(1)}
        </span>
      </div>

      {/* Product Image Placeholder */}
      <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-2">💻</div>
          <p className="text-sm text-gray-500">{product.hardware.model}</p>
        </div>
      </div>

      {/* Product Info */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {product.name}
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {product.tagline}
      </p>

      {/* Specs Highlights */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-4 h-4 mr-2 text-green-500">✓</span>
          {product.hardware.chip} chip
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-4 h-4 mr-2 text-green-500">✓</span>
          {product.hardware.memory}GB memory
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-4 h-4 mr-2 text-green-500">✓</span>
          {product.hardware.storage}GB storage
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="w-4 h-4 mr-2 text-green-500">✓</span>
          OpenClaw {product.software.license} (1 year)
        </div>
      </div>

      {/* Pricing */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {product.leadTime}
        </p>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          className="w-full" 
          variant={featured ? 'primary' : 'default'}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
        <Link href={`/products/${product.id}`}>
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}

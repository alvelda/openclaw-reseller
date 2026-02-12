'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, Truck, Shield, HeadphonesIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductSpecs } from '@/components/product/product-specs';
import { getProduct, formatPrice, getTierEmoji, getTierColor, products } from '@/lib/products';
import { addToCart } from '@/lib/cart';
import { cn } from '@/lib/utils';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    window.dispatchEvent(new Event('cart-updated'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl aspect-square flex items-center justify-center">
          <div className="text-center">
            <div className="text-9xl mb-4">💻</div>
            <p className="text-gray-500">{product.hardware.model}</p>
          </div>
        </div>

        {/* Product Info */}
        <div>
          {/* Tier Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">{getTierEmoji(product.tier)}</span>
            <span className={cn('px-3 py-1 rounded-full text-sm font-medium', getTierColor(product.tier))}>
              {product.tier.charAt(0).toUpperCase() + product.tier.slice(1)} Tier
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl text-gray-600 mb-6">{product.description}</p>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <span className="text-xl text-gray-400 line-through">{formatPrice(product.comparePrice)}</span>
              )}
            </div>
            <p className="text-gray-500 mt-1">Includes first year OpenClaw {product.software.license} license</p>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4 mb-8">
            <Button size="lg" variant="primary" className="w-full text-lg" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Link href="/cart">
              <Button size="lg" variant="outline" className="w-full text-lg">
                Buy Now
              </Button>
            </Link>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
            <div className="text-center">
              <Truck className="w-6 h-6 mx-auto text-gray-600 mb-2" />
              <p className="text-sm text-gray-600">Free Shipping</p>
            </div>
            <div className="text-center">
              <Shield className="w-6 h-6 mx-auto text-gray-600 mb-2" />
              <p className="text-sm text-gray-600">1 Year Warranty</p>
            </div>
            <div className="text-center">
              <HeadphonesIcon className="w-6 h-6 mx-auto text-gray-600 mb-2" />
              <p className="text-sm text-gray-600">Priority Support</p>
            </div>
          </div>

          {/* Lead Time */}
          <p className="text-gray-600 mt-6">
            <span className="font-medium">Availability:</span> {product.leadTime}
          </p>
        </div>
      </div>

      {/* Details Section */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* What's Included */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h2>
          <ul className="space-y-4">
            {product.software.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Highlights</h3>
          <ul className="space-y-3">
            {product.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-blue-500">•</span>
                <span className="text-gray-700">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Specifications */}
        <ProductSpecs product={product} />
      </div>

      {/* Other Products */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Configurations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.filter(p => p.id !== product.id).map(p => (
            <Link 
              key={p.id} 
              href={`/products/${p.id}`}
              className="block p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{getTierEmoji(p.tier)}</span>
                <span className="font-semibold text-gray-900">{p.name}</span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{p.tagline}</p>
              <p className="font-bold text-gray-900">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

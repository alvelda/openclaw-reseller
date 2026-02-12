'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { clearCart } from '@/lib/cart';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Clear the cart on successful purchase
    clearCart();
    window.dispatchEvent(new Event('cart-updated'));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your OpenClaw Mac is being prepared. We&apos;ll send you a confirmation email shortly.
        </p>

        {sessionId && (
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-500">Order Reference</p>
            <p className="font-mono text-sm text-gray-700 break-all">{sessionId}</p>
          </div>
        )}

        {/* What's Next */}
        <div className="text-left bg-white border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Confirmation Email</h3>
                <p className="text-sm text-gray-600">You&apos;ll receive an order confirmation email within a few minutes.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🔧</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Configuration</h3>
                <p className="text-sm text-gray-600">We&apos;ll configure your Mac with OpenClaw and run quality tests (1-2 days).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shipping</h3>
                <p className="text-sm text-gray-600">Your order will ship within 3-5 business days with tracking information.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-lg">🎉</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Enjoy!</h3>
                <p className="text-sm text-gray-600">Plug in your OpenClaw Mac and start chatting with your AI assistant.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="outline">
              Continue Shopping
            </Button>
          </Link>
          <Link href="/support">
            <Button>
              Setup Guide <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Questions? Contact us at{' '}
          <a href="mailto:support@openclawmac.com" className="text-blue-600 hover:underline">
            support@openclawmac.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="animate-pulse">
          <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-8"></div>
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

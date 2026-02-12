import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product/product-card';
import { products } from '@/lib/products';
import { Shield, Zap, Lock, RefreshCw, Headphones, Gift } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Your Personal AI Assistant
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ready Out of the Box
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Pre-configured Mac minis with OpenClaw installed. 
              Plug in and start chatting with your AI assistant immediately.
              No cloud required — all processing happens locally.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" variant="primary" className="text-lg px-8">
                  Shop Now →
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden blur-3xl">
          <div className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-200 to-purple-200 opacity-30 sm:w-[72.1875rem]" />
        </div>
      </section>

      {/* Value Props */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Zero Setup Required</h3>
              <p className="text-gray-600">
                Plug in, power on, and start chatting. OpenClaw is pre-installed, configured, and ready to go.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy-First Local AI</h3>
              <p className="text-gray-600">
                All processing happens on your Mac. Your data never leaves your home. No cloud required.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Apple Hardware</h3>
              <p className="text-gray-600">
                Powered by Apple Silicon, optimized for AI workloads. Silent, efficient, and beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your OpenClaw Mac</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Three configurations to match your needs. All include one year of OpenClaw license,
              pre-configuration, and 30-day priority support.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                featured={index === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What&apos;s Included</h2>
            <p className="text-gray-600">Every OpenClaw Mac comes with everything you need to get started.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">💻</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Mac mini Hardware</h3>
                <p className="text-gray-600 text-sm">Brand new Mac mini with Apple Silicon, optimized for AI.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">OpenClaw License (1 Year)</h3>
                <p className="text-gray-600 text-sm">Full access to OpenClaw AI features and updates.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Software Updates</h3>
                <p className="text-gray-600 text-sm">Regular updates with new features and improvements.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📖</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Quick Start Guide</h3>
                <p className="text-gray-600 text-sm">Easy-to-follow printed guide to get started fast.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Headphones className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">30-Day Priority Support</h3>
                <p className="text-gray-600 text-sm">Fast, friendly support to help you get the most out of your Mac.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Sticker Pack</h3>
                <p className="text-gray-600 text-sm">Show off your OpenClaw Mac with exclusive stickers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-xl mx-auto">
            Join the local AI revolution. Your personal AI assistant awaits.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8">
              Shop Now →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

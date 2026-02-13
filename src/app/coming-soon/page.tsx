'use client';

import { useState, useEffect } from 'react';
import { Check, Shield, Zap, Lock, Cpu, Mail, ChevronRight, Sparkles } from 'lucide-react';
import { addToWaitlist, getWaitlistCount, isValidEmail } from '@/lib/waitlist';
import { products, formatPrice } from '@/lib/products';
import Link from 'next/link';

// Countdown to Q2 2026 (April 1, 2026)
const LAUNCH_DATE = new Date('2026-04-01T00:00:00-07:00').getTime();

function useCountdown(targetDate: number) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function WaitlistForm({ 
  onSuccess, 
  source = 'hero',
  selectedTier = null,
  compact = false 
}: { 
  onSuccess: () => void; 
  source?: 'hero' | 'tier' | 'footer';
  selectedTier?: 'starter' | 'pro' | 'max' | null;
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate network delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = addToWaitlist(email, selectedTier, source);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setSuccess(true);
      setEmail('');
      onSuccess();
    }
  };

  if (success) {
    return (
      <div className={`flex items-center gap-2 ${compact ? 'text-sm' : ''} text-green-400`}>
        <Check className="w-5 h-5" />
        <span>You&apos;re on the list! We&apos;ll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex ${compact ? 'flex-col sm:flex-row gap-2' : 'flex-col sm:flex-row gap-3'}`}>
      <div className="flex-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className={`w-full ${compact ? 'px-3 py-2 text-sm' : 'px-4 py-3'} bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
          disabled={isSubmitting}
        />
        {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`${compact ? 'px-4 py-2 text-sm' : 'px-6 py-3'} bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap`}
      >
        {isSubmitting ? (
          <span className="animate-pulse">Joining...</span>
        ) : (
          <>
            Reserve Your Spot
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}

function TierCard({ 
  product, 
  featured = false,
  onReserve
}: { 
  product: typeof products[0]; 
  featured?: boolean;
  onReserve: () => void;
}) {
  const [showForm, setShowForm] = useState(false);
  
  const tierIcons = {
    starter: '🌱',
    pro: '⚡',
    max: '🚀',
  };

  const tierGradients = {
    starter: 'from-green-500/20 to-emerald-500/20',
    pro: 'from-blue-500/20 to-cyan-500/20',
    max: 'from-purple-500/20 to-pink-500/20',
  };

  const tierAccents = {
    starter: 'text-green-400 border-green-500/30',
    pro: 'text-blue-400 border-blue-500/30',
    max: 'text-purple-400 border-purple-500/30',
  };

  return (
    <div className={`relative rounded-2xl bg-gradient-to-b ${tierGradients[product.tier]} backdrop-blur-sm border ${featured ? 'border-blue-500/50 scale-105' : 'border-white/10'} p-6 transition-all hover:border-white/30`}>
      {featured && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full">
            MOST POPULAR
          </span>
        </div>
      )}
      
      <div className="text-center mb-6">
        <span className="text-3xl mb-2 block">{tierIcons[product.tier]}</span>
        <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
        <p className="text-white/60 text-sm">{product.tagline}</p>
      </div>
      
      <div className="text-center mb-6">
        <div className="flex items-baseline justify-center gap-1">
          <span className={`text-4xl font-bold ${tierAccents[product.tier].split(' ')[0]}`}>
            {formatPrice(product.price)}
          </span>
        </div>
        {product.comparePrice && (
          <p className="text-white/40 text-sm line-through mt-1">
            {formatPrice(product.comparePrice)}
          </p>
        )}
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-white/80">
          <Cpu className="w-4 h-4 text-white/50 flex-shrink-0" />
          <span className="text-sm">{product.hardware.chip} • {product.hardware.memory}GB RAM</span>
        </div>
        {product.highlights.slice(0, 3).map((highlight, i) => (
          <div key={i} className="flex items-center gap-3 text-white/80">
            <Check className={`w-4 h-4 flex-shrink-0 ${tierAccents[product.tier].split(' ')[0]}`} />
            <span className="text-sm">{highlight}</span>
          </div>
        ))}
      </div>
      
      {showForm ? (
        <WaitlistForm 
          onSuccess={() => setShowForm(false)} 
          source="tier" 
          selectedTier={product.tier}
          compact
        />
      ) : (
        <button
          onClick={() => { setShowForm(true); onReserve(); }}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            featured 
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white' 
              : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
          }`}
        >
          Reserve Now
        </button>
      )}
    </div>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-white mb-1 font-mono tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-white/50 text-xs uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function ComingSoonPage() {
  const countdown = useCountdown(LAUNCH_DATE);
  const [waitlistCount, setWaitlistCount] = useState(127);

  useEffect(() => {
    setWaitlistCount(getWaitlistCount());
    
    const handleUpdate = () => {
      setWaitlistCount(getWaitlistCount());
    };
    
    window.addEventListener('waitlist-updated', handleUpdate);
    return () => window.removeEventListener('waitlist-updated', handleUpdate);
  }, []);

  const refreshCount = () => {
    setWaitlistCount(getWaitlistCount());
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
              <span className="font-semibold text-white">OpenClaw Mac</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden sm:flex items-center gap-2 text-sm text-white/60">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="font-medium text-white">{waitlistCount.toLocaleString()}</span> people waiting
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Launch Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-white/80">Coming Q2 2026</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              Own Your AI.
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Forever.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            A personal AI that runs entirely on your Mac.
            <br className="hidden sm:block" />
            <span className="text-white/90 font-medium">No cloud. No subscriptions. No compromises.</span>
          </p>

          {/* Countdown */}
          <div className="flex justify-center gap-4 sm:gap-8 mb-12">
            <CountdownUnit value={countdown.days} label="Days" />
            <div className="text-4xl text-white/30 font-light">:</div>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <div className="text-4xl text-white/30 font-light">:</div>
            <CountdownUnit value={countdown.minutes} label="Minutes" />
            <div className="hidden sm:block text-4xl text-white/30 font-light">:</div>
            <div className="hidden sm:block">
              <CountdownUnit value={countdown.seconds} label="Seconds" />
            </div>
          </div>

          {/* Hero CTA */}
          <div className="max-w-md mx-auto">
            <WaitlistForm onSuccess={refreshCount} source="hero" />
            <p className="text-white/40 text-sm mt-4">
              Join <span className="text-white/60 font-medium">{waitlistCount.toLocaleString()}</span> others on the waitlist. No spam, ever.
            </p>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-green-500/30">
                <Lock className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">100% Private</h3>
              <p className="text-white/60 leading-relaxed">
                Your data never leaves your Mac. Process everything locally — conversations, documents, everything.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                <Shield className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">One-Time Purchase</h3>
              <p className="text-white/60 leading-relaxed">
                No monthly fees. No API costs. Buy once, own forever. Your AI is yours.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/30">
                <Zap className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Ready to Use</h3>
              <p className="text-white/60 leading-relaxed">
                Pre-configured Mac mini arrives ready to go. Plug in, power on, start chatting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tiers */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Choose Your Power Level
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Three configurations to match your needs. All include hardware, software, and one year of updates.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {products.map((product, index) => (
              <TierCard 
                key={product.id} 
                product={product} 
                featured={index === 1}
                onReserve={refreshCount}
              />
            ))}
          </div>
          
          <p className="text-center text-white/40 text-sm mt-8">
            Pricing includes Mac mini hardware, OpenClaw software license, pre-configuration, and 30-day support.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 mb-8">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-2xl sm:text-3xl font-bold text-white">{waitlistCount.toLocaleString()}</span>
            <span className="text-white/60">people on the waitlist</span>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            Be First to Own Your AI
          </h3>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            Early waitlist members get exclusive early access, founding member pricing, and priority shipping.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">OC</span>
                </div>
                <span className="font-semibold text-white">OpenClaw Mac</span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed">
                Personal AI that runs entirely on your Mac. Built by{' '}
                <a href="https://brainworks.ai" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                  Brainworks AI
                </a>
                .
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Learn More</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/about" className="text-white/50 hover:text-white transition-colors">
                    About OpenClaw
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-white/50 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-white/50 hover:text-white transition-colors">
                    Product Details
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-white/50" />
                <span className="text-white/50 text-sm">Get launch updates</span>
              </div>
              <div className="mt-4">
                <WaitlistForm onSuccess={refreshCount} source="footer" compact />
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">
              © 2026 Brainworks AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/about" className="text-white/30 hover:text-white/50 text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/support" className="text-white/30 hover:text-white/50 text-sm transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

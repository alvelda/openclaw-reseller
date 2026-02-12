import { Shield, Zap, Lock, Heart } from 'lucide-react';

export const metadata = {
  title: 'About - OpenClaw Mac',
  description: 'Learn about OpenClaw Mac and our mission to make local AI accessible to everyone.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About OpenClaw Mac</h1>
        <p className="text-xl text-gray-600">
          Making local AI accessible to everyone.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 text-lg leading-relaxed">
            We believe everyone deserves access to powerful AI tools without sacrificing their privacy. 
            That&apos;s why we created OpenClaw Mac — pre-configured computers that put AI assistance 
            at your fingertips while keeping your data where it belongs: with you.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed mt-4">
            No cloud required. No data uploaded. No subscriptions to big tech companies. 
            Just powerful, private AI that works for you.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <Lock className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
            <p className="text-gray-600">
              Your conversations, your data, your business. Nothing leaves your machine unless you want it to.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <Zap className="w-8 h-8 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Zero Friction</h3>
            <p className="text-gray-600">
              Technology should work for you, not the other way around. Plug in and start chatting immediately.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <Shield className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quality Hardware</h3>
            <p className="text-gray-600">
              We only sell products we&apos;d use ourselves. Premium Apple Silicon optimized for AI workloads.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-6">
            <Heart className="w-8 h-8 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Customer Obsession</h3>
            <p className="text-gray-600">
              Your success is our success. We&apos;re here to help you get the most out of your OpenClaw Mac.
            </p>
          </div>
        </div>
      </section>

      {/* Why OpenClaw Mac */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why OpenClaw Mac?</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-blue-600 pl-6">
            <h3 className="font-semibold text-gray-900 mb-2">The Problem</h3>
            <p className="text-gray-600">
              Setting up local AI is complicated. You need the right hardware, the right software, 
              the right configuration. Most people give up before they start, or settle for 
              cloud-based services that harvest their data.
            </p>
          </div>
          <div className="border-l-4 border-green-600 pl-6">
            <h3 className="font-semibold text-gray-900 mb-2">Our Solution</h3>
            <p className="text-gray-600">
              We do the hard work so you don&apos;t have to. Every OpenClaw Mac is pre-configured, 
              tested, and ready to use. Just plug it in, connect a display, and start chatting 
              with your AI assistant.
            </p>
          </div>
        </div>
      </section>

      {/* The Team */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Built by Brainworks AI</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          OpenClaw Mac is a project of Brainworks AI, a company dedicated to making AI 
          technology more accessible, more private, and more useful for everyday people.
        </p>
        <p className="text-gray-600 text-lg leading-relaxed mt-4">
          We&apos;re a small team of engineers and designers who are passionate about 
          AI and privacy. We use our own products every day and we&apos;re constantly 
          working to make them better.
        </p>
      </section>

      {/* Contact */}
      <section className="bg-gray-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
        <p className="text-gray-600 mb-6">
          Have questions? We&apos;d love to hear from you.
        </p>
        <div className="space-y-2 text-gray-600">
          <p>
            <strong>Email:</strong>{' '}
            <a href="mailto:hello@openclawmac.com" className="text-blue-600 hover:underline">
              hello@openclawmac.com
            </a>
          </p>
          <p>
            <strong>Support:</strong>{' '}
            <a href="mailto:support@openclawmac.com" className="text-blue-600 hover:underline">
              support@openclawmac.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

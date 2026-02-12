import Link from 'next/link';
import { Mail, MessageCircle, Book, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Support - OpenClaw Mac',
  description: 'Get help with your OpenClaw Mac. FAQs, setup guides, and contact support.',
};

export default function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">How Can We Help?</h1>
        <p className="text-xl text-gray-600">
          Find answers, get support, and make the most of your OpenClaw Mac.
        </p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <Link href="/track" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <Package className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Track Your Order</h3>
          <p className="text-gray-600 text-sm">Check the status of your order and get tracking information.</p>
        </Link>
        <a href="mailto:support@openclawmac.com" className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
          <Mail className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
          <p className="text-gray-600 text-sm">Email us and we&apos;ll get back to you within 24 hours.</p>
        </a>
      </div>

      {/* FAQ */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I set up my OpenClaw Mac?</h3>
            <p className="text-gray-600">
              It&apos;s as simple as 1-2-3: Connect your display, plug in the power, and turn it on. 
              OpenClaw is already installed and configured. Just follow the on-screen welcome guide 
              and you&apos;ll be chatting with your AI assistant within minutes.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What&apos;s included with my purchase?</h3>
            <p className="text-gray-600">
              Every OpenClaw Mac includes: the Mac mini hardware, one year of OpenClaw license 
              (Basic, Pro, or Enterprise depending on tier), pre-configuration and testing, 
              a printed Quick Start Guide, 30-day priority support, and an exclusive sticker pack.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I need an internet connection?</h3>
            <p className="text-gray-600">
              For initial setup, you&apos;ll need WiFi or Ethernet to activate your license. 
              After that, OpenClaw can work completely offline — your AI assistant runs locally 
              on the Mac&apos;s Apple Silicon chip.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6" id="returns">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What&apos;s your return policy?</h3>
            <p className="text-gray-600">
              We offer a 14-day return policy for unopened products. If you&apos;ve opened and used 
              your OpenClaw Mac and aren&apos;t satisfied, please contact us — we want you to be happy 
              and will work with you on a solution.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens after my license expires?</h3>
            <p className="text-gray-600">
              Your Mac and OpenClaw continue to work — you just won&apos;t receive software updates. 
              You can renew your license at any time at standard annual rates ($99-$199 depending 
              on tier). We&apos;ll send renewal reminders before expiration.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I upgrade my license tier?</h3>
            <p className="text-gray-600">
              Yes! You can upgrade your OpenClaw license from Basic to Pro, or Pro to Enterprise, 
              at any time. Just contact us and we&apos;ll help you upgrade and unlock additional features.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my data private?</h3>
            <p className="text-gray-600">
              Absolutely. All AI processing happens locally on your Mac. Your conversations, 
              documents, and data never leave your machine unless you explicitly choose to 
              share them. That&apos;s the whole point of local AI.
            </p>
          </div>
          <div className="pb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you offer international shipping?</h3>
            <p className="text-gray-600">
              Currently, we only ship within the United States. We&apos;re working on expanding 
              to additional countries. Sign up for our newsletter to be notified when we 
              add your region.
            </p>
          </div>
        </div>
      </section>

      {/* Setup Guide */}
      <section className="bg-gray-50 rounded-xl p-8 mb-16">
        <div className="flex items-start gap-6">
          <Book className="w-10 h-10 text-blue-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Setup Guide</h2>
            <p className="text-gray-600 mb-4">
              Need detailed instructions? Our comprehensive setup guide covers everything 
              from unboxing to advanced configuration.
            </p>
            <Link href="/docs/setup">
              <Button variant="outline">
                View Setup Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
        <p className="text-gray-600 mb-6">
          Our support team is here for you. We typically respond within 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:support@openclawmac.com">
            <Button variant="primary" size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          support@openclawmac.com
        </p>
      </section>
    </div>
  );
}

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">OC</span>
              </div>
              <span className="font-semibold text-gray-900">OpenClaw Mac</span>
            </div>
            <p className="text-gray-600 text-sm">
              Pre-configured AI-powered Mac minis. Your personal AI assistant, ready out of the box.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/starter" className="text-gray-600 hover:text-gray-900">
                  Starter ($798)
                </Link>
              </li>
              <li>
                <Link href="/products/pro" className="text-gray-600 hover:text-gray-900">
                  Pro ($1,098)
                </Link>
              </li>
              <li>
                <Link href="/products/max" className="text-gray-600 hover:text-gray-900">
                  Max ($2,498)
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/support" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-600 hover:text-gray-900">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/support#returns" className="text-gray-600 hover:text-gray-900">
                  Returns
                </Link>
              </li>
              <li>
                <a href="mailto:support@openclawmac.com" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-600 hover:text-gray-900">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} OpenClaw Mac. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm mt-2 md:mt-0">
              Mac and Mac mini are trademarks of Apple Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

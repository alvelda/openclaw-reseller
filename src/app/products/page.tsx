import { ProductCard } from '@/components/product/product-card';
import { products } from '@/lib/products';

export const metadata = {
  title: 'Products - OpenClaw Mac',
  description: 'Browse our selection of pre-configured AI-powered Mac minis.',
};

export default function ProductsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your OpenClaw Mac</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Three configurations to match your needs. All include pre-installed OpenClaw,
          one year of license, and 30-day priority support.
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

      {/* Comparison Table */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Compare Configurations</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="py-4 px-4 text-left font-semibold text-gray-900">Feature</th>
                {products.map(product => (
                  <th key={product.id} className="py-4 px-4 text-center font-semibold text-gray-900">
                    {product.tier.charAt(0).toUpperCase() + product.tier.slice(1)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="py-4 px-4 text-gray-600">Hardware</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center text-gray-900">
                    {product.hardware.model}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Chip</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center text-gray-900">
                    {product.hardware.chip}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Memory</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center text-gray-900">
                    {product.hardware.memory}GB
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Storage</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center text-gray-900">
                    {product.hardware.storage >= 1024 
                      ? `${product.hardware.storage / 1024}TB` 
                      : `${product.hardware.storage}GB`}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">OpenClaw License</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center text-gray-900 capitalize">
                    {product.software.license}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Multi-agent Support</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center">
                    {product.software.license !== 'basic' ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 text-gray-600">Team Features</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center">
                    {product.software.license === 'enterprise' ? (
                      <span className="text-green-600">✓</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="bg-gray-50">
                <td className="py-4 px-4 font-semibold text-gray-900">Price</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-bold text-gray-900">
                    ${(product.price / 100).toLocaleString()}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What&apos;s included with my purchase?</h3>
            <p className="text-gray-600">
              Every OpenClaw Mac includes the Mac mini hardware, one year of OpenClaw license, 
              pre-configuration and testing, a quick start guide, 30-day priority support, and a sticker pack.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does shipping take?</h3>
            <p className="text-gray-600">
              Orders typically ship within 3-5 business days. We configure and test each Mac before shipping, 
              which ensures you have a perfect experience right out of the box.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">What happens after the first year?</h3>
            <p className="text-gray-600">
              Your OpenClaw license can be renewed at our standard rates ($99-$199/year depending on tier). 
              Even without renewal, your Mac continues to work — you just won&apos;t receive updates.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I upgrade my configuration later?</h3>
            <p className="text-gray-600">
              The Mac mini hardware cannot be upgraded after purchase due to Apple&apos;s unified memory architecture. 
              However, you can upgrade your OpenClaw license tier at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

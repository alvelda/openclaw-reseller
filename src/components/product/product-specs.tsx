import { Product } from '@/lib/products';

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  const specs = [
    { label: 'Chip', value: product.specs.chip },
    { label: 'Memory', value: product.specs.memory },
    { label: 'Storage', value: product.specs.storage },
    { label: 'Ports', value: product.specs.ports },
    { label: 'Display Support', value: product.specs.display },
    { label: 'Networking', value: product.specs.network },
  ];

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
      <dl className="space-y-4">
        {specs.map((spec) => (
          <div key={spec.label} className="flex flex-col sm:flex-row sm:justify-between">
            <dt className="text-gray-600 font-medium">{spec.label}</dt>
            <dd className="text-gray-900 sm:text-right sm:max-w-md">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

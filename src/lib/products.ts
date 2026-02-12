export interface ProductSpecs {
  chip: string;
  memory: string;
  storage: string;
  ports: string;
  display: string;
  network: string;
}

export interface Product {
  id: string;
  name: string;
  tier: 'starter' | 'pro' | 'max';
  tagline: string;
  description: string;
  hardware: {
    model: string;
    chip: string;
    memory: number;
    storage: number;
  };
  software: {
    license: 'basic' | 'pro' | 'enterprise';
    features: string[];
  };
  price: number; // In cents
  comparePrice?: number;
  inStock: boolean;
  leadTime: string;
  image: string;
  specs: ProductSpecs;
  highlights: string[];
}

export const products: Product[] = [
  {
    id: 'starter',
    name: 'OpenClaw Mac Starter',
    tier: 'starter',
    tagline: 'Perfect for personal AI',
    description: 'The perfect entry point for local AI. Handles text generation, basic automation, and everyday AI tasks with ease.',
    hardware: {
      model: 'Mac mini M4',
      chip: 'M4',
      memory: 16,
      storage: 256,
    },
    software: {
      license: 'basic',
      features: [
        'OpenClaw Basic License (1 year)',
        'Pre-configured and tested',
        'Quick start guide',
        '30-day priority support',
        'Free software updates',
      ],
    },
    price: 79800, // $798
    comparePrice: 89800,
    inStock: true,
    leadTime: 'Ships in 3-5 business days',
    image: '/images/mac-mini-starter.png',
    specs: {
      chip: 'Apple M4 (10-core CPU, 10-core GPU)',
      memory: '16GB Unified Memory',
      storage: '256GB SSD',
      ports: '3x Thunderbolt 4, 2x USB-A, HDMI, Ethernet, Headphone jack',
      display: 'Up to 3 displays supported',
      network: 'Wi-Fi 6E, Bluetooth 5.3, Gigabit Ethernet',
    },
    highlights: [
      'Ideal for text generation and chat',
      'Runs most local AI models',
      'Silent and energy efficient',
      'Compact desktop form factor',
    ],
  },
  {
    id: 'pro',
    name: 'OpenClaw Mac Pro',
    tier: 'pro',
    tagline: 'Power for developers',
    description: 'More memory for advanced workflows. Run larger models, multiple agents, and complex AI tasks simultaneously.',
    hardware: {
      model: 'Mac mini M4',
      chip: 'M4',
      memory: 24,
      storage: 512,
    },
    software: {
      license: 'pro',
      features: [
        'OpenClaw Pro License (1 year)',
        'Multi-agent support',
        'Pre-configured and tested',
        'Quick start guide',
        '30-day priority support',
        'Free software updates',
        'Priority feature requests',
      ],
    },
    price: 109800, // $1,098
    comparePrice: 124800,
    inStock: true,
    leadTime: 'Ships in 3-5 business days',
    image: '/images/mac-mini-pro.png',
    specs: {
      chip: 'Apple M4 (10-core CPU, 10-core GPU)',
      memory: '24GB Unified Memory',
      storage: '512GB SSD',
      ports: '3x Thunderbolt 4, 2x USB-A, HDMI, Ethernet, Headphone jack',
      display: 'Up to 3 displays supported',
      network: 'Wi-Fi 6E, Bluetooth 5.3, Gigabit Ethernet',
    },
    highlights: [
      'Run larger AI models locally',
      'Multiple agents simultaneously',
      'Extended context windows',
      'Ideal for developers and power users',
    ],
  },
  {
    id: 'max',
    name: 'OpenClaw Mac Max',
    tier: 'max',
    tagline: 'Ultimate AI workstation',
    description: 'Maximum performance for professionals and teams. Run the largest local models with incredible speed.',
    hardware: {
      model: 'Mac mini M4 Pro',
      chip: 'M4 Pro',
      memory: 48,
      storage: 1024,
    },
    software: {
      license: 'enterprise',
      features: [
        'OpenClaw Enterprise License (1 year)',
        'Multi-user support',
        'Team collaboration features',
        'Pre-configured and tested',
        'Comprehensive documentation',
        'Priority support (24-hour response)',
        'Free software updates',
        'Custom feature requests',
      ],
    },
    price: 249800, // $2,498
    comparePrice: 279800,
    inStock: true,
    leadTime: 'Ships in 5-7 business days',
    image: '/images/mac-mini-max.png',
    specs: {
      chip: 'Apple M4 Pro (14-core CPU, 20-core GPU)',
      memory: '48GB Unified Memory',
      storage: '1TB SSD',
      ports: '3x Thunderbolt 5, 2x USB-A, HDMI, Ethernet, Headphone jack',
      display: 'Up to 3 displays supported',
      network: 'Wi-Fi 6E, Bluetooth 5.3, Gigabit Ethernet',
    },
    highlights: [
      'Run the largest local models',
      'Professional-grade performance',
      'Team and enterprise features',
      'Thunderbolt 5 for maximum bandwidth',
    ],
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function getTierEmoji(tier: 'starter' | 'pro' | 'max'): string {
  switch (tier) {
    case 'starter': return '🌱';
    case 'pro': return '⚡';
    case 'max': return '🚀';
  }
}

export function getTierColor(tier: 'starter' | 'pro' | 'max'): string {
  switch (tier) {
    case 'starter': return 'bg-green-100 text-green-800';
    case 'pro': return 'bg-blue-100 text-blue-800';
    case 'max': return 'bg-purple-100 text-purple-800';
  }
}

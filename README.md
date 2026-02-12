# OpenClaw Mac Reseller

Pre-configured Mac mini sales platform with OpenClaw AI assistant pre-installed.

## 🎯 Vision

Sell turnkey AI-powered Mac minis with OpenClaw pre-installed, providing customers a plug-and-play local AI assistant experience.

## 📦 Product Tiers

| Tier | Hardware | Price | Use Case |
|------|----------|-------|----------|
| 🌱 Starter | Mac mini M4 16GB | $798 | Personal AI |
| ⚡ Pro | Mac mini M4 24GB | $1,098 | Power users, developers |
| 🚀 Max | Mac mini M4 Pro 48GB | $2,498 | Teams, heavy workloads |

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Styling:** TailwindCSS
- **Payments:** Stripe Checkout
- **Testing:** Vitest
- **Hosting:** Vercel (recommended)

## 📚 Quick Links

- **[📖 User Guide](docs/USER_GUIDE.md)** - Complete guide for customers
- [PRD](docs/PRD.md) - Product Requirements Document
- [Business Model](docs/BUSINESS_MODEL.md)
- [Customer Journey](docs/CUSTOMER_JOURNEY.md)
- [Fulfillment Workflow](docs/FULFILLMENT_WORKFLOW.md)
- [Planning Document](docs/PLAN.md)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Stripe account (for payments)

### Installation

```bash
# Clone the repository
git clone https://github.com/brainworks-ai/openclaw-reseller.git
cd openclaw-reseller

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your keys
```

### Environment Variables

```bash
# Required
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com

# Optional
STRIPE_WEBHOOK_SECRET=whsec_...
POSTMARK_API_KEY=...
```

### Development

```bash
# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## 📂 Project Structure

```
openclaw-reseller/
├── docs/                    # Planning & documentation
│   ├── PRD.md              # Product requirements
│   ├── PLAN.md             # Strategic planning
│   ├── BUSINESS_MODEL.md   # Business model canvas
│   ├── CUSTOMER_JOURNEY.md # Customer journey map
│   ├── FULFILLMENT_WORKFLOW.md # Fulfillment SOP
│   └── USER_GUIDE.md       # Customer user guide
├── src/
│   ├── app/                # Next.js pages
│   │   ├── page.tsx        # Homepage
│   │   ├── products/       # Product pages
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout flow
│   │   ├── about/          # About page
│   │   ├── support/        # Support/FAQ
│   │   ├── track/          # Order tracking
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── ui/             # Base UI components
│   │   ├── layout/         # Header, Footer
│   │   ├── product/        # Product components
│   │   └── cart/           # Cart components
│   └── lib/                # Utilities
│       ├── products.ts     # Product data & helpers
│       ├── cart.ts         # Cart state management
│       └── utils.ts        # General utilities
├── tests/                  # Test suite
├── public/                 # Static assets
└── .env.example            # Environment template
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

Test coverage:
- Products: data validation, pricing, tier helpers
- Cart: CRUD operations, persistence, totals
- Utils: classname merging, order number generation

## 📊 Development Status

- [x] Phase 1: PLAN - Strategic planning
- [x] Phase 2: DOCUMENT - PRD & specs
- [x] Phase 3: BUILD - E-commerce platform
- [x] Phase 4: TEST - Unit tests
- [x] Phase 5: ITERATE - Bug fixes
- [x] Phase 6: VERIFY - Build verification
- [x] Phase 7: DOCUMENT - Final docs
- [x] Phase 8: USER GUIDE - Customer guide
- [ ] Phase 9: DEPLOY - Production deployment

## 🔧 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repo to Vercel
3. Add environment variables
4. Deploy

### Manual

```bash
npm run build
npm start
```

## 🔒 Security

- Payment processing via Stripe (PCI compliant)
- No card data stored locally
- HTTPS required in production
- Input validation on all forms

## 📄 License

Proprietary - Brainworks AI

---

Built with ❤️ by [Brainworks AI](https://brainworks.ai)

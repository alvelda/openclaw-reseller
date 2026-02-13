# OpenClaw Mac Reseller

Pre-configured Mac mini sales platform with OpenClaw AI assistant pre-installed.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Falvelda%2Fopenclaw-reseller&env=STRIPE_SECRET_KEY,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY&envDescription=Stripe%20API%20keys%20required%20for%20payment%20processing&envLink=https%3A%2F%2Fstripe.com%2Fdocs%2Fkeys&project-name=openclaw-reseller&repository-name=openclaw-reseller)

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
git clone https://github.com/alvelda/openclaw-reseller.git
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

### Option 1: One-Click Deploy (Recommended)

Click the "Deploy with Vercel" button at the top of this README. You'll need:
- Vercel account (free)
- Stripe API keys (test or live)

### Option 2: Manual Vercel Deploy

1. Fork/clone this repo to your GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Add environment variables:
   - `STRIPE_SECRET_KEY` - Your Stripe secret key
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
   - `NEXT_PUBLIC_APP_URL` - Your deployed URL (Vercel provides this)
5. Deploy!

### Option 3: Self-Hosted

```bash
npm run build
npm start
```

### Environment Variables Required

| Variable | Description | Required |
|----------|-------------|----------|
| `STRIPE_SECRET_KEY` | Stripe secret API key | ✅ |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret | Optional |
| `POSTMARK_API_KEY` | For transactional emails | Optional |

## 🔒 Security

- Payment processing via Stripe (PCI compliant)
- No card data stored locally
- HTTPS required in production
- Input validation on all forms

## 📄 License

Proprietary - Brainworks AI

---

Built with ❤️ by [Brainworks AI](https://brainworks.ai)

# OpenClaw Mac Reseller

Pre-configured Mac mini sales platform with OpenClaw pre-installed.

## 🎯 Vision

Sell turnkey AI-powered Mac minis with OpenClaw pre-installed, providing customers a plug-and-play local AI assistant experience.

## 📦 Product Tiers

| Tier | Hardware | OpenClaw | Price |
|------|----------|----------|-------|
| 🌱 Starter | Mac mini M4 16GB | Basic | $798 |
| ⚡ Pro | Mac mini M4 24GB | Pro | $1,098 |
| 🚀 Max | Mac mini M4 Pro 48GB | Enterprise | $2,498 |

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, TailwindCSS, shadcn/ui
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL (Supabase)
- **Payments:** Stripe Checkout
- **Hosting:** Vercel
- **Email:** Postmark

## 📂 Project Structure

```
openclaw-reseller/
├── docs/                    # Planning & documentation
│   ├── PLAN.md             # Strategic planning
│   ├── BUSINESS_MODEL.md   # Business model canvas
│   ├── CUSTOMER_JOURNEY.md # Customer journey map
│   ├── FULFILLMENT_WORKFLOW.md # Order fulfillment SOP
│   └── USER_GUIDE.md       # Customer-facing guide
├── src/
│   ├── app/                # Next.js app router
│   ├── components/         # React components
│   ├── lib/                # Utilities
│   └── styles/             # CSS
├── public/                 # Static assets
├── prisma/                 # Database schema
└── tests/                  # Test suite
```

## 🚀 Quick Links

- [Planning Document](docs/PLAN.md)
- [Business Model](docs/BUSINESS_MODEL.md)
- [Customer Journey](docs/CUSTOMER_JOURNEY.md)
- [Fulfillment Workflow](docs/FULFILLMENT_WORKFLOW.md)
- [User Guide](docs/USER_GUIDE.md)

## 📊 Development Status

- [x] Phase 1: PLAN
- [ ] Phase 2: DOCUMENT (PRD)
- [ ] Phase 3: BUILD
- [ ] Phase 4: TEST
- [ ] Phase 5: DEPLOY

## 🏃 Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your keys

# Run development server
npm run dev
```

## 📄 License

Proprietary - Brainworks AI

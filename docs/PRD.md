# Product Requirements Document (PRD)
## OpenClaw Mac Reseller Platform

**Version:** 1.0  
**Date:** 2026-02-11  
**Author:** HAL (Brainworks AI)  
**Status:** Draft

---

## 1. Executive Summary

### 1.1 Purpose
Build an e-commerce platform to sell pre-configured Mac mini computers with OpenClaw AI assistant software pre-installed, providing customers with a turnkey local AI experience.

### 1.2 Goals
1. Launch functional e-commerce storefront
2. Enable seamless purchase of configured Mac + OpenClaw bundles
3. Automate order management and fulfillment tracking
4. Provide excellent customer onboarding experience

### 1.3 Success Criteria
- Website live and processing orders within 1 week
- Checkout conversion rate >3%
- Customer satisfaction >4.5/5 stars
- Zero critical bugs at launch

---

## 2. Product Overview

### 2.1 Product Description
A web-based storefront where customers can:
- Browse Mac mini configurations optimized for AI
- Understand the value of OpenClaw pre-installation
- Purchase hardware + software bundle
- Track their order status
- Access setup guides and support

### 2.2 Target Users

**Primary Persona: Alex the AI Enthusiast**
- Age: 32, Software Engineer
- Goals: Run AI locally without cloud dependency
- Pain Points: Too busy to configure everything manually
- Needs: Plug-and-play solution, good documentation

**Secondary Persona: Sam the Small Business Owner**
- Age: 45, Marketing Agency Owner
- Goals: AI tools for team productivity
- Pain Points: Doesn't want to manage IT complexity
- Needs: Reliable hardware, ongoing support

### 2.3 Value Proposition
"Your personal AI assistant, ready out of the box. No cloud required."

---

## 3. Features & Requirements

### 3.1 Core Features (MVP)

#### F1: Product Catalog
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F1.1 | Display 3 product tiers (Starter, Pro, Max) |
| F1.2 | Show detailed specifications for each configuration |
| F1.3 | Display pricing clearly with breakdown |
| F1.4 | Include high-quality product images |
| F1.5 | Show availability/stock status |

**Acceptance Criteria:**
- [ ] All 3 tiers visible on product page
- [ ] Specs accurate and complete
- [ ] Prices include hardware + first year license
- [ ] Images load in <2 seconds

#### F2: Shopping Cart
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F2.1 | Add products to cart |
| F2.2 | Update quantities |
| F2.3 | Remove items |
| F2.4 | Persist cart across sessions |
| F2.5 | Show cart summary |

**Acceptance Criteria:**
- [ ] Cart persists via localStorage
- [ ] Real-time total calculation
- [ ] Smooth add/remove animations

#### F3: Checkout
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F3.1 | Collect shipping information |
| F3.2 | Validate shipping address |
| F3.3 | Calculate shipping cost |
| F3.4 | Process payment via Stripe |
| F3.5 | Send order confirmation email |
| F3.6 | Display order confirmation page |

**Acceptance Criteria:**
- [ ] Stripe Checkout integration working
- [ ] All US addresses supported
- [ ] Email sent within 1 minute of order
- [ ] Mobile-responsive checkout

#### F4: Order Management (Admin)
**Priority:** P0 (Must Have)

| Requirement | Description |
|-------------|-------------|
| F4.1 | View all orders |
| F4.2 | Filter by status (pending, processing, shipped, delivered) |
| F4.3 | Update order status |
| F4.4 | Add tracking information |
| F4.5 | View customer details |

**Acceptance Criteria:**
- [ ] Admin dashboard accessible via /admin
- [ ] Protected by authentication
- [ ] Real-time order updates

#### F5: Order Tracking (Customer)
**Priority:** P1 (Should Have)

| Requirement | Description |
|-------------|-------------|
| F5.1 | Check order status by order number + email |
| F5.2 | View shipping tracking |
| F5.3 | See estimated delivery date |
| F5.4 | Access from email links |

**Acceptance Criteria:**
- [ ] No login required (order # + email)
- [ ] Real-time status updates
- [ ] Tracking link to carrier site

### 3.2 Secondary Features (Post-MVP)

#### F6: Customer Portal
**Priority:** P2 (Nice to Have)

- Create account
- View order history
- Manage license keys
- Access downloads/documentation

#### F7: License Management
**Priority:** P2 (Nice to Have)

- Generate unique license keys
- Associate with orders
- Renewal reminders
- Upgrade/downgrade tiers

#### F8: Referral Program
**Priority:** P3 (Future)

- Generate referral codes
- Track referrals
- Apply discounts
- Credit account

---

## 4. Technical Specifications

### 4.1 Architecture

```
┌─────────────────────────────────────────────────────┐
│                    FRONTEND                          │
│                  (Next.js 14)                        │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │  Home   │  │Products │  │Checkout │             │
│  │  Page   │  │  Page   │  │  Flow   │             │
│  └─────────┘  └─────────┘  └─────────┘             │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                   API ROUTES                         │
│                (Next.js API)                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │/checkout│  │/orders  │  │/webhook │             │
│  └─────────┘  └─────────┘  └─────────┘             │
└─────────────────────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │ Supabase │  │  Stripe  │  │ Postmark │
    │   (DB)   │  │(Payments)│  │ (Email)  │
    └──────────┘  └──────────┘  └──────────┘
```

### 4.2 Tech Stack

| Layer | Technology | Justification |
|-------|------------|---------------|
| Framework | Next.js 14 | SSR, API routes, React |
| Styling | TailwindCSS | Rapid UI development |
| Components | shadcn/ui | Accessible, customizable |
| Database | Supabase (Postgres) | Free tier, real-time |
| Auth | Supabase Auth | Built-in, simple |
| Payments | Stripe | Industry standard |
| Email | Postmark | Reliable delivery |
| Hosting | Vercel | Zero-config Next.js |
| Domain | Namecheap | Already have domains |

### 4.3 Data Models

#### Products
```typescript
interface Product {
  id: string;
  name: string;           // "OpenClaw Mac Starter"
  tier: 'starter' | 'pro' | 'max';
  hardware: {
    model: string;        // "Mac mini M4"
    chip: string;         // "M4"
    memory: number;       // 16
    storage: number;      // 256
  };
  software: {
    license: 'basic' | 'pro' | 'enterprise';
    features: string[];
  };
  price: number;          // In cents: 79800
  comparePrice?: number;  // Original price for strikethrough
  inStock: boolean;
  leadTime: string;       // "Ships in 2-3 days"
  images: string[];
  specs: Record<string, string>;
}
```

#### Orders
```typescript
interface Order {
  id: string;
  orderNumber: string;    // "OCM-2026-0001"
  stripeSessionId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  customer: {
    email: string;
    name: string;
    phone?: string;
  };
  shipping: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  tracking?: {
    carrier: string;
    number: string;
    url: string;
  };
  licenseKey?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderItem {
  productId: string;
  name: string;
  tier: string;
  quantity: number;
  price: number;
}
```

### 4.4 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | List all products |
| `/api/products/[id]` | GET | Get product details |
| `/api/checkout` | POST | Create Stripe session |
| `/api/webhook` | POST | Handle Stripe webhooks |
| `/api/orders` | GET | List orders (admin) |
| `/api/orders/[id]` | GET | Get order details |
| `/api/orders/[id]` | PATCH | Update order status |
| `/api/orders/track` | GET | Track order (public) |

### 4.5 Environment Variables

```bash
# Database
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Email
POSTMARK_API_KEY=
EMAIL_FROM=orders@openclawmac.com

# App
NEXT_PUBLIC_APP_URL=https://openclawmac.com
ADMIN_PASSWORD=
```

---

## 5. User Interface

### 5.1 Page Structure

```
/                       # Landing page
/products               # Product listing
/products/[tier]        # Product detail
/cart                   # Shopping cart
/checkout               # Checkout flow
/checkout/success       # Order confirmation
/track                  # Order tracking
/about                  # About us
/support                # Support/FAQ
/admin                  # Admin dashboard (protected)
/admin/orders           # Order management
/admin/orders/[id]      # Order detail
```

### 5.2 Design Principles

1. **Clean & Modern** - Minimal, Apple-inspired aesthetic
2. **Trust Signals** - Security badges, testimonials, guarantees
3. **Clear CTAs** - Obvious path to purchase
4. **Mobile First** - Responsive design, touch-friendly
5. **Fast Loading** - <3s LCP, optimized images

### 5.3 Key Components

```
components/
├── layout/
│   ├── Header.tsx        # Navigation, cart icon
│   ├── Footer.tsx        # Links, contact, legal
│   └── Container.tsx     # Max-width wrapper
├── product/
│   ├── ProductCard.tsx   # Tier card display
│   ├── ProductSpecs.tsx  # Specification table
│   ├── PriceDisplay.tsx  # Price with breakdown
│   └── TierBadge.tsx     # Starter/Pro/Max badge
├── cart/
│   ├── CartDrawer.tsx    # Slide-out cart
│   ├── CartItem.tsx      # Line item
│   └── CartSummary.tsx   # Totals
├── checkout/
│   ├── CheckoutForm.tsx  # Shipping form
│   └── OrderSummary.tsx  # Order review
└── ui/
    ├── Button.tsx
    ├── Input.tsx
    └── ... (shadcn components)
```

---

## 6. Security Requirements

### 6.1 Payment Security
- [ ] Stripe handles all card data (PCI compliance)
- [ ] No card numbers stored locally
- [ ] HTTPS everywhere
- [ ] Webhook signature verification

### 6.2 Data Protection
- [ ] Customer data encrypted at rest
- [ ] Minimal data collection
- [ ] GDPR-ready privacy policy
- [ ] Secure admin authentication

### 6.3 Application Security
- [ ] Input validation on all forms
- [ ] CSRF protection
- [ ] Rate limiting on API endpoints
- [ ] Security headers (CSP, HSTS)

---

## 7. Testing Requirements

### 7.1 Unit Tests
- Product data utilities
- Price calculations
- Order number generation
- Form validation

### 7.2 Integration Tests
- Stripe checkout flow
- Webhook processing
- Email sending
- Database operations

### 7.3 E2E Tests
- Complete purchase flow
- Order tracking
- Admin order management

### 7.4 Test Coverage Target
- Minimum 80% code coverage
- 100% of payment-related code

---

## 8. Launch Checklist

### Pre-Launch
- [ ] All MVP features complete
- [ ] Test purchases successful
- [ ] Email templates working
- [ ] Admin dashboard functional
- [ ] Mobile responsive
- [ ] Performance optimized
- [ ] Security audit passed
- [ ] Legal pages complete (Privacy, Terms)

### Launch
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] Stripe live mode enabled
- [ ] Monitoring enabled
- [ ] Backup procedures tested

### Post-Launch
- [ ] Monitor for errors
- [ ] Track conversion metrics
- [ ] Gather user feedback
- [ ] Iterate on UX

---

## 9. Timeline

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Planning | 1 day | PRD, Business docs ✅ |
| Design | 0.5 days | UI mockups, component spec |
| Build | 2 days | Functional storefront |
| Test | 0.5 days | Test suite, bug fixes |
| Deploy | 0.5 days | Production deployment |
| **Total** | **4-5 days** | Live storefront |

---

## 10. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Stripe integration issues | High | Low | Use Stripe test mode extensively |
| Low initial traffic | Medium | Medium | Content marketing, SEO focus |
| Fulfillment delays | Medium | Medium | Clear communication, manage expectations |
| Support overload | Medium | Low | Strong documentation, FAQ |

---

## Appendix A: Wireframes

### Home Page
```
┌────────────────────────────────────────────────────┐
│  [Logo]            Products  About  Support  [🛒]  │
├────────────────────────────────────────────────────┤
│                                                    │
│        Your Personal AI Assistant                  │
│        Ready Out of the Box                        │
│                                                    │
│              [Shop Now →]                          │
│                                                    │
├────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ 🌱       │  │ ⚡       │  │ 🚀       │        │
│  │ Starter  │  │   Pro    │  │   Max    │        │
│  │ $798     │  │ $1,098   │  │ $2,498   │        │
│  │ [View]   │  │ [View]   │  │ [View]   │        │
│  └──────────┘  └──────────┘  └──────────┘        │
├────────────────────────────────────────────────────┤
│  Why OpenClaw Mac?                                 │
│  • Zero setup required                             │
│  • Privacy-first local AI                          │
│  • Premium Apple hardware                          │
│  • Ongoing updates included                        │
├────────────────────────────────────────────────────┤
│  [Footer: Links, Contact, Legal]                   │
└────────────────────────────────────────────────────┘
```

### Product Detail
```
┌────────────────────────────────────────────────────┐
│  [Header]                                          │
├────────────────────────────────────────────────────┤
│  ┌────────────────┐  OpenClaw Mac Pro             │
│  │                │                                │
│  │   [Product     │  ⚡ Pro Tier                   │
│  │    Image]      │                                │
│  │                │  $1,098                        │
│  │                │  Includes first year license   │
│  └────────────────┘                                │
│                      [Add to Cart]                 │
│                                                    │
│  ─────────────────────────────────                │
│  Specifications                                    │
│  ─────────────────────────────────                │
│  Chip:        Apple M4                             │
│  Memory:      24GB Unified                         │
│  Storage:     512GB SSD                            │
│  License:     OpenClaw Pro                         │
│                                                    │
│  ─────────────────────────────────                │
│  What's Included                                   │
│  ─────────────────────────────────                │
│  ✓ Mac mini M4 24GB                               │
│  ✓ OpenClaw Pro (1 year)                          │
│  ✓ Pre-configured and tested                       │
│  ✓ Quick start guide                               │
│  ✓ 30-day priority support                         │
└────────────────────────────────────────────────────┘
```

---

## Appendix B: Email Templates

### Order Confirmation
```
Subject: Order Confirmed - #OCM-2026-0001

Hi {customer_name},

Thank you for your order! We're preparing your OpenClaw Mac.

Order Details:
─────────────────────────
Order Number: #OCM-2026-0001
Product: OpenClaw Mac Pro (M4 24GB)
Total: $1,098.00

Shipping To:
{shipping_address}

What's Next:
1. We'll configure your Mac with OpenClaw (1-2 days)
2. You'll receive tracking when it ships
3. Estimated delivery: {estimated_date}

Questions? Reply to this email.

– The OpenClaw Mac Team
```

---

*Document End*

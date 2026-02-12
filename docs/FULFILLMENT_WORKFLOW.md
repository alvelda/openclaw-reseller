# OpenClaw Mac Reseller - Order Fulfillment Workflow

## 📋 Overview

This document details the end-to-end process from order placement to delivery, including the OpenClaw pre-configuration procedure.

---

## 🔄 Order Lifecycle

```
ORDER PLACED
    ↓
PAYMENT CONFIRMED
    ↓
SOURCING
    ↓
CONFIGURATION
    ↓
QUALITY ASSURANCE
    ↓
PACKAGING
    ↓
SHIPPING
    ↓
DELIVERY
    ↓
POST-DELIVERY FOLLOW-UP
```

---

## 1️⃣ Order Placed

### Automated Actions
- [ ] Order created in database
- [ ] Confirmation email sent to customer
- [ ] Slack/Telegram notification to operations
- [ ] Inventory check triggered

### Manual Review (if needed)
- High-value orders ($2,000+)
- International shipping
- Flagged for fraud review

---

## 2️⃣ Payment Confirmed

### Stripe Webhook Processing
```
Event: checkout.session.completed
    → Mark order as PAID
    → Trigger fulfillment workflow
    → Send payment receipt email
```

### Payment Verification
- Confirm payment captured (not just authorized)
- Check for chargeback risk indicators
- Flag suspicious patterns

---

## 3️⃣ Sourcing

### Decision Tree
```
Is configuration in stock?
├── YES → Proceed to Configuration
└── NO → Source from supplier
         ├── Check Ingram Micro availability
         ├── Check Tech Data availability
         ├── Check Apple Refurbished (if budget tier)
         └── Update customer with timeline
```

### Supplier Order Process

**Ingram Micro:**
1. Log into IM360 portal
2. Search Mac mini by SKU
3. Check inventory and pricing
4. Place order (net-30 terms)
5. Note order number and ETA

**Apple Refurbished:**
1. Check apple.com/shop/refurbished
2. Purchase with business card
3. Ship to operations address
4. Track delivery

### Sourcing SLA
- In-stock: Ship within 2 business days
- Sourced: Ship within 5-7 business days
- Communicate delays proactively

---

## 4️⃣ Configuration

### Pre-Configuration Checklist

#### Hardware Inspection
- [ ] Verify correct model received
- [ ] Check for physical damage
- [ ] Verify specs (RAM, storage)
- [ ] Test all ports
- [ ] Confirm serial number

#### Initial Setup
- [ ] First boot and language selection
- [ ] Connect to configuration WiFi
- [ ] Skip Apple ID setup (customer will add)
- [ ] Create admin account: `openclaw-admin`
- [ ] Create user account: `user` (temp password)

### OpenClaw Installation Script

```bash
#!/bin/bash
# OpenClaw Pre-Configuration Script
# Run as admin user

set -e

echo "=== OpenClaw Mac Configuration ==="
echo "Starting configuration at $(date)"

# System updates
echo "Updating macOS..."
softwareupdate -ia --verbose

# Install Homebrew
echo "Installing Homebrew..."
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install dependencies
echo "Installing dependencies..."
brew install python@3.11 node git

# Install OpenClaw
echo "Installing OpenClaw..."
pip3 install openclaw

# Configure OpenClaw
echo "Configuring OpenClaw..."
openclaw setup --auto

# Create launch agent for auto-start
cat > ~/Library/LaunchAgents/com.openclaw.agent.plist << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.openclaw.agent</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/openclaw</string>
        <string>start</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
EOF

launchctl load ~/Library/LaunchAgents/com.openclaw.agent.plist

# Install license
echo "Installing license..."
openclaw license install --key "${LICENSE_KEY}"

# Verify installation
echo "Verifying installation..."
openclaw status
openclaw health-check

# Cleanup
echo "Cleaning up..."
brew cleanup
pip3 cache purge

# Create welcome file on desktop
cat > ~/Desktop/Welcome.txt << EOF
Welcome to your OpenClaw Mac!

Getting Started:
1. OpenClaw starts automatically when you log in
2. Click the OpenClaw icon in your menu bar
3. Start chatting with your AI assistant!

Need help?
- Quick Start Guide: Check your package
- Online docs: docs.openclaw.com
- Support: support@openclawmac.com

Your License Key: ${LICENSE_KEY}
(Keep this safe for future reference)

Enjoy your new AI-powered Mac!
EOF

echo "=== Configuration Complete ==="
echo "Finished at $(date)"
```

### Post-Installation Verification
- [ ] OpenClaw launches successfully
- [ ] License is active
- [ ] Test conversation works
- [ ] Menu bar icon appears
- [ ] Auto-start on login works
- [ ] No error messages

---

## 5️⃣ Quality Assurance

### QA Checklist

#### Hardware Tests
- [ ] Display output works (HDMI + USB-C)
- [ ] All USB ports functional
- [ ] Ethernet port works
- [ ] WiFi connects
- [ ] Bluetooth pairs
- [ ] Audio output works

#### Software Tests
- [ ] macOS boots cleanly
- [ ] OpenClaw starts automatically
- [ ] License shows as active
- [ ] Test 5 AI conversations
- [ ] Check response quality
- [ ] Verify no errors in logs

#### Security Check
- [ ] No personal data from config
- [ ] No saved WiFi networks
- [ ] No browser history
- [ ] Temp admin password set
- [ ] FileVault ready (not enabled)

### QA Sign-Off
```
QA Technician: _____________
Date: _____________
Serial Number: _____________
Configuration: _____________
Status: [ ] PASS  [ ] FAIL
Notes: _____________
```

---

## 6️⃣ Packaging

### Package Contents Checklist
- [ ] Mac mini (configured)
- [ ] Power cable
- [ ] Welcome card
- [ ] Quick Start Guide (printed)
- [ ] OpenClaw license card
- [ ] Sticker pack
- [ ] Thank you note (handwritten if possible)

### Packaging Materials
- Original Apple box (when available)
- Custom branded sleeve/wrap
- Protective foam inserts
- "Fragile - Electronics" tape
- Packing slip (no prices shown)

### Box Label
```
┌─────────────────────────────────┐
│  OpenClaw Mac                   │
│  Order: #12345                  │
│  Config: M4 Pro 24GB            │
│  S/N: XXXXXXXXXXXX              │
│                                 │
│  ⚠️ FRAGILE - ELECTRONICS       │
│  📦 INSURED VALUE: $2,000       │
└─────────────────────────────────┘
```

---

## 7️⃣ Shipping

### Carrier Selection
| Weight | Destination | Carrier | Service |
|--------|-------------|---------|---------|
| All | Continental US | UPS | Ground |
| All | Expedited | UPS | 2-Day |
| All | Overnight | UPS | Next Day Air |
| All | Hawaii/Alaska | USPS | Priority |

### Shipping Process
1. Generate label via Shippo/EasyShip
2. Apply label to package
3. Schedule pickup or drop at UPS Store
4. Update order with tracking number
5. Send tracking email to customer

### Insurance
- All shipments insured for full value
- Signature required for orders >$1,000
- Photo documentation before shipping

---

## 8️⃣ Delivery

### Delivery Notifications
- "Out for delivery" alert (morning of)
- "Delivered" confirmation
- Photo proof of delivery (when available)

### Delivery Issues
- **Not delivered:** Contact carrier, investigate
- **Damaged:** File claim, expedite replacement
- **Wrong address:** Intercept if possible
- **Stolen:** File claim, police report, replace

---

## 9️⃣ Post-Delivery Follow-up

### Email Sequence
1. **Day +1:** Welcome email with setup tips
2. **Day +3:** "How's it going?" check-in
3. **Day +7:** Feature tips, documentation links
4. **Day +14:** Request for review

### Support Readiness
- Monitor support inbox
- 24-hour response SLA
- Escalation path for complex issues
- Remote assistance capability (with permission)

---

## 📊 Fulfillment Metrics

| Metric | Target | Alert Threshold |
|--------|--------|-----------------|
| Order to ship (in-stock) | <2 days | >3 days |
| Order to ship (sourced) | <7 days | >10 days |
| QA pass rate | >99% | <95% |
| Delivery success | >99% | <98% |
| Post-delivery support tickets | <10% | >20% |

---

## 🔧 Tools & Systems

| Function | Tool |
|----------|------|
| Order management | Custom dashboard / Shopify |
| Payment processing | Stripe |
| Shipping labels | Shippo / EasyShip |
| Tracking | AfterShip |
| Customer communication | Email (Postmark) |
| Internal alerts | Telegram / Slack |
| Inventory | Spreadsheet → Inventory system |

---

## 📝 Standard Operating Procedures

### Daily Operations
- Morning: Check new orders, begin processing
- Midday: Configure units, run QA
- Afternoon: Package and ship
- Evening: Update tracking, respond to inquiries

### Weekly Operations
- Monday: Inventory review, reorder if needed
- Wednesday: Supplier check-in
- Friday: Metrics review, process improvements

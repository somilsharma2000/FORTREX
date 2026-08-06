# 🏰 FORTREX

### The Fortress of Trading Champions

An elite trading tournament platform where traders compete in monthly seasons for funded accounts. Built with a royal aesthetic, gamified currency system (Forts), and deep Discord/Telegram integration.

## ✨ Features

- **Royal-themed homepage** — Dark navy + gold, serif typography, crest branding
- **Live tournament system** — Monthly seasons, 3 weight brackets, composite scoring
- **Locked contests** — Unlock at registration milestones (10K, 15K)
- **Forts (₣) currency** — Earn through tasks, invites, trading. Redeem for accounts, lucky draws, premium roles
- **Live leaderboard** — Real-time rankings with bracket filtering
- **Trading calculators** — Lot size, profit, consistency calculators with interactive sliders
- **Real-time market news** — Live forex/commodity news feed
- **Discord integration** — FORTREX Citadel, identity sync, Forts sync
- **Telegram community** — FORTREX Signal broadcast channel
- **Anti-fraud system** — Device fingerprinting, IP reputation, trade correlation, self-referral prevention
- **Admin panel** — Separate secure dashboard with full CRUD, fraud flagging, user management

## 🎨 Brand Ecosystem

| Asset | Name |
|-------|------|
| Website | FORTREX |
| Discord Server | FORTREX Citadel |
| Telegram Channel | FORTREX Signal |
| Virtual Currency | Forts (₣) |
| Currency Tagline | "Earn Forts. Redeem Forts. Trade like royalty." |

## 🏆 Tournament Model

**Seasons:** Monthly (clear start, clear end)

**Weight Brackets:**
- Lightweight: $10K – $25K accounts
- Middleweight: $50K – $100K accounts
- Heavyweight: $200K+ accounts

**Composite Score:**
- 40% ROI% (normalized — percentage, not raw dollars)
- 30% Consistency (daily returns, profit factor, win rate)
- 30% Risk Management (drawdown adherence, lot discipline)

**DQ Rules:** 5% daily loss, 10% max drawdown, min 5 trading days, no latency arbitrage

## 🛡️ Anti-Fraud Stack

- Device fingerprinting (Canvas, WebGL, AudioContext, TLS)
- IP reputation checks (VPN/datacenter blocking)
- Phone OTP verification
- Instagram follow verification
- Trade timestamp correlation (detects copy-trading, A/B hedging)
- Self-referral prevention (wallet/device hash matching)
- Behavioral analysis

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 + Tailwind CSS + Framer Motion
- **Backend:** NestJS + PostgreSQL + Redis
- **Auth:** JWT + Phone OTP + Instagram OAuth + Discord OAuth2
- **Discord Bot:** Discord.js with slash commands, Linked Roles, webhooks
- **Telegram Bot:** Telegraf with TMA support
- **Anti-Fraud:** FingerprintJS + IPQualityScore
- **Google Sheets:** Real-time sync for backup data
- **Hosting:** Vercel (frontend) + Railway/Render (backend) + Cloudflare

## 📁 Project Structure

```
fortrex/
├── app/
│   ├── globals.css      # Royal theme styles
│   ├── layout.tsx        # Root layout with fonts
│   └── page.tsx          # Homepage with all sections
├── package.json
├── tailwind.config.ts    # Royal color palette
├── tsconfig.json
├── next.config.mjs
├── postcss.config.mjs
└── README.md
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📜 License

Proprietary — © 2026 FORTREX. All rights reserved.

---

*Built for champions. Designed for royalty.*

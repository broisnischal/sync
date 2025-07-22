# 🔄 Browser Sync Extension – Project Context

## 📌 Vision

Build a privacy-focused, real-time sync extension that works across major browsers and devices. Users can sync:

- Bookmarks
- Open Tabs
- Browsing History
- Passwords (E2E Encrypted)
- Autofill Addresses
- Payment Methods
- Installed Add-ons
- Common Browser Settings

## 🌐 Supported Browsers

- Chrome
- Firefox
- Brave
- Edge
- Arc
- Opera
- Zen

## 🧰 Key Features

- 🔐 **Session Auth via QR Code** (like Discord / WhatsApp)
- 🧠 **End-to-End Encryption** for sensitive data (passwords, cards)
- 🪢 **Real-time Conflict Resolution** (merge logic and timestamps)
- ⚡ **Live Tab & History Sync** (across sessions/devices)
- 📦 **Cross-Browser Compatibility** using WebExtensions API
- 🧭 **Offline-first with IndexedDB**, syncs on reconnect
- 🔁 **Redis-powered WebSocket Sync Engine**
- 🧵 **Queue-based Sync Retry Mechanism**
- 💳 **SaaS Subscription** (Free vs Premium Tiers)
- ⚙️ **Settings, Device Management, and Limits**

---

## 🧱 Architecture Overview

### 🧠 Monorepo (Turborepo)

browser-sync-extension/
├── apps/
│ ├── api/ # Hono + OAuth + QR session backend
│ └── extension/ # WebExtension (TS + Vite)
├── packages/
│ ├── db/ # Drizzle ORM schema (PostgreSQL)
│ ├── types/ # Shared Zod schemas/types
│ └── utils/ # Auth, crypto, QR, etc.
└── turbo.json

---

## 🧩 Technology Stack

### 🔧 Backend

- **Framework**: Hono (tiny, fast, composable)
- **Auth**: Google OAuth 2.0 + QR-based session login
- **ORM**: Drizzle with PostgreSQL
- **Cache**: Redis (sessions, socket pub/sub, QR tokens)
- **Validation**: Zod
- **WebSockets**: Native `ws` or Hono + Bun/WebSocket servers

### 💡 Frontend (Extension)

- Vite + TypeScript
- IndexedDB (via `idb` or `Dexie.js`)
- WebExtension APIs (unified via `webextension-polyfill`)
- Manifest v3 for Chrome-based, polyfills for Firefox
- Auto-reload and live dev server for popup pages

---

## 📦 SaaS Model

### Free Tier

- Bookmark sync only
- Max 2 devices
- Limited storage
- Manual sync (no real-time)

### Premium Tier

- Unlimited devices
- Real-time sync for all features
- Priority sync queue and faster socket throughput
- Premium support

---

## 💽 Data Layer

| Layer          | Purpose                             | Tech                  |
| -------------- | ----------------------------------- | --------------------- |
| **IndexedDB**  | Offline-first local store           | Dexie.js / idb        |
| **Redis**      | Real-time channel, session QR store | Redis pub/sub         |
| **PostgreSQL** | Encrypted persistent data store     | Drizzle ORM           |
| **WebSockets** | Real-time device sync               | `ws` + Redis channels |

---

## 🔐 Session Auth Flow (QR-based)

1. Web client requests `/api/session/create`
2. Server stores session in Redis (TTL 5 mins)
3. QR code is rendered with session ID
4. Mobile client scans → calls `/session/verify`
5. Server finalizes the login and returns a token

---

## 🔁 Sync Strategy

- Each extension instance tracks a **local change queue**
- Queue is written to `IndexedDB` offline
- When online, queued changes are pushed to server
- Server broadcasts to other devices via WebSocket
- Conflict resolution uses timestamps, last-write-wins, or user prompt

---

## 🧪 Development & CI

- `turbo run dev` for parallel API + Extension dev
- Linting, Prettier, and test setup included
- Auto-reload via `tsx watch` or Vite hot reload
- Extension dev with `web-ext` for Firefox reload

---

## 📍 Roadmap

- [x] Architecture Plan
- [x] Monorepo Layout (Turborepo)
- [ ] QR Auth API Endpoints
- [ ] Redis Integration (QR sessions, pub/sub)
- [ ] Sync API (Bookmarks, Tabs, History)
- [ ] Extension Manifest + UI + Dexie Store
- [ ] SaaS Billing (Stripe)
- [ ] CI/CD for WebStore & Server Deployments

---

## ✅ Goals

- Seamless sync across all major browsers
- Secure and private by design (E2EE)
- Simple UX with advanced power-user features
- Scalable API design with optional multitenancy

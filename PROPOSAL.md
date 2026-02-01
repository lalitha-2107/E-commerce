# E-Commerce Platform — Architecture Proposal

**Status:** Awaiting your approval before any code is written.

---

## 1. Tech Stack (Confirmed)

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 14+ (App Router) + TypeScript | SSR, RSC, routing, API |
| **Styling** | Tailwind CSS | Utility-first, responsive, dark mode |
| **Backend** | Next.js API Routes | REST/JSON API, serverless on Vercel |
| **Database** | PostgreSQL | Relational data, Prisma |
| **ORM** | Prisma | Type-safe queries, migrations |
| **Auth** | NextAuth.js | Sessions, roles (admin/customer) |
| **Payments** | Stripe (sandbox) | Checkout, webhooks |
| **Deployment** | Vercel | Frontend + serverless API |

---

## 2. Folder Structure

```
ecommerce/
├── .env.example                 # Template for env vars (no secrets)
├── .env.local                  # Local secrets (gitignored)
├── .gitignore
├── README.md                   # Portfolio README template
├── PROPOSAL.md                 # This file
│
├── prisma/
│   ├── schema.prisma           # DB schema & Prisma config
│   └── seed.ts                 # Seed script (sample products, admin user)
│
├── public/
│   ├── favicon.ico
│   └── images/                 # Static product images (optional)
│
├── src/
│   ├── app/                    # App Router
│   │   ├── layout.tsx          # Root layout (providers, fonts)
│   │   ├── page.tsx            # Home / landing
│   │   ├── globals.css         # Tailwind + custom CSS
│   │   │
│   │   ├── (auth)/             # Auth route group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx      # Centered auth layout
│   │   │
│   │   ├── (shop)/             # Customer shop routes
│   │   │   ├── products/
│   │   │   │   ├── page.tsx    # Catalog (search, filters)
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx # Product detail
│   │   │   ├── cart/
│   │   │   │   └── page.tsx
│   │   │   ├── checkout/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx      # Shop layout (header, cart icon)
│   │   │
│   │   ├── api/                # API Routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── products/
│   │   │   │   ├── route.ts    # GET list, POST (admin)
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts
│   │   │   ├── cart/
│   │   │   │   └── route.ts
│   │   │   ├── checkout/
│   │   │   │   └── route.ts    # Create Stripe session
│   │   │   ├── webhooks/
│   │   │   │   └── stripe/
│   │   │   │       └── route.ts
│   │   │   └── orders/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   │
│   │   └── admin/              # Admin dashboard (protected)
│   │       ├── layout.tsx      # Admin layout + role check
│   │       ├── page.tsx        # Dashboard overview
│   │       ├── products/
│   │       │   ├── page.tsx    # List / create
│   │       │   └── [id]/
│   │       │       └── page.tsx # Edit product
│   │       └── orders/
│   │           └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/                 # Reusable UI (buttons, inputs, cards)
│   │   ├── layout/             # Header, Footer, CartIcon
│   │   ├── product/            # ProductCard, ProductGrid, filters
│   │   ├── cart/               # CartItem, CartSummary
│   │   ├── auth/               # LoginForm, SignupForm
│   │   └── admin/              # Admin tables, forms
│   │
│   ├── lib/
│   │   ├── prisma.ts           # Singleton Prisma client
│   │   ├── auth.ts             # NextAuth config, callbacks
│   │   ├── stripe.ts           # Stripe client & helpers
│   │   └── utils.ts            # cn(), formatters, etc.
│   │
│   ├── hooks/                  # useCart, useProducts, etc.
│   ├── types/                  # Shared TS types (index.d.ts or .ts)
│   └── actions/                # Optional: server actions for forms
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

---

## 3. Database Schema (Prisma)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ---- Users & Auth ----
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  passwordHash  String?   // for credentials provider
  name          String?
  image         String?
  role          Role      @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts Account[]
  sessions Session[]
  orders   Order[]
  cartItems CartItem[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

enum Role {
  CUSTOMER
  ADMIN
}

// ---- Catalog ----
model Category {
  id          String    @id @default(cuid())
  name        String    @unique
  slug        String    @unique
  description String?
  image       String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  products Product[]
}

model Product {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  price       Decimal   @db.Decimal(10, 2)
  image       String?
  images      String[]  // optional multiple images
  stock       Int       @default(0)
  featured    Boolean   @default(false)
  categoryId  String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  category   Category?  @relation(fields: [categoryId], references: [id], onDelete: SetNull)
  orderItems OrderItem[]
  cartItems  CartItem[]
}

// ---- Cart (server-side cart tied to user) ----
model CartItem {
  id        String   @id @default(cuid())
  userId    String
  productId String
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
}

// ---- Orders & Payments ----
model Order {
  id            String        @id @default(cuid())
  userId        String
  stripeSessionId String?     @unique  // Stripe Checkout session
  status        OrderStatus   @default(PENDING)
  totalCents    Int           // Store in cents to avoid float issues
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt

  user       User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]
}

model OrderItem {
  id         String   @id @default(cuid())
  orderId    String
  productId  String   // Snapshot: we store product id + name/price at order time
  productName  String
  priceCents   Int
  quantity    Int
  createdAt   DateTime @default(now())

  order   Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Restrict)
}

enum OrderStatus {
  PENDING    // Created, awaiting payment
  PAID       // Stripe webhook confirmed
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

---

## 4. Environment Variables

| Variable | Description | Example (local) |
|----------|-------------|------------------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/ecommerce` |
| `NEXTAUTH_SECRET` | Secret for signing sessions | Random 32+ char string |
| `NEXTAUTH_URL` | App URL | `http://localhost:3000` (prod: your Vercel URL) |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_...) | From Stripe Dashboard |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (pk_test_...) | From Stripe Dashboard |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret (whsec_...) | From Stripe webhook config |
| `NEXT_PUBLIC_APP_URL` | Public app URL (for redirects) | Same as NEXTAUTH_URL |

---

## 5. Build Order (After Approval)

1. **Project setup** — Next.js, Tailwind, Prisma, env files, README.
2. **Database** — Prisma schema, migrate, seed.
3. **Auth** — NextAuth (Credentials + role), login/signup pages, protected routes.
4. **Product catalog** — Categories, products API, catalog + product detail pages, search/filters.
5. **Cart** — Cart API, cart page, add/update/remove.
6. **Checkout & Stripe** — Checkout API, Stripe Checkout session, success/cancel pages, webhook.
7. **Orders** — Orders API, order history (customer), order list (admin).
8. **Admin dashboard** — Layout guard, products CRUD, orders list, optional inventory.
9. **Polish** — Dark mode, animations, responsive pass, SEO (meta, titles).
10. **Deployment** — Vercel config, env docs, README with live demo placeholder.

---

## 6. Summary

- **Folder structure**: App Router with route groups `(auth)`, `(shop)`, plus `api/` and `admin/`.
- **Database**: PostgreSQL + Prisma with `User` (role), `Category`, `Product`, `CartItem`, `Order`, `OrderItem`; NextAuth tables if using Prisma adapter (optional; we can use JWT-only to keep it simpler for portfolio).
- **Tech stack**: As you specified — Next.js 14+, TypeScript, Tailwind, Prisma, NextAuth, Stripe, Vercel.

**Note:** NextAuth can use either the Prisma adapter (store sessions in DB) or JWT (sessions in cookie). For portfolio simplicity, we can start with JWT and add Prisma adapter later if you want sessions in DB.

---

Please review and confirm:
1. Folder structure — any changes?
2. Database schema — any extra fields or models?
3. Build order — reorder or add/remove steps?

Once you approve, we’ll start with **Step 1: Project setup**.

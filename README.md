# E-Commerce Platform (Portfolio Showcase)

A **dummy e-commerce store** built for portfolio showcase — no sign-in, no database required. Clean UI with product catalog, cart, and checkout flow.

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS
- **State:** React Context (cart), localStorage persistence
- **Data:** Mock product data (no backend/DB needed to run)
- **Deployment:** Vercel-ready

## Features

- Product catalog with search and category filters
- Product detail page with add-to-cart
- Shopping cart (persists in browser)
- Dummy checkout → success page
- Responsive design, dark mode toggle
- No authentication — browse and demo the full flow

## Screenshots / Demo

<!-- Add screenshots or GIFs here -->
<!-- ![Home](docs/screenshots/home.png) -->
**Live demo:** [Add your Vercel URL here]

## Setup

### Prerequisites

- Node.js 18+

### 1. Clone and install

```bash
git clone <your-repo-url>
cd ecommerce
npm install
```

### 2. Run locally

No database or environment variables required for the demo.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Browse products, add to cart, and go through checkout to see the success page.

### Production (Vercel)

1. Push to GitHub and import the repo in Vercel.
2. Deploy — no env vars needed for the dummy store.

## Scripts

| Command         | Description       |
|-----------------|-------------------|
| `npm run dev`   | Start dev server  |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint        |

## License

MIT

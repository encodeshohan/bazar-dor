# 🛒 বাজার দর (BazarDor)

BazarDor is a Bangla web app that shows the daily market prices of essential goods in Bangladesh: rice, lentils, oil, vegetables, fish, meat, eggs and spices. Users can see today's prices at a glance, compare bazaar-wise prices, and sign in to view detailed price information.

**Live site:** `<your-vercel-url>`
**Repository:** `<your-github-repo-url>`

## Technologies

- [Next.js 16](https://nextjs.org) (App Router, Turbopack, Cache Components, Proxy)
- React 19 and TypeScript
- Tailwind CSS 4
- [HeroUI v3](https://www.heroui.com) (UI components)
- [Better Auth](https://better-auth.com) with MongoDB (authentication)
- MongoDB Atlas (database)
- react-hot-toast (notifications)
- react-marquee-text (price ticker)

## Features

1. **Live price ticker:** a scrolling bar with each product's emoji, name, price, unit and ▲/▼ percentage change, shown in Bengali digits.
2. **Daily Bangla date and hero banner:** the current date in Bangla and a call-to-action that scrolls to the product list.
3. **Homepage price movers:** separate sections for products whose price rose or fell today, plus the full product list, with loading skeletons.
4. **Category pages:** browse products by category, with active category highlighting, an empty state and a friendly 404 for invalid slugs.
5. **Price sorting:** sort by default, price low to high, or price high to low. Bengali digits are converted to numbers before sorting.
6. **Protected product details:** signed-in users see the minimum, maximum and average price and a bazaar-wise price table. Signed-out users are redirected to sign in and returned to the page they wanted.
7. **Authentication:** email/password sign up and sign in, plus Google and GitHub social login.
8. **User profile:** view profile information and update the display name.

## Getting Started

### Prerequisites

- Node.js 20 or later
- A MongoDB database (a free MongoDB Atlas cluster works)
- Optional: Google and GitHub OAuth apps for social login

### Installation

```bash
git clone <your-github-repo-url>
cd bazar-dor
npm install
```

### Environment variables

Create a file named `.env` in the project root. Use `.env.example` as a template:

```env
BETTER_AUTH_SECRET=<a-long-random-string>
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URL=<your-mongodb-connection-string>

# Optional: social login is enabled only when both values of a pair are set
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
GITHUB_CLIENT_ID=<your-github-client-id>
GITHUB_CLIENT_SECRET=<your-github-client-secret>
```

OAuth callback URLs:

- Google: `<BETTER_AUTH_URL>/api/auth/callback/google`
- GitHub: `<BETTER_AUTH_URL>/api/auth/callback/github`

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                       |
| --------------- | --------------------------------- |
| `npm run dev`   | Start the development server      |
| `npm run lint`  | Run ESLint                        |
| `npm run build` | Create a production build         |
| `npm run start` | Run the production build locally  |

## Data source

Prices come from the public API at `https://openapi.programming-hero.com/api/bazardor` (`/categories` and `/products`). The average price is the mean of each bazaar's midpoint, `(min + max) / 2`, rounded to a whole number.

## Deployment

The app is deployed on [Vercel](https://vercel.com).

1. Push the repository to GitHub and import it in Vercel.
2. Add all environment variables in the Vercel project settings. Set `BETTER_AUTH_URL` to the live URL.
3. In MongoDB Atlas, open Network Access and allow connections from Vercel (for example `0.0.0.0/0`).
4. Register the production callback URLs (`<live-url>/api/auth/callback/google` and `<live-url>/api/auth/callback/github`) in the Google and GitHub OAuth apps.
5. Redeploy after changing environment variables.

## Notes

All prices are indicative and may change with market conditions.
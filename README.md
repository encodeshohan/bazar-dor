# 🛒 বাজার দর — BazarDor

আজকের বাজারদর, এক নজরে।

BazarDor is a Bangla market-price tracking web application that helps users explore the daily prices of essential goods in Bangladesh. Browse products, compare market-wise prices, track daily price changes, and view detailed price summaries — all in one place.

🌐 **Live Demo:** [BazarDor](https://bazar-dor-encodeshohan.vercel.app/)
📦 **Repository:** [encodeshohan/bazar-dor](https://github.com/encodeshohan/bazar-dor)

---

## 🌐 Project Overview

বাজার দর is a Next.js web application designed to make everyday market prices easier to understand and compare.

The application displays prices for essential products such as rice, lentils, oil, vegetables, fish, meat, eggs, and spices. It uses Bengali numerals and localized date formatting to provide a familiar experience for Bangla-speaking users.

Users can explore price trends, browse products by category, sort products by price, and access detailed market-wise price information after signing in.

---

## 🛠️ Technologies Used

### Frontend

* ⚛️ **Next.js 16** — App Router, server-rendered pages, and routing
* ⚛️ **React 19** — Component-based user interface
* 🔷 **TypeScript** — Type safety and maintainable code
* 🎨 **Tailwind CSS 4** — Responsive styling and layouts
* 🌼 **HeroUI v3** — UI components
* 🔤 **Hind Siliguri** — Bengali typography using `next/font`

### Libraries

* 🔐 **Better Auth** — Authentication and session management
* 🍃 **MongoDB** — Database for authentication data
* 🔔 **react-hot-toast** — Success and error notifications
* 📊 **react-marquee-text** — Scrolling market-price ticker
* 🎨 **tailwind-variants** — Styling utilities

### Data

* 🌐 **BazarDor Public API** — Product, category, and market-price data
* 🗄️ **MongoDB Atlas** — Hosted database for user authentication

---

## ✨ Features

### 1. 📈 Live-Style Price Ticker

A scrolling price ticker displays product information at a glance.

* Product emoji or icon and Bengali name
* Today's price and measurement unit
* Price-change percentage compared with yesterday
* Visual indicators for rising, falling, and unchanged prices
* Clickable products that open their detail pages

### 2. 🔥 Today's Price Movers

The homepage highlights products with the largest price movements.

* **আজ দাম বেড়েছে ▲** — Displays up to six products with the largest percentage increases.
* **আজ দাম কমেছে ▼** — Displays up to six products with the largest percentage decreases.
* **সব পণ্য** — Displays the complete product list in a responsive card layout.

Red, green, and neutral indicators make price movements easy to recognize.

### 3. 🗂️ Category Browsing and Price Sorting

Explore products through category-specific pages.

* Browse products by category.
* View Bengali category names and icons.
* Sort products using three options:

  * ডিফল্ট
  * দাম: কম থেকে বেশি
  * দাম: বেশি থেকে কম
* Correctly handle Bengali numerals when sorting prices.
* Display loading skeletons, empty states, and a friendly 404 page for invalid categories.

### 4. 🏪 Detailed Market-Price Comparison

Authenticated users can open a product's detail page to explore its pricing information.

* Today's product price and unit
* Percentage change compared with yesterday
* Minimum and maximum market prices
* Average market price
* Market names and their corresponding divisions
* Market-wise minimum and maximum prices in a comparison table

The average price is calculated from the midpoint of each market's minimum and maximum prices, then rounded to the nearest whole number.

### 5. 🔐 Authentication and Social Login

BazarDor uses Better Auth with MongoDB to manage user authentication.

* Register with a name, email, and password.
* Sign in using email and password.
* Continue with Google or GitHub.
* Sign out securely through the authentication client.
* Redirect unauthenticated users to sign in before accessing protected pages.
* Return users to their intended page after successful sign-in.

Google and GitHub login require their respective OAuth credentials.

### 6. 👤 User Profile Management

Users can view and update their account information.

* View their display name and email address.
* Access a dedicated profile page.
* Update their display name through a separate form.
* Receive feedback through toast notifications.
* Access profile pages only after authentication.

### 7. 📱 Responsive Design and User Experience

The interface is designed to work across mobile, tablet, and desktop screen sizes.

* Responsive product grids and detail layouts
* Sticky navigation with category links
* Bengali date formatting for the Asia/Dhaka time zone
* Loading skeletons while data is being fetched
* Friendly empty states and invalid-route handling
* Toast notifications for important user actions

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts       # Better Auth API handler
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx           # Category products
│   ├── product/
│   │   └── [slug]/
│   │       └── page.tsx           # Protected product details
│   ├── profile/
│   │   ├── page.tsx               # User profile
│   │   └── update/
│   │       └── page.tsx           # Update profile
│   ├── signin/
│   │   └── page.tsx               # Sign-in page
│   ├── signup/
│   │   └── page.tsx               # Registration page
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx                   # Homepage
│
├── components/
│   ├── auth/                      # Authentication components
│   ├── home/                      # Hero and homepage products
│   ├── layout/                    # Header, footer, ticker, navigation
│   ├── product/                   # Cards, sorting, skeletons
│   └── profile/                   # Profile and update forms
│
├── lib/
│   ├── auth-client.ts             # Client-side authentication
│   ├── auth.ts                    # Server-side auth configuration
│   └── utils.ts                   # Formatting and sorting utilities
│
├── types/
│   └── index.ts                   # Shared TypeScript types
│
└── proxy.ts                       # Protects product and profile routes
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) 20 or later
* npm
* A MongoDB database, such as a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
* Google and/or GitHub OAuth credentials if you want to enable social login

### 1. Clone the repository

```bash
git clone https://github.com/encodeshohan/bazar-dor.git
cd bazar-dor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the following variables:

```env
# Better Auth
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000

# MongoDB
MONGODB_URL=your_mongodb_connection_string

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**Important:**

* Use a long, randomly generated value for `BETTER_AUTH_SECRET`.
* Replace the MongoDB placeholder with your actual connection string.
* Social login is enabled only when both credentials for the respective provider are configured.
* Never commit your `.env.local` file or expose your secrets publicly.

### 4. Configure OAuth callback URLs

For local development, register the following callback URLs in your OAuth applications:

**Google**

```text
http://localhost:3000/api/auth/callback/google
```

**GitHub**

```text
http://localhost:3000/api/auth/callback/github
```

For production, replace `http://localhost:3000` with your deployed application's origin and register those production callback URLs as well.

### 5. Run the development server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 📜 Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server          |
| `npm run lint`  | Run ESLint                           |

---

## 📡 Data Source

Product and category information is fetched from the public BazarDor API provided by Programming Hero.

**Base URL**

```text
https://openapi.programming-hero.com/api/bazardor
```

### API Endpoints

| Endpoint      | Description                                       |
| ------------- | ------------------------------------------------- |
| `/products`   | Retrieve all products and their price information |
| `/categories` | Retrieve available product categories             |

Example:

```text
https://openapi.programming-hero.com/api/bazardor/products
https://openapi.programming-hero.com/api/bazardor/categories
```

The application uses this API to populate the homepage, category pages, scrolling price ticker, and product detail pages.

**Note:** The displayed prices are indicative and may not reflect the exact price at every market in real time.

---

## 🚀 Deployment

BazarDor can be deployed on [Vercel](https://vercel.com/).

### Deployment Steps

1. Push your code to GitHub.
2. Import the `bazar-dor` repository into Vercel.
3. Add the required environment variables in your Vercel project settings.
4. Set `BETTER_AUTH_URL` to your deployed application's origin.
5. Configure MongoDB Atlas network access and database permissions appropriately.
6. Register the production OAuth callback URLs in Google Cloud and GitHub.
7. Deploy the application and test the homepage, category pages, product details, authentication, and profile routes.

After changing environment variables, redeploy the application if required.

---

## 📌 Future Improvements

Potential enhancements for future versions include:

* 🔎 Search products by Bengali name
* 🏙️ Filter and compare prices by division or individual market
* 📅 View historical price trends with interactive charts
* 🔔 Set notifications for significant price changes
* ⭐ Save favorite products for quick access
* 📊 Compare prices across multiple products
* 🌐 Add additional data sources and improve price-data freshness

---

## 👨‍💻 Author

**MD. SHOHANUR RAHMAN SHOHAN**

GitHub: [@encodeshohan](https://github.com/encodeshohan)

Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS.

---

*বাজার দর — প্রতিদিনের নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।*

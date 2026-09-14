# LUMORA — Luxury Modern E-Commerce Website

**LUMORA** is a complete, modern, responsive multi-page e-commerce frontend website built for **Internship Task 2: Responsive Multi-Page Landing Website**.

Designed with a high-end luxury brand aesthetic (inspired by world-class fashion houses and watchmakers), LUMORA provides a real-world shopping experience with seamless navigation, product filtering, live cart management, currency formatting in Indian Rupees (₹ / INR), local storage persistence, client-side form validation, and production-grade HTTP security header configurations.

---

## 🌟 Key Features

### 💻 Multi-Page Architecture
- **Home**: High-impact hero section, featured categories, handpicked classic products, "Why Choose LUMORA?" brand pillars, privilege promotional banner, customer testimonials, newsletter signup, and full brand footer.
- **Shop**: Complete product catalog grid with live search, multi-category filtering, price and alphabetical sorting, active filter indicators, and reset capabilities.
- **Product Details (`/product/:id`)**: High-resolution image gallery with fallback handling, star ratings & review counters, INR price formatting, size/color variant selectors, quantity steppers, related product recommendations, and key specifications.
- **About**: Brand heritage narrative, interactive key statistics (50K+ clients, 100% genuine), and core brand pillars.
- **Contact**: Professional client assistance form with strict client-side inline validation for Full Name, Email, Phone, Subject, and Message, alongside direct contact details and interactive FAQ accordions.
- **Cart**: Dynamic shopping cart with quantity controls, item deletion, live subtotal, GST calculation, free shipping progress bar towards ₹5,000, promo code validation (`LUMORA10`), and an interactive checkout modal demonstration.

### 🛍️ E-Commerce & Cart Functionality
- **Persistent Cart**: Automatically syncs cart items with `localStorage` so items remain saved after page refresh.
- **INR Currency (₹)**: Consistent Indian Rupee pricing across all products, cart subtotals, shipping calculations, and order summaries.
- **Notification Toasts**: Real-time floating feedback toasts when adding or removing items.
- **Image Fallback Handling**: Automatic fallback image swapping if remote image links fail to load.

### 📱 Responsive Design System
- Custom CSS design system using CSS variables, modern typography (`Outfit`, `Playfair Display`, `Plus Jakarta Sans`), glassmorphism cards, and smooth micro-animations.
- Fully responsive navigation with desktop links and a mobile drawer menu.
- Tested across **Mobile (< 768px)**, **Tablet (768px - 1024px)**, **Laptop**, and **Desktop (> 1024px)** screen resolutions.

---

## 🔒 Production Security & Best Practices

LUMORA includes built-in security header configurations and client-side protection for production deployment:

- **`.gitignore` Hygiene**: Excludes `node_modules/`, secret `.env` files, build logs, and OS artifacts to protect project credentials.
- **Vercel Security Config (`vercel.json`)**: Configured with SPA rewrites and production HTTP Security Headers:
  - `X-Frame-Options: DENY`: Prevents Clickjacking attacks by blocking unauthorized framing.
  - `X-Content-Type-Options: nosniff`: Prevents MIME-type sniffing vulnerabilities.
  - `Referrer-Policy: strict-origin-when-cross-origin`: Protects user navigation context.
  - `Strict-Transport-Security (HSTS)`: Forces SSL/TLS HTTPS connections across all pages.
  - `Permissions-Policy`: Restricts unauthorized hardware access (camera, microphone, geolocation).
- **Netlify Security Config (`public/_headers`)**: Enforces identical security header rules for Netlify hosting.
- **Client Input Validation**: Strict regex validation on forms (Email format, 10-digit Phone number format, minimum text lengths) preventing invalid submissions.

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM v6
- **Styling**: Vanilla CSS (CSS Design Tokens, Glassmorphism, Flexbox, Grid)
- **Icons**: Lucide React
- **State & Storage**: React Context API + LocalStorage API

---

## 📂 Project Structure

```text
LUMORA/
├── index.html                  # HTML entry point & Google Fonts imports
├── package.json                # Project dependencies & npm scripts
├── vite.config.js              # Vite configuration
├── vercel.json                 # Vercel deployment rewrites & security headers
├── README.md                   # Complete internship documentation & setup guide
├── .gitignore                  # Security rule to exclude secrets & node_modules
├── public/
│   ├── favicon.svg             # Custom LUMORA brand SVG icon
│   └── _headers                # Netlify deployment HTTP security headers
└── src/
    ├── assets/                 # SVGs and brand assets
    ├── components/             # Reusable UI components
    │   ├── Button.jsx & .css
    │   ├── CartItem.jsx & .css
    │   ├── CheckoutModal.jsx & .css
    │   ├── Footer.jsx & .css
    │   ├── Navbar.jsx & .css
    │   ├── ProductCard.jsx & .css
    │   ├── ProductFilter.jsx & .css
    │   ├── TestimonialCard.jsx & .css
    │   └── Toast.jsx & .css
    ├── context/
    │   └── CartContext.jsx     # Cart state, INR formatting, & localStorage sync
    ├── data/
    │   └── products.js         # Curated catalog (10 luxury products in INR ₹)
    ├── pages/                  # Main route pages
    │   ├── About.jsx & .css
    │   ├── Cart.jsx & .css
    │   ├── Contact.jsx & .css
    │   ├── Home.jsx & .css
    │   ├── ProductDetails.jsx & .css
    │   └── Shop.jsx & .css
    ├── App.jsx                 # App routing, ScrollToTop, & Provider wrapper
    ├── main.jsx                # React DOM render entry
    └── index.css               # Global CSS variables & utility classes
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js (v16.0.0 or higher recommended)
- npm (v8.0.0 or higher)

### 1. Clone or Open Project Directory
```bash
cd E:\spoorthi_all\TASK_2\LUMORA
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the URL displayed in your terminal).

### 4. Build for Production
```bash
npm run build
```
The optimized production build output will be generated in the `dist/` directory.

---

## 🧪 How to Test Every Feature

1. **Navigation**: Click links in the header and footer (Home, Shop, About, Contact, Cart) or use the mobile hamburger menu on mobile screen sizes.
2. **Product Search**: Go to the **Shop** page, type product names like `"Automatic"` or `"Satchel"` into the search box to see live filtering.
3. **Category Filtering**: Click category pills (`Watches`, `Bags`, `Eyewear`, `Jewelry`, `Perfumes`) on the Shop page or click category cards on the Home page.
4. **Price Sorting**: Select `"Price: Low to High"` or `"Price: High to Low"` in the sort dropdown on the Shop page.
5. **Product Details**: Click any product card or title to view details at `/product/:id`. Select available sizes/colors, adjust quantity, and click **Add to Cart**.
6. **Cart Management & LocalStorage**:
   - Add items to your cart.
   - Click the cart icon in the navbar to open the Cart page.
   - Test quantity increase/decrease buttons and single-click item removal.
   - Refresh the page to verify cart state persists via `localStorage`.
   - Apply coupon code `LUMORA10` for a 10% discount.
   - Click **Proceed to Checkout** to fill in delivery details and place a mock order.
7. **Form Validation**:
   - Navigate to the **Contact** page.
   - Try submitting an empty form to observe inline red validation messages for Full Name, Email, Phone, Subject, and Message.
   - Enter invalid formats (e.g. invalid email or phone number) to test regex validation.
   - Fill valid details and submit to see the success confirmation card.
   - Test the Newsletter form in the Footer.

---

## 🚀 GitHub Push Instructions

To push this project to a new repository on GitHub:

```bash
git init
git add .
git commit -m "Initial commit: LUMORA Responsive Multi-Page E-Commerce Website with Security Headers"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/LUMORA-ECommerce.git
git push -u origin main
```

---

## 🌐 Secure Live Deployment Instructions

### Deploying to Vercel (Recommended)
1. Log in to [Vercel](https://vercel.com) and click **Add New Project**.
2. Select your `LUMORA-ECommerce` GitHub repository.
3. Set **Framework Preset**: `Vite`
4. Set **Build Command**: `npm run build`
5. Set **Output Directory**: `dist`
6. Click **Deploy**. Vercel will automatically parse `vercel.json` to configure security headers and SPA routing.

### Deploying to Netlify
1. Log in to [Netlify](https://netlify.com) and click **Add new site** > **Import an existing project**.
2. Set **Build command**: `npm run build`
3. Set **Publish directory**: `dist`
4. Click **Deploy site**. Netlify will read `public/_headers` for security headers.

---

## ✅ Internship Task 2 Requirement Checklist

- [x] **Responsive Multi-Page Landing Website**: Built with React + Vite
- [x] **Responsive Design**: Tested across Mobile, Tablet, Laptop, and Desktop
- [x] **Multi-Page Routing**: React Router v6 navigation across 6 distinct pages
- [x] **Navbar**: Logo, navigation links, search trigger, cart item badge count, mobile drawer
- [x] **Hero Section**: High-impact banner with headline, CTA buttons, and floating product card
- [x] **Features Section**: 4 brand value proposition cards ("Why Choose LUMORA?")
- [x] **Testimonials Section**: 4 customer review cards with ratings and user avatars
- [x] **Contact Form & Validation**: Inline error messaging for Full Name, Email, Phone, Subject, & Message
- [x] **Cart & Persistence**: Cart state stored in `localStorage` with quantity steppers & checkout modal
- [x] **INR Currency**: Consistent Indian Rupee pricing (₹ / INR) throughout
- [x] **Production Security Headers**: `vercel.json` & `public/_headers` configured for Clickjacking, XSS, and HTTPS protection
- [x] **GitHub-Ready**: Clean codebase with `.gitignore` and `README.md`
- [x] **Deployment-Ready**: Prepared for Vercel / Netlify hosting

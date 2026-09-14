# LUMORA — Luxury Modern E-Commerce Website

LUMORA is a modern, responsive multi-page e-commerce frontend website developed as part of **Internship Task 2: Responsive Multi-Page Landing Website**.

The project demonstrates a professional e-commerce interface with product browsing, product details, shopping cart functionality, responsive layouts, client-side form validation, and a clean luxury-inspired visual design.

> **Project Type:** Frontend / Demo Project  
> **Purpose:** Internship Task 2  
> **Technology:** React + Vite  
> **Status:** Completed

---

## 🌐 Live Website

**GitHub Pages:**  
https://naikspoorthi6-cloud.github.io/LUMORA-Luxury-Modern-E-Commerce-Website/

**GitHub Repository:**  
https://github.com/naikspoorthi6-cloud/LUMORA-Luxury-Modern-E-Commerce-Website

> The live URL will be available after the GitHub Pages deployment is completed.

---

## ✨ Key Features

### 🏠 Home Page
- Luxury-inspired hero section
- Call-to-action buttons
- Featured product sections
- Brand highlights
- Customer testimonials
- Responsive layout

### 🛍️ Shop Page
- Product listing
- Product categories
- Product filtering
- Product cards
- Responsive product grid

### 📦 Product Details
- Product information
- Product images
- Pricing
- Product descriptions
- Add-to-cart functionality

### 🛒 Shopping Cart
- Add products to cart
- Remove products
- Update quantities
- Automatic total calculation
- Cart data stored using LocalStorage

### 📖 About Page
- Brand introduction
- Company information
- Luxury-focused presentation

### 📞 Contact Page
- Contact form
- Required-field validation
- Input validation
- User-friendly error messages

### 📱 Responsive Design
The website is designed to work across:
- Desktop
- Laptop
- Tablet
- Mobile devices

### 🔐 Basic Security Practices
- Environment files excluded through `.gitignore`
- Sensitive files are not intended to be committed
- Client-side input validation
- Security headers configured for supported hosting platforms

---

## 🧩 Internship Task 2 Requirements

The project fulfills the main requirements of the internship task:

| Requirement | Status |
|---|---|
| Responsive website | ✅ Completed |
| Multi-page / multi-section website | ✅ Completed |
| Navbar | ✅ Completed |
| Hero section | ✅ Completed |
| Features section | ✅ Completed |
| Testimonials | ✅ Completed |
| Contact form | ✅ Completed |
| Form validation | ✅ Completed |
| GitHub repository | ✅ Completed |
| Live deployment | 🔄 GitHub Pages |
| Brief README | ✅ Completed |

---

## 🛠️ Technology Stack

### Frontend
- React 18
- Vite 5
- React Router DOM
- JavaScript
- HTML5
- CSS3

### UI
- Vanilla CSS
- Lucide React icons
- Responsive design
- CSS animations and transitions

### State Management
- React Context API
- LocalStorage

---

## 📂 Project Structure

```text
LUMORA/
│
├── public/
│   ├── _headers
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── Navbar
│   │   ├── Footer
│   │   ├── ProductCard
│   │   └── ...
│   │
│   ├── pages/
│   │   ├── Home
│   │   ├── Shop
│   │   ├── ProductDetails
│   │   ├── About
│   │   ├── Contact
│   │   └── Cart
│   │
│   ├── context/
│   ├── data/
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vercel.json
└── vite.config.js

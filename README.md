# 🛍️ E-Commerce Product Explorer & Cart Management App

A modern, fully functional, and highly responsive e-commerce frontend built with React. This project simulates a premium Direct-to-Consumer (D2C) shopping experience, featuring dynamic product filtering, seamless cart management, persistent wishlists, and a robust checkout flow.


---

## ✨ Key Features

* **Dynamic Product Browsing:** Fetches and displays products using the [Fake Store API](https://fakestoreapi.com/) with optimized loading states.
* **Advanced Filtering & Sorting:** Users can filter by Category (via URL query parameters), Price Range, and search by Name (with debounce optimization). Sorting options include Price and Rating.
* **Premium UI/UX:** Features a custom grid layout, sleek glassmorphism modals, tailored toast notifications, and smooth page transitions.
* **Persistent State Management:** Cart and Wishlist data are managed via the Context API and synced with `localStorage` so users never lose their items on page refresh.
* **Robust Checkout Flow:** Utilizes React Hook Form and Yup for rigorous schema-based validation before generating a unique Order ID.
* **Interactive Components:** Implements Swiper.js for seamless touch-friendly product image carousels and Framer Motion for layout animations.

---

## 🛠️ Tech Stack & Libraries

This project was built with performance and modern architecture in mind, strictly adhering to industry-standard libraries:

* **Core:** React (Vite)
* **Routing:** React Router DOM (v6)
* **Styling:** Tailwind CSS
* **State Management:** React Context API + LocalStorage
* **API Requests:** Axios
* **Form Handling & Validation:** React Hook Form + Yup
* **UI Components & Animations:** Framer Motion, Swiper.js
* **Utilities:** UUID (Order generation), React Toastify (Notifications), React Icons

---

## 📂 Project Architecture

The application is structured for scalability and separation of concerns:

```text
src/
├── assets/         # High-quality editorial and UI images
├── components/     # Reusable UI (ProductCard, ProductGrid, CartItem)
├── context/        # Global state (CartContext, WishlistContext)
├── hooks/          # Custom logic (useProducts, useDebounce, etc.)
├── pages/          # Route views (Home, Products, Details, Cart, Checkout)
├── services/       # API integration logic (api.js)
└── App.jsx         # Main router and layout wrapper
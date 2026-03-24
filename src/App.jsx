import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Icons - FiSearch removed!
import { FiShoppingCart } from 'react-icons/fi';

import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          {/* --- MAIN HEADER --- */}
          <nav className="bg-white py-4 px-6 md:px-12 flex justify-between items-center shadow-sm sticky top-0 z-50">
            {/* Logo area */}
            <Link to="/" className="flex items-center gap-2 group">
              <FiShoppingCart className="text-[#003d29] text-3xl group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-extrabold text-[#003d29] tracking-tight">shopify</span>
            </Link>

            {/* Main Links */}
            <div className="hidden md:flex items-center gap-8 font-semibold text-gray-800">
              <Link to="/" className="hover:text-[#003d29] transition-colors">Home</Link>
              <Link to="/products" className="hover:text-[#003d29] transition-colors">Products</Link>
              <Link to="/wishlist" className="hover:text-[#003d29] transition-colors">Wishlist</Link>
            </div>

            {/* Right Side Tools - Now just the Cart! */}
            <div className="flex items-center gap-6">
              {/* Cart */}
              <Link to="/cart" className="text-gray-700 hover:text-[#003d29] flex items-center gap-2 font-medium">
                <FiShoppingCart className="text-xl" /> <span className="hidden sm:inline">Cart</span>
              </Link>
            </div>
          </nav>

          <main className="min-h-screen bg-white">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          <ToastContainer position="bottom-right" autoClose={2000} theme="colored" />
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
import { createContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // 1. Initialize state directly from localStorage
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('shopify_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // 2. Sync to localStorage whenever the wishlist changes
  useEffect(() => {
    localStorage.setItem('shopify_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist((prevItems) => {
      const exists = prevItems.some((item) => item.id === product.id);
      if (exists) {
        // Remove from wishlist
        return prevItems.filter((item) => item.id !== product.id);
      }
      // Add to wishlist
      return [...prevItems, product];
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Initialize state directly from localStorage so it loads instantly on refresh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('shopify_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Whenever cartItems changes, immediately save the new cart to localStorage
  useEffect(() => {
    localStorage.setItem('shopify_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCartItems((prevItems) => 
      prevItems.map((item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity + amount;
          // Prevent quantity from dropping below 1
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate totals dynamically
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
}
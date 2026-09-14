import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const formatINR = (amount) => {
  return '₹' + amount.toLocaleString('en-IN');
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('lumora_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
      return [];
    }
  });

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    try {
      localStorage.setItem('lumora_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 3500);
  };

  const hideToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  const addToCart = (product, quantity = 1, size = null, color = null) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          selectedSize: size || updated[existingIndex].selectedSize,
          selectedColor: color || updated[existingIndex].selectedColor
        };
        return updated;
      } else {
        return [...prevCart, {
          product,
          quantity,
          selectedSize: size || (product.sizeOptions ? product.sizeOptions[0] : null),
          selectedColor: color || (product.colorOptions ? product.colorOptions[0] : null)
        }];
      }
    });

    showToast(`Added "${product.name}" to your cart!`);
  };

  const removeFromCart = (productId) => {
    const itemToRemove = cart.find(item => item.product.id === productId);
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.product.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  const FREE_SHIPPING_THRESHOLD = 5000;
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05); // 5% simulated GST
  const total = subtotal + shippingFee + tax;

  return (
    <CartContext.Provider value={{
      cart,
      cartCount,
      subtotal,
      shippingFee,
      tax,
      total,
      FREE_SHIPPING_THRESHOLD,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toast,
      showToast,
      hideToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

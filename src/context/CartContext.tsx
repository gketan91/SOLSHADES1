import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Product, CartItem, CartContextType } from '../types';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const total = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total
  }), [cart, addToCart, removeFromCart, updateQuantity, clearCart, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
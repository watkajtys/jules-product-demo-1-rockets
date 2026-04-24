import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Product, CartItem } from "../types";

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  addingProduct: Product | null;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  setAddingProduct: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = sessionStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error("Failed to parse cart from sessionStorage", e);
      }
    }
    return [];
  });
  
  const [addingProduct, setAddingProduct] = useState<Product | null>(null);

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  const addItem = useCallback((product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, qty: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, qty);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = useMemo(() => ({
    cartItems,
    cartCount,
    cartTotal,
    addingProduct,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    setAddingProduct
  }), [cartItems, cartCount, cartTotal, addingProduct, addItem, removeItem, setQuantity, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

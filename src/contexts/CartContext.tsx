import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, CartItem } from '../types';
import { useToast } from '../hooks/use-toast';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Updated Cart",
          description: `${product.title} quantity updated`,
        });
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: "Added to Cart",
          description: `${product.title} added to cart`,
        });
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(prevItems => {
      const item = prevItems.find(item => item.product.id === productId);
      if (item) {
        toast({
          title: "Removed from Cart",
          description: `${item.product.title} removed from cart`,
        });
      }
      return prevItems.filter(item => item.product.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items removed from cart",
    });
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
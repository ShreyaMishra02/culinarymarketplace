import React, { createContext, useContext, useState, useCallback } from "react";
import { Product, CartItem, ProductOption } from "@/data/mockData";

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number, option?: ProductOption, date?: string) => void;
  removeFromCart: (cartKey: string) => void;
  updateQuantity: (cartKey: string, quantity: number) => void;
  clearCart: () => void;
  totalPoints: number;
  totalItems: number;
  userPoints: number;
}

// Unique key for cart items: productId or productId-optionId
const getCartKey = (item: CartItem) =>
  item.selectedOption ? `${item.product.id}-${item.selectedOption.id}` : item.product.id;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const userPoints = 25000;

  const addToCart = useCallback((product: Product, quantity = 1, option?: ProductOption, date?: string) => {
    setItems(prev => {
      const key = option ? `${product.id}-${option.id}` : product.id;
      const existing = prev.find(i => getCartKey(i) === key);
      if (existing) {
        return prev.map(i => getCartKey(i) === key ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { product, quantity, selectedOption: option, selectedDate: date }];
    });
  }, []);

  const removeFromCart = useCallback((cartKey: string) => {
    setItems(prev => prev.filter(i => getCartKey(i) !== cartKey));
  }, []);

  const updateQuantity = useCallback((cartKey: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(i => getCartKey(i) !== cartKey));
    } else {
      setItems(prev => prev.map(i => getCartKey(i) === cartKey ? { ...i, quantity } : i));
    }
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getItemPoints = (item: CartItem) =>
    (item.selectedOption ? item.selectedOption.points : item.product.points) * item.quantity;

  const totalPoints = items.reduce((sum, i) => sum + getItemPoints(i), 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalPoints, totalItems, userPoints }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export const getCartItemKey = (item: CartItem) =>
  item.selectedOption ? `${item.product.id}-${item.selectedOption.id}` : item.product.id;
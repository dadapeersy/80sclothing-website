"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
};

type ShopContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
  cartCount: number;
  isDiscountUnlocked: boolean;
  setIsDiscountUnlocked: (unlocked: boolean) => void;
  discountPercentage: number;
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDiscountUnlocked, setIsDiscountUnlocked] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(20);

  // Optional: Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("retro_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    const savedDiscount = localStorage.getItem("retro_discount");
    if (savedDiscount === "true") {
      setIsDiscountUnlocked(true);
    }

    // Fetch dynamic discount percentage from backend
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/settings`);
        if (res.ok) {
          const data = await res.json();
          if (data.ticketDiscountPercentage !== undefined) {
            setDiscountPercentage(data.ticketDiscountPercentage);
          }
        }
      } catch (error) {
        console.error("Failed to fetch settings", error);
      }
    };
    fetchSettings();
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("retro_cart", JSON.stringify(cart));
  }, [cart]);

  // Save discount to localStorage
  useEffect(() => {
    localStorage.setItem("retro_discount", isDiscountUnlocked.toString());
  }, [isDiscountUnlocked]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existingItem = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.size === size)));
  };

  const updateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, quantity } : i))
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
        isDiscountUnlocked,
        setIsDiscountUnlocked,
        discountPercentage,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  applyPromoCode: (code: string) => boolean;
  promoDiscountRate: number;
  generateWhatsAppMessage: (customerDetails?: { name?: string; address?: string }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "classmate-asteroid-compass-box",
      name: "Classmate Asteroid Compass Box",
      brand: "Classmate",
      price: 130,
      originalPrice: 140,
      quantity: 1,
      image: "/frames/ezgif-frame-001.jpg",
      variant: "Standard Mathematical Tin Set",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);

  // Load cart from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("phr_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("phr_cart", JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === "RAJPUT10" || clean === "STUDENT10") {
      setPromoDiscountRate(0.1);
      setPromoCode(clean);
      return true;
    }
    if (clean === "GOAFREESHIP") {
      setPromoDiscountRate(0.05);
      setPromoCode(clean);
      return true;
    }
    return false;
  };

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = Math.round(subtotal * promoDiscountRate);
  const total = Math.max(0, subtotal - discount);

  const generateWhatsAppMessage = (customerDetails?: { name?: string; address?: string }) => {
    let msg = `*Order Inquiry - P.H. Rajput & Sons*\n`;
    msg += `----------------------------------------\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} (${item.variant || "Standard"})\n`;
      msg += `   Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
    });
    msg += `----------------------------------------\n`;
    msg += `Subtotal: ₹${subtotal}\n`;
    if (discount > 0) {
      msg += `Promo Discount (${promoCode}): -₹${discount}\n`;
    }
    msg += `*Total Amount: ₹${total}*\n`;
    if (customerDetails?.name) {
      msg += `\nCustomer Name: ${customerDetails.name}\n`;
    }
    if (customerDetails?.address) {
      msg += `Delivery/Pickup Address: ${customerDetails.address}\n`;
    }
    msg += `\nPlease confirm availability and payment mode (UPI / Cash at Shop No. 178 Mapusa).`;
    return encodeURIComponent(msg);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        total,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        promoCode,
        setPromoCode,
        applyPromoCode,
        promoDiscountRate,
        generateWhatsAppMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShoppingBag,
  Trash2,
  MessageCircle,
  ShieldCheck,
  MapPin,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    total,
    totalItems,
    applyPromoCode,
    promoCode,
    generateWhatsAppMessage,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [customerAddress, setCustomerAddress] = useState("");
  const [deliveryType, setDeliveryType] = useState<"pickup" | "delivery">("pickup");

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess(false);

    if (applyPromoCode(inputCoupon)) {
      setCouponSuccess(true);
    } else {
      setCouponError("Invalid code. Try RAJPUT10 for 10% off!");
    }
  };

  const handleWhatsAppCheckout = () => {
    const deliveryNote =
      deliveryType === "pickup"
        ? "Store Pickup at Shop No. 178 Mapusa Municipal Market"
        : customerAddress || "Home Delivery in Goa";

    const msg = generateWhatsAppMessage({
      name: "Customer",
      address: deliveryNote,
    });

    window.open(`https://wa.me/919623270683?text=${msg}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0A] text-white shadow-2xl flex flex-col justify-between border-l border-white/10 animate-slideLeft">
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-white/10 text-white">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white">
                  Your Stationery Bag
                </h3>
                <p className="text-[10px] font-mono text-neutral-400">
                  {totalItems} {totalItems === 1 ? "item" : "items"} • P.H. Rajput & Sons
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <p className="text-xs text-neutral-400">Your bag is empty.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 bg-white text-black rounded-lg text-xs font-semibold"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-2.5">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#121212] p-3 rounded-xl border border-white/10 flex gap-3 items-center"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-black shrink-0 border border-white/10">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-xs text-white truncate">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-500 hover:text-white p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-neutral-400 font-mono">
                          {item.variant || "Standard"}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs font-semibold text-white">
                            ₹{item.price * item.quantity}
                          </span>

                          <div className="flex items-center gap-1.5 bg-black border border-white/15 rounded p-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-4 h-4 flex items-center justify-center text-xs font-bold text-neutral-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="text-xs font-semibold text-white px-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-4 h-4 flex items-center justify-center text-xs font-bold text-neutral-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Options */}
                <div className="bg-[#121212] p-3 rounded-xl border border-white/10 space-y-2 text-xs">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                    Fulfillment:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setDeliveryType("pickup")}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                        deliveryType === "pickup"
                          ? "border-white bg-white/10 text-white"
                          : "border-transparent text-neutral-400"
                      }`}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Mapusa Pickup</span>
                    </button>
                    <button
                      onClick={() => setDeliveryType("delivery")}
                      className={`p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                        deliveryType === "delivery"
                          ? "border-white bg-white/10 text-white"
                          : "border-transparent text-neutral-400"
                      }`}
                    >
                      <span>Goa Delivery</span>
                    </button>
                  </div>

                  {deliveryType === "delivery" && (
                    <input
                      type="text"
                      placeholder="Delivery address in Goa"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full text-xs p-2 rounded bg-black border border-white/15 text-white focus:outline-none focus:border-white"
                    />
                  )}
                </div>

                {/* Coupon */}
                <form onSubmit={handleApplyCoupon} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. RAJPUT10)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      className="flex-1 text-xs p-2 rounded-lg bg-[#121212] border border-white/15 uppercase font-mono text-white focus:outline-none focus:border-white"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono"
                    >
                      Apply
                    </button>
                  </div>
                  {couponSuccess && (
                    <p className="text-[10px] text-neutral-300 flex items-center gap-1">
                      <Check className="w-3 h-3 text-white" />
                      10% discount applied!
                    </p>
                  )}
                  {couponError && <p className="text-[10px] text-neutral-400">{couponError}</p>}
                </form>
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-black/60 space-y-3">
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-neutral-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-neutral-300">
                    <span>Discount ({promoCode})</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-white font-semibold text-sm pt-2 border-t border-white/10 font-sans">
                  <span>Total</span>
                  <span className="text-base">₹{total}</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-white hover:bg-neutral-200 text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm Order via WhatsApp (₹{total})</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                <ShieldCheck className="w-3 h-3 text-white" />
                <span>Direct Inquiry • P.H. Rajput & Sons Mapusa Store</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

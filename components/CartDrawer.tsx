"use client";

import { useState } from "react";
import { useShop } from "@/context/ShopContext";
import { X, Minus, Plus, ShoppingBag, Lock, ShieldCheck, Undo2, Headphones, CreditCard, Banknote, Smartphone, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useShop();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  
  // Example dummy discount to match mockup
  const discount = cartTotal >= 2000 ? 1000 : 0;
  const finalTotal = Math.max(0, cartTotal - discount);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer / Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full lg:w-[1000px] xl:w-[1100px] bg-[#f9f9f9] shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#f9f9f9] p-6 lg:p-8 border-b border-border flex justify-between items-start flex-shrink-0">
              <div>
                <h2 className="text-2xl font-black tracking-tighter uppercase">YOUR BAG</h2>
                <div className="flex items-center gap-1.5 text-xs text-muted mt-1.5 font-medium">
                  <Lock size={12} />
                  <span>Secure checkout • Your information is safe with us</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Empty State */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-muted gap-4 bg-white">
                <ShoppingBag size={64} strokeWidth={1} />
                <p className="text-lg">Your bag is currently empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 border-b border-black text-black pb-1 hover:opacity-70 transition-opacity font-medium tracking-wide uppercase"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              /* Two Column Layout */
              <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
                
                {/* Left Column: Forms */}
                <div className="flex-none lg:flex-1 h-auto lg:h-full overflow-visible lg:overflow-y-auto p-6 lg:p-10 bg-[#f9f9f9] lg:border-r border-border order-2 lg:order-1">
                  
                  {/* Shipping Info */}
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">1</div>
                      <div>
                        <h3 className="font-bold tracking-tight text-sm uppercase">SHIPPING INFORMATION</h3>
                        <p className="text-[11px] text-muted mt-0.5">Please enter your delivery details</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-muted mb-1.5">First Name *</label>
                          <input type="text" placeholder="John" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-muted mb-1.5">Last Name *</label>
                          <input type="text" placeholder="Doe" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[11px] font-semibold text-muted mb-1.5">Mobile Number *</label>
                        <div className="flex">
                          <select className="border border-border border-r-0 p-3 text-sm focus:outline-none rounded-l-sm bg-white text-muted min-w-[70px]">
                            <option>+91</option>
                          </select>
                          <input type="tel" placeholder="Enter 10 digit mobile number" className="flex-1 border border-border p-3 text-sm focus:outline-none focus:border-black rounded-r-sm bg-white" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-muted mb-1.5">Address *</label>
                        <input type="text" placeholder="House / Building / Street name" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-muted mb-1.5">Apartment, Suite, etc. (Optional)</label>
                        <input type="text" placeholder="Flat, Apartment, Building, Floor, etc." className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-muted mb-1.5">City *</label>
                          <input type="text" placeholder="Enter city" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-muted mb-1.5">State *</label>
                          <select className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white appearance-none">
                            <option>Select state</option>
                            <option>Maharashtra</option>
                            <option>Delhi</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-muted mb-1.5">Pincode *</label>
                          <input type="text" placeholder="Enter pincode" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-muted mb-1.5">Country</label>
                          <select className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white appearance-none">
                            <option>India</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <h3 className="font-bold tracking-tight text-sm uppercase">PAYMENT METHOD</h3>
                        <p className="text-[11px] text-muted mt-0.5">Choose your preferred payment option</p>
                      </div>
                    </div>

                    <div className="bg-white border border-border rounded-sm overflow-hidden mb-6">
                      {/* UPI */}
                      <label className={cn("flex items-start p-4 cursor-pointer border-b border-border transition-colors", paymentMethod === "upi" ? "bg-gray-50/50" : "hover:bg-gray-50")}>
                        <div className="flex items-center h-5 mr-3">
                          <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === "upi" ? "border-black" : "border-gray-300")}>
                            {paymentMethod === "upi" && <div className="w-2 h-2 bg-black rounded-full" />}
                          </div>
                          <input type="radio" className="hidden" checked={paymentMethod === "upi"} onChange={() => setPaymentMethod("upi")} />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <span className="text-sm font-semibold block">UPI</span>
                            <span className="text-[10px] text-muted">Pay using Google Pay, PhonePe, Paytm, BHIM & more.</span>
                          </div>
                          <Smartphone size={20} className="text-muted" />
                        </div>
                      </label>

                      {/* Card */}
                      <div className="border-b border-border">
                        <label className={cn("flex items-start p-4 cursor-pointer transition-colors", paymentMethod === "card" ? "bg-gray-50/50" : "hover:bg-gray-50")}>
                          <div className="flex items-center h-5 mr-3">
                            <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === "card" ? "border-black" : "border-gray-300")}>
                              {paymentMethod === "card" && <div className="w-2 h-2 bg-black rounded-full" />}
                            </div>
                            <input type="radio" className="hidden" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
                          </div>
                          <div className="flex-1 flex justify-between items-center">
                            <div>
                              <span className="text-sm font-semibold block">Credit / Debit Card</span>
                              <span className="text-[10px] text-muted">Visa, Mastercard, Rupay & more.</span>
                            </div>
                            <CreditCard size={20} className="text-muted" />
                          </div>
                        </label>
                        
                        {/* Card Details Expansion */}
                        {paymentMethod === "card" && (
                          <div className="px-4 pb-4 pt-2 bg-gray-50/50 border-t border-border">
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-3 mt-2">CARD DETAILS <span className="font-normal normal-case">(For Credit / Debit Card)</span></p>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[11px] font-semibold text-muted mb-1.5">Card Number *</label>
                                <div className="relative">
                                  <input type="text" placeholder="1234 5678 9012 3456" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                                  <CreditCard size={16} className="absolute right-3 top-3.5 text-muted" />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-[11px] font-semibold text-muted mb-1.5">Expiry Date *</label>
                                  <input type="text" placeholder="MM / YY" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-muted mb-1.5">CVV *</label>
                                  <div className="relative">
                                    <input type="text" placeholder="123" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                                    <HelpCircle size={14} className="absolute right-3 top-3.5 text-muted" />
                                  </div>
                                </div>
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-muted mb-1.5">Name on Card *</label>
                                <input type="text" placeholder="Enter name as on card" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Net Banking */}
                      <label className={cn("flex items-start p-4 cursor-pointer border-b border-border transition-colors", paymentMethod === "netbanking" ? "bg-gray-50/50" : "hover:bg-gray-50")}>
                        <div className="flex items-center h-5 mr-3">
                          <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === "netbanking" ? "border-black" : "border-gray-300")}>
                            {paymentMethod === "netbanking" && <div className="w-2 h-2 bg-black rounded-full" />}
                          </div>
                          <input type="radio" className="hidden" checked={paymentMethod === "netbanking"} onChange={() => setPaymentMethod("netbanking")} />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <span className="text-sm font-semibold block">Net Banking</span>
                            <span className="text-[10px] text-muted">All major banks supported.</span>
                          </div>
                          <Banknote size={20} className="text-muted" />
                        </div>
                      </label>

                      {/* COD removed as requested */}
                    </div>

                    {/* Extras */}
                    <div className="space-y-2 mb-8">
                      <div className="flex items-center gap-2 text-[10px] text-muted">
                        <Lock size={10} />
                        <span>Your payment information is encrypted and secure.</span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="w-3.5 h-3.5 accent-black border-gray-300 rounded-sm" />
                        <span className="text-[11px] text-muted">Save this card for future payments (optional)</span>
                      </label>
                    </div>

                    {/* Action */}
                    <button 
                      onClick={() => {
                        alert("Order Confirmed!");
                        setIsCartOpen(false);
                      }}
                      className="w-full py-4 bg-black text-white font-bold tracking-widest uppercase hover:bg-black/90 transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10"
                    >
                      <Lock size={16} />
                      CONFIRM ORDER
                    </button>
                    <p className="text-[10px] text-muted text-center mt-4">
                      By placing this order, you agree to our <a href="#" className="underline hover:text-black">Terms & Conditions</a> and <a href="#" className="underline hover:text-black">Privacy Policy</a>.
                    </p>
                  </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="flex-none lg:w-[40%] bg-white p-6 lg:p-10 flex flex-col h-auto lg:h-full overflow-visible lg:overflow-y-auto order-1 lg:order-2">
                  <h3 className="font-bold tracking-tight text-sm uppercase mb-6">ORDER SUMMARY</h3>
                  
                  {/* Items */}
                  <div className="space-y-6 mb-8 flex-1">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex gap-4">
                        <div className="relative w-20 h-24 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border border-border">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-[13px] leading-snug uppercase max-w-[200px] pr-2">{item.name}</h4>
                              <p className="text-xs text-muted mt-1">Size: {item.size}</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id, item.size)}
                              className="text-muted hover:text-black transition-colors"
                              aria-label="Remove item"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border border-border rounded-sm bg-white">
                              <button 
                                className="p-1.5 hover:bg-black/5 transition-colors disabled:opacity-50"
                                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="text-xs w-6 text-center font-medium">{item.quantity}</span>
                              <button 
                                className="p-1.5 hover:bg-black/5 transition-colors"
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <p className="font-bold text-sm">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="border-t border-border pt-6 space-y-3 flex-shrink-0">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Subtotal</span>
                      <span className="font-medium">₹{cartTotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Shipping</span>
                      <span className="font-medium text-green-600">FREE</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Discount</span>
                        <span className="font-medium text-green-600">- ₹{discount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="border-t border-border mt-6 pt-6 flex items-end justify-between flex-shrink-0">
                    <div>
                      <span className="text-lg font-bold">Total</span>
                      <p className="text-[10px] text-muted mt-0.5">(Incl. of all taxes)</p>
                    </div>
                    <span className="text-2xl font-black tracking-tight">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>

                  {/* Trust Banner & Badges */}
                  <div className="mt-8 space-y-6 flex-shrink-0">
                    <div className="bg-green-50/80 border border-green-100 rounded-sm p-4 flex gap-3 items-start">
                      <div className="mt-0.5 text-green-600"><ShieldCheck size={16} /></div>
                      <div>
                        <p className="text-xs font-semibold text-green-800">Free shipping on orders above ₹999</p>
                        <p className="text-[10px] text-green-700/80 mt-1">Estimated delivery: 3-7 business days</p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0">
                          <ShieldCheck size={16} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-900">Secure checkout</p>
                          <p className="text-[11px] text-muted mt-0.5">100% safe & secure</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0">
                          <Undo2 size={16} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-900">Easy returns</p>
                          <p className="text-[11px] text-muted mt-0.5">Within 7 days</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0">
                          <Headphones size={16} />
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-gray-900">24/7 support</p>
                          <p className="text-[11px] text-muted mt-0.5">We're here to help</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

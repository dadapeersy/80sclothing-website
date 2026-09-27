"use client";

import { useState, useEffect } from "react";
import { useShop } from "@/context/ShopContext";
import { X, Minus, Plus, ShoppingBag, Lock, ShieldCheck, Undo2, Headphones, CreditCard, Banknote, Smartphone, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, cartTotal } = useShop();
  const [paymentMethod, setPaymentMethod] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  
  const discount = cartTotal >= 2000 ? 1000 : 0;
  const finalTotal = Math.max(0, cartTotal - discount);

  const triggerError = (msg: string, field: string) => {
    setErrorMessage(msg);
    setErrorField(field);
    setTimeout(() => {
      const el = document.getElementById(`field-${field}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleCheckout = async () => {
    // Form Validation
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!formData.firstName || !nameRegex.test(formData.firstName.trim())) {
      triggerError("Please enter a valid First Name (letters only).", "firstName");
      return;
    }
    if (!formData.lastName || !nameRegex.test(formData.lastName.trim())) {
      triggerError("Please enter a valid Last Name (letters only).", "lastName");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      triggerError("Please enter a valid Email Address.", "email");
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone.trim())) {
      triggerError("Mobile number must be exactly 10 digits.", "phone");
      return;
    }

    if (!formData.address || formData.address.trim().length < 5) {
      triggerError("Please enter a proper Address.", "address");
      return;
    }
    if (!formData.city || formData.city.trim().length < 2) {
      triggerError("Please enter a valid City.", "city");
      return;
    }
    if (!formData.state || formData.state.trim().length < 2) {
      triggerError("Please enter a valid State.", "state");
      return;
    }
    if (!formData.pincode || formData.pincode.trim().length < 4) {
      triggerError("Please enter a valid Pincode.", "pincode");
      return;
    }

    setIsProcessing(true);
    try {
      // 1. Create order on backend
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalTotal }),
      });
      const data = await res.json();
      
      if (!data.orderId) throw new Error("Failed to create Razorpay order");

      // 2. Open Razorpay Checkout
      const options = {
        key: data.key, 
        amount: finalTotal * 100,
        currency: "INR",
        name: "Retro Studios",
        description: "Apparel Order Payment",
        order_id: data.orderId,
        handler: async function (response: any) {
          // 3. Verify Payment and Save to Database
          const verifyRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-payment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: {
                customerName: `${formData.firstName} ${formData.lastName}`,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                shippingAddress: `${formData.address}, ${formData.apartment ? formData.apartment + ', ' : ''}${formData.city}, ${formData.state} - ${formData.pincode}, India`,
                totalAmount: finalTotal,
                items: cart.map(item => ({
                  productId: item.id,
                  quantity: item.quantity,
                  priceAtPurchase: item.price,
                  size: item.size
                }))
              }
            }),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            setIsCartOpen(false);
            setOrderSuccess(true);
          } else {
            setErrorMessage("Payment verification failed.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#000000",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        setErrorMessage("Payment failed: " + response.error.description);
      });
      rzp.open();

    } catch (error) {
      console.error(error);
      setErrorMessage("Something went wrong during checkout.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isCartOpen && (
          <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full lg:w-[1000px] xl:w-[1100px] bg-[#f9f9f9] shadow-2xl z-50 flex flex-col overflow-hidden"
          >
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
              <div className="flex-1 overflow-y-auto lg:overflow-hidden flex flex-col lg:flex-row">
                
                <div className="flex-none lg:flex-1 h-auto lg:h-full overflow-visible lg:overflow-y-auto p-6 lg:p-10 bg-[#f9f9f9] lg:border-r border-border order-2 lg:order-1">
                  
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
                          <label className={cn("block text-[11px] font-semibold mb-1.5", errorField === "firstName" ? "text-red-500" : "text-muted")}>First Name *</label>
                          <input id="field-firstName" type="text" value={formData.firstName} onChange={(e) => { setFormData({...formData, firstName: e.target.value}); if(errorField === 'firstName') setErrorField(null); }} placeholder="Enter your first name" className={cn("w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors", errorField === "firstName" ? "border-red-500 bg-red-50/30 focus:border-red-600" : "border-border bg-white focus:border-black")} />
                        </div>
                        <div>
                          <label className={cn("block text-[11px] font-semibold mb-1.5", errorField === "lastName" ? "text-red-500" : "text-muted")}>Last Name *</label>
                          <input id="field-lastName" type="text" value={formData.lastName} onChange={(e) => { setFormData({...formData, lastName: e.target.value}); if(errorField === 'lastName') setErrorField(null); }} placeholder="Enter your last name" className={cn("w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors", errorField === "lastName" ? "border-red-500 bg-red-50/30 focus:border-red-600" : "border-border bg-white focus:border-black")} />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={cn("block text-[11px] font-semibold mb-1.5", errorField === "email" ? "text-red-500" : "text-muted")}>Email Address *</label>
                          <input id="field-email" type="email" value={formData.email} onChange={(e) => { setFormData({...formData, email: e.target.value}); if(errorField === 'email') setErrorField(null); }} placeholder="Enter your email address" className={cn("w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors", errorField === "email" ? "border-red-500 bg-red-50/30 focus:border-red-600" : "border-border bg-white focus:border-black")} />
                        </div>
                        <div>
                          <label className={cn("block text-[11px] font-semibold mb-1.5", errorField === "phone" ? "text-red-500" : "text-muted")}>Mobile Number *</label>
                          <div className="flex">
                            <select className={cn("border border-r-0 p-3 text-sm focus:outline-none rounded-l-sm transition-colors min-w-[70px]", errorField === "phone" ? "border-red-500 bg-red-50/30 text-red-600" : "border-border bg-white text-muted")}>
                              <option>+91</option>
                            </select>
                            <input id="field-phone" type="tel" value={formData.phone} onChange={(e) => { setFormData({...formData, phone: e.target.value}); if(errorField === 'phone') setErrorField(null); }} placeholder="Enter 10 digit number" className={cn("flex-1 border p-3 text-sm focus:outline-none rounded-r-sm transition-colors", errorField === "phone" ? "border-red-500 bg-red-50/30 focus:border-red-600" : "border-border bg-white focus:border-black")} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className={cn("block text-[11px] font-semibold mb-1.5", errorField === "address" ? "text-red-500" : "text-muted")}>Address *</label>
                        <input id="field-address" type="text" value={formData.address} onChange={(e) => { setFormData({...formData, address: e.target.value}); if(errorField === 'address') setErrorField(null); }} placeholder="Enter your full address" className={cn("w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors", errorField === "address" ? "border-red-500 bg-red-50/30 focus:border-red-600" : "border-border bg-white focus:border-black")} />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-muted mb-1.5">Apartment, Suite, etc. (Optional)</label>
                        <input type="text" value={formData.apartment} onChange={(e) => setFormData({...formData, apartment: e.target.value})} placeholder="Enter apartment, suite, etc. (optional)" className="w-full border border-border p-3 text-sm focus:outline-none focus:border-black rounded-sm bg-white" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={cn("block text-[11px] font-semibold mb-1.5", errorField === "city" ? "text-red-500" : "text-muted")}>City *</label>
                          <input id="field-city" type="text" value={formData.city} onChange={(e) => { setFormData({...formData, city: e.target.value}); if(errorField === 'city') setErrorField(null); }} placeholder="Enter your city" className={cn("w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors", errorField === "city" ? "border-red-500 bg-red-50/30 focus:border-red-600" : "border-border bg-white focus:border-black")} />
                        </div>
                        <div>
                          <label className={cn("block text-[11px] font-semibold mb-1.5", errorField === "state" ? "text-red-500" : "text-muted")}>State *</label>
                          <input id="field-state" type="text" value={formData.state} onChange={(e) => { setFormData({...formData, state: e.target.value}); if(errorField === 'state') setErrorField(null); }} placeholder="Enter your state" className={cn("w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors", errorField === "state" ? "border-red-500 bg-red-50/30 focus:border-red-600" : "border-border bg-white focus:border-black")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className={cn("block text-[11px] font-semibold mb-1.5", errorField === "pincode" ? "text-red-500" : "text-muted")}>Pincode *</label>
                          <input id="field-pincode" type="text" value={formData.pincode} onChange={(e) => { setFormData({...formData, pincode: e.target.value}); if(errorField === 'pincode') setErrorField(null); }} placeholder="Enter your pincode" className={cn("w-full border p-3 text-sm focus:outline-none rounded-sm transition-colors", errorField === "pincode" ? "border-red-500 bg-red-50/30 focus:border-red-600" : "border-border bg-white focus:border-black")} />
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

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">2</div>
                      <div>
                        <h3 className="font-bold tracking-tight text-sm uppercase">PAYMENT METHOD</h3>
                        <p className="text-[11px] text-muted mt-0.5">Choose your preferred payment option</p>
                      </div>
                    </div>

                    <div className="bg-white border border-border rounded-sm overflow-hidden mb-6">
                      <label className={cn("flex items-start p-4 cursor-pointer border-b border-border transition-colors", paymentMethod === "razorpay" ? "bg-gray-50/50" : "hover:bg-gray-50")}>
                        <div className="flex items-center h-5 mr-3">
                          <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center", paymentMethod === "razorpay" ? "border-black" : "border-gray-300")}>
                            {paymentMethod === "razorpay" && <div className="w-2 h-2 bg-black rounded-full" />}
                          </div>
                          <input type="radio" className="hidden" checked={paymentMethod === "razorpay"} onChange={() => setPaymentMethod("razorpay")} />
                        </div>
                        <div className="flex-1 flex justify-between items-center">
                          <div>
                            <span className="text-sm font-semibold block">Razorpay (Cards, UPI, NetBanking)</span>
                            <span className="text-[10px] text-muted">Securely pay via Razorpay portal.</span>
                          </div>
                          <CreditCard size={20} className="text-muted" />
                        </div>
                      </label>
                    </div>

                    <div className="space-y-2 mb-8">
                      <div className="flex items-center gap-2 text-[10px] text-muted">
                        <Lock size={10} />
                        <span>Your payment information is encrypted and secure.</span>
                      </div>
                    </div>

                    {errorMessage && !errorField && (
                      <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs font-semibold rounded-sm border border-red-200 flex items-center gap-2">
                        <X size={14} className="flex-shrink-0" />
                        {errorMessage}
                      </div>
                    )}

                    <button 
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="w-full py-4 bg-black text-white font-bold tracking-widest uppercase hover:bg-black/90 transition-colors rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10 disabled:opacity-70"
                    >
                      {isProcessing ? (
                        "PROCESSING..."
                      ) : (
                        <>
                          <Lock size={16} />
                          PAY ₹{finalTotal.toLocaleString('en-IN')}
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-muted text-center mt-4">
                      By placing this order, you agree to our Terms & Conditions and Privacy Policy.
                    </p>
                  </div>
                </div>

                <div className="flex-none lg:w-[40%] bg-white p-6 lg:p-10 flex flex-col h-auto lg:h-full overflow-visible lg:overflow-y-auto order-1 lg:order-2">
                  <h3 className="font-bold tracking-tight text-sm uppercase mb-6 flex-shrink-0">ORDER SUMMARY</h3>
                  
                  <div className="space-y-6 mb-8">
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

                  <div className="border-t border-border mt-6 pt-6 flex items-end justify-between flex-shrink-0">
                    <div>
                      <span className="text-lg font-bold">Total</span>
                      <p className="text-[10px] text-muted mt-0.5">(Incl. of all taxes)</p>
                    </div>
                    <span className="text-2xl font-black tracking-tight">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {orderSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setOrderSuccess(false);
                window.location.reload(); // Refresh to clear cart and reset app state
              }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-sm p-8 flex flex-col items-center text-center shadow-2xl rounded-sm"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl font-black tracking-tighter uppercase mb-2">Order Confirmed!</h2>
              <p className="text-muted text-sm mb-8 leading-relaxed">
                Thank you for your purchase. We've received your order and will begin processing it right away.
              </p>
              <button
                onClick={() => {
                  setOrderSuccess(false);
                  window.location.reload(); // Refresh to clear cart and reset app state
                }}
                className="w-full py-4 bg-black text-white text-sm font-bold tracking-widest uppercase hover:bg-black/90 transition-colors rounded-sm"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

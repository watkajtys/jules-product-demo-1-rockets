/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems: items, removeItem: onRemove, setQuantity: onSetQuantity } = useCart();
  const [localQuantities, setLocalQuantities] = useState<Record<string, string>>({});
  const [needsUpdate, setNeedsUpdate] = useState(false);
  
  // "Well-meaning friend" features
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins
  const [hasInsurance, setHasInsurance] = useState(true);
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const timeoutRef = React.useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const q: Record<string, string> = {};
    items.forEach(item => { q[item.id] = item.quantity.toString(); });
    setLocalQuantities(q);
    setNeedsUpdate(false);
  }, [items]);

  const hasItems = items.length > 0;
  
  useEffect(() => {
    if (hasItems) {
      const timer = setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [hasItems]);

  const handleQtyChange = useCallback((id: string, val: string) => {
    setLocalQuantities(prev => ({ ...prev, [id]: val }));
    setNeedsUpdate(true);
  }, []);

  const handleRecalculate = useCallback(() => {
    Object.keys(localQuantities).forEach(id => {
      const q = parseInt(localQuantities[id], 10);
      if (!isNaN(q) && q > 0) {
        onSetQuantity(id, q);
      }
    });
    setNeedsUpdate(false);
  }, [localQuantities, onSetQuantity]);

  const handleApplyCoupon = useCallback(() => {
    if (!coupon.trim()) return;
    setCouponMsg("Verifying with Mainframe...");
    timeoutRef.current = window.setTimeout(() => {
      setCouponMsg(`Sorry, sequence "${coupon}" is expired or invalid for this manifest.`);
    }, 1500);
  }, [coupon]);

  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    const mStr = m < 10 ? `0${m}` : `${m}`;
    const sStr = s < 10 ? `0${s}` : `${s}`;
    return `${mStr}:${sStr}`;
  }, []);

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const insuranceCost = hasInsurance ? 45000.00 : 0;
  const total = subtotal + insuranceCost;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-surface-container-low p-8 rounded-full mb-6 border-2 border-surface-variant flex items-center justify-center">
          <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30">warning</span>
        </div>
        <h2 className="text-xl font-bold mb-2 text-on-surface uppercase tracking-widest">SHOPPING CART IS EMPTY</h2>
        <p className="text-on-surface-variant mb-8 max-w-xs text-xs">
          You currently have no items in your cart. Return to the catalog to add items.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Fake Scarcity Timer Banner */}
      <div className="bg-error-container/10 border border-error p-3 mb-6 flex items-center justify-center gap-3 shadow-[inset_0_0_15px_rgba(255,0,0,0.1)]">
        <span className="material-symbols-outlined text-[16px] text-error animate-pulse">timer</span>
        <span className="text-xs font-bold uppercase text-error tracking-widest drop-shadow-[0_0_2px_rgba(255,0,0,0.8)]">
          High demand! Your cart is reserved for <span className="font-mono tabular-nums">{formatTime(timeLeft)}</span>. Checkout now to secure these prices.
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="mb-6 flex justify-between items-end border-b border-surface-variant pb-2">
            <div>
              <h1 className="text-2xl font-bold uppercase text-on-surface tracking-tight">Shopping Cart</h1>
              <p className="text-xs text-on-surface-variant">Review your selected items and quantities.</p>
            </div>
            {/* Unnecessary guarantee text */}
            <div className="text-right flex items-center gap-1 text-[9px] text-primary font-bold uppercase drop-shadow-[0_0_1px_rgba(255,180,166,1)]">
              <span className="material-symbols-outlined text-[12px]">verified_user</span> 100% Secure Checkout
            </div>
          </div>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 border-b border-surface-variant/50 pb-6 last:border-0">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-surface-container-lowest border border-surface-variant overflow-hidden flex-shrink-0 relative">
                  <div className="scanline-overlay absolute inset-0 z-10"></div>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale relative z-0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-on-surface mb-1 uppercase tracking-tight">{item.name}</h3>
                    <p className="text-xs text-on-surface-variant mb-2">PART: {item.id.toUpperCase()}-X</p>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-surface-variant bg-surface-container py-1 px-2 text-xs">
                      <span className="text-on-surface-variant mr-2 uppercase text-[10px] font-bold">QTY:</span>
                      <input 
                        type="number"
                        min="1"
                        className="w-12 border border-surface-variant p-1 text-center font-mono focus:outline-none focus:border-primary bg-surface text-on-surface"
                        value={localQuantities[item.id] || ""}
                        onChange={(e) => handleQtyChange(item.id, e.target.value)}
                      />
                    </div>
                    
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-xs text-on-surface-variant hover:text-error font-bold uppercase tracking-tighter flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span> Delete
                    </button>
                  </div>
                </div>
                
                <div className="text-right flex flex-col justify-between max-w-[40%] sm:max-w-[50%]">
                  <span className="font-bold text-lg text-tertiary drop-shadow-[0_0_2px_rgba(49,225,146,0.3)] font-mono break-all line-clamp-2 sm:line-clamp-none">
                    ${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </span>
                  <span className="text-[10px] text-on-surface-variant/70 font-mono break-all">${item.price.toLocaleString('en-US', {minimumFractionDigits: 2})}/ea</span>
                </div>
              </div>

              {/* Absurd "Gift" option for industrial concrete/lumber/tools */}
              <div className="mt-2 flex items-center gap-2">
                <input type="checkbox" id={`gift-${item.id}`} className="w-4 h-4 accent-primary" />
                <label htmlFor={`gift-${item.id}`} className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant uppercase cursor-pointer hover:text-on-surface">
                  <span className="material-symbols-outlined text-[14px]">redeem</span> Make this a gift (Include free personalized card on the pallet)
                </label>
              </div>
            </div>
          ))}
          </div>
        </div>
        
        <div className="lg:col-span-4">
          <aside className="bg-surface-container border border-surface-variant p-4 lg:p-6 sticky top-24">
            
            <div className="flex items-center gap-2 mb-4 bg-surface-variant/30 text-on-surface p-2 text-[10px] font-bold uppercase border border-surface-variant/50">
              <span className="material-symbols-outlined text-[14px]">lock</span> 256-Bit Encrypted Checkout
            </div>

            <h3 className="text-sm font-bold text-on-surface uppercase mb-4 tracking-tighter border-b border-surface-variant pb-2">Order Summary</h3>
            
            <button 
              onClick={handleRecalculate}
              disabled={!needsUpdate}
              className={`w-full mb-6 py-2 border text-[10px] font-bold uppercase flex justify-center items-center gap-2 transition-colors ${needsUpdate ? "bg-primary/20 text-primary border-primary animate-pulse" : "bg-background text-on-surface-variant/30 border-surface-variant cursor-not-allowed"}`}
            >
              <span className={`material-symbols-outlined text-[14px] ${needsUpdate ? "animate-spin" : ""}`}>sync</span>
              {needsUpdate ? "Click to Update Cart" : "Cart is up to date"}
            </button>

            {/* Ineffective Coupon Box */}
            <div className="mb-6 py-4 border-y border-surface-variant/50 lg:border lg:p-4 lg:bg-background">
              <label className="block text-[10px] font-bold text-on-surface uppercase mb-2">Have a promo code?</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter Code"
                  className="w-full border border-surface-variant p-2 text-xs focus:outline-none focus:border-primary bg-surface-container-low text-on-surface font-mono"
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="bg-primary text-on-primary font-bold uppercase px-3 hover:bg-primary-fixed hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.6)] cursor-pointer text-[10px]"
                >
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p className={`mt-2 text-[10px] font-bold ${couponMsg.includes("Sorry") ? "text-error" : "text-primary"}`}>
                  {couponMsg}
                </p>
              )}
            </div>

            <div className="space-y-3 mb-6 font-mono">
              <div className="flex justify-between text-sm">
                <span className="text-on-surface-variant font-sans text-xs uppercase font-bold">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-bold text-on-surface">${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
              </div>
              
              {/* Absurd pre-checked insurance feature */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm pt-2">
                <label className="flex items-start gap-2 cursor-pointer w-full sm:w-2/3 mb-2 sm:mb-0">
                  <input 
                    type="checkbox" 
                    checked={hasInsurance}
                    onChange={(e) => setHasInsurance(e.target.checked)}
                    className="mt-0.5 accent-primary flex-shrink-0" 
                  />
                  <span className="text-[10px] font-bold uppercase text-primary leading-tight font-sans">
                    Enable Shipping Protection & Priority Handling
                  </span>
                </label>
                <span className="font-bold text-on-surface break-all sm:whitespace-nowrap sm:text-right">${insuranceCost.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
              </div>

              <div className="flex justify-between text-sm pb-2 border-b border-surface-variant">
                <span className="text-on-surface-variant font-sans text-xs uppercase font-bold">Shipping & Handling</span>
                <span className="text-on-surface-variant/70 italic font-sans text-[10px] uppercase">Calculated at checkout</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between pt-2 mt-2 gap-1">
                <span className="font-bold text-on-surface font-sans text-xs uppercase tracking-widest">Estimated Total</span>
                <span className="text-xl font-black text-tertiary drop-shadow-[0_0_3px_rgba(49,225,146,0.5)] break-all">${total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
              </div>
            </div>
            
            {needsUpdate && (
              <p className="text-[10px] text-error font-bold uppercase mb-2 leading-tight flex items-center gap-1 drop-shadow-md p-1">
                <span className="material-symbols-outlined text-[14px]">warning</span> PLEASE UPDATE CART BEFORE PROCEEDING
              </p>
            )}

            <button 
              onClick={() => navigate("/checkout")}
              disabled={needsUpdate}
              className={`w-full btn-primary flex justify-center gap-2 items-center text-xs tracking-widest ${needsUpdate ? 'opacity-30 cursor-not-allowed border-none' : ''}`}
            >
              Proceed to Checkout <span className="material-symbols-outlined text-[16px]">lock</span>
            </button>
            
            <div className="mt-4 text-center">
              <p className="text-[8px] text-on-surface-variant/70 uppercase font-bold leading-tight">
                By accelerating the checkout process, you acknowledge that all sales are considered final and binding under state and federal transaction codes.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}




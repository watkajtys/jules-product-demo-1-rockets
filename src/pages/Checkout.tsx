/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

const YEARS = Array.from({ length: 200 }, (_, i) => 1900 + i);
const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

import { CheckoutFormData } from "../types";

interface CheckoutProps {
  total: number;
  onComplete: () => void;
}

export default function Checkout({ total, onComplete }: CheckoutProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const processingTimeoutRef = useRef<number | undefined>(undefined);
  const successTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (processingTimeoutRef.current !== undefined) {
        clearTimeout(processingTimeoutRef.current);
      }
      if (successTimeoutRef.current !== undefined) {
        clearTimeout(successTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Completely arbitrary "amateur" validations
    if (formData.email !== formData.emailConfirm) {
      setErrorMsg("Email addresses do not match exactly. Please check spelling.");
      return;
    }

    if (!formData.state || formData.state.length <= 2) {
      setErrorMsg("Please spell out your full state. No acronyms (e.g., use 'California' instead of 'CA').");
      return;
    }

    setIsProcessing(true);
    processingTimeoutRef.current = window.setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      successTimeoutRef.current = window.setTimeout(onComplete, 4000);
    }, 3000);
  }, [formData, onComplete]);

  const handleClear = useCallback(() => {
    if (window.confirm("Are you sure you want to clear your checkout data?")) {
      setFormData({});
      setErrorMsg(null);
    }
  }, []);

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-pulse">
        <div className="bg-surface-container-low p-8 rounded-full mb-8 flex items-center justify-center">
          <span className="material-symbols-outlined text-[80px] text-tertiary">task_alt</span>
        </div>
        <h2 className="text-3xl font-bold mb-4 uppercase text-on-surface">ORDER CONFIRMED</h2>
        <p className="text-on-surface-variant font-mono tracking-widest font-bold">
          Thank you. Your order has been placed successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold uppercase text-on-surface tracking-tight">Secure Checkout</h1>
        <p className="text-xs text-on-surface-variant font-mono">Please provide your details below to complete your order.</p>
      </div>

      <div className="bg-surface relative overflow-hidden">
        <div className="relative z-10">
          {errorMsg && (
            <div className="bg-error/10 text-error border border-error/20 p-4 mb-6 flex items-start gap-3">
               <span className="material-symbols-outlined text-[20px] mt-0.5 flex-shrink-0">error</span>
               <div>
                 <h3 className="font-bold text-sm uppercase">Please Correct Errors</h3>
                 <p className="text-xs mt-1 font-mono">{errorMsg}</p>
               </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 focus-within:relative z-20">
            
            <div className="border-b border-surface-variant pb-8">
              <h2 className="text-primary font-mono text-sm uppercase font-bold tracking-widest mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">person</span> 1. Customer Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">First Name *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.firstName || ""}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full border border-surface-variant p-2 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Last Name *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.lastName || ""}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 mt-6">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Email Address *</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email || ""}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Verify Email Address *</label>
                  <input 
                    required
                    type="email" 
                    value={formData.emailConfirm || ""}
                    onChange={(e) => setFormData({...formData, emailConfirm: e.target.value})}
                    className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone || ""}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-surface-variant pb-8">
              <h2 className="text-primary font-mono text-sm uppercase font-bold tracking-widest mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">local_shipping</span> 2. Shipping Address
              </h2>
              <p className="text-[10px] text-on-surface-variant font-mono italic mb-4 mt-2">Note: We cannot ship to P.O. Boxes.</p>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Street Address 1 *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.street1 || ""}
                    onChange={(e) => setFormData({...formData, street1: e.target.value})}
                    className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Address Line 2 (Apt, Suite, etc.)</label>
                  <input 
                    type="text" 
                    value={formData.street2 || ""}
                    onChange={(e) => setFormData({...formData, street2: e.target.value})}
                    className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">City *</label>
                    <input 
                      required
                      type="text" 
                      value={formData.city || ""}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">State (Spell it out) *</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. California"
                      value={formData.state || ""}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                    />
                  </div>
                  <div className="md:col-span-1">
                    <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Zip Code *</label>
                    <input 
                      required
                      type="text" 
                      maxLength={5}
                      placeholder="5 digits only"
                      value={formData.zip || ""}
                      onChange={(e) => setFormData({...formData, zip: e.target.value})}
                      className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-surface-variant pb-8">
              <h2 className="text-primary font-mono text-sm uppercase font-bold tracking-widest mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">credit_card</span> 3. Payment Method
              </h2>
              
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <p className="text-sm font-bold text-on-surface mb-2 font-mono uppercase tracking-widest flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span>Amount Due:</span> 
                    <span className="text-xl text-tertiary drop-shadow-[0_0_2px_rgba(49,225,146,0.5)] break-all">${total.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Card Type *</label>
                  <select 
                    required
                    value={formData.cardType || ""}
                    onChange={(e) => setFormData({...formData, cardType: e.target.value})}
                    className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono appearance-none" 
                  >
                    <option value="">-- Select Card Type --</option>
                    <option value="visa">Visa</option>
                    <option value="mc">Mastercard</option>
                    <option value="amex">American Express</option>
                    <option value="discover">Discover</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Card Number (No dashes) *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.cardNumber || ""}
                    onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Expiration Month *</label>
                    <select 
                      required
                      value={formData.expMonth || ""}
                      onChange={(e) => setFormData({...formData, expMonth: e.target.value})}
                      className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono appearance-none" 
                    >
                      <option value="">Month</option>
                      {MONTHS.map(m => (
                        <option key={m} value={m}>{m < 10 ? `0${m}` : m}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Expiration Year *</label>
                    <select 
                      required
                      value={formData.expYear || ""}
                      onChange={(e) => setFormData({...formData, expYear: e.target.value})}
                      className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono appearance-none" 
                    >
                      <option value="">Year</option>
                      {YEARS.map(y => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-8">
              <h2 className="text-primary font-mono text-sm uppercase font-bold tracking-widest mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">notes</span> 4. Additonal Notes & Terms
              </h2>
              
              <div className="mt-2">
                <label className="block text-xs font-bold text-on-surface-variant mb-2 font-mono uppercase">Special Delivery Instructions</label>
                <textarea 
                  rows={4}
                  value={formData.comments || ""}
                  onChange={(e) => setFormData({...formData, comments: e.target.value})}
                  className="w-full border border-surface-variant p-3 bg-surface text-on-surface text-sm focus:outline-none focus:border-primary font-mono" 
                />
              </div>
              
              <div className="pt-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <input 
                    required
                    type="checkbox" 
                    id="termsCheck"
                    className="w-4 h-4 accent-primary flex-shrink-0"
                  />
                  <label htmlFor="termsCheck" className="text-xs text-on-surface-variant font-bold">
                    By checking this box, I verify that the above information is accurate and agree to the Terms of Service.
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    required
                    type="checkbox" 
                    id="swearCheck"
                    className="w-4 h-4 accent-primary flex-shrink-0"
                  />
                  <label htmlFor="swearCheck" className="text-xs text-on-surface-variant font-bold">
                    I promise I won't do anything bad with these rocket parts
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4">
              <button 
                type="button"
                onClick={handleClear}
                className="text-[10px] font-mono font-bold text-on-surface-variant hover:text-error uppercase tracking-widest px-4 py-2"
              >
                Clear Form Data
              </button>
              <button 
                type="submit"
                disabled={isProcessing}
                className={`btn-primary px-12 py-4 shadow-[0_0_20px_rgba(255,180,166,0.3)] flex items-center gap-2 ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}
              >
                {isProcessing ? "PROCESSING..." : "PLACE ORDER"}
                <span className={`material-symbols-outlined ${isProcessing ? "animate-spin" : ""}`}>{isProcessing ? "sync" : "arrow_forward"}</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}



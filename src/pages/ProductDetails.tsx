import React, { useState, useEffect, useRef, useCallback } from "react";
import { useCart } from "../context/CartContext";
import { Product } from "../types";

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  key?: string;
}

export default function ProductDetails({ product, onBack }: ProductDetailsProps) {
  const { setAddingProduct } = useCart();
  const [zipCode, setZipCode] = useState("");
  const [checkingZip, setCheckingZip] = useState(false);
  const [zipChecked, setZipChecked] = useState(false);
  
  const [intendedUse, setIntendedUse] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCheckZip = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length !== 5) {
      setErrorMsg("Zip code must be exactly 5 digits.");
      return;
    }
    setErrorMsg("");
    setCheckingZip(true);
    
    // Fake 2.5 second network delay
    timeoutRef.current = window.setTimeout(() => {
      setCheckingZip(false);
      setZipChecked(true);
    }, 2500);
  }, [zipCode.length]);

  const clearZip = useCallback(() => {
    setZipCode("");
    setZipChecked(false);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!zipChecked) {
      setErrorMsg("You must verify regional warehouse availability first.");
      return;
    }
    if (intendedUse.length < 15) {
      setErrorMsg("Please provide a detailed intended use (minimum 15 characters).");
      return;
    }
    if (!termsAccepted) {
      setErrorMsg("You must accept the hazards before adding to manifest.");
      return;
    }
    
    setErrorMsg("");
    setAddingProduct(product);
  }, [zipChecked, intendedUse.length, termsAccepted, product, setAddingProduct]);

  return (
    <div className="max-w-5xl mx-auto w-full">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-xs font-bold uppercase text-on-surface hover:text-primary transition-colors mb-6"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back to Catalog
      </button>

      <div className="flex flex-col md:flex-row mb-12 relative overflow-visible items-start rounded-lg md:rounded-none md:border md:border-surface-variant md:bg-surface md:shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <div className="w-full md:w-1/2 md:border-r border-surface-variant bg-surface-container-low p-4 md:p-8 flex items-center justify-center relative md:sticky md:top-24 self-start rounded-lg md:rounded-none mb-6 md:mb-0">
          <div className="absolute top-4 left-4 z-10 w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full max-w-xs md:max-w-sm object-cover border border-surface-variant shadow-[0_0_20px_rgba(0,0,0,0.5)] md:shadow-[0_0_20px_rgba(0,0,0,0.8)] grayscale hover:grayscale-0 transition-all duration-700 relative z-20 rounded"
            referrerPolicy="no-referrer"
          />
          <div className="scanline-overlay absolute inset-0 z-30 pointer-events-none rounded-lg md:rounded-none hidden md:block"></div>
        </div>

        <div className="w-full md:w-1/2 py-2 md:p-8 flex flex-col relative z-20 max-w-full overflow-hidden">
          <div className="uppercase text-[10px] font-bold tracking-widest text-secondary mb-2 font-mono break-words">
            Category: {product.category} | SKU: {product.id.toUpperCase()}-X
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface leading-tight mb-4 uppercase tracking-tight break-words">
            {product.name}
          </h1>
          <div className="text-xl sm:text-2xl font-mono text-tertiary mb-6 font-bold drop-shadow-[0_0_3px_rgba(49,225,146,0.5)] break-all max-w-full">
            ${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}
          </div>
          
          <p className="text-sm text-on-surface-variant mb-8 border-l-2 border-primary pl-4">
            {product.description}
          </p>

          <hr className="border-surface-variant mb-8" />

          {errorMsg && (
            <div className="bg-error-container/20 text-error border border-error-container p-3 mb-6 flex items-start gap-2 text-xs font-bold uppercase tracking-tighter shadow-[0_0_10px_rgba(147,0,10,0.5)]">
               <span className="material-symbols-outlined text-[16px]">error</span>
               {errorMsg}
            </div>
          )}

          <div className="space-y-6 flex-grow">
            <div className="bg-surface-container border border-surface-variant p-4">
              <h3 className="text-xs font-bold text-on-surface uppercase mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">public</span> 1. Check Regional Data Node
              </h3>
              {!zipChecked ? (
                <form onSubmit={handleCheckZip} className="flex flex-col sm:flex-row gap-2">
                  <input 
                    type="text"
                    maxLength={5}
                    placeholder="Enter 5-digit ZIP"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g,''))}
                    className="w-full sm:flex-grow border border-surface-variant p-3 md:p-2 text-sm focus:outline-none focus:border-primary bg-surface-container-low text-on-surface font-mono"
                  />
                  <button 
                    type="submit"
                    disabled={checkingZip}
                    className="btn-secondary whitespace-nowrap !py-3 md:!py-2 !px-4 flex items-center justify-center sm:min-w-[120px]"
                  >
                    {checkingZip ? <span className="material-symbols-outlined animate-spin text-[16px]">sync</span> : "Verify ZIP"}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm bg-tertiary/10 border border-tertiary/30 p-2 sm:p-2 text-tertiary font-mono gap-3 font-bold">
                  <span className="flex items-center gap-2 text-[10px] sm:text-xs drop-shadow-[0_0_2px_rgba(49,225,146,0.5)]">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span> IN STOCK FOR {zipCode}
                  </span>
                  <button onClick={clearZip} className="text-secondary hover:text-on-surface text-[10px] uppercase font-bold underline sm:ml-auto">
                    Change ZIP
                  </button>
                </div>
              )}
            </div>

            <div className={`transition-opacity duration-300 ${!zipChecked ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <label className="flex text-xs font-bold text-on-surface uppercase mb-2 items-center gap-2 mt-4 md:mt-2">
                <span className="material-symbols-outlined text-[14px]">assignment</span> 2. Intended Operational Use (Required)
              </label>
              <textarea 
                className="w-full border border-surface-variant p-3 text-sm focus:outline-none focus:border-primary bg-surface-container-low text-on-surface min-h-[100px] md:min-h-[80px]"
                placeholder="Briefly describe what you are building (min 15 chars)..."
                value={intendedUse}
                onChange={(e) => setIntendedUse(e.target.value)}
              />
            </div>

            <div className={`transition-opacity duration-300 ${!zipChecked ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
              <label className="flex items-start gap-3 cursor-pointer p-4 bg-surface-variant/30 border border-error/20">
                <input 
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-primary"
                />
                <span className="text-[10px] text-on-surface-variant font-bold uppercase leading-tight">
                  <span className="text-error font-bold">WARNING:</span> I acknowledge I have selected "{product.name}" and assume all liability for its application upon delivery. I have read and understood the chemical hazards associated with this product.
                </span>
              </label>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-surface-variant">
            <button 
              onClick={handleAddToCart}
              className={`w-full py-4 px-4 text-xs font-bold uppercase tracking-widest flex justify-center items-center gap-2 transition-all duration-300 ${zipChecked && intendedUse.length >= 15 && termsAccepted ? 'btn-primary' : 'bg-surface-container-high text-on-surface-variant/30 border border-surface-variant cursor-not-allowed'}`}
            >
              <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
              Add to Manifest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

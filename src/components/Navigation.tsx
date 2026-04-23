/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface NavigationProps {
  cartCount: number;
  onNavigate: (view: "home" | "cart" | "profile" | "search") => void;
}

export default function Navigation({ cartCount, onNavigate }: NavigationProps) {
  return (
    <header className="bg-surface/90 backdrop-blur-md border-b border-surface-variant shadow-[0_4px_30px_rgba(0,0,0,0.5)] flex justify-between items-center px-6 h-16 w-full fixed top-0 z-50">
      <div 
        className="flex items-center gap-3 text-primary cursor-pointer group"
        onClick={() => onNavigate("home")}
      >
        <span className="material-symbols-outlined text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.8)] transition-all" style={{fontVariationSettings: "'FILL' 1"}}>rocket_launch</span>
        <span className="text-lg font-bold text-primary drop-shadow-[0_0_3px_rgba(255,180,166,0.5)] group-hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.8)] transition-all font-sans uppercase tracking-widest text-xs">
          AERO_CORE SYSTEMS
        </span>
      </div>

      <nav className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
        <button 
          className="text-on-surface-variant/90 font-bold text-xs uppercase hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.5)] transition-all duration-150 tracking-widest"
          onClick={() => {
            onNavigate("home");
            setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 50);
          }}
        >
          CATALOG
        </button>
        <button className="text-on-surface-variant/90 font-bold text-xs uppercase hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.5)] transition-all duration-150 tracking-widest">
          PROPULSION
        </button>
        <button className="text-on-surface-variant/90 font-bold text-xs uppercase hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.5)] transition-all duration-150 tracking-widest">
          SYSTEMS
        </button>
      </nav>

      <div className="flex items-center gap-6">
        <button 
          className="text-on-surface-variant/90 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.5)] transition-all duration-150 flex items-center"
          onClick={() => onNavigate("search")}
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>
        <button 
          className="text-on-surface-variant/90 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.5)] transition-all duration-150 flex items-center"
          onClick={() => onNavigate("profile")}
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
        </button>
        <button 
          className="relative text-on-surface-variant/90 hover:text-primary hover:drop-shadow-[0_0_8px_rgba(255,180,166,0.5)] transition-all duration-150 flex items-center gap-2"
          onClick={() => onNavigate("cart")}
        >
          <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
          {cartCount > 0 && (
            <span className="bg-error text-on-error px-1.5 rounded-full text-[10px] absolute -top-2 -right-2 font-black leading-none drop-shadow-[0_0_3px_rgba(255,180,171,0.8)]">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}


/**
 * @license
 * SPDX-License-Identifier: MIT
 */

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-variant pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>rocket_launch</span>
            <span className="text-sm font-bold drop-shadow-[0_0_3px_rgba(255,180,166,0.5)] font-sans uppercase tracking-widest">
              AERO_CORE
            </span>
          </div>
          <p className="text-xs text-on-surface-variant/70 leading-relaxed font-mono">
            Provider of high-performance orbital propulsion 
            and aerospace logistics solutions to the 
            interplanetary private sector.
          </p>
          <div className="flex gap-4 mt-2">
            {/* Fake social links */}
            <span className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors material-symbols-outlined text-[18px]">share</span>
            <span className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors material-symbols-outlined text-[18px]">language</span>
            <span className="text-on-surface-variant hover:text-primary cursor-pointer transition-colors material-symbols-outlined text-[18px]">mail</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-on-surface font-bold text-xs uppercase tracking-widest mb-2 border-b border-surface-variant pb-2">Customer Support</h3>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Manifest Tracking</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Return Authorization</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Shipping Options</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Bulk Orders</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">FAQ</a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-on-surface font-bold text-xs uppercase tracking-widest mb-2 border-b border-surface-variant pb-2">Company</h3>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">About Us</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Careers</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Sustainability</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Investor Relations</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Press Releases</a>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-on-surface font-bold text-xs uppercase tracking-widest mb-2 border-b border-surface-variant pb-2">Legal</h3>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Terms of Service</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Privacy Policy</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Export Compliance</a>
          <a href="#" className="text-on-surface-variant/70 hover:text-tertiary text-xs transition-colors">Warranty Info</a>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-on-surface-variant/50 border-t border-surface-variant/50 pt-6 uppercase tracking-wider">
        <p className="mb-2 md:mb-0">© 2026 AERO-CORE SYSTEMS INC. All Rights Reserved.</p>
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">lock</span> Secure Checkout</span>
          <span>We Accept: CRD, ALY, BTC, UEC</span>
        </div>
      </div>
    </footer>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { PRODUCTS, Product, CartItem } from "./types";
import Navigation from "./components/Navigation";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";

type View = "home" | "product" | "cart" | "checkout" | "profile" | "search";

export default function App() {
  const [view, setView] = useState<View>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addingProduct, setAddingProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleViewDetails = useCallback((product: Product) => {
    setSelectedProduct(product);
    setView("product");
  }, []);

  const initiateAddToCart = useCallback((product: Product) => {
    setAddingProduct(product);
  }, []);

  const confirmAddToCart = useCallback((product: Product, goToCart: boolean) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setAddingProduct(null);
    if (goToCart) {
      setView("cart");
    } else {
      setView("home");
    }
  }, []);

  const removeLineItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const setItemQuantity = useCallback((id: string, requestedQty: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, requestedQty);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  const resetOrder = useCallback(() => {
    setCartItems([]);
    setView("home");
  }, []);

  return (
    <div className="min-h-screen bg-background text-on-background pb-24 md:pb-0 font-sans selection:bg-primary/30 flex flex-col">
      <Navigation cartCount={cartCount} onNavigate={setView} />
      
      {addingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md">
          <div className="bg-surface-container-low p-8 max-w-md w-full border border-surface-variant shadow-2xl relative overflow-hidden scanline-overlay">
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-4 uppercase text-on-surface border-b-2 border-surface-variant pb-2 flex items-center gap-2 tracking-tight">
                <span className="material-symbols-outlined text-xl text-primary">add_shopping_cart</span> ADD TO CART
              </h2>
              <p className="mb-6 text-sm text-on-surface-variant">
                You are about to add <strong>{addingProduct.name}</strong> to your cart. How would you like to proceed?
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  className="bg-primary text-on-primary border border-primary-fixed-dim hover:bg-primary-fixed hover:shadow-[0_0_15px_rgba(255,180,166,0.4)] px-8 py-3 text-xs uppercase font-bold tracking-widest transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]"
                  onClick={() => confirmAddToCart(addingProduct, true)}
                >
                  Confirm & View Cart
                </button>
                <button 
                  className="bg-surface-container-high border border-surface-variant text-on-surface hover:border-primary px-8 py-3 text-xs uppercase font-bold tracking-widest transition-all duration-200"
                  onClick={() => confirmAddToCart(addingProduct, false)}
                >
                  Return to Shopping
                </button>
                <button 
                  className="px-8 py-3 text-on-surface-variant/70 text-[10px] uppercase font-bold tracking-widest hover:text-error transition-colors mt-2"
                  onClick={() => setAddingProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pt-24 max-w-7xl mx-auto w-full px-4 md:px-6 mb-12">
        {view === "home" && (
          <>
            <section className="mb-12 relative rounded-xl overflow-hidden border-2 border-surface-variant bg-surface-container-low shadow-[0_0_15px_rgba(0,0,0,0.5)] scanline-overlay">
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10"></div>
              <img 
                alt="Dramatic retrofuturistic rocket launch" 
                className="w-full h-[530px] md:h-[618px] object-cover absolute inset-0 z-0 opacity-60" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCISwIghn4PvHXcXulqfi-OdnpmGsYvTI8kN4V0Xo6w1q85eCc4grpL6SKVTWWbMlCnkpcPJalcaGtyT6d38kns6FHS5oF2RaUwRhjwruj9L7in3hYZtcJLS3dmsoTAzNq41oGfCqyCA6vFsSlR7XOzxwhxC0qHX1N1V5A8HvolMIoZgoTW-TnZYrJ6EnmXy5SOjvnnB2D6AooDglnxfP_pPHUV5rX-kgrqxd1cm9vbIG8P8DJ7a-7_CqoMnYXaCCLkFRdrzWRjNak"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-20 p-8 md:p-16 h-full flex flex-col justify-center max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-on-background mb-4 drop-shadow-lg uppercase tracking-tight leading-tight">THE FUTURE OF ORBITAL COMMERCE</h1>
                <p className="text-lg text-on-surface-variant mb-8 max-w-lg border-l-2 border-primary pl-4">Advanced propulsion technologies for the next generation of interplanetary logistics. Built for reliability, designed for the cosmos.</p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-primary text-on-primary font-bold text-sm tracking-widest uppercase px-10 py-4 rounded-sm border border-primary-fixed-dim hover:bg-primary-fixed hover:shadow-[0_0_15px_rgba(255,180,166,0.4)] active:scale-95 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>rocket</span>
                    Browse Catalog
                  </button>
                </div>
              </div>
            </section>

            <div className="flex flex-col gap-12">
              <section id="catalog" className="w-full flex flex-col gap-6 scroll-mt-28">
                <div className="flex items-center gap-4 border-b border-surface-variant pb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">precision_manufacturing</span>
                  <h2 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Propulsion Systems Catalog</h2>
                </div>
                
                <div className="flex items-center gap-2 py-2 overflow-x-auto no-scrollbar mb-4">
                  {["ALL SYSTEMS", "PROPULSION", "TELEMETRY", "SYSTEMS"].map((cat) => (
                    <button key={cat} className="whitespace-nowrap px-4 py-2 border border-surface-variant bg-surface-container-low text-[10px] uppercase font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors hover:shadow-[inset_0_0_10px_rgba(255,180,166,0.1)] rounded">
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {PRODUCTS.map(p => (
                    <ProductCard key={p.id} product={p} onViewDetails={handleViewDetails} />
                  ))}
                </div>
              </section>

              <aside className="w-full flex flex-col gap-6">
                <div className="flex items-center gap-4 border-b border-surface-variant pb-2">
                  <span className="material-symbols-outlined text-primary text-2xl">satellite_alt</span>
                  <h2 className="text-2xl font-bold text-on-surface uppercase tracking-tight">Mission Updates</h2>
                </div>
                <div className="bg-surface-container-low border border-surface-variant rounded-lg p-1 scanline-overlay relative">
                  <div className="bg-surface-container-lowest p-5 rounded h-full relative z-10 flex flex-col gap-4 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                    <div className="border-b border-surface-variant pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-tertiary drop-shadow-[0_0_2px_rgba(49,225,146,0.3)] uppercase">T-MINUS 14:00:00</span>
                        <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                      </div>
                      <h4 className="text-xs font-bold text-on-surface uppercase mb-1">Artemis Payload Integration</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Final checks completed on the secondary payload bus. Fairing encapsulation scheduled for 0800 hours.</p>
                    </div>
                    <div className="border-b border-surface-variant pb-3 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-secondary uppercase">T-PLUS 45 DAYS</span>
                        <span className="w-2 h-2 rounded-full bg-secondary"></span>
                      </div>
                      <h4 className="text-xs font-bold text-on-surface uppercase mb-1">Orbital Hub Alpha Status</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Solar array deployment nominal. Life support systems engaging primary cycle.</p>
                    </div>
                    <div className="border-b border-surface-variant pb-3 opacity-70">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-secondary uppercase">ARCHIVED</span>
                        <span className="w-2 h-2 rounded-full bg-surface-variant"></span>
                      </div>
                      <h4 className="text-xs font-bold text-on-surface uppercase mb-1">Engine Test Stand Firing</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">Successful full-duration burn of the Vanguard prototype at Site 4.</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </>
        )}

        {view === "product" && selectedProduct && (
          <ProductDetails 
            product={selectedProduct} 
            onBack={() => setView("home")} 
            onAddToCart={initiateAddToCart} 
          />
        )}

        {view === "cart" && (
          <Cart 
            items={cartItems} 
            onRemove={removeLineItem} 
            onSetQuantity={setItemQuantity} 
            onCheckout={() => setView("checkout")}
          />
        )}

        {view === "checkout" && (
          <Checkout 
            total={cartTotal} 
            onComplete={resetOrder}
          />
        )}

        {(view === "profile" || view === "search") && (
          <div className="flex flex-col items-center justify-center py-32 text-center h-[50vh]">
            <div className="bg-surface-container-low p-6 rounded-full block mb-6 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
               <span className="material-symbols-outlined text-[48px] text-primary">construction</span>
            </div>
            <h2 className="text-2xl font-bold mb-4 uppercase text-on-surface tracking-widest">{view === "search" ? "Search" : "Account Profile"}</h2>
            <p className="text-on-surface-variant font-mono tracking-widest">
              MODULE UNDER CONSTRUCTION.
            </p>
            <button 
              onClick={() => setView("home")}
              className="mt-8 text-xs font-bold text-primary hover:text-primary-fixed uppercase tracking-widest underline underline-offset-4 cursor-pointer"
            >
               RETURN TO CATALOG
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}



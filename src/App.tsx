/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useCallback, Suspense } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import { useCart } from "./context/CartContext";
import { Product, CartItem } from "./types";
import Navigation from "./components/Navigation";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";

import { useProduct } from "./hooks/useFetchProducts";

const ProductLoader = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = useProduct(id);

  if (!product) {
    return <Navigate to="/" replace />;
  }

  return (
    <ProductDetails 
      product={product} 
      onBack={() => navigate("/")} 
    />
  );
};

const ProductDetailsWrapper = () => {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-24 animate-pulse">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl mb-4">sync</span>
        <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">Downloading Manifest Data...</span>
      </div>
    }>
      <ProductLoader />
    </Suspense>
  );
};



export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartTotal, addingProduct, addItem, setAddingProduct, clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-on-background pb-24 md:pb-0 font-sans selection:bg-primary/30 flex flex-col">
      <Navigation />
      
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
                  onClick={() => {
                    if (addingProduct) addItem(addingProduct);
                    navigate("/cart");
                  }}
                >
                  Confirm & View Cart
                </button>
                <button 
                  className="bg-surface-container-high border border-surface-variant text-on-surface hover:border-primary px-8 py-3 text-xs uppercase font-bold tracking-widest transition-all duration-200"
                  onClick={() => {
                    if (addingProduct) addItem(addingProduct);
                    setAddingProduct(null);
                  }}
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetailsWrapper />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout total={cartTotal} onComplete={clearCart} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}



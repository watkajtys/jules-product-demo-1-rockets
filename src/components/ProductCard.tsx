/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  return (
    <div className="bg-surface-container-low border border-surface-variant rounded-lg p-6 relative group hover:border-outline transition-colors duration-300 flex flex-col h-full">
      <div className="absolute top-0 right-0 p-3 z-10">
        <div className="px-3 h-8 border border-tertiary/30 rounded flex items-center justify-center bg-tertiary/5 text-tertiary font-mono font-bold text-xs drop-shadow-[0_0_2px_rgba(49,225,146,0.5)] uppercase tracking-wider">
          {product.category}
        </div>
      </div>
      <div 
        className="w-full h-48 mb-4 relative overflow-hidden rounded cursor-pointer border border-surface-variant group-hover:border-primary/50 transition-colors"
        onClick={() => onViewDetails(product)}
      >
        <img 
          alt={product.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 hover:scale-105" 
          src={product.image} 
          referrerPolicy="no-referrer"
        />
      </div>
      <h3 
        className="text-xl font-bold text-on-surface mb-2 uppercase tracking-tight cursor-pointer hover:text-primary transition-colors inline-block"
        onClick={() => onViewDetails(product)}
      >
        {product.name}
      </h3>
      <p className="text-sm text-on-surface-variant mb-4 flex-grow">{product.description}</p>
      
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant/50">inventory_2</span>
            <span className="text-[10px] uppercase text-on-surface-variant font-bold tracking-tighter">
              PART: {product.id.toUpperCase()}-X
            </span>
        </div>
        <div className="flex justify-between items-center border-t border-surface-variant pt-4">
          <span className="font-mono text-secondary text-sm">${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
          <button 
            onClick={() => onViewDetails(product)} 
            className="text-primary hover:text-primary-fixed font-bold text-xs uppercase flex items-center gap-1 transition-colors cursor-pointer"
          >
              Specs <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;


import React from "react";
import { useProducts } from "../hooks/useFetchProducts";
import ProductCard from "./ProductCard";

export default function CatalogGrid() {
  const products = useProducts();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}


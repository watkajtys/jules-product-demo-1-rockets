import { use } from "react";
import { api } from "../services/api";
import { Product } from "../types";

const productsPromiseCache = new Map<string, Promise<any>>();

/**
 * Custom hook to retrieve all products from the catalog.
 * Uses React's `use` hook to suspend rendering while fetching data.
 * Implements an in-memory promise cache to prevent duplicate API requests.
 * 
 * @returns {Product[]} The array of catalog products.
 */
export function useProducts(): Product[] {
  let promise = productsPromiseCache.get("catalog");
  if (!promise) {
    promise = api.getProducts();
    productsPromiseCache.set("catalog", promise);
  }
  return use(promise);
}

/**
 * Custom hook to retrieve a single product by its unique identifier.
 * Uses React's `use` hook to suspend rendering while fetching data.
 * Implements an in-memory promise cache keyed by product ID.
 * 
 * @param {string} [id] - The unique identifier of the product.
 * @returns {Product | undefined} The matching product, or undefined if no ID is provided.
 */
export function useProduct(id?: string): Product | undefined {
  if (!id) return undefined;
  let promise = productsPromiseCache.get(`product-${id}`);
  if (!promise) {
    promise = api.getProductById(id);
    productsPromiseCache.set(`product-${id}`, promise);
  }
  return use(promise);
}


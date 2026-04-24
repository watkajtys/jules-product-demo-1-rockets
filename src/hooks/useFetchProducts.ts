import { use } from "react";
import { api } from "../services/api";
import { Product } from "../types";

const productsPromiseCache = new Map<string, Promise<any>>();

export function useProducts(): Product[] {
  let promise = productsPromiseCache.get("catalog");
  if (!promise) {
    promise = api.getProducts();
    productsPromiseCache.set("catalog", promise);
  }
  return use(promise);
}

export function useProduct(id?: string): Product | undefined {
  if (!id) return undefined;
  let promise = productsPromiseCache.get(`product-${id}`);
  if (!promise) {
    promise = api.getProductById(id);
    productsPromiseCache.set(`product-${id}`, promise);
  }
  return use(promise);
}

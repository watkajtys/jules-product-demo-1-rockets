import { Product, PRODUCTS } from "../types";

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  /**
   * Fetches all products
   */
  async getProducts(): Promise<Product[]> {
    await delay(500); // simulate network latency
    return [...PRODUCTS];
  },

  /**
   * Fetches a product by ID
   */
  async getProductById(id: string): Promise<Product | undefined> {
    await delay(400);
    return PRODUCTS.find(p => p.id === id);
  },

  /**
   * Searches for products by query string (matching name/description)
   */
  async searchProducts(query: string): Promise<Product[]> {
    await delay(600);
    if (!query.trim()) return [];
    const term = query.toLowerCase().trim();
    return PRODUCTS.filter(
      p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }
};

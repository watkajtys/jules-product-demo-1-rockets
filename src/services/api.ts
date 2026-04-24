import { Product, PRODUCTS } from "../types";


export const api = {
  /**
   * Fetches all products
   */
  async getProducts(): Promise<Product[]> {
    return [...PRODUCTS];
  },

  /**
   * Fetches a product by ID
   */
  async getProductById(id: string): Promise<Product | undefined> {
    return PRODUCTS.find(p => p.id === id);
  },

  /**
   * Searches for products by query string (matching name/description)
   */
  async searchProducts(query: string): Promise<Product[]> {
    if (!query.trim()) return [];
    const term = query.toLowerCase().trim();
    return PRODUCTS.filter(
      p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
    );
  }
};

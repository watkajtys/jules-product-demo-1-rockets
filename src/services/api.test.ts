import { describe, it, expect } from 'vitest';
import { api } from './api';

describe('Simulated Telemetry API Service', () => {
  it('should return all products manifest', async () => {
    const products = await api.getProducts();
    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0);
  });

  it('should get a product spec by ID', async () => {
    const products = await api.getProducts();
    const targetId = products[0].id;
    const product = await api.getProductById(targetId);

    expect(product).toBeDefined();
    expect(product?.id).toBe(targetId);
  });

  it('should search products matching criteria', async () => {
    const matches = await api.searchProducts('core');
    expect(matches).toBeDefined();
    matches.forEach(match => {
      const isMatch = match.name.toLowerCase().includes('core') || match.description.toLowerCase().includes('core');
      expect(isMatch).toBe(true);
    });
  });

  it('should return empty set for whitespace search query', async () => {
    const emptyMatches = await api.searchProducts('   ');
    expect(emptyMatches).toEqual([]);
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { describe, it, expect, beforeEach } from 'vitest';

const TestComponent = () => {
  const { cartItems, addItem, removeItem, setQuantity, cartTotal, cartCount } = useCart();

  const mockProduct = {
    id: 'test-1',
    name: 'Test Engine',
    description: 'Test Desc',
    price: 100,
    image: '',
    category: 'Propulsion' as const
  };

  return (
    <div>
      <div data-testid="cart-count">{cartCount}</div>
      <div data-testid="cart-total">{cartTotal}</div>
      <button data-testid="add-item" onClick={() => addItem(mockProduct)}>Add Item</button>
      <button data-testid="set-qty" onClick={() => setQuantity('test-1', 5)}>Set Qty 5</button>
      <button data-testid="remove-item" onClick={() => removeItem('test-1')}>Remove</button>
      <ul>
        {cartItems.map(item => (
          <li key={item.id} data-testid="cart-item">
            {item.name} - Qty: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('CartContext State Container', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should add an item and compute cart metrics', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');

    fireEvent.click(screen.getByTestId('add-item'));

    expect(screen.getByTestId('cart-count').textContent).toBe('1');
    expect(screen.getByTestId('cart-total').textContent).toBe('100');
    expect(screen.getByTestId('cart-item').textContent).toContain('Test Engine - Qty: 1');
  });

  it('should increment quantity if adding existing item', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('add-item'));

    expect(screen.getByTestId('cart-count').textContent).toBe('2');
    expect(screen.getByTestId('cart-total').textContent).toBe('200');
    expect(screen.getByTestId('cart-item').textContent).toContain('Test Engine - Qty: 2');
  });

  it('should adjust item quantities with the setQuantity dispatcher', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-item'));
    fireEvent.click(screen.getByTestId('set-qty'));

    expect(screen.getByTestId('cart-count').textContent).toBe('5');
    expect(screen.getByTestId('cart-total').textContent).toBe('500');
    expect(screen.getByTestId('cart-item').textContent).toContain('Test Engine - Qty: 5');
  });

  it('should completely remove a shopping item from the manifest', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-item'));
    expect(screen.getByTestId('cart-count').textContent).toBe('1');

    fireEvent.click(screen.getByTestId('remove-item'));
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
  });
});

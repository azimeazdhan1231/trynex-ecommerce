import { Product, CartItem } from '../types';

const CART_STORAGE_KEY = 'trynex_cart';
const WISHLIST_STORAGE_KEY = 'trynex_wishlist';

export const getCart = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const addToCart = (product: Product, quantity: number = 1, selectedVariants?: { size?: string; color?: string }): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => 
    item.product.id === product.id && 
    JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
  );

  if (existingItemIndex >= 0) {
    cart[existingItemIndex].quantity += quantity;
  } else {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity,
      selectedVariants
    };
    cart.push(newItem);
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const removeFromCart = (itemId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== itemId);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedCart));
};

export const updateQuantity = (itemId: string, quantity: number): void => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === itemId);
  
  if (itemIndex >= 0) {
    cart[itemIndex].quantity = quantity;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const getCartCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// Wishlist functions
export const getWishlist = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const toggleWishlist = (productId: string): void => {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  
  if (index >= 0) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(productId);
  }
  
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
};

export const isInWishlist = (productId: string): boolean => {
  const wishlist = getWishlist();
  return wishlist.includes(productId);
};

export const clearWishlist = (): void => {
  localStorage.removeItem(WISHLIST_STORAGE_KEY);
};

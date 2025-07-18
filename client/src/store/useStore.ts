import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, CartItem, Product, NotificationState, Language } from '../types';

interface StoreState extends AppState {
  // Cart actions
  addToCart: (product: Product, quantity?: number, variants?: any) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist actions
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  
  // Language actions
  setLanguage: (language: Language) => void;
  
  // Notification actions
  addNotification: (notification: Omit<NotificationState, 'id' | 'visible'>) => void;
  removeNotification: (id: string) => void;
  
  // Recently viewed
  addToRecentlyViewed: (productId: string) => void;
  
  // Search and filters
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<AppState['filters']>) => void;
  setSortBy: (sortBy: AppState['sortBy']) => void;
  
  // UI state
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  
  // Computed values
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getDeliveryFee: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      cart: [],
      wishlist: [],
      currentLanguage: { code: 'en', name: 'English' },
      notifications: [],
      recentlyViewed: [],
      searchQuery: '',
      filters: {
        category: [],
        priceRange: [0, 5000],
        inStock: false,
        onSale: false,
      },
      sortBy: 'featured',
      isCartOpen: false,
      isSearchOpen: false,
      isMobileMenuOpen: false,

      // Cart actions
      addToCart: (product, quantity = 1, variants = {}) => {
        const existingItem = get().cart.find(item => 
          item.product.id === product.id && 
          JSON.stringify(item.selectedVariants) === JSON.stringify(variants)
        );

        if (existingItem) {
          get().updateQuantity(product.id, existingItem.quantity + quantity);
        } else {
          set(state => ({
            cart: [...state.cart, {
              id: `${product.id}-${Date.now()}`,
              product,
              quantity,
              selectedVariants: variants,
            }]
          }));
        }

        get().addNotification({
          message: `${product.name} added to cart`,
          type: 'success',
          duration: 3000,
        });
      },

      removeFromCart: (productId) => {
        set(state => ({
          cart: state.cart.filter(item => item.id !== productId)
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set(state => ({
          cart: state.cart.map(item =>
            item.id === productId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      // Wishlist actions
      addToWishlist: (productId) => {
        set(state => ({
          wishlist: [...state.wishlist, productId]
        }));
        get().addNotification({
          message: 'Added to wishlist',
          type: 'success',
          duration: 2000,
        });
      },

      removeFromWishlist: (productId) => {
        set(state => ({
          wishlist: state.wishlist.filter(id => id !== productId)
        }));
        get().addNotification({
          message: 'Removed from wishlist',
          type: 'info',
          duration: 2000,
        });
      },

      toggleWishlist: (productId) => {
        const isInWishlist = get().wishlist.includes(productId);
        if (isInWishlist) {
          get().removeFromWishlist(productId);
        } else {
          get().addToWishlist(productId);
        }
      },

      // Language actions
      setLanguage: (language) => {
        set({ currentLanguage: language });
      },

      // Notification actions
      addNotification: (notification) => {
        const id = Date.now().toString();
        const newNotification: NotificationState = {
          ...notification,
          id,
          visible: true,
        };

        set(state => ({
          notifications: [...state.notifications, newNotification]
        }));

        // Auto-remove notification after duration
        if (notification.duration) {
          setTimeout(() => {
            get().removeNotification(id);
          }, notification.duration);
        }
      },

      removeNotification: (id) => {
        set(state => ({
          notifications: state.notifications.filter(n => n.id !== id)
        }));
      },

      // Recently viewed
      addToRecentlyViewed: (productId) => {
        set(state => {
          const filtered = state.recentlyViewed.filter(id => id !== productId);
          return {
            recentlyViewed: [productId, ...filtered].slice(0, 10)
          };
        });
      },

      // Search and filters
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },

      setFilters: (filters) => {
        set(state => ({
          filters: { ...state.filters, ...filters }
        }));
      },

      setSortBy: (sortBy) => {
        set({ sortBy });
      },

      // UI state
      setCartOpen: (open) => {
        set({ isCartOpen: open });
      },

      setSearchOpen: (open) => {
        set({ isSearchOpen: open });
      },

      setMobileMenuOpen: (open) => {
        set({ isMobileMenuOpen: open });
      },

      // Computed values
      getCartTotal: () => {
        const { cart } = get();
        const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        const deliveryFee = get().getDeliveryFee();
        return subtotal + deliveryFee;
      },

      getCartItemCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getDeliveryFee: () => {
        // Default to Dhaka metro rate
        return 80;
      },
    }),
    {
      name: 'trynex-store',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        currentLanguage: state.currentLanguage,
        recentlyViewed: state.recentlyViewed,
        filters: state.filters,
        sortBy: state.sortBy,
      }),
    }
  )
);

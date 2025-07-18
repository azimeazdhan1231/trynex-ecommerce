import { Product, FilterOptions } from '../types';
import productsData from '../data/products.json';

export const getProducts = (): Product[] => {
  return productsData.products;
};

export const getProductById = (id: string): Product | undefined => {
  return productsData.products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return productsData.products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return productsData.products.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm) ||
    product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
};

export const getFeaturedProducts = (limit: number = 8): Product[] => {
  // Return products that are new, on sale, or have high ratings
  const featured = productsData.products
    .filter(product => product.isNew || product.isOnSale || product.rating >= 4.5)
    .slice(0, limit);
  
  return featured;
};

export const getPopularProducts = (limit: number = 6): Product[] => {
  // Sort by rating and reviews count
  return productsData.products
    .sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))
    .slice(0, limit);
};

export const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
  return productsData.products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
};

export const filterProducts = (products: Product[], filters: FilterOptions): Product[] => {
  let filtered = [...products];

  // Filter by categories
  if (filters.categories.length > 0) {
    filtered = filtered.filter(product => filters.categories.includes(product.category));
  }

  // Filter by price range
  filtered = filtered.filter(product => 
    product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
  );

  // Filter by stock status
  if (filters.inStock) {
    filtered = filtered.filter(product => product.inStock);
  }

  // Filter by sale status
  if (filters.onSale) {
    filtered = filtered.filter(product => product.isOnSale);
  }

  // Filter by rating
  if (filters.rating > 0) {
    filtered = filtered.filter(product => product.rating >= filters.rating);
  }

  return filtered;
};

export const getProductsByPriceRange = (min: number, max: number): Product[] => {
  return productsData.products.filter(product => 
    product.price >= min && product.price <= max
  );
};

export const getProductsOnSale = (): Product[] => {
  return productsData.products.filter(product => product.isOnSale);
};

export const getNewProducts = (): Product[] => {
  return productsData.products.filter(product => product.isNew);
};

export const getOutOfStockProducts = (): Product[] => {
  return productsData.products.filter(product => !product.inStock);
};

export const getLowStockProducts = (): Product[] => {
  return productsData.products.filter(product => product.lowStock);
};

export const getProductSuggestions = (query: string, limit: number = 5): string[] => {
  const searchTerm = query.toLowerCase();
  const suggestions = new Set<string>();

  productsData.products.forEach(product => {
    if (product.name.toLowerCase().includes(searchTerm)) {
      suggestions.add(product.name);
    }
    if (product.category.toLowerCase().includes(searchTerm)) {
      suggestions.add(product.category);
    }
    product.tags?.forEach(tag => {
      if (tag.toLowerCase().includes(searchTerm)) {
        suggestions.add(tag);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
};

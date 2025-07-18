import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { getCart, addToCart, toggleWishlist, isInWishlist } from '../lib/cart';
import { getProducts, filterProducts } from '../lib/products';
import { getCategories } from '../lib/categories';
import { Product, Category, CartItem, FilterOptions } from '../types';
import { Search, Filter, Grid, List } from 'lucide-react';

export default function Products() {
  const [location] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 5000],
    inStock: false,
    onSale: false,
    rating: 0,
    sortBy: 'featured',
    sortOrder: 'desc'
  });

  useEffect(() => {
    setCart(getCart());
    const allProducts = getProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
    setCategories(getCategories());

    // Check for category filter in URL
    const urlParams = new URLSearchParams(location.split('?')[1] || '');
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [location]);

  useEffect(() => {
    let filtered = filterProducts(products, filters);
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price':
          return filters.sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        case 'name':
          return filters.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        case 'rating':
          return filters.sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        case 'newest':
          return filters.sortOrder === 'asc' ? 
            (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1) :
            (b.isNew ? -1 : 1) - (a.isNew ? -1 : 1);
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, filters, searchTerm]);

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return;
    
    addToCart(product);
    setCart(getCart());
    (window as any).showNotification?.('Product added to cart!', 'success');
  };

  const handleToggleWishlist = (productId: string) => {
    toggleWishlist(productId);
    const isWishlisted = isInWishlist(productId);
    (window as any).showNotification?.(
      isWishlisted ? 'Added to wishlist' : 'Removed from wishlist',
      'success'
    );
  };

  const handleCategoryFilter = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy: sortBy as FilterOptions['sortBy'] }));
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 5000],
      inStock: false,
      onSale: false,
      rating: 0,
      sortBy: 'featured',
      sortOrder: 'desc'
    });
    setSearchTerm('');
  };

  const handleCartUpdate = () => {
    setCart(getCart());
  };

  const handleQuickView = (product: Product) => {
    // TODO: Implement quick view modal
    console.log('Quick view product:', product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Products</h1>
            <p className="text-gray-600 text-lg">Discover our complete collection of premium products</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4">
              <div className="filter-sidebar">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#d4af37] hover:text-[#b8941f]"
                  >
                    Clear All
                  </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    />
                    <Search className="absolute right-3 top-3 text-gray-400" size={16} />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category.id)}
                          onChange={() => handleCategoryFilter(category.id)}
                          className="form-checkbox"
                        />
                        <span className="text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="50"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceRangeChange([0, parseInt(e.target.value)])}
                      className="range-slider"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>৳0</span>
                      <span>৳{filters.priceRange[1]}</span>
                      <span>৳5000</span>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Availability</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.inStock}
                        onChange={(e) => setFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="form-checkbox"
                      />
                      <span className="text-sm">In Stock</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={filters.onSale}
                        onChange={(e) => setFilters(prev => ({ ...prev, onSale: e.target.checked }))}
                        className="form-checkbox"
                      />
                      <span className="text-sm">On Sale</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              {/* Sort and View Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    {filteredProducts.length} products found
                  </span>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">Sort by:</span>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                    >
                      <option value="featured">Featured</option>
                      <option value="price">Price</option>
                      <option value="name">Name</option>
                      <option value="rating">Rating</option>
                      <option value="newest">Newest</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 border rounded ${viewMode === 'grid' ? 'bg-[#d4af37] text-white' : 'bg-white'}`}
                    >
                      <Grid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 border rounded ${viewMode === 'list' ? 'bg-[#d4af37] text-white' : 'bg-white'}`}
                    >
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Filter size={48} className="mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No products found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search terms</p>
                </div>
              ) : (
                <div className={`grid gap-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onQuickView={handleQuickView}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={isInWishlist(product.id)}
                    />
                  ))}
                </div>
              )}

              {/* Load More Button */}
              {filteredProducts.length > 0 && (
                <div className="text-center mt-12">
                  <button className="btn-secondary px-8 py-3">
                    Load More Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateCart={handleCartUpdate}
      />
    </div>
  );
}

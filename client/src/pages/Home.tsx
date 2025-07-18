import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import TestimonialCard from '../components/TestimonialCard';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { getCart, addToCart, toggleWishlist, isInWishlist } from '../lib/cart';
import { getProducts } from '../lib/products';
import { getCategories } from '../lib/categories';
import { Product, Category, CartItem } from '../types';
import productsData from '../data/products.json';
import categoriesData from '../data/categories.json';
import testimonialsData from '../data/testimonials.json';

export default function Home() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setCart(getCart());
    setFeaturedProducts(getProducts().slice(0, 8));
    setCategories(getCategories());
  }, []);

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

  const handleCategoryClick = (categoryId: string) => {
    setLocation(`/products?category=${categoryId}`);
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

      {/* Flash Sale Banner */}
      <div className="flash-sale-banner mt-16">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <i className="fas fa-fire text-red-500"></i>
            <span>Flash Sale! Up to 50% Off - Limited Time Only!</span>
          </div>
          <div className="countdown-timer flex items-center space-x-2">
            <span className="text-sm">Ends in:</span>
            <div className="flex space-x-1">
              <span className="bg-black text-white px-2 py-1 rounded text-sm font-bold">23</span>
              <span>:</span>
              <span className="bg-black text-white px-2 py-1 rounded text-sm font-bold">59</span>
              <span>:</span>
              <span className="bg-black text-white px-2 py-1 rounded text-sm font-bold">45</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg">Explore our diverse range of premium products</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Handpicked premium items for you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
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

          <div className="text-center mt-12">
            <button
              onClick={() => setLocation('/products')}
              className="btn-primary px-8 py-3 text-lg"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Real experiences from real customers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialsData.testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-[#d4af37] to-[#f4e88a]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Stay Updated</h2>
          <p className="text-black/80 text-lg mb-8">Subscribe to get exclusive offers and new product updates</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-black/20"
            />
            <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateCart={handleCartUpdate}
      />

      {/* WhatsApp Widget */}
      <div className="whatsapp-widget">
        <a
          href="https://wa.me/01747292277"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full h-full"
        >
          <i className="fab fa-whatsapp"></i>
        </a>
      </div>

      {/* Live Chat Widget */}
      <div className="live-chat-widget">
        <i className="fas fa-comments"></i>
      </div>
    </div>
  );
}

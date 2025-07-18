import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { getCart } from '../lib/cart';
import { getCategories } from '../lib/categories';
import { Category, CartItem } from '../types';

export default function Categories() {
  const [, setLocation] = useLocation();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCart(getCart());
    setCategories(getCategories());
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setLocation(`/products?category=${categoryId}`);
  };

  const handleCartUpdate = () => {
    setCart(getCart());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Product Categories</h1>
            <p className="text-gray-600 text-lg">Explore our diverse range of premium products</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>

          {/* Category Stats */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-8">Category Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4af37] mb-2">
                  {categories.length}
                </div>
                <div className="text-gray-600">Total Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4af37] mb-2">
                  {categories.reduce((sum, cat) => sum + cat.productCount, 0)}
                </div>
                <div className="text-gray-600">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4af37] mb-2">
                  ৳{Math.min(...categories.map(cat => cat.startingPrice))}
                </div>
                <div className="text-gray-600">Starting Price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#d4af37] mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Support</div>
              </div>
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

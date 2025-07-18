import React, { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useStore } from '../store/useStore';
import { 
  Heart, 
  Share2, 
  Star, 
  ShoppingCart, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import productsData from '../data/products.json';
import { Product } from '../types';

const ProductDetail: React.FC = () => {
  const [, params] = useRoute('/product/:id');
  const { 
    addToCart, 
    wishlist, 
    toggleWishlist, 
    addToRecentlyViewed,
    addNotification 
  } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<{
    size?: string;
    color?: string;
  }>({});
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const products = productsData as Product[];
  const relatedProducts = products.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  useEffect(() => {
    if (params?.id) {
      const foundProduct = products.find(p => p.id === params.id);
      if (foundProduct) {
        setProduct(foundProduct);
        addToRecentlyViewed(foundProduct.id);
        
        // Set default variants
        if (foundProduct.variants?.size) {
          setSelectedVariants(prev => ({ ...prev, size: foundProduct.variants!.size![0] }));
        }
        if (foundProduct.variants?.color) {
          setSelectedVariants(prev => ({ ...prev, color: foundProduct.variants!.color![0] }));
        }
      }
    }
  }, [params?.id, products, addToRecentlyViewed]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedVariants);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      toggleWishlist(product.id);
    }
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        addNotification({
          message: 'Product link copied to clipboard!',
          type: 'success',
          duration: 3000,
        });
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const isInWishlist = wishlist.includes(product.id);
  const images = [product.image]; // In real app, product would have multiple images

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/products" className="hover:text-primary">Products</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover cursor-zoom-in"
                onClick={() => setShowZoom(true)}
              />
              <button
                onClick={() => setShowZoom(true)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              
              {/* Sale Badge */}
              {product.sale && product.salePercentage && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{product.salePercentage}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === activeImageIndex ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-primary">৳{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  product.stockLevel === 'in-stock' ? 'bg-green-100 text-green-800' :
                  product.stockLevel === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {product.stockLevel === 'in-stock' ? '✓ In Stock' :
                   product.stockLevel === 'low-stock' ? '⚠ Low Stock' :
                   '✗ Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            {/* Variants */}
            {product.variants && (
              <div className="space-y-4">
                {/* Size Selection */}
                {product.variants.size && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size
                    </label>
                    <div className="flex space-x-2">
                      {product.variants.size.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedVariants(prev => ({ ...prev, size }))}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            selectedVariants.size === size
                              ? 'border-primary bg-primary text-black'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.variants.color && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex space-x-2">
                      {product.variants.color.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedVariants(prev => ({ ...prev, color }))}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            selectedVariants.color === color
                              ? 'border-primary bg-primary text-black'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border border-gray-300 rounded-lg min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="flex-1 btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5 mr-2 inline" />
                Add to Cart
              </button>
              
              <button
                onClick={handleWishlistToggle}
                className={`p-3 border rounded-lg transition-colors ${
                  isInWishlist 
                    ? 'border-red-500 bg-red-50 text-red-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleShare}
                className="p-3 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-t">
              <div className="text-center">
                <Truck className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 bg-white rounded-lg shadow-lg">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                    activeTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Premium quality materials</li>
                    <li>Carefully crafted design</li>
                    <li>Perfect for gifts</li>
                    <li>Durable and long-lasting</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Product Details</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Category:</dt>
                      <dd className="font-medium capitalize">{product.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Rating:</dt>
                      <dd className="font-medium">{product.rating}/5</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Reviews:</dt>
                      <dd className="font-medium">{product.reviews}</dd>
                    </div>
                    {product.tags && (
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Tags:</dt>
                        <dd className="font-medium">{product.tags.join(', ')}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                
                {product.variants && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Available Options</h3>
                    <dl className="space-y-2">
                      {product.variants.size && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Sizes:</dt>
                          <dd className="font-medium">{product.variants.size.join(', ')}</dd>
                        </div>
                      )}
                      {product.variants.color && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Colors:</dt>
                          <dd className="font-medium">{product.variants.color.join(', ')}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Customer Reviews</h3>
                  <button className="btn-primary px-4 py-2">
                    Write a Review
                  </button>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-4">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex">{renderStars(5)}</div>
                        <span className="font-medium">John Doe</span>
                        <span className="text-gray-500 text-sm">2 days ago</span>
                      </div>
                      <p className="text-gray-600">
                        Great product! Exactly as described and arrived quickly.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {showZoom && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={() => setShowZoom(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <span className="sr-only">Close</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

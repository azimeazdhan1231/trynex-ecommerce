import { useState } from 'react';
import { Heart, ShoppingCart, Eye, Star, Share2 } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export default function ProductCard({ 
  product, 
  onAddToCart, 
  onQuickView, 
  onToggleWishlist, 
  isWishlisted 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          className={`${i <= rating ? 'text-[#d4af37] fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  const getInventoryBadge = () => {
    if (!product.inStock) {
      return <div className="inventory-badge out-of-stock">Out of Stock</div>;
    }
    if (product.lowStock) {
      return <div className="inventory-badge low-stock">Low Stock</div>;
    }
    return <div className="inventory-badge in-stock">In Stock</div>;
  };

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover product-zoom"
        />
        
        {/* Badges */}
        {getInventoryBadge()}
        
        {product.isOnSale && product.discount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            -{product.discount}%
          </div>
        )}
        
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            New
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-2 left-2 w-8 h-8 bg-white rounded-full flex items-center justify-center transition-all duration-300 ${
            isWishlisted ? 'wishlist-heart active' : 'wishlist-heart'
          }`}
        >
          <Heart size={16} />
        </button>

        {/* Hover Actions */}
        <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <button
              onClick={() => onAddToCart(product)}
              className="btn-primary px-4 py-2 text-sm"
              disabled={!product.inStock}
            >
              <ShoppingCart size={16} className="mr-2" />
              Add to Cart
            </button>
            <button
              onClick={() => onQuickView(product)}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              <Eye size={16} className="mr-2" />
              Quick View
            </button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Product Badges */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex space-x-2">
            {product.tags?.slice(0, 2).map(tag => (
              <span key={tag} className="badge-premium text-xs">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
          </div>
        </div>

        {/* Product Info */}
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2 text-sm">{product.description}</p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-[#d4af37]">৳{product.price}</span>
            {product.originalPrice && (
              <span className="text-gray-400 line-through">৳{product.originalPrice}</span>
            )}
          </div>
          <div className="flex space-x-2">
            <button className="social-share">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Variants */}
        {product.variants && (
          <div className="mt-3 space-y-2">
            {product.variants.color && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Colors:</span>
                <div className="flex space-x-1">
                  {product.variants.color.slice(0, 3).map(color => (
                    <div
                      key={color}
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}
            {product.variants.size && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Sizes:</span>
                <span className="text-sm">{product.variants.size.join(', ')}</span>
              </div>
            )}
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full mt-4 btn-primary"
          disabled={!product.inStock}
        >
          <ShoppingCart size={16} className="mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

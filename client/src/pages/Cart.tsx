import React from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'wouter';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import CartModal from '../components/CartModal';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } = useStore();
  const [showCheckout, setShowCheckout] = React.useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href="/products">
              <button className="btn-primary px-8 py-3">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/products">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              Shopping Cart ({getCartItemCount()} items)
            </h1>
          </div>
          
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.product.description}
                    </p>
                    
                    {/* Variants */}
                    {item.selectedVariants && (
                      <div className="flex items-center space-x-4 mt-2">
                        {item.selectedVariants.size && (
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                            Size: {item.selectedVariants.size}
                          </span>
                        )}
                        {item.selectedVariants.color && (
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                            Color: {item.selectedVariants.color}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-semibold text-lg text-primary">
                        ৳{item.product.price * item.quantity}
                      </p>
                      <p className="text-sm text-gray-500">
                        ৳{item.product.price} each
                      </p>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">৳{getCartTotal() - 80}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee:</span>
                  <span className="font-medium">৳80</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-semibold text-primary">
                      ৳{getCartTotal()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full btn-primary py-3 mb-4"
              >
                Proceed to Checkout
              </button>
              
              <Link href="/products">
                <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors">
                  Continue Shopping
                </button>
              </Link>

              {/* Security Badges */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-lock text-green-600"></i>
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <i className="fas fa-truck text-blue-600"></i>
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <CartModal onClose={() => setShowCheckout(false)} />
      )}
    </div>
  );
};

export default Cart;

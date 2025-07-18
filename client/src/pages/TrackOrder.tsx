import { useState, useEffect } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { getCart } from '../lib/cart';
import { getOrderById } from '../lib/orders';
import { CartItem, Order } from '../types';

const orderStatuses = {
  pending: { icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  processing: { icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
  shipped: { icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
  delivered: { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' },
  cancelled: { icon: CheckCircle, color: 'text-red-600', bg: 'bg-red-100' }
};

export default function TrackOrder() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const foundOrder = await getOrderById(orderId.trim());
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        setError('Order not found. Please check your order ID and try again.');
      }
    } catch (err) {
      setError('Failed to fetch order details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCartUpdate = () => {
    setCart(getCart());
  };

  const getStatusSteps = (currentStatus: Order['status']) => {
    const steps = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = steps.indexOf(currentStatus);
    
    return steps.map((step, index) => ({
      status: step,
      isActive: index <= currentIndex,
      isComplete: index < currentIndex
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Track Your Order</h1>
            <p className="text-gray-600 text-lg">Enter your order ID to track your shipment status</p>
          </div>

          {/* Order ID Input */}
          <div className="max-w-md mx-auto mb-12">
            <form onSubmit={handleTrackOrder} className="glassmorphism rounded-2xl p-6">
              <div className="mb-4">
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="TXR-20250718-001"
                  className="form-input"
                  required
                />
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search size={16} />
                    Track Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Details */}
          {order && (
            <div className="max-w-4xl mx-auto">
              {/* Order Summary */}
              <div className="glassmorphism rounded-2xl p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Order {order.id}</h2>
                    <p className="text-gray-600">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#d4af37]">৳{order.total}</p>
                    <p className="text-gray-600">{order.items.length} items</p>
                  </div>
                </div>

                {/* Status Progress */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Order Status</h3>
                  <div className="flex items-center justify-between relative">
                    <div className="order-progress absolute inset-0 flex items-center">
                      <div className="order-progress-active w-full"></div>
                    </div>
                    {getStatusSteps(order.status).map((step, index) => {
                      const StatusIcon = orderStatuses[step.status as keyof typeof orderStatuses].icon;
                      return (
                        <div
                          key={step.status}
                          className={`order-step ${step.isActive ? 'active' : ''} ${step.isComplete ? 'completed' : ''}`}
                        >
                          <StatusIcon size={20} />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">Pending</span>
                    <span className="text-sm text-gray-600">Processing</span>
                    <span className="text-sm text-gray-600">Shipped</span>
                    <span className="text-sm text-gray-600">Delivered</span>
                  </div>
                </div>

                {/* Current Status */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  {(() => {
                    const StatusIcon = orderStatuses[order.status].icon;
                    return (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${orderStatuses[order.status].bg}`}>
                        <StatusIcon className={orderStatuses[order.status].color} size={20} />
                      </div>
                    );
                  })()}
                  <div>
                    <p className="font-semibold capitalize">{order.status}</p>
                    <p className="text-sm text-gray-600">
                      {order.status === 'pending' && 'We have received your order and are processing it.'}
                      {order.status === 'processing' && 'Your order is being prepared for shipment.'}
                      {order.status === 'shipped' && 'Your order has been shipped and is on the way.'}
                      {order.status === 'delivered' && 'Your order has been delivered successfully.'}
                      {order.status === 'cancelled' && 'Your order has been cancelled.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="glassmorphism rounded-2xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                        {item.selectedVariants && (
                          <p className="text-sm text-gray-500">
                            {item.selectedVariants.color && `Color: ${item.selectedVariants.color}`}
                            {item.selectedVariants.size && ` | Size: ${item.selectedVariants.size}`}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-[#d4af37]">৳{item.product.price * item.quantity}</p>
                        <p className="text-sm text-gray-600">৳{item.product.price} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer & Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glassmorphism rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">{order.customerInfo.name}</p>
                      <p className="text-gray-600">{order.customerInfo.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#d4af37]" />
                      <span className="text-gray-600">{order.customerInfo.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-[#d4af37] mt-1" />
                      <span className="text-gray-600">{order.customerInfo.address}</span>
                    </div>
                  </div>
                </div>

                <div className="glassmorphism rounded-2xl p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>৳{order.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>৳{order.deliveryFee}</span>
                    </div>
                    {order.discount && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-৳{order.discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span>৳{order.total}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600">
                      <strong>Payment Method:</strong> {order.paymentMethod.toUpperCase()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Order Method:</strong> {order.orderMethod.charAt(0).toUpperCase() + order.orderMethod.slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Support */}
              <div className="glassmorphism rounded-2xl p-6 mt-8 text-center">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  If you have any questions about your order, feel free to contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://wa.me/01747292277"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <i className="fab fa-whatsapp"></i>
                    WhatsApp Support
                  </a>
                  <a
                    href="mailto:info@trynex.com"
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <i className="fas fa-envelope"></i>
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          )}
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

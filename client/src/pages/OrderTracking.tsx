import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

const OrderTracking: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { addNotification } = useStore();

  // Sample tracking data
  const sampleTrackingData = {
    'TXR-20250718-001': {
      id: 'TXR-20250718-001',
      status: 'shipped',
      placedDate: '2025-07-18',
      estimatedDelivery: '2025-07-20',
      items: [
        { name: 'Premium Ceramic Mug', quantity: 1, price: 550 },
        { name: 'Custom T-Shirt', quantity: 2, price: 600 }
      ],
      total: 1830,
      timeline: [
        {
          status: 'placed',
          title: 'Order Placed',
          description: 'Your order has been successfully placed',
          date: '2025-07-18 10:30 AM',
          completed: true
        },
        {
          status: 'processing',
          title: 'Order Processing',
          description: 'We are preparing your order for shipment',
          date: '2025-07-18 02:15 PM',
          completed: true
        },
        {
          status: 'shipped',
          title: 'Order Shipped',
          description: 'Your order has been shipped and is on its way',
          date: '2025-07-19 11:45 AM',
          completed: true
        },
        {
          status: 'delivered',
          title: 'Order Delivered',
          description: 'Your order has been delivered successfully',
          date: 'Expected: 2025-07-20',
          completed: false
        }
      ]
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) {
      addNotification({
        message: 'Please enter a valid order ID',
        type: 'error',
        duration: 3000,
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const result = sampleTrackingData[orderId as keyof typeof sampleTrackingData];
      if (result) {
        setTrackingResult(result);
      } else {
        addNotification({
          message: 'Order not found. Please check your order ID.',
          type: 'error',
          duration: 5000,
        });
        setTrackingResult(null);
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string, completed: boolean) => {
    if (completed) {
      return <CheckCircle className="w-8 h-8 text-green-500" />;
    }
    
    switch (status) {
      case 'placed':
        return <Package className="w-8 h-8 text-blue-500" />;
      case 'processing':
        return <Clock className="w-8 h-8 text-yellow-500" />;
      case 'shipped':
        return <Truck className="w-8 h-8 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      default:
        return <AlertCircle className="w-8 h-8 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'placed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Track Your Order
            </h1>
            <p className="text-gray-600 text-lg">
              Enter your order ID to track the status of your order
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter your order ID (e.g., TXR-20250718-001)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                      Tracking...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Track Order
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Tracking Results */}
          {trackingResult && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Order Details</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(trackingResult.status)}`}>
                    {trackingResult.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-medium">{trackingResult.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium">{trackingResult.placedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="font-medium">{trackingResult.estimatedDelivery}</p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Order Items</h3>
                  <div className="space-y-2">
                    {trackingResult.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">৳{item.price * item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-2 mt-4">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">Total</p>
                      <p className="font-semibold text-primary">৳{trackingResult.total}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Order Timeline</h2>
                
                <div className="space-y-8">
                  {trackingResult.timeline.map((step: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(step.status, step.completed)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {step.title}
                          </h3>
                          <span className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                            {step.date}
                          </span>
                        </div>
                        <p className={`text-sm ${step.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                <p className="text-blue-800 mb-4">
                  If you have any questions about your order, don't hesitate to contact our support team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/01747292277"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    WhatsApp Support
                  </a>
                  <a
                    href="mailto:info@trynex.com"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Email Support
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">How to Find Your Order ID</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-envelope text-primary text-xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Email Confirmation</h3>
                <p className="text-sm text-gray-600">
                  Check your email for the order confirmation. Your order ID is mentioned in the subject line.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fab fa-whatsapp text-primary text-xl"></i>
                </div>
                <h3 className="font-semibold mb-2">WhatsApp Message</h3>
                <p className="text-sm text-gray-600">
                  If you placed your order via WhatsApp, the order ID is in our confirmation message.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-receipt text-primary text-xl"></i>
                </div>
                <h3 className="font-semibold mb-2">Order Receipt</h3>
                <p className="text-sm text-gray-600">
                  Your order ID is printed on your receipt if you have one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

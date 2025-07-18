import React from 'react';
import { CheckCircle, Package, Truck, Copy } from 'lucide-react';
import { useStore } from '../store/useStore';

interface OrderConfirmationProps {
  orderId: string;
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ orderId, onClose }) => {
  const { addNotification } = useStore();

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    addNotification({
      message: 'Order ID copied to clipboard!',
      type: 'success',
      duration: 2000,
    });
  };

  const handleTrackOrder = () => {
    onClose();
    window.location.href = `/track-order?id=${orderId}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your order. We have received your order and will process it shortly.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">Order ID:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-lg font-bold text-primary">{orderId}</span>
              <button
                onClick={copyOrderId}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            Save this order ID for tracking your order status
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2 text-blue-700">
              <Package className="w-5 h-5" />
              <span className="font-medium">Order is being processed</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={handleTrackOrder}
            className="w-full btn-primary py-3"
          >
            <Truck className="w-5 h-5 mr-2 inline" />
            Track Your Order
          </button>
          
          <button
            onClick={onClose}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>You'll receive a confirmation message shortly</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Your order will be prepared and shipped</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>Track your order using the ID above</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

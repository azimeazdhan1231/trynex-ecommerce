import { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { CartItem, Order } from '../types';
import { removeFromCart, updateQuantity, clearCart } from '../lib/cart';
import { createOrder } from '../lib/orders';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateCart: () => void;
}

export default function CartModal({ isOpen, onClose, items, onUpdateCart }: CartModalProps) {
  const [orderMethod, setOrderMethod] = useState<'whatsapp' | 'email' | 'direct'>('direct');
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [deliveryArea, setDeliveryArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [promoCode, setPromoCode] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = deliveryArea === 'dhaka' ? 80 : 120;
  const total = subtotal + deliveryFee;

  const handleUpdateQuantity = (itemId: string, change: number) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity <= 0) {
        removeFromCart(itemId);
      } else {
        updateQuantity(itemId, newQuantity);
      }
      onUpdateCart();
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId);
    onUpdateCart();
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      (window as any).showNotification?.('Your cart is empty', 'error');
      return;
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      (window as any).showNotification?.('Please fill in all required fields', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const order = await createOrder({
        items,
        subtotal,
        deliveryFee,
        total,
        promoCode: promoCode || undefined,
        customerInfo,
        orderMethod,
        paymentMethod,
        specialInstructions: specialInstructions || undefined,
        status: 'pending'
      });

      // Clear cart after successful order
      clearCart();
      onUpdateCart();
      onClose();

      // Show order confirmation
      (window as any).showOrderConfirmation?.(order);
      
      // Handle different order methods
      if (orderMethod === 'whatsapp') {
        const message = `New Order - ${order.id}\n\nItems:\n${items.map(item => `- ${item.product.name} x${item.quantity} = ৳${item.product.price * item.quantity}`).join('\n')}\n\nTotal: ৳${total}\nPayment: ${paymentMethod}\n\nCustomer: ${customerInfo.name}\nPhone: ${customerInfo.phone}\nAddress: ${customerInfo.address}`;
        window.open(`https://wa.me/01747292277?text=${encodeURIComponent(message)}`, '_blank');
      }

      (window as any).showNotification?.('Order placed successfully!', 'success');
    } catch (error) {
      (window as any).showNotification?.('Failed to place order. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product.name}</h4>
                        <p className="text-[#d4af37] font-bold">৳{item.product.price}</p>
                        {item.selectedVariants && (
                          <div className="text-sm text-gray-500">
                            {item.selectedVariants.color && `Color: ${item.selectedVariants.color}`}
                            {item.selectedVariants.size && ` | Size: ${item.selectedVariants.size}`}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                    className="form-input"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="form-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                    className="form-input"
                    required
                  />
                  <select
                    value={deliveryArea}
                    onChange={(e) => setDeliveryArea(e.target.value as 'dhaka' | 'outside')}
                    className="form-select"
                  >
                    <option value="dhaka">Dhaka Metro (৳80)</option>
                    <option value="outside">Outside Dhaka (৳120)</option>
                  </select>
                </div>
                <textarea
                  placeholder="Complete Address *"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="form-textarea mt-4"
                  rows={3}
                  required
                />
              </div>

              {/* Order Method */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Order Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="order-method"
                      value="direct"
                      checked={orderMethod === 'direct'}
                      onChange={(e) => setOrderMethod(e.target.value as 'direct')}
                      className="form-radio"
                    />
                    <span>Direct Confirmation</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="order-method"
                      value="whatsapp"
                      checked={orderMethod === 'whatsapp'}
                      onChange={(e) => setOrderMethod(e.target.value as 'whatsapp')}
                      className="form-radio"
                    />
                    <span>WhatsApp Order (01747292277)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="order-method"
                      value="email"
                      checked={orderMethod === 'email'}
                      onChange={(e) => setOrderMethod(e.target.value as 'email')}
                      className="form-radio"
                    />
                    <span>Email Order</span>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment-method"
                      value="bkash"
                      checked={paymentMethod === 'bkash'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'bkash')}
                      className="form-radio"
                    />
                    <span>Bkash</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment-method"
                      value="nagad"
                      checked={paymentMethod === 'nagad'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'nagad')}
                      className="form-radio"
                    />
                    <span>Nagad</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="payment-method"
                      value="rocket"
                      checked={paymentMethod === 'rocket'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'rocket')}
                      className="form-radio"
                    />
                    <span>Rocket</span>
                  </label>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Promo Code (Optional)</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-code-input flex-1"
                  />
                  <button className="btn-primary px-4 py-2">Apply</button>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Special Instructions (Optional)</h3>
                <textarea
                  placeholder="Any special instructions for your order"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="form-textarea"
                  rows={3}
                />
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span>Subtotal:</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Delivery Fee:</span>
                  <span>৳{deliveryFee}</span>
                </div>
                <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>৳{total}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full btn-primary py-3 text-lg disabled:opacity-50"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

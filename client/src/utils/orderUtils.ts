import { Order, CartItem, PromoCode } from '../types';
import { WHATSAPP_NUMBER, DELIVERY_FEES, ORDER_STATUS } from './constants';

export function generateOrderId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `TXR-${year}${month}${day}-${random}`;
}

export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

export function calculateDeliveryFee(area: 'dhaka' | 'outside'): number {
  return area === 'dhaka' ? DELIVERY_FEES.DHAKA : DELIVERY_FEES.OUTSIDE_DHAKA;
}

export function calculateDiscount(subtotal: number, promoCode?: PromoCode): number {
  if (!promoCode || !promoCode.active) return 0;
  
  const now = new Date();
  if (now > promoCode.validUntil) return 0;
  
  if (promoCode.minAmount && subtotal < promoCode.minAmount) return 0;
  
  let discount = 0;
  
  if (promoCode.type === 'percentage') {
    discount = (subtotal * promoCode.discount) / 100;
    if (promoCode.maxDiscount) {
      discount = Math.min(discount, promoCode.maxDiscount);
    }
  } else if (promoCode.type === 'fixed') {
    discount = promoCode.discount;
  }
  
  return Math.min(discount, subtotal);
}

export function calculateTotal(
  items: CartItem[],
  area: 'dhaka' | 'outside',
  promoCode?: PromoCode
): {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
} {
  const subtotal = calculateSubtotal(items);
  const deliveryFee = calculateDeliveryFee(area);
  const discount = calculateDiscount(subtotal, promoCode);
  const total = subtotal + deliveryFee - discount;
  
  return {
    subtotal,
    deliveryFee,
    discount,
    total,
  };
}

export function formatOrderForWhatsApp(order: Order): string {
  const items = order.items.map(item => 
    `• ${item.product.name} x${item.quantity} - ৳${item.product.price * item.quantity}`
  ).join('\n');
  
  const message = `
🛍️ *New Order from TryneX*

📋 *Order ID:* ${order.id}
👤 *Customer:* ${order.customerInfo.name}
📧 *Email:* ${order.customerInfo.email}
📱 *Phone:* ${order.customerInfo.phone}
🏠 *Address:* ${order.customerInfo.address}

📦 *Items:*
${items}

💰 *Order Summary:*
• Subtotal: ৳${order.subtotal}
• Delivery Fee: ৳${order.deliveryFee}
${order.discount > 0 ? `• Discount: -৳${order.discount}` : ''}
• *Total: ৳${order.total}*

💳 *Payment Method:* ${order.paymentMethod.toUpperCase()}
🚚 *Delivery Area:* ${order.customerInfo.area === 'dhaka' ? 'Dhaka Metro' : 'Outside Dhaka'}

${order.specialInstructions ? `📝 *Special Instructions:* ${order.specialInstructions}` : ''}

Thank you for choosing TryneX! 🎁
  `.trim();
  
  return encodeURIComponent(message);
}

export function formatOrderForEmail(order: Order): {
  subject: string;
  body: string;
} {
  const items = order.items.map(item => 
    `${item.product.name} x${item.quantity} - ৳${item.product.price * item.quantity}`
  ).join('\n');
  
  const subject = `New Order ${order.id} - TryneX`;
  
  const body = `
Dear TryneX Team,

I would like to place the following order:

Order ID: ${order.id}
Customer: ${order.customerInfo.name}
Email: ${order.customerInfo.email}
Phone: ${order.customerInfo.phone}
Address: ${order.customerInfo.address}

Items:
${items}

Order Summary:
- Subtotal: ৳${order.subtotal}
- Delivery Fee: ৳${order.deliveryFee}
${order.discount > 0 ? `- Discount: -৳${order.discount}` : ''}
- Total: ৳${order.total}

Payment Method: ${order.paymentMethod.toUpperCase()}
Delivery Area: ${order.customerInfo.area === 'dhaka' ? 'Dhaka Metro' : 'Outside Dhaka'}

${order.specialInstructions ? `Special Instructions: ${order.specialInstructions}` : ''}

Please confirm this order and provide payment instructions.

Thank you!
  `.trim();
  
  return { subject, body };
}

export function openWhatsAppOrder(order: Order): void {
  const message = formatOrderForWhatsApp(order);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank');
}

export function openEmailOrder(order: Order): void {
  const { subject, body } = formatOrderForEmail(order);
  const url = `mailto:info@trynex.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(url, '_blank');
}

export function getOrderStatusColor(status: Order['status']): string {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case ORDER_STATUS.PROCESSING:
      return 'bg-blue-100 text-blue-800';
    case ORDER_STATUS.SHIPPED:
      return 'bg-purple-100 text-purple-800';
    case ORDER_STATUS.DELIVERED:
      return 'bg-green-100 text-green-800';
    case ORDER_STATUS.CANCELLED:
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function getOrderStatusText(status: Order['status']): string {
  switch (status) {
    case ORDER_STATUS.PENDING:
      return 'Pending';
    case ORDER_STATUS.PROCESSING:
      return 'Processing';
    case ORDER_STATUS.SHIPPED:
      return 'Shipped';
    case ORDER_STATUS.DELIVERED:
      return 'Delivered';
    case ORDER_STATUS.CANCELLED:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
}

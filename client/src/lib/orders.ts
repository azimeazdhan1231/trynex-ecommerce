import { Order, CartItem } from '../types';

const ORDERS_STORAGE_KEY = 'trynex_orders';

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const getOrderById = (id: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === id);
};

export const createOrder = (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
  const orders = getOrders();
  
  const newOrder: Order = {
    ...orderData,
    id: generateOrderId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  orders.push(newOrder);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  
  return newOrder;
};

export const updateOrderStatus = (orderId: string, status: Order['status']): void => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex >= 0) {
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }
};

export const getUserOrders = (email: string): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.customerInfo.email === email);
};

export const getOrdersByStatus = (status: Order['status']): Order[] => {
  const orders = getOrders();
  return orders.filter(order => order.status === status);
};

export const getOrdersByDateRange = (startDate: string, endDate: string): Order[] => {
  const orders = getOrders();
  return orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
  });
};

export const calculateDeliveryFee = (area: 'dhaka' | 'outside'): number => {
  return area === 'dhaka' ? 80 : 120;
};

export const generateOrderId = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `TXR-${year}${month}${day}-${random}`;
};

export const validateOrderId = (orderId: string): boolean => {
  const orderIdRegex = /^TXR-\d{8}-\d{3}$/;
  return orderIdRegex.test(orderId);
};

export const formatOrderDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getOrderTotal = (items: CartItem[], deliveryFee: number, discount: number = 0): number => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  return subtotal + deliveryFee - discount;
};

export const getOrderSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
};

// Sample orders for demonstration
export const createSampleOrders = (): void => {
  const sampleOrders: Order[] = [
    {
      id: 'TXR-20250118-001',
      items: [],
      total: 1250,
      subtotal: 1150,
      deliveryFee: 80,
      discount: 0,
      customerInfo: {
        name: 'Ahmed Hassan',
        email: 'ahmed@example.com',
        phone: '01712345678',
        address: 'Dhanmondi, Dhaka'
      },
      orderMethod: 'direct',
      paymentMethod: 'bkash',
      status: 'delivered',
      createdAt: '2025-01-18T10:30:00Z',
      updatedAt: '2025-01-20T14:15:00Z'
    },
    {
      id: 'TXR-20250118-002',
      items: [],
      total: 950,
      subtotal: 850,
      deliveryFee: 100,
      discount: 0,
      customerInfo: {
        name: 'Fatima Begum',
        email: 'fatima@example.com',
        phone: '01987654321',
        address: 'Chittagong'
      },
      orderMethod: 'whatsapp',
      paymentMethod: 'nagad',
      status: 'shipped',
      createdAt: '2025-01-18T15:45:00Z',
      updatedAt: '2025-01-19T09:20:00Z'
    }
  ];

  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(sampleOrders));
};

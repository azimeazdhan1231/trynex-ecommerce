export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  lowStock?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  discount?: number;
  variants?: {
    size?: string[];
    color?: string[];
  };
  tags?: string[];
}

export interface Category {
  id: string;
  name: string;
  namebn: string;
  description: string;
  image: string;
  startingPrice: number;
  productCount: number;
  icon?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariants?: {
    size?: string;
    color?: string;
  };
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  deliveryFee: number;
  discount?: number;
  promoCode?: string;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  orderMethod: 'whatsapp' | 'email' | 'direct';
  paymentMethod: 'bkash' | 'nagad' | 'rocket';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  specialInstructions?: string;
}

export interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit?: number;
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  tags: string[];
  slug: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  inStock: boolean;
  onSale: boolean;
  rating: number;
  sortBy: 'name' | 'price' | 'rating' | 'newest' | 'featured';
  sortOrder: 'asc' | 'desc';
}

export interface NotificationConfig {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

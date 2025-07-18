export const WHATSAPP_NUMBER = "01747292277";
export const COMPANY_EMAIL = "info@trynex.com";
export const COMPANY_NAME = "TryneX";
export const COMPANY_ADDRESS = "Dhaka, Bangladesh";

export const DELIVERY_FEES = {
  DHAKA: 80,
  OUTSIDE_DHAKA: 150,
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

export const PAYMENT_METHODS = {
  BKASH: 'bkash',
  NAGAD: 'nagad',
  ROCKET: 'rocket',
} as const;

export const ORDER_METHODS = {
  WHATSAPP: 'whatsapp',
  EMAIL: 'email',
  DIRECT: 'direct',
} as const;

export const LANGUAGES = {
  EN: { code: 'en', name: 'English' },
  BN: { code: 'bn', name: 'বাংলা' },
} as const;

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/trynex',
  INSTAGRAM: 'https://instagram.com/trynex',
  TWITTER: 'https://twitter.com/trynex',
  YOUTUBE: 'https://youtube.com/trynex',
} as const;

export const FLASH_SALE_END_TIME = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

export const PROMO_CODES = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minAmount: 500,
    maxDiscount: 100,
    validUntil: new Date('2025-12-31'),
    active: true,
  },
  {
    code: 'FLASH50',
    discount: 50,
    type: 'percentage',
    minAmount: 1000,
    maxDiscount: 500,
    validUntil: FLASH_SALE_END_TIME,
    active: true,
  },
  {
    code: 'SAVE100',
    discount: 100,
    type: 'fixed',
    minAmount: 1000,
    validUntil: new Date('2025-12-31'),
    active: true,
  },
] as const;

export const TESTIMONIALS = [
  {
    id: '1',
    name: 'Ahmed Rahman',
    location: 'Dhaka',
    rating: 5,
    comment: 'Amazing quality products! The personalized mug I ordered was exactly what I wanted. Fast delivery too!',
    date: new Date('2025-07-15'),
  },
  {
    id: '2',
    name: 'Fatima Begum',
    location: 'Chittagong',
    rating: 5,
    comment: 'Perfect gift for my husband! The personalized keychain was beautifully crafted and he loved it.',
    date: new Date('2025-07-14'),
  },
  {
    id: '3',
    name: 'Mahbub Rahman',
    location: 'Sylhet',
    rating: 4,
    comment: 'Great customer service and fast delivery. The premium gift hamper was perfect for our anniversary!',
    date: new Date('2025-07-13'),
  },
] as const;

export const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Ultimate Gift Guide for Every Occasion',
    excerpt: 'Discover the perfect gifts for birthdays, anniversaries, and special celebrations. Our comprehensive guide helps you choose meaningful presents.',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    author: 'TryneX Team',
    date: new Date('2025-07-15'),
    tags: ['gifts', 'guide', 'occasions'],
    slug: 'ultimate-gift-guide',
  },
  {
    id: '2',
    title: 'Why Personalized Gifts Make the Best Memories',
    excerpt: 'Learn about the psychology behind personalized gifts and how they create lasting emotional connections between people.',
    image: 'https://images.unsplash.com/photo-1549298916-f52d724204b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    author: 'TryneX Team',
    date: new Date('2025-07-12'),
    tags: ['personalized', 'memories', 'psychology'],
    slug: 'personalized-gifts-memories',
  },
  {
    id: '3',
    title: 'How to Care for Your Premium Products',
    excerpt: 'Essential tips for maintaining the quality and longevity of your ceramic mugs, leather accessories, and other premium items.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    author: 'TryneX Team',
    date: new Date('2025-07-10'),
    tags: ['care', 'maintenance', 'tips'],
    slug: 'care-premium-products',
  },
] as const;

export const FAQS = [
  {
    id: '1',
    question: 'What payment methods do you accept?',
    answer: 'We accept Bkash, Nagad, Rocket, and cash on delivery. All payments are secure and processed through trusted payment gateways.',
    category: 'payment',
    order: 1,
  },
  {
    id: '2',
    question: 'How long does delivery take?',
    answer: 'Delivery typically takes 2-3 business days within Dhaka metro area and 5-7 business days outside Dhaka. Express delivery options are available.',
    category: 'delivery',
    order: 2,
  },
  {
    id: '3',
    question: 'Can I customize my products?',
    answer: 'Yes! We offer customization services for mugs, keychains, t-shirts, and many other products. Contact us for custom design options.',
    category: 'customization',
    order: 3,
  },
  {
    id: '4',
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy for unused items in original packaging. Custom/personalized items are non-returnable unless defective.',
    category: 'returns',
    order: 4,
  },
  {
    id: '5',
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer special pricing for bulk orders (10+ items). Contact us directly for custom quotes and corporate gift packages.',
    category: 'pricing',
    order: 5,
  },
] as const;

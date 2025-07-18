import { Product, Category, Order, PromoCode, Testimonial, BlogPost } from "../shared/schema";
import productsData from "../client/src/data/products.json";
import categoriesData from "../client/src/data/categories.json";
import testimonialsData from "../client/src/data/testimonials.json";

export interface IStorage {
  // Products
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  
  // Orders
  createOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order>;
  getOrderById(id: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: Order['status']): Promise<Order | undefined>;
  
  // Promo Codes
  getPromoCodes(): Promise<PromoCode[]>;
  validatePromoCode(code: string): Promise<PromoCode | undefined>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  
  // Blog Posts
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
}

export class MemStorage implements IStorage {
  private products: Product[];
  private categories: Category[];
  private orders: Map<string, Order>;
  private promoCodes: PromoCode[];
  private testimonials: Testimonial[];
  private blogPosts: BlogPost[];
  private orderIdCounter: number;

  constructor() {
    this.products = productsData.products as Product[];
    this.categories = categoriesData.categories as Category[];
    this.orders = new Map();
    this.testimonials = testimonialsData.testimonials as Testimonial[];
    this.orderIdCounter = 1;
    
    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample promo codes
    this.promoCodes = [
      {
        code: "WELCOME10",
        discount: 10,
        type: "percentage",
        minAmount: 500,
        maxDiscount: 500,
        expiryDate: "2025-12-31",
        usageLimit: 100,
        isActive: true
      },
      {
        code: "FLAT50",
        discount: 50,
        type: "fixed",
        minAmount: 1000,
        expiryDate: "2025-06-30",
        usageLimit: 50,
        isActive: true
      },
      {
        code: "FLASH25",
        discount: 25,
        type: "percentage",
        minAmount: 800,
        maxDiscount: 1000,
        expiryDate: "2025-02-28",
        usageLimit: 200,
        isActive: true
      }
    ];

    // Sample blog posts
    this.blogPosts = [
      {
        id: "1",
        title: "The Ultimate Gift Guide for Every Occasion",
        excerpt: "Discover the perfect gifts for birthdays, anniversaries, and special celebrations.",
        content: "Full content would go here...",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "TryneX Team",
        date: "2025-01-15",
        tags: ["Gift Guide", "Special Occasions", "Shopping Tips"],
        slug: "ultimate-gift-guide-every-occasion"
      },
      {
        id: "2",
        title: "Why Personalized Gifts Make the Best Memories",
        excerpt: "Learn about the psychology behind personalized gifts and how they create lasting emotional connections.",
        content: "Full content would go here...",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Sarah Ahmed",
        date: "2025-01-12",
        tags: ["Personalization", "Psychology", "Emotions"],
        slug: "personalized-gifts-best-memories"
      },
      {
        id: "3",
        title: "How to Care for Your Premium Products",
        excerpt: "Essential tips for maintaining the quality and longevity of your premium items.",
        content: "Full content would go here...",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        author: "Mehdi Hassan",
        date: "2025-01-10",
        tags: ["Care Tips", "Maintenance", "Quality"],
        slug: "care-for-premium-products"
      }
    ];

    // Sample orders
    const sampleOrder: Order = {
      id: this.generateOrderId(),
      items: [],
      total: 1250,
      subtotal: 1150,
      deliveryFee: 80,
      discount: 0,
      customerInfo: {
        name: "Ahmed Hassan",
        email: "ahmed@example.com",
        phone: "01712345678",
        address: "Dhanmondi, Dhaka"
      },
      orderMethod: "direct",
      paymentMethod: "bkash",
      status: "delivered",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.orders.set(sampleOrder.id, sampleOrder);
  }

  private generateOrderId(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const counter = String(this.orderIdCounter++).padStart(3, '0');
    
    return `TXR-${year}${month}${day}-${counter}`;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.find(product => product.id === id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter(product => product.category === category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.find(category => category.id === id);
  }

  // Orders
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const order: Order = {
      ...orderData,
      id: this.generateOrderId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    this.orders.set(order.id, order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      this.orders.set(id, order);
      return order;
    }
    return undefined;
  }

  // Promo Codes
  async getPromoCodes(): Promise<PromoCode[]> {
    return this.promoCodes.filter(code => code.isActive);
  }

  async validatePromoCode(code: string): Promise<PromoCode | undefined> {
    const promoCode = this.promoCodes.find(promo => 
      promo.code === code && 
      promo.isActive && 
      new Date(promo.expiryDate) > new Date()
    );
    
    return promoCode;
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return this.testimonials;
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find(post => post.slug === slug);
  }
}

import { SupabaseStorage } from './supabase';

// Use Supabase in production, MemStorage for development
export const storage = process.env.NODE_ENV === 'production' 
  ? new SupabaseStorage() as unknown as IStorage
  : new MemStorage();

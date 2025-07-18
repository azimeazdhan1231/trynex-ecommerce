import { createClient } from '@supabase/supabase-js';
import { Product, Category, Order, PromoCode, Testimonial, BlogPost } from '../shared/schema';

const supabaseUrl = process.env.SUPABASE_URL || 'https://wifsqonbnfmwtqvupqbk.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZnNxb25ibmZtd3RxdnVwcWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1ODAyNjMsImV4cCI6MjA2NzE1NjI2M30.A7o3vhEaNZb9lmViHA_KQrwzKJTBWpsD6KbHqkkput0';

export const supabase = createClient(supabaseUrl, supabaseKey);

export class SupabaseStorage {
  private orderIdCounter: number = 1;

  constructor() {
    this.initializeDatabase();
  }

  private async initializeDatabase() {
    // Create tables if they don't exist
    try {
      // This is a simple check to see if tables exist
      const { data: products } = await supabase.from('products').select('id').limit(1);
      console.log('Supabase connected successfully');
    } catch (error) {
      console.log('Supabase tables may need to be created via dashboard');
    }
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
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data || undefined;
    } catch (error) {
      console.error('Error fetching product:', error);
      return undefined;
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .order('id');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching products by category:', error);
      return [];
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)
        .order('id');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching products:', error);
      return [];
    }
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data || undefined;
    } catch (error) {
      console.error('Error fetching category:', error);
      return undefined;
    }
  }

  // Orders
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    try {
      const order: Order = {
        ...orderData,
        id: this.generateOrderId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([order])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data || undefined;
    } catch (error) {
      console.error('Error fetching order:', error);
      return undefined;
    }
  }

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order | undefined> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status, 
          updatedAt: new Date().toISOString() 
        })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data || undefined;
    } catch (error) {
      console.error('Error updating order status:', error);
      return undefined;
    }
  }

  // Promo Codes
  async getPromoCodes(): Promise<PromoCode[]> {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('isActive', true)
        .order('code');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching promo codes:', error);
      return [];
    }
  }

  async validatePromoCode(code: string): Promise<PromoCode | undefined> {
    try {
      const { data, error } = await supabase
        .from('promo_codes')
        .select('*')
        .eq('code', code)
        .eq('isActive', true)
        .gt('expiryDate', new Date().toISOString())
        .single();
      
      if (error) throw error;
      return data || undefined;
    } catch (error) {
      console.error('Error validating promo code:', error);
      return undefined;
    }
  }

  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('id');
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  }

  // Blog Posts
  async getBlogPosts(): Promise<BlogPost[]> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (error) throw error;
      return data || undefined;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return undefined;
    }
  }
}
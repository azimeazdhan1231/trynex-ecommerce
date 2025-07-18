-- TryneX Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor to create all necessary tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  icon TEXT,
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  discount_percentage INTEGER DEFAULT 0,
  category TEXT NOT NULL REFERENCES categories(id),
  stock INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  images TEXT[] DEFAULT '{}',
  variants JSONB DEFAULT '[]',
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT FALSE,
  is_flash_sale BOOLEAN DEFAULT FALSE,
  flash_sale_ends_at TIMESTAMPTZ,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  weight DECIMAL(5,2),
  dimensions TEXT,
  material TEXT,
  color_options TEXT[] DEFAULT '{}',
  size_options TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]',
  total DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  customer_info JSONB NOT NULL,
  order_method TEXT NOT NULL CHECK (order_method IN ('direct', 'whatsapp')),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('cod', 'bkash', 'nagad', 'rocket')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  promo_code_used TEXT,
  notes TEXT,
  tracking_number TEXT,
  estimated_delivery DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Promo codes table
CREATE TABLE IF NOT EXISTS promo_codes (
  id SERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount DECIMAL(10,2) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percentage', 'fixed')),
  min_amount DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2),
  expiry_date DATE NOT NULL,
  usage_limit INTEGER,
  times_used INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  image TEXT,
  product_purchased TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT,
  author TEXT NOT NULL,
  date DATE NOT NULL,
  tags TEXT[] DEFAULT '{}',
  slug TEXT UNIQUE NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  view_count INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscriptions table
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_flash_sale ON products(is_flash_sale);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date);

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create update triggers
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_promo_codes_updated_at BEFORE UPDATE ON promo_codes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Insert sample data
INSERT INTO categories (id, name, description, image, icon, product_count) VALUES
('personalized-gifts', 'Personalized Gifts', 'Custom items made just for you', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '🎁', 15),
('premium-accessories', 'Premium Accessories', 'High-quality accessories for every occasion', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '💎', 12),
('home-decor', 'Home & Decor', 'Beautiful pieces to decorate your space', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '🏠', 8),
('fashion-jewelry', 'Fashion & Jewelry', 'Trendy fashion items and elegant jewelry', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600', '💍', 10);

-- Insert sample promo codes
INSERT INTO promo_codes (code, discount, type, min_amount, max_discount, expiry_date, usage_limit, is_active) VALUES
('WELCOME10', 10, 'percentage', 500, 500, '2025-12-31', 100, true),
('FLAT50', 50, 'fixed', 1000, NULL, '2025-06-30', 50, true),
('FLASH25', 25, 'percentage', 800, 1000, '2025-02-28', 200, true);

-- Insert sample testimonials
INSERT INTO testimonials (name, location, rating, comment, image, product_purchased, is_featured, is_verified) VALUES
('সারা আহমেদ', 'ঢাকা, বাংলাদেশ', 5, 'অসাধারণ কোয়ালিটি! পারফেক্ট গিফট ছিল আমার বন্ধুর জন্য।', 'https://images.unsplash.com/photo-1494790108755-2616b612c02f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200', 'Custom Photo Frame', true, true),
('মেহেদী হাসান', 'চট্টগ্রাম, বাংলাদেশ', 5, 'দ্রুত ডেলিভারি এবং চমৎকার প্যাকেজিং। খুবই সন্তুষ্ট!', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200', 'Premium Watch', true, true),
('রিয়া খান', 'সিলেট, বাংলাদেশ', 4, 'ভালো পণ্য, তবে আরো বিকল্প থাকলে ভালো হতো।', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200', 'Handmade Jewelry', false, true);

-- Insert sample blog posts
INSERT INTO blog_posts (id, title, excerpt, content, image, author, date, tags, slug, is_published) VALUES
('1', 'The Ultimate Gift Guide for Every Occasion', 'Discover the perfect gifts for birthdays, anniversaries, and special celebrations.', 'Finding the perfect gift can be challenging, but with our comprehensive guide, you''ll never be stuck for ideas again...', 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'TryneX Team', '2025-01-15', '{Gift Guide,Special Occasions,Shopping Tips}', 'ultimate-gift-guide-every-occasion', true),
('2', 'Why Personalized Gifts Make the Best Memories', 'Learn about the psychology behind personalized gifts and how they create lasting emotional connections.', 'Personalized gifts have a unique power to create emotional connections and lasting memories...', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'Sarah Ahmed', '2025-01-12', '{Personalization,Psychology,Emotions}', 'personalized-gifts-best-memories', true),
('3', 'How to Care for Your Premium Products', 'Essential tips for maintaining the quality and longevity of your premium items.', 'Taking proper care of your premium products ensures they last longer and maintain their quality...', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400', 'Mehdi Hassan', '2025-01-10', '{Care Tips,Maintenance,Quality}', 'care-for-premium-products', true);

-- Enable Row Level Security (RLS) for sensitive tables
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access on products, categories, etc.
CREATE POLICY "Enable read access for all users" ON categories FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Enable read access for all users" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Enable read access for all users" ON promo_codes FOR SELECT USING (is_active = true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT INSERT ON orders, contact_messages, newsletter_subscriptions TO anon, authenticated;
GRANT UPDATE ON orders TO anon, authenticated;
import { useState, useEffect } from 'react';
import { Calendar, User, Tag, Clock } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { getCart } from '../lib/cart';
import { CartItem, BlogPost } from '../types';

// Sample blog posts
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Ultimate Gift Guide for Every Occasion',
    excerpt: 'Discover the perfect gifts for birthdays, anniversaries, and special celebrations. Our comprehensive guide helps you choose meaningful presents.',
    content: '',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    author: 'TryneX Team',
    date: '2025-01-15',
    tags: ['Gift Guide', 'Special Occasions', 'Shopping Tips'],
    slug: 'ultimate-gift-guide-every-occasion'
  },
  {
    id: '2',
    title: 'Why Personalized Gifts Make the Best Memories',
    excerpt: 'Learn about the psychology behind personalized gifts and how they create lasting emotional connections between people.',
    content: '',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    author: 'Sarah Ahmed',
    date: '2025-01-12',
    tags: ['Personalization', 'Psychology', 'Emotions'],
    slug: 'personalized-gifts-best-memories'
  },
  {
    id: '3',
    title: 'How to Care for Your Premium Products',
    excerpt: 'Essential tips for maintaining the quality and longevity of your ceramic mugs, leather accessories, and other premium items.',
    content: '',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    author: 'Mehdi Hassan',
    date: '2025-01-10',
    tags: ['Care Tips', 'Maintenance', 'Quality'],
    slug: 'care-for-premium-products'
  },
  {
    id: '4',
    title: 'Bengali Traditional Gifts: Preserving Our Heritage',
    excerpt: 'Explore the rich tradition of Bengali gift-giving and how modern interpretations keep our cultural heritage alive.',
    content: '',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    author: 'Fatima Khatun',
    date: '2025-01-08',
    tags: ['Bengali Culture', 'Heritage', 'Tradition'],
    slug: 'bengali-traditional-gifts-heritage'
  },
  {
    id: '5',
    title: 'Sustainable Gifting: Eco-Friendly Options',
    excerpt: 'Discover how to make environmentally conscious choices when selecting gifts without compromising on quality or style.',
    content: '',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    author: 'Arif Rahman',
    date: '2025-01-05',
    tags: ['Sustainability', 'Eco-Friendly', 'Environment'],
    slug: 'sustainable-gifting-eco-friendly-options'
  },
  {
    id: '6',
    title: 'Corporate Gifting: Making the Right Impression',
    excerpt: 'Learn how to select appropriate corporate gifts that strengthen business relationships and leave lasting impressions.',
    content: '',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    author: 'Rashid Ahmed',
    date: '2025-01-03',
    tags: ['Corporate', 'Business', 'Professional'],
    slug: 'corporate-gifting-right-impression'
  }
];

export default function Blog() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  useEffect(() => {
    setCart(getCart());
  }, []);

  useEffect(() => {
    if (selectedTag) {
      setFilteredPosts(blogPosts.filter(post => post.tags.includes(selectedTag)));
    } else {
      setFilteredPosts(blogPosts);
    }
  }, [selectedTag]);

  const handleCartUpdate = () => {
    setCart(getCart());
  };

  const getAllTags = () => {
    const tags = new Set<string>();
    blogPosts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header 
        cartCount={cart.length}
        onCartClick={() => setIsCartOpen(true)}
      />

      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Blog</h1>
            <p className="text-gray-600 text-lg">Insights, tips, and stories from the world of premium gifts</p>
          </div>

          {/* Tags Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Filter by Tags</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? 'bg-[#d4af37] text-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Posts
              </button>
              {getAllTags().map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? 'bg-[#d4af37] text-black'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="badge-premium">Blog</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span className="mr-4">{formatDate(post.date)}</span>
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-[#d4af37] transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        <Tag size={10} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <button className="text-[#d4af37] font-semibold hover:text-[#b8941f] transition-colors">
                      Read More →
                    </button>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Clock size={14} className="mr-1" />
                      <span>5 min read</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Signup */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest blog posts and exclusive offers</p>
              <div className="max-w-md mx-auto flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
                />
                <button className="btn-primary px-6 py-3">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Cart Modal */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateCart={handleCartUpdate}
      />
    </div>
  );
}

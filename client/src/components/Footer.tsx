import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'wouter';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-[#d4af37] to-[#f4e88a] rounded-full flex items-center justify-center">
                <span className="text-black font-bold">TX</span>
              </div>
              <h1 className="text-xl font-bold text-gradient">TryneX</h1>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for premium gifts and personalized products. Quality you can trust, service you can depend on.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#d4af37] transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Products</Link></li>
              <li><Link href="/categories" className="text-gray-400 hover:text-white transition-colors">Categories</Link></li>
              <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/track-order" className="text-gray-400 hover:text-white transition-colors">Track Order</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-[#d4af37]" />
                <span className="text-gray-400">01747292277</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-[#d4af37]" />
                <span className="text-gray-400">info@trynex.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-[#d4af37]" />
                <span className="text-gray-400">Dhaka, Bangladesh</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-md font-semibold mb-2">Newsletter</h4>
              <p className="text-gray-400 text-sm mb-3">Subscribe to get updates on new products and offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] text-white"
                />
                <button
                  type="submit"
                  className="bg-[#d4af37] text-black px-4 py-2 rounded-r-lg hover:bg-[#b8941f] transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 TryneX. All rights reserved. | 
            <a href="#" className="hover:text-white"> Privacy Policy</a> | 
            <a href="#" className="hover:text-white"> Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

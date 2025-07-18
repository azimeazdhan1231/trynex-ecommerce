import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'wouter';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'EN' ? 'বাং' : 'EN');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const getBreadcrumb = () => {
    const pathMap: { [key: string]: string } = {
      '/': 'Home',
      '/products': 'Products',
      '/categories': 'Categories',
      '/blog': 'Blog',
      '/contact': 'Contact',
      '/track-order': 'Track Order'
    };

    return pathMap[location] || 'Home';
  };

  return (
    <>
      {/* Fixed Header */}
      <header className={`fixed-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#d4af37] to-[#f4e88a] rounded-full flex items-center justify-center">
                <span className="text-black font-bold">TX</span>
              </div>
              <h1 className="text-xl font-bold text-gradient">TryneX</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-[#d4af37] transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-[#d4af37] transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-gray-700 hover:text-[#d4af37] transition-colors">
                Categories
              </Link>
              <Link href="/blog" className="text-gray-700 hover:text-[#d4af37] transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-[#d4af37] transition-colors">
                Contact
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-transparent"
                />
                <Search className="absolute right-3 top-3 text-gray-400" size={16} />
              </div>

              {/* Visitor Counter */}
              <div className="visitor-counter hidden md:block">
                <span>1,247 online</span>
              </div>

              {/* Language Toggle */}
              <div className="language-toggle hidden md:flex">
                <button
                  onClick={toggleLanguage}
                  className={`${currentLanguage === 'EN' ? 'active' : ''}`}
                >
                  {currentLanguage}
                </button>
              </div>

              {/* Cart */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-gray-700 hover:text-[#d4af37] transition-colors"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#d4af37] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-gray-700 hover:text-[#d4af37] transition-colors"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link href="/" className="text-gray-600 hover:text-[#d4af37]">
              Home
            </Link>
            {location !== '/' && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <span className="current">{getBreadcrumb()}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-md z-50 md:hidden ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#d4af37] to-[#f4e88a] rounded-full flex items-center justify-center">
                <span className="text-black font-bold">TX</span>
              </div>
              <h1 className="text-xl font-bold text-gradient">TryneX</h1>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-4">
            <Link href="/" className="block py-2 text-gray-700 hover:text-[#d4af37] transition-colors">
              Home
            </Link>
            <Link href="/products" className="block py-2 text-gray-700 hover:text-[#d4af37] transition-colors">
              Products
            </Link>
            <Link href="/categories" className="block py-2 text-gray-700 hover:text-[#d4af37] transition-colors">
              Categories
            </Link>
            <Link href="/blog" className="block py-2 text-gray-700 hover:text-[#d4af37] transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-[#d4af37] transition-colors">
              Contact
            </Link>
            <Link href="/track-order" className="block py-2 text-gray-700 hover:text-[#d4af37] transition-colors">
              Track Order
            </Link>
            <div className="pt-4">
              <div className="language-toggle">
                <button onClick={toggleLanguage} className={currentLanguage === 'EN' ? 'active' : ''}>
                  {currentLanguage}
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

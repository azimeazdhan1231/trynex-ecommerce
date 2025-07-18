# TryneX E-commerce Platform

## Overview

TryneX is a premium e-commerce platform specializing in lifestyle products and gifts in the Bangladesh market. The platform features a modern, golden-themed design with a focus on user experience and content management capabilities. It's built as a static website with headless CMS integration for easy product and content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Technology Stack**: Vanilla HTML5, CSS3, and JavaScript
- **Design Philosophy**: Ultra-modern, premium aesthetic with golden (#d4af37), white, and black color scheme
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Animation Framework**: Custom CSS animations with 3D transitions and hover effects
- **Font System**: Google Fonts (Inter) for modern typography

### Content Management System
- **CMS**: Netlify CMS for headless content management
- **Authentication**: Netlify Identity for admin access
- **Content Types**: Products, categories, and site content management
- **Data Storage**: JSON files for product catalog and categories

### Data Architecture
- **Product Data**: Static JSON files (`products.json`, `categories.json`)
- **Multilingual Support**: Bengali and English product names and descriptions
- **Category System**: Hierarchical product categorization with icons and sorting

## Key Components

### Product Management
- **Product Catalog**: Comprehensive product information including pricing, descriptions, images
- **Category System**: 10+ product categories including mugs, t-shirts, keychains, water bottles, and gift collections
- **Inventory Management**: Stock status tracking and featured product highlighting
- **Pricing**: Bangladesh Taka (৳) currency with competitive pricing structure

### E-commerce Features
- **Shopping Cart**: Client-side cart management with localStorage persistence
- **Product Search**: Live search functionality across product names and categories
- **Product Filtering**: Category-based filtering system
- **WhatsApp Integration**: Direct ordering through WhatsApp with order details

### User Interface Components
- **Navigation**: Fixed header with responsive hamburger menu
- **Hero Section**: Sliding banner for featured products and promotions
- **Product Grid**: Responsive product display with lazy loading
- **Modal System**: Cart overlay and product detail modals
- **Form Handling**: Newsletter signup and contact forms

### Payment Integration
- **Advance Payment System**: 100 BDT advance payment via Bkash/Nagad
- **Payment Validation**: Transaction ID verification system
- **Order Processing**: WhatsApp-based order confirmation workflow

## Data Flow

### Product Display Flow
1. Static JSON data loads on page initialization
2. Products render in responsive grid layout
3. Category filtering applies real-time updates
4. Search functionality filters results dynamically

### Shopping Cart Flow
1. Products added to cart via JavaScript event handlers
2. Cart data persists in browser localStorage
3. Cart count updates in real-time in header
4. Cart modal displays itemized order summary

### Order Processing Flow
1. Customer adds products to cart
2. Cart review in modal interface
3. Advance payment (100 BDT) via mobile banking
4. Transaction ID submission and validation
5. WhatsApp order confirmation with full details

## External Dependencies

### Content Delivery Networks
- **Font Awesome**: Icon library for UI elements
- **Google Fonts**: Inter font family for typography
- **Netlify Identity**: Authentication for admin panel
- **Netlify CMS**: Content management interface

### Third-party Services
- **WhatsApp Business API**: Direct customer communication and ordering
- **Bkash/Nagad**: Mobile banking payment gateways
- **Pixabay**: Placeholder images for product catalog

### Development Tools
- **Netlify**: Static site hosting and deployment
- **Git**: Version control and deployment pipeline

## Deployment Strategy

### Static Site Deployment
- **Platform**: Netlify for automatic deployment
- **Build Process**: Static file serving with CDN distribution
- **Domain**: Custom domain configuration support
- **SSL**: Automatic HTTPS certificate management

### Content Management
- **Admin Access**: `/admin` route with Netlify Identity authentication
- **Content Updates**: Real-time content publishing through Netlify CMS
- **Asset Management**: Integrated media library for product images

### Performance Optimization
- **Image Optimization**: Lazy loading implementation for product images
- **Code Minification**: CSS and JavaScript optimization for faster load times
- **Caching Strategy**: Browser caching for static assets
- **Mobile Performance**: Touch-optimized interactions and responsive design

### Environment Configuration
- **Contact Information**: WhatsApp number configuration (01747292277)
- **Payment Gateway**: Bkash/Nagad integration parameters
- **CMS Configuration**: Netlify CMS backend settings in `/admin/config.yml`

### Scalability Considerations
- **Database Migration Path**: Current JSON structure can be migrated to relational database
- **API Integration**: Modular architecture allows for future REST API integration
- **Multi-language Support**: Foundation for expanding beyond Bengali/English

## Recent Changes: Latest modifications with dates

### July 17, 2025 - Major Website Improvements and Bug Fixes
- **Mobile Navigation Fixed**: Completely overhauled hamburger menu functionality with proper CSS transitions and JavaScript event handlers
- **Enhanced Responsive Design**: Added comprehensive media queries for tablets (768px) and mobile (480px) breakpoints
- **Expanded Product Catalog**: Added 12 new products (IDs 19-30) across all categories with proper Bengali translations
- **Advanced Products Page**: Enhanced filtering system with price ranges, category filters, and sorting options
- **Improved Search**: Added real-time search with suggestions and category-based filtering
- **Better Mobile Experience**: Fixed product card layouts, button sizing, and navigation flow on small screens
- **Server Configuration**: Added proper Node.js server setup with static file serving for development and deployment
- **Mobile Menu Auto-Open Fix**: Fixed hamburger menu appearing open by default on mobile screens
- **Enhanced Responsive Breakpoints**: Improved CSS for better mobile and tablet compatibility
- **Advanced Product Filtering**: Added comprehensive search and filtering capabilities with price ranges and category sorting

### Key Improvements Made
1. **Responsive Navigation**: Fixed hamburger menu auto-opening issue on mobile devices with proper CSS max-height transitions
2. **Product Enhancement**: Expanded from 18 to 30 products with diverse categories including gaming accessories, jewelry, educational toys
3. **Advanced Filtering**: Added price range filters, category sorting, search suggestions, and real-time filtering
4. **Mobile Optimization**: Improved breakpoints for better mobile and tablet experience with proper button and layout sizing
5. **Performance**: Optimized image loading and responsive grid layout with lazy loading
6. **Enhanced UX**: Added comprehensive search suggestions, product count display, and smooth transitionsts
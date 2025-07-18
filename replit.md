# TryneX E-commerce Platform

## Overview

TryneX is a premium e-commerce platform built for selling personalized gifts and premium products in the Bangladesh market. The application features a modern React frontend with a Node.js/Express backend, designed to provide a seamless shopping experience with Bengali/English localization support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with clear separation between frontend and backend concerns:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom design system using golden (#d4af37) color scheme
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: Zustand with persistence for cart, wishlist, and user preferences
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **Development**: Hot module replacement via Vite integration

## Key Components

### Frontend Components
- **Product Catalog**: Dynamic product grid with category filtering, search, and sorting
- **Shopping Cart**: Multi-step cart system with quantity controls and variant selection
- **Order Management**: Order tracking system with unique ID generation (TXR-YYYYMMDD-XXX format)
- **Wishlist System**: Heart icon toggles for saving items
- **Language Toggle**: Bengali/English language switching
- **Responsive Design**: Mobile-first approach with fixed header navigation

### Backend Services
- **Product API**: CRUD operations for products with category and search endpoints
- **Order Management**: Order creation, status updates, and tracking
- **Storage Layer**: In-memory storage with JSON data files (products, categories, testimonials)

### Business Features
- **Payment Integration**: Support for Bkash, Nagad, and Rocket payment methods
- **Delivery Calculation**: Dynamic delivery fees (80৳ Dhaka, 120-150৳ outside Dhaka)
- **Promo Code System**: Percentage and fixed discount codes with validation
- **WhatsApp Integration**: Direct ordering via WhatsApp (01747292277)
- **Inventory Management**: Stock status indicators and low stock warnings

## Data Flow

1. **Product Browsing**: Frontend fetches products from `/api/products` with filtering options
2. **Cart Management**: Client-side cart stored in localStorage with Zustand persistence
3. **Order Processing**: Cart data sent to backend for order creation with unique ID generation
4. **Order Tracking**: Customers can track orders using the generated order ID
5. **Analytics**: Google Analytics integration for user behavior tracking

## External Dependencies

### Frontend Dependencies
- **UI/UX**: Radix UI primitives, Lucide React icons, Tailwind CSS
- **State & Data**: Zustand, TanStack Query, React Hook Form with Zod validation
- **Utilities**: Date-fns for date formatting, clsx for conditional styling

### Backend Dependencies
- **Database**: Drizzle ORM configured for PostgreSQL (schema defined but using JSON storage currently)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution, esbuild for production builds

### Analytics & Tracking
- **Google Analytics**: Configured with measurement ID G-22BF5BGNSX
- **Environment Variables**: Vite environment configuration for API URLs and analytics

## Deployment Strategy

### Frontend Deployment (Netlify)
- **Build Process**: Vite build targeting client directory
- **Environment**: Production builds served from dist/public
- **Redirects**: SPA routing handled via Netlify redirects
- **Base Directory**: /client for Netlify build configuration

### Backend Deployment (Render/Production)
- **Build Command**: esbuild compilation to dist/index.js
- **Environment**: NODE_ENV=production with PostgreSQL database
- **Database**: Drizzle ORM ready for PostgreSQL migration from JSON storage
- **Static Assets**: Vite serves frontend in development, separate static hosting in production

### Configuration Management
- **Development**: Local JSON files for data storage
- **Production**: PostgreSQL database with Drizzle ORM migrations
- **Environment Variables**: Database URL, analytics keys, and API endpoints
- **Asset Management**: Static assets served separately from backend API

The architecture supports easy migration from development JSON storage to production PostgreSQL database through the existing Drizzle ORM schema definitions.

## Recent Changes and Fixes

✓ Fixed missing analytics library files (analytics.ts and use-analytics.tsx)
✓ Resolved build errors preventing deployment
✓ Confirmed successful production build process
✓ Project structure properly organized for deployment
✓ All dependencies correctly installed and configured

## Deployment Status

The project is now ready for deployment with:
- Frontend build successfully generating to dist/public
- Backend build creating production server in dist/index.js
- All analytics and tracking properly configured
- Netlify configuration ready in netlify.toml
- Environment variables configured for production
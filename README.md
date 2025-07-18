# 🛍️ TryneX E-commerce Platform

> Premium e-commerce platform for selling personalized gifts and premium products in Bangladesh

## 🌟 Features

### 🎁 **Core E-commerce Features**
- **Product Catalog**: Dynamic product grid with category filtering, search, and sorting
- **Shopping Cart**: Multi-step cart system with quantity controls and variant selection
- **Order Management**: Order tracking system with unique ID generation (TXR-YYYYMMDD-XXX format)
- **Wishlist System**: Heart icon toggles for saving items
- **Payment Integration**: Support for Bkash, Nagad, Rocket, and Cash on Delivery
- **Promo Code System**: Percentage and fixed discount codes with validation

### 🌍 **Localization & UX**
- **Bilingual Support**: Bengali/English language switching
- **Mobile Responsive**: Optimized for mobile devices
- **WhatsApp Integration**: Direct ordering via WhatsApp (01747292277)
- **Real-time Analytics**: Google Analytics integration (G-22BF5BGNSX)

### 💰 **Business Logic**
- **Dynamic Pricing**: Automatic delivery fee calculation (80৳ Dhaka, 120-150৳ outside Dhaka)
- **Inventory Management**: Stock status indicators and low stock warnings
- **Customer Reviews**: Testimonial system with ratings
- **Blog System**: Content management for SEO and customer engagement

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for production database)

### Development Setup

1. **Clone and Install**
```bash
git clone <your-repo-url>
cd trynex-ecommerce
npm install
```

2. **Environment Variables**
Create `.env` file in root:
```env
NODE_ENV=development
VITE_GA_MEASUREMENT_ID=G-22BF5BGNSX
VITE_API_URL=http://localhost:5000
SUPABASE_URL=https://wifsqonbnfmwtqvupqbk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZnNxb25ibmZtd3RxdnVwcWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1ODAyNjMsImV4cCI6MjA2NzE1NjI2M30.A7o3vhEaNZb9lmViHA_KQrwzKJTBWpsD6KbHqkkput0
```

3. **Run Development Server**
```bash
npm run dev
```

Visit `http://localhost:5000` to see your application running.

## 🏗️ Architecture

### **Frontend** (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom golden color scheme (#d4af37)
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **State Management**: Zustand with persistence for cart and wishlist
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query for server state management

### **Backend** (Node.js + Express)
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured error handling
- **Database**: Supabase (PostgreSQL) with Drizzle ORM

### **Database** (Supabase PostgreSQL)
- **Products & Categories**: Complete e-commerce data structure
- **Orders & Customers**: Order management with customer information
- **Content Management**: Blog posts, testimonials, promo codes
- **Analytics**: Built-in tracking and real-time capabilities

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and API clients
│   │   ├── hooks/         # Custom React hooks
│   │   ├── store/         # Zustand state management
│   │   └── data/          # Static data files (development)
│   └── index.html         # Main HTML template
├── server/                # Backend Express application
│   ├── index.ts          # Main server file
│   ├── routes.ts         # API route definitions
│   ├── storage.ts        # Storage interface
│   ├── supabase.ts       # Supabase integration
│   └── vite.ts           # Vite development server
├── shared/               # Shared TypeScript types
│   └── schema.ts         # Database schema and types
├── supabase-schema.sql   # Database setup script
├── netlify.toml          # Netlify deployment config
└── DEPLOYMENT_GUIDE.md   # Complete deployment instructions
```

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Database operations
npm run db:push
```

## 🚀 Deployment

### Quick Deployment Summary

1. **Frontend (Netlify)**
   - Build command: `npm run build`
   - Publish directory: `dist/public`

2. **Backend (Render)**
   - Build command: `npm install && npm run build`
   - Start command: `npm start`

3. **Database (Supabase)**
   - Run `supabase-schema.sql` in SQL Editor
   - Configure Row Level Security

**📋 For complete deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

## 🔧 Configuration

### Environment Variables

#### Development
```env
NODE_ENV=development
VITE_GA_MEASUREMENT_ID=G-22BF5BGNSX
VITE_API_URL=http://localhost:5000
```

#### Production (Netlify Frontend)
```env
NODE_ENV=production
VITE_GA_MEASUREMENT_ID=G-22BF5BGNSX
VITE_API_URL=https://your-backend-url.onrender.com
```

#### Production (Render Backend)
```env
NODE_ENV=production
PORT=10000
SUPABASE_URL=https://wifsqonbnfmwtqvupqbk.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZnNxb25ibmZtd3RxdnVwcWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1ODAyNjMsImV4cCI6MjA2NzE1NjI2M30.A7o3vhEaNZb9lmViHA_KQrwzKJTBWpsD6KbHqkkput0
SERVICE_ROLE=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpZnNxb25ibmZtd3RxdnVwcWJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MTU4MDI2MywiZXhwIjoyMDY3MTU2MjYzfQ.YUykSOXBGnB3WwuoNm7DQydaEOhFJ7ux2G8jPlJCHjc
```

## 🎨 Customization

### Branding
- **Primary Color**: Golden (#d4af37)
- **Logo**: Replace in `client/public/` directory
- **Favicon**: Update `client/index.html`

### Content
- **Products**: Manage via Supabase dashboard or JSON files
- **Categories**: Update through admin interface
- **Blog Posts**: Content management through database

### Payment Methods
Currently supports:
- Cash on Delivery (COD)
- bKash
- Nagad
- Rocket

## 📊 Analytics & Tracking

- **Google Analytics**: Configured with ID `G-22BF5BGNSX`
- **Page Views**: Automatic tracking on route changes
- **E-commerce Events**: Cart actions, purchases, and conversions
- **Performance**: Core Web Vitals monitoring

## 🛡️ Security Features

- **Row Level Security**: Supabase RLS for data protection
- **Input Validation**: Zod schema validation
- **CORS Protection**: Configured for production domains
- **SQL Injection Prevention**: Parameterized queries via Supabase
- **Content Security Policy**: Configured in Netlify headers

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- **WhatsApp**: 01747292277
- **Email**: support@trynex.com
- **Website**: https://trynex.netlify.app

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **UI Framework**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [Supabase](https://supabase.com/)
- **Hosting**: [Netlify](https://netlify.com/) & [Render](https://render.com/)
- **Analytics**: [Google Analytics](https://analytics.google.com/)

---

**Built with ❤️ for the Bangladesh e-commerce market**#   t r y n e x - e c o m m e r c e  
 
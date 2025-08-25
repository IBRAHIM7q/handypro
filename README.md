# HandyPro - Mobile Repair Service Website

A modern, responsive website for HandyPro mobile repair services in Kiel, Germany. Built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern Design**: Clean, professional layout with dark/light mode toggle
- **Multilingual Support**: German and Arabic language options
- **Responsive**: Mobile-first design that works on all devices
- **3D Elements**: Interactive 3D animations using Spline
- **Real-time Communication**: Socket.IO integration for live features
- **Type Safety**: Full TypeScript implementation
- **Component Library**: shadcn/ui components for consistent design
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (optional, for database features)

### Installation

1. **Navigate to project directory**
```bash
cd c:\Users\alsaa\Downloads\HANDYPRO
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
# Copy the example environment file
copy .env.example .env

# Edit .env with your configuration
# DATABASE_URL, NEXTAUTH_SECRET, etc.
```

4. **Database Setup (Optional)**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

5. **Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations

### Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API routes
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # shadcn/ui components
│   ├── Header.tsx     # Navigation header
│   ├── HeroSection.tsx # Landing section
│   └── ...            # Other components
├── hooks/             # Custom React hooks
├── lib/               # Utilities and configs
│   ├── db.ts          # Database client
│   ├── socket.ts      # Socket.IO setup
│   └── utils.ts       # Helper functions
## 🔧 Technologies Used

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Animations**: Framer Motion + custom CSS
- **3D Graphics**: Spline
- **Icons**: Lucide React + Emoji fallbacks

### Backend
- **Runtime**: Node.js with tsx
- **Database**: Prisma ORM (PostgreSQL/SQLite)
- **Authentication**: NextAuth.js
- **Real-time**: Socket.IO
- **Image Processing**: Sharp

### Development Tools
- **Linting**: ESLint + Next.js config
- **Package Manager**: npm
- **Development Server**: Nodemon + tsx

## 🌐 Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables

Ensure these are set in production:

```env
DATABASE_URL=your_database_url
NEXTAUTH_URL=your_domain
NEXTAUTH_SECRET=your_secret_key
NODE_ENV=production
```

## 📱 Features

### Service Sections
- **Display Repair**: Professional screen replacement
- **Battery Replacement**: High-capacity battery installation
- **Data Recovery**: Safe data retrieval from damaged devices
- **Water Damage**: Emergency repair services
- **Accessories**: Phone cases, screen protectors, cables

### Interactive Elements
- **Contact Modal**: Multiple contact methods (WhatsApp, Email, Social)
- **Language Toggle**: German/Arabic support with RTL layout
- **Theme Switcher**: Dark/Light mode with system preference detection
- **Chat Button**: Floating contact widget
- **Smooth Scrolling**: Animated section navigation

## 🔧 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
```bash
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

2. **TypeScript errors**
```bash
# Regenerate TypeScript definitions
npm run db:generate
npm run build
```

3. **Missing environment variables**
```bash
# Copy and configure environment file
copy .env.example .env
# Edit .env with your values
```

4. **Database connection issues**
```bash
# Reset database (development only)
npm run db:reset
```

### Performance Optimization

- **Images**: Automatically optimized with Next.js Image component
- **Code Splitting**: Automatic with Next.js App Router
- **Bundle Analysis**: Use `npm run build` to check bundle sizes
- **Mobile Performance**: 3D elements disabled on mobile devices

## 📞 Contact Information

- **Business**: HandyPro Kiel
- **Address**: Kronshagener Weg 12, 24116 Kiel
- **Phone**: 01577 1149895
- **Email**: handypro.kiel@gmail.com
- **Instagram**: [@handy_pro_kiel](https://www.instagram.com/handy_pro_kiel)
- **Facebook**: [HandyPro Kiel](https://www.facebook.com/share/16iu2qkmz1/)

## 📄 License

This project is proprietary software for HandyPro Kiel.

## 🤝 Support

For technical support or questions about the website, please contact the development team.

---

**Built with ❤️ for HandyPro Kiel**
# Excellence Digitale - French Digital Agency Website

## Overview

Excellence Digitale is a luxury French digital agency website that provides high-end services in web development, AI solutions, and business growth strategies. The application is built as a full-stack web solution with a React frontend and Express backend, featuring a sophisticated design system with a "luxe sobre" (subtle luxury) aesthetic. The site serves as both a showcase and a lead generation platform, with integrated contact forms and service presentations targeting French-speaking business clients.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with support for multiple pages (Home, Services, About, Contact)
- **Styling**: Tailwind CSS with shadcn/ui component library providing a comprehensive design system
- **Design System**: Custom luxury theme with French typography (Montserrat + Crimson Text), sophisticated color palette (anthracite, off-white, taupe, deep blue, emerald, bronze)
- **Animations**: Framer Motion for smooth, subtle animations and micro-interactions
- **State Management**: TanStack React Query for server state management and API data fetching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Server**: Express.js with TypeScript providing RESTful API endpoints
- **Storage**: In-memory storage implementation (MemStorage class) with interface for easy database migration
- **API Design**: Clean REST endpoints for contact form submissions and data retrieval
- **Request Logging**: Custom middleware for API request logging and performance monitoring
- **Error Handling**: Centralized error handling with structured error responses
- **Development**: Hot module replacement and development server integration with Vite

### Data Schema & Validation
- **Schema Definition**: Drizzle ORM with PostgreSQL dialect for database schema management
- **Validation**: Zod schemas for runtime type checking and form validation
- **Data Models**: User management system and contact submission tracking with French language validation messages
- **Type Safety**: Full TypeScript integration from database to frontend with shared type definitions

### UI/UX Design System
- **Component Library**: Comprehensive shadcn/ui components (accordion, alert-dialog, avatar, button, card, carousel, charts, forms, navigation, etc.)
- **Accessibility**: ARIA-compliant components with keyboard navigation support
- **Responsive Design**: Mobile-first approach with custom mobile detection hooks
- **Typography**: Professional French typography with Montserrat (headings) and Crimson Text (body) fonts
- **Color Theming**: CSS custom properties with dark mode support and luxury color palette
- **Interactions**: Smooth hover effects, transitions, and loading states

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: Neon database connector for PostgreSQL hosting
- **drizzle-orm & drizzle-kit**: Type-safe ORM with schema management and migrations
- **@tanstack/react-query**: Server state management and API data synchronization
- **wouter**: Lightweight React router for single-page application navigation
- **framer-motion**: Animation library for smooth UI transitions and interactions

### UI Component Dependencies
- **@radix-ui/***: Comprehensive primitive components for accessibility (accordion, alert-dialog, avatar, checkbox, context-menu, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- **class-variance-authority**: Utility for component variant management
- **tailwindcss**: Utility-first CSS framework for styling
- **cmdk**: Command palette component for enhanced user interactions

### Form & Validation Dependencies
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Form validation resolvers for various schema libraries
- **zod**: TypeScript-first schema validation for forms and API data
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### Development & Build Dependencies
- **vite**: Fast build tool and development server
- **typescript**: Type checking and enhanced developer experience
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution for Node.js development server

### Utility Dependencies
- **clsx & tailwind-merge**: Conditional CSS class name utilities
- **date-fns**: Modern JavaScript date utility library
- **embla-carousel-react**: Carousel component for content presentation
- **lucide-react**: Modern icon library with React components
- **nanoid**: URL-safe unique ID generator

### Replit-Specific Dependencies
- **@replit/vite-plugin-runtime-error-modal**: Development error handling overlay
- **@replit/vite-plugin-cartographer**: Development tooling integration
- **@replit/vite-plugin-dev-banner**: Development environment banner

### Session & Database Dependencies
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **@jridgewell/trace-mapping**: Source map utilities for debugging support
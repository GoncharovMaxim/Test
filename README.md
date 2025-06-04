# Product Explorer

A modern single-page application built with Vue 3, Nuxt 3, TypeScript, and Pinia for exploring and managing products across different categories.

## Features

- **Product Browsing**: View products in a responsive grid layout
- **Search & Filter**: Search products by name/description and filter by categories
- **Sorting**: Sort products by price (ascending/descending)
- **Favorites**: Add/remove products from favorites with persistent storage
- **Product Details**: Detailed product view with full descriptions
- **Responsive Design**: Mobile-first design using TailwindCSS
- **TypeScript**: Full type safety throughout the application
- **State Management**: Centralized state management with Pinia

## Tech Stack

- **Frontend**: Vue 3 (Composition API), Nuxt 3, TypeScript
- **State Management**: Pinia
- **Styling**: TailwindCSS
- **Mock API**: json-server
- **Linting**: ESLint with Nuxt configuration

## Project Structure

```
├── assets/css/           # Global styles and TailwindCSS
├── components/           # Reusable Vue components
├── layouts/             # Application layouts
├── pages/               # Application pages (auto-routing)
├── stores/              # Pinia stores
├── types/               # TypeScript type definitions
├── mock-data.json       # Mock data for json-server
├── nuxt.config.ts       # Nuxt configuration
└── package.json         # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-explorer
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the mock API server:
```bash
npm run mock-api
```
This will start json-server on `http://localhost:3001`

2. In a new terminal, start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run mock-api` - Start json-server mock API

## Architecture Decisions

### State Management
- **Pinia** is used for centralized state management
- Store handles data fetching, filtering, sorting, and favorites management
- Reactive getters provide computed values for filtered products

### Component Architecture
- **Composition API** with `<script setup>` for cleaner, more maintainable code
- Reusable components with proper TypeScript interfaces
- Separation of concerns between presentation and business logic

### Data Flow
1. Products and categories are fetched from mock API on app initialization
2. User interactions update store state through actions
3. Reactive getters automatically update UI based on state changes
4. Favorites are persisted to localStorage

### Styling Approach
- **TailwindCSS** for utility-first styling
- Custom CSS classes for reusable component styles
- Responsive design with mobile-first approach
- Consistent design system with proper spacing and colors

### TypeScript Integration
- Strict type checking enabled
- Interfaces for all data structures
- Type-safe store actions and getters
- Proper typing for component props and events

## API Endpoints

The mock API provides the following endpoints:

- `GET /db` - Get all data (categories and products)
- `GET /categories` - Get all categories
- `GET /products` - Get all products
- `GET /products/:id` - Get specific product

## Features Implementation

### Search & Filtering
- Real-time search across product names and descriptions
- Multi-select category filtering
- Combined filters work together
- Clear filters functionality

### Sorting
- Sort by price (ascending/descending)
- Maintains other filters while sorting
- Default "no sorting" option

### Favorites Management
- Toggle favorite status with heart icon
- Persistent storage using localStorage
- Visual feedback for favorite state
- Favorites accessible across all views

### Responsive Design
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for various screen sizes

## Development Guidelines

### Code Style
- Use Composition API with `<script setup>`
- Follow Vue 3 best practices
- Maintain consistent TypeScript typing
- Use descriptive variable and function names

### Component Guidelines
- Keep components focused and reusable
- Use proper prop typing with interfaces
- Emit events for parent-child communication
- Follow single responsibility principle

### State Management
- Use Pinia actions for all state mutations
- Keep getters pure and reactive
- Handle loading and error states properly
- Persist important data to localStorage when needed

## Browser Support

- Modern browsers with ES2020+ support
- Chrome 88+
- Firefox 78+
- Safari 14+
- Edge 88+

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new features
3. Test functionality across different screen sizes
4. Update documentation for significant changes

## License

This project is created for educational/demonstration purposes. 
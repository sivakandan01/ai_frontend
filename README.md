# Verify Point - Real Estate Platform

A modern real estate platform built with React, TypeScript, and Vite for property verification and management.

## Features

- **Property Listings**: Browse and search through available real estate properties
- **Advanced Search**: Filter properties by location, price, type, and other criteria
- **Interactive Maps**: Visualize property locations with integrated mapping
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Built with shadcn/ui components for a polished user experience

## Tech Stack

- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 7.1.7** - Build tool
- **Tailwind CSS 4.1.13** - Styling
- **Redux Toolkit 2.9.0** - State management
- **React Router 7.9.3** - Routing
- **Leaflet 1.9** - Interactive maps
- **Framer Motion 12.23.22** - Animations
- **shadcn/ui** - UI components

## Prerequisites

- Node.js 22.x or higher
- npm 9.x or higher

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd verify-point-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── assets/          # Images and static files
├── components/      # Reusable UI components
│   ├── custom/      # Custom components
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── layout/          # Layout components (Header, etc.)
├── lib/             # Utility functions
├── pages/           # Page components
│   ├── home/        # Landing page sections
│   ├── login/       # Authentication
│   └── main/        # Main app pages
├── store/           # Redux store and slices
├── App.tsx          # Root component
└── main.tsx         # Entry point
```

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Code Quality

This project uses:
- **ESLint** for linting
- **Prettier** for code formatting
- **Husky** for git hooks
- **lint-staged** for pre-commit checks
- **Commitlint** for conventional commits

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: add new feature
fix: bug fix
docs: documentation update
style: code formatting
refactor: code refactoring
```

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License
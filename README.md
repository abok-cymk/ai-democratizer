# AI Democratizer PWA

A comprehensive Progressive Web Application platform for teaching AI concepts through interactive campaigns, gamified learning, and community engagement.

## 🎯 Mission

Make AI accessible to everyone through hands-on experimentation, gamified learning paths, and community-driven education.

## ✨ Features

### Phase 1: Foundation (Completed)
- ✅ **Monorepo Architecture**: Organized with apps/packages structure
- ✅ **Progressive Web App**: Full PWA capabilities with offline support
- ✅ **Modern React Stack**: React 18, TypeScript 5.x, Vite 5.x
- ✅ **Design System**: TailwindCSS with custom design tokens
- ✅ **State Management**: Zustand for global state, TanStack Query for server state
- ✅ **Authentication**: Mock authentication system (ready for real backend)
- ✅ **Internationalization**: Multi-language support with react-i18next
- ✅ **Accessibility**: WCAG 2.1 AA compliant with screen reader support
- ✅ **Theme Support**: Light/Dark/System theme switching
- ✅ **Responsive Design**: Mobile-first approach with responsive layouts

### Coming Soon (Phase 2-5)
- 🔄 **AI Playground**: Interactive experimentation with AI models
- 🔄 **Learning Paths**: Structured courses and gamified progression
- 🔄 **Community Hub**: Forums, Q&A, and collaborative learning
- 🔄 **Campaign System**: AI advocacy and awareness campaigns
- 🔄 **Real-time Features**: Live chat and collaborative spaces
- 🔄 **Analytics**: User behavior tracking and performance insights

## 🏗️ Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript 5.x (strict mode)
- **Build Tool**: Vite 5.x with optimized bundling
- **Styling**: TailwindCSS 3.x + PostCSS + Autoprefixer
- **Components**: Radix UI primitives + custom component library
- **Animations**: Framer Motion for smooth interactions
- **State**: Zustand (global) + TanStack Query (server state)
- **Forms**: React Hook Form + Zod validation
- **Routing**: React Router 6.x
- **PWA**: Workbox + Vite PWA plugin
- **i18n**: react-i18next with browser language detection

### Development & Testing
- **Testing**: Vitest + React Testing Library + Playwright (E2E)
- **Linting**: ESLint + Prettier + Husky pre-commit hooks
- **TypeScript**: Strict mode with exhaustive type checking
- **Component Dev**: Storybook for isolated component development

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ 
- npm 10+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-democratizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or run both frontend and backend
   npm run dev:all
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload on changes

### Demo Access
For demo purposes, you can log in with:
- **Email**: demo@ai-democratizer.com
- **Password**: any password (demo mode)

## 📁 Project Structure

```
ai-democratizer/
├── apps/
│   ├── web/                    # React PWA frontend
│   │   ├── src/
│   │   │   ├── components/     # Reusable UI components
│   │   │   │   ├── ui/         # Basic UI components
│   │   │   │   ├── layout/     # Layout components
│   │   │   │   ├── features/   # Feature-specific components
│   │   │   │   └── providers/  # Context providers
│   │   │   ├── pages/          # Route components
│   │   │   ├── hooks/          # Custom React hooks
│   │   │   ├── lib/            # Utility libraries
│   │   │   ├── store/          # State management
│   │   │   ├── types/          # TypeScript definitions
│   │   │   └── utils/          # Helper functions
│   │   └── public/             # Static assets
│   └── api/                    # Backend API (planned)
├── packages/
│   ├── ui/                     # Shared component library (planned)
│   ├── shared/                 # Shared utilities (planned)
│   └── config/                 # Shared configuration (planned)
└── docs/                       # Documentation (planned)
```

## 🎨 Design System

The app uses a custom design system built on top of TailwindCSS:

### Color Palette
- **Primary**: AI Blue gradient (blue-500 to purple-600)
- **Secondary**: Muted grays for balanced contrast
- **Semantic**: Success (green), Warning (yellow), Error (red), Info (blue)
- **Brand Colors**: AI Blue, AI Purple, AI Green for feature differentiation

### Typography
- **Primary Font**: Inter (system fallback)
- **Monospace**: JetBrains Mono for code
- **Scale**: Responsive typography with proper contrast ratios

### Components
- **Design Language**: Consistent spacing, border radius, shadows
- **Interactive States**: Hover, focus, active with smooth transitions
- **Accessibility**: High contrast support, keyboard navigation
- **Responsive**: Mobile-first with breakpoint-based layouts

## 🧪 Development

### Available Scripts

```bash
# Development
npm run dev              # Start frontend dev server
npm run dev:api          # Start backend dev server (planned)
npm run dev:all          # Start both frontend and backend

# Building
npm run build            # Build all apps for production
npm run preview          # Preview production build

# Testing
npm run test             # Run unit tests
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run end-to-end tests

# Code Quality
npm run lint             # Lint all code
npm run lint:fix         # Fix linting issues
npm run format           # Format code with Prettier

# Docker (planned)
npm run docker:dev       # Start development environment
npm run docker:prod      # Start production environment
```

### Code Quality Standards
- **TypeScript**: Strict mode, no `any` types
- **Testing**: 80%+ coverage target
- **Performance**: <250kb initial bundle, code splitting
- **Accessibility**: All components keyboard navigable
- **Security**: Input validation, XSS prevention

## 🌐 PWA Features

The app is built as a Progressive Web App with:

- **Offline Support**: Core functionality works without internet
- **Installation**: Can be installed on desktop and mobile
- **Background Sync**: Data syncs when connection is restored
- **Push Notifications**: For achievements and updates (planned)
- **App-like Experience**: Full-screen, responsive, fast loading

## 🔧 Configuration

### Environment Variables
Create `.env.local` files in `apps/web/`:

```env
VITE_APP_TITLE=AI Democratizer
VITE_API_URL=http://localhost:8000
VITE_SENTRY_DSN=your-sentry-dsn
```

### Customization
- **Themes**: Modify `src/index.css` for color tokens
- **i18n**: Add translations in `src/lib/i18n.ts`
- **Components**: Extend the component library in `src/components/`

## 🚢 Deployment

The app is optimized for deployment on:
- **Vercel**: Zero-config deployment with preview deployments
- **Netlify**: Static hosting with form handling
- **Docker**: Containerized deployment (configuration planned)
- **AWS/GCP/Azure**: Cloud platform deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the code style guidelines
4. Add tests for new functionality
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines
- Follow the existing code structure and patterns
- Write tests for new components and features
- Ensure accessibility standards are maintained
- Update documentation for significant changes
- Use conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vercel** for Vite and excellent tooling
- **TailwindCSS** for the utility-first CSS framework
- **Radix UI** for accessible component primitives
- **All contributors** making AI education accessible

---

**Built with ❤️ for democratizing AI education**

For questions, suggestions, or contributions, please open an issue or reach out to the maintainers.

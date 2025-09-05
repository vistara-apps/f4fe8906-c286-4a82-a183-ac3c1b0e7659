# Know Your Rights Cards - Base Mini App

A production-ready Next.js Base Mini App that provides citizens with instant access to state-specific legal summaries, 'know your rights' scripts, and immediate-use tools when interacting with law enforcement.

## 🚀 Features

### Core Functionality
- **State-Specific Law Summaries**: Comprehensive legal information for 6 states (CA, NY, TX, FL, IL, WA)
- **Actionable Scripts**: Pre-written scripts in English and Spanish for various scenarios
- **Audio Recording**: Secure recording functionality with encounter documentation
- **Emergency Alerts**: Quick alert system for trusted contacts
- **Encounter History**: Automatic documentation and sharing capabilities
- **Farcaster Integration**: Full Base Mini App integration with social features

### Technical Features
- **Production-Ready**: Error boundaries, loading states, and comprehensive error handling
- **Responsive Design**: Mobile-first design with glass morphism UI
- **Real-time Notifications**: Toast notification system for user feedback
- **Offline Support**: Local storage fallbacks and progressive enhancement
- **Security**: Secure data handling and privacy-focused design

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with custom state management
- **Base Integration**: MiniKit SDK for Farcaster integration
- **Icons**: Lucide React
- **TypeScript**: Full type safety throughout

## 📱 App Structure

### Pages & Components
- **Main App** (`app/page.tsx`): Core application with tabbed interface
- **API Routes**: RESTful endpoints for all data operations
- **Components**: Modular, reusable UI components
- **Hooks**: Custom hooks for state management and API interactions

### Key Components
- `AppShell`: Main layout wrapper
- `ContentCard`: Consistent card design
- `ScriptViewer`: Rights script display with language switching
- `RecordingButton`: Audio recording with encounter creation
- `AlertButton`: Emergency alert system
- `TrustedContactsManager`: Contact management interface
- `EncounterCard`: Encounter documentation and sharing
- `ErrorBoundary`: Production error handling
- `NotificationSystem`: User feedback system

## 🗂 Data Models

### User
```typescript
interface User {
  userId: string;
  farcasterId?: string;
  currentLocation: string;
  savedStates: string[];
  subscriptionStatus: 'free' | 'premium';
  trustedContacts: TrustedContact[];
}
```

### StateLaw
```typescript
interface StateLaw {
  stateAbbreviation: string;
  title: string;
  summary: string;
  rights: string[];
  prohibitedActions: string[];
}
```

### Script
```typescript
interface Script {
  scriptId: string;
  title: string;
  scenario: string;
  englishText: string;
  spanishText: string;
  relatedLaws: string[];
}
```

### Encounter
```typescript
interface Encounter {
  encounterId: string;
  userId: string;
  timestamp: string;
  location: string;
  scriptUsed?: string;
  recordingUrl?: string;
  notes?: string;
  sharedWith: string[];
}
```

## 🔧 API Endpoints

### User Management
- `GET/POST/PUT /api/user` - User CRUD operations
- `GET/POST/DELETE /api/trusted-contacts` - Contact management

### Data Access
- `GET/POST/PUT /api/encounters` - Encounter management
- `POST /api/alerts` - Emergency alert system
- `GET /api/frame` - Farcaster frame integration

## 🎨 Design System

### Colors
- **Primary**: `hsl(210, 70%, 50%)`
- **Accent**: `hsl(140, 60%, 45%)`
- **Background**: `hsl(220, 25%, 96%)`
- **Surface**: `hsl(220, 25%, 100%)`

### Typography
- **Display**: `text-4xl font-bold`
- **Heading1**: `text-3xl font-semibold`
- **Heading2**: `text-2xl font-semibold`
- **Body**: `text-base leading-normal`

### Components
- Glass morphism design with backdrop blur
- Consistent spacing and border radius
- Smooth animations and transitions
- Mobile-optimized touch targets

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Base Mini App environment

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd know-your-rights-cards
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**
Navigate to `http://localhost:3000`

### Environment Variables
```env
# Base Mini App Configuration
NEXT_PUBLIC_MINIKIT_APP_ID=your_app_id
NEXT_PUBLIC_BASE_URL=your_base_url

# Optional: Database Configuration
DATABASE_URL=your_database_url
```

## 📋 User Flows

### 1. Onboarding
- User launches the MiniApp
- Location permission request
- State selection (if location unavailable)
- Display state law summary

### 2. Script Access
- Navigate to Scripts tab
- Select scenario (Traffic Stop, Questioning, etc.)
- View English/Spanish scripts
- Copy or save to encounter

### 3. Recording & Alerting
- Tap record button for audio capture
- Optional trusted contact alerts
- Automatic encounter creation
- Secure storage and documentation

### 4. Encounter Management
- View encounter history
- Share encounter cards
- Add notes and details
- Export for legal counsel

## 🔒 Security & Privacy

### Data Protection
- Local storage for sensitive data
- Secure API endpoints with validation
- Privacy-focused design principles
- No unnecessary data collection

### Recording Compliance
- User consent required for all recordings
- Local storage with secure handling
- Clear legal disclaimers
- State law compliance notices

## 🧪 Testing

### Unit Tests
```bash
npm run test
# or
yarn test
```

### Integration Tests
```bash
npm run test:integration
# or
yarn test:integration
```

### E2E Tests
```bash
npm run test:e2e
# or
yarn test:e2e
```

## 📦 Deployment

### Production Build
```bash
npm run build
# or
yarn build
```

### Base Mini App Deployment
1. Build the application
2. Deploy to your hosting platform
3. Configure Base Mini App settings
4. Submit for review (if required)

### Environment Setup
- Configure production environment variables
- Set up database (if using external storage)
- Configure CDN for static assets
- Set up monitoring and analytics

## 🤝 Contributing

### Development Guidelines
1. Follow TypeScript best practices
2. Use the established component patterns
3. Maintain responsive design principles
4. Add proper error handling
5. Include comprehensive tests

### Code Style
- ESLint configuration included
- Prettier for code formatting
- Consistent naming conventions
- Comprehensive TypeScript types

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Base Mini App Docs](https://docs.base.org/base-app/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Issues
For bug reports and feature requests, please use the GitHub Issues tab.

### Legal Disclaimer
This app provides general legal information and should not be considered legal advice. Users should consult with qualified legal professionals for specific legal matters.

---

**Built with ❤️ for citizen empowerment and legal awareness**

# IDCertify - Identity Verification & Trust Platform

A comprehensive multi-POV identity verification and trust platform built with React.js, TypeScript, and TailwindCSS.

## 🚀 Features

### Multi-Point of View (POV) Support
- **Individual**: Personal identity verification and document management
- **Organisation**: Employee verification and compliance management
- **Developer**: API management and integration tools
- **Admin**: Super admin dashboard for platform oversight

### Core Features
- 🔐 Secure authentication with demo login capabilities
- 📄 Document vault with end-to-end encryption
- 💳 Integrated wallet system
- 📊 Trust score engine
- 🧬 Biometric data management (Biobank)
- 🔔 Real-time notifications
- 📈 Analytics and reporting
- 🛡️ Compliance monitoring

## 🛠️ Tech Stack

- **Frontend**: React.js 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Charts**: Recharts (placeholder)

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   └── ui/
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── StatCard.tsx
├── pages/
│   ├── auth/
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   ├── individual/
│   │   ├── IndividualDashboard.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Verification.tsx
│   │   ├── Documents.tsx
│   │   ├── TrustScore.tsx
│   │   ├── Wallet.tsx
│   │   ├── Notifications.tsx
│   │   └── Profile.tsx
│   ├── organisation/
│   │   ├── OrganisationDashboard.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Compliance.tsx
│   │   ├── Employees.tsx
│   │   ├── AML.tsx
│   │   ├── Monitoring.tsx
│   │   ├── Integrations.tsx
│   │   ├── Wallet.tsx
│   │   ├── Billing.tsx
│   │   └── Settings.tsx
│   ├── developer/
│   │   ├── DeveloperDashboard.tsx
│   │   ├── Dashboard.tsx
│   │   ├── APIKeys.tsx
│   │   ├── Documentation.tsx
│   │   ├── Webhooks.tsx
│   │   ├── Analytics.tsx
│   │   ├── Wallet.tsx
│   │   └── Settings.tsx
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   ├── Organisations.tsx
│   │   ├── Developers.tsx
│   │   ├── Verifications.tsx
│   │   ├── Biobank.tsx
│   │   ├── Compliance.tsx
│   │   ├── Analytics.tsx
│   │   └── Settings.tsx
│   └── LandingPage.tsx
├── store/
│   ├── store.ts
│   └── slices/
│       └── authSlice.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd IDCertify
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Login

The application includes demo login functionality for testing all POVs:

- **Individual**: Demo individual user with personal verification features
- **Organisation**: Demo organization with employee management and compliance
- **Developer**: Demo developer with API management tools
- **Admin**: Demo admin with platform-wide oversight capabilities

## 🎨 Design System

The application uses a consistent design system with:

- **Colors**: Primary, secondary, success, warning, and danger color schemes
- **Typography**: Inter font family
- **Components**: Reusable UI components (cards, buttons, forms, tables)
- **Icons**: Lucide React icon library
- **Animations**: Custom CSS animations for enhanced UX

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (primary)
- Tablet
- Mobile (basic support)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=your_api_base_url
VITE_APP_NAME=IDCertify
```

### TailwindCSS Configuration
Custom colors and animations are defined in `tailwind.config.js`:
- Primary color scheme
- Custom animations (fade-in, slide-up, pulse-slow)
- Extended theme configuration

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📊 Features by POV

### Individual
- Personal dashboard with trust score
- Document verification (NIN, Passport, CAC, Certificates)
- Secure document vault
- Wallet management
- Profile settings

### Organisation
- Employee verification management
- Compliance monitoring
- AML checks
- Data monitoring and analytics
- Third-party integrations
- Billing and invoicing

### Developer
- API key management
- Documentation access
- Webhook configuration
- Usage analytics
- API billing

### Admin
- User management across all POVs
- Organization oversight
- Developer account management
- Verification monitoring
- Biobank management
- Platform-wide analytics
- System settings

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact:
- Email: support@idcertify.com
- Documentation: [Link to documentation]

---

Built with ❤️ for secure identity verification and trust management.

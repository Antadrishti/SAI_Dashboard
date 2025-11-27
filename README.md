# SAI Dashboard - Sports Authority of India

A comprehensive dashboard for managing and evaluating athlete performance data, built for the Sports Authority of India (SAI) mobile platform project.

## Features

### 🔐 Authentication
- Secure login system
- Session management
- Role-based access control

### 📊 Analytics Dashboard
- Real-time performance metrics
- Interactive charts and visualizations
- Test distribution analysis
- Recent activity tracking

### 👥 Athlete Browser
- Search and filter athletes
- View athlete profiles
- Track test completion status
- Location-based filtering

### 🎥 Video Review
- Review athlete video submissions
- AI verification status display
- Approve/reject submissions
- Detailed metrics and anomaly detection
- Video player integration

### 🌍 Internationalization
- Location-based language detection
- Support for 12+ Indian languages:
  - English, Hindi, Tamil, Telugu, Kannada
  - Marathi, Gujarati, Bengali, Odia
  - Malayalam, Punjabi, Assamese
- Manual language switching
- Persistent language preferences

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Video Player**: React Player
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SAI_dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Login

For demo purposes, you can use any email and password to login. The authentication system is set up to work with mock data.

## Project Structure

```
SAI_dashboard/
├── app/
│   ├── dashboard/
│   │   ├── analytics/      # Analytics page
│   │   ├── athletes/       # Athlete browser page
│   │   ├── videos/         # Video review page
│   │   └── page.tsx        # Main dashboard
│   ├── login/              # Login page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/
│   ├── providers/          # Context providers
│   ├── DashboardLayout.tsx # Main layout component
│   └── LanguageSwitcher.tsx
├── lib/
│   ├── api.ts              # API client and types
│   └── i18n.ts             # Internationalization
└── middleware.ts           # Route protection
```

## API Integration

The dashboard is configured to work with a backend API. Update the `API_BASE_URL` in `lib/api.ts` to point to your backend server.

Currently, the app uses mock data for development. Replace the mock implementations in `lib/api.ts` with actual API calls when connecting to your backend.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Features in Detail

### Language Switching
- Automatically detects language based on user location/timezone
- Manual language selection via dropdown
- Preferences saved in localStorage
- All UI text is translatable

### Responsive Design
- Mobile-first approach
- Responsive sidebar navigation
- Optimized for tablets and desktops
- Touch-friendly interface

### Security
- Protected routes with middleware
- Secure session management
- API authentication headers
- Input validation

## Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced filtering and sorting
- [ ] Export functionality (PDF, CSV)
- [ ] Bulk operations
- [ ] Advanced analytics
- [ ] User management
- [ ] Audit logs
- [ ] Dark mode

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is developed for the Sports Authority of India.

## Support

For issues and questions, please contact the development team.





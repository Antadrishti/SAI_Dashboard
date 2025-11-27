# Quick Setup Guide

## Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:3000`
   - You'll be redirected to the login page

4. **Login**
   - For demo purposes, use any email and password
   - Example: `official@sai.gov.in` / `password123`

## Project Structure Overview

```
SAI_dashboard/
├── app/                    # Next.js app directory
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── analytics/    # Analytics page with charts
│   │   ├── athletes/     # Athlete browser
│   │   └── videos/       # Video review page
│   ├── login/            # Login page
│   └── layout.tsx        # Root layout with providers
├── components/           # React components
│   ├── providers/        # Context providers (Auth, Language)
│   ├── DashboardLayout.tsx
│   └── LanguageSwitcher.tsx
├── lib/                  # Utilities and configurations
│   ├── api.ts           # API client (currently using mock data)
│   ├── i18n.ts          # Internationalization
│   └── utils.ts         # Utility functions
└── middleware.ts        # Route protection
```

## Key Features Implemented

✅ **Authentication System**
- Login page with form validation
- Session management
- Protected routes via middleware
- Logout functionality

✅ **Dashboard Pages**
- Main dashboard with overview stats
- Analytics page with interactive charts
- Athlete browser with search/filter
- Video review with player and AI verification

✅ **Internationalization**
- 12+ Indian languages supported
- Location-based auto-detection
- Manual language switcher
- Persistent preferences

✅ **UI/UX**
- Modern, clean design
- Responsive layout (mobile, tablet, desktop)
- Smooth animations and transitions
- Accessible components

## Connecting to Backend API

To connect to your actual backend:

1. Update `lib/api.ts`:
   - Replace mock data with actual API calls
   - Update `API_BASE_URL` in the file
   - Add proper error handling

2. Set environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://your-api-url.com/api
   ```

3. Update authentication:
   - Modify `components/providers/AuthProvider.tsx`
   - Add JWT token handling
   - Implement refresh token logic

## Customization

### Changing Colors
Edit `tailwind.config.ts` to customize the color scheme.

### Adding Languages
1. Add language code to `lib/i18n.ts`
2. Add translations for all keys
3. Language will appear in switcher automatically

### Adding New Pages
1. Create new route in `app/dashboard/`
2. Add navigation item in `components/DashboardLayout.tsx`
3. Add translations in `lib/i18n.ts`

## Troubleshooting

**Port already in use:**
```bash
# Use a different port
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
```

**TypeScript errors:**
```bash
# Check TypeScript version compatibility
npm install typescript@latest --save-dev
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Next Steps

1. **Backend Integration**: Connect to your actual API
2. **Real Authentication**: Implement JWT or OAuth
3. **Database**: Set up database connections
4. **Testing**: Add unit and integration tests
5. **Deployment**: Deploy to Vercel, AWS, or your preferred platform

## Support

For issues or questions, refer to the main README.md or contact the development team.





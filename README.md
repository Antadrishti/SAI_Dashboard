# Sports Aadhaar Dashboard

**🚀 Live Dashboard:** [https://sai-dashboard-6xfl.vercel.app](https://sai-dashboard-6xfl.vercel.app)

A monitoring and analytics platform for Sports Authority of India (SAI) to track athlete performance and academy activities.

## Overview

Sports Aadhaar enables SAI officials to:
- Monitor registered athletes and their profiles
- View AI-processed test submission statistics
- Track academy reviews and approvals
- Analyze sports talent assessment data

**Note:** This dashboard is for monitoring only. SAI does not approve/reject athletes - that's handled by individual academies.

## Key Features

- **Athlete Management** - Browse and view athlete profiles, test submissions
- **Academy Monitoring** - Track which academies are reviewing athletes
- **Analytics Dashboard** - View statistics on athletes, academies, and test submissions
- **Google OAuth** - Secure authentication for SAI officials
- **MongoDB Integration** - Real-time data from shared database

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** NextAuth.js with Google OAuth
- **Styling:** Tailwind CSS
- **Language:** TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Google OAuth credentials

### Installation

1. Clone the repository
```bash
git clone https://github.com/Antadrishti/SAI_Dashboard.git
cd SAI_Dashboard
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create a `.env` file:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

4. Seed the database (optional)
```bash
npx ts-node scripts/seed.ts
```

5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app                    # Next.js app directory
  /api                 # API routes (MongoDB operations)
  /dashboard           # Protected dashboard pages
  /login               # Authentication page
/components            # React components
  /academy            # Academy-related components
  /dashboard          # Dashboard components
/lib                   # Utilities and configurations
  /models             # Mongoose schemas (Athlete, Academy, Video)
  /mockData           # Mock academy data for testing
```

## Data Flow

```
Mobile App → AI Model → Test Statistics → MongoDB → SAI Dashboard
                                              ↓
                                         Academies Review
```

## Important Notes

- **No video storage:** Videos are processed by AI; only statistics are stored
- **Academy data:** Currently using mock data until database merge with Flutter app
- **SAI role:** Monitoring only - no approval/rejection workflow

## Database Collections

- `athletes` - Athlete profiles and basic info
- `videos` - AI-processed test statistics (not actual videos)
- `academies` - Academy information (mock data for now)
- `athletereviews` - Academy review records
- `activities` - System activity logs

## Future Integration

This dashboard will be integrated with:
- Flutter mobile app for athletes
- Shared MongoDB database with academy portal
- Real academy data (currently using mock data)

## License

Proprietary - Sports Authority of India

## Support

For issues or questions, contact the SAI development team.

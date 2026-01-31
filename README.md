# Next.js Practices ⚽

## Description

Personal repository for practicing and exploring Next.js, including development strategies, related technologies (such as React, SSR, SSG, API Routes), and practical examples of modern web applications.

This project includes a **Football Hub** application that connects to a real football API to demonstrate API integration, server-side rendering, and modern React patterns.

## Features

- ⚡ **Next.js 16** with App Router
- 🎨 **Tailwind CSS** for styling
- 📊 **Real Football Data** via API-Football
- 🔄 **Server-Side Rendering (SSR)** for dynamic data
- 📱 **Responsive Design** for all devices
- 🌙 **Dark Mode** support
- 🏗️ **TypeScript** for type safety
- 📁 **Organized Project Structure** with src directory

## Football Features

- 🏆 Browse top leagues (Premier League, La Liga, Serie A, etc.)
- 📊 View real-time standings and league tables
- ⚽ Match fixtures with live scores
- 🏟️ Team and venue information

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/cardacci/nextjs-practices.git
   cd nextjs-practices
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the API key:
   - Get a free API key from [RapidAPI - API-Football](https://rapidapi.com/api-sports/api/api-football)
   - Copy `.env.example` to `.env.local`
   - Add your API key to `.env.local`:
     ```
     FOOTBALL_API_KEY=your_api_key_here
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Technologies Used

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[API-Football](https://www.api-football.com/)** - Football data API

## Project Structure

```
nextjs-practices/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── leagues/[id]/       # Dynamic league pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable React components
│   │   └── football/           # Football-specific components
│   │       ├── FixtureCard.tsx
│   │       ├── LeagueCard.tsx
│   │       ├── StandingsTable.tsx
│   │       └── index.ts
│   └── lib/                    # Utilities and API services
│       └── api/
│           ├── football.ts     # Football API service layer
│           └── index.ts
├── public/                     # Static assets
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables (not in git)
├── next.config.ts             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Project dependencies
```

## API Layer Architecture

The project includes a clean API layer for connecting to external services:

```typescript
// Example usage
import { getStandings, POPULAR_LEAGUES, CURRENT_SEASON } from '@/lib/api';

const standings = await getStandings(POPULAR_LEAGUES.PREMIER_LEAGUE, CURRENT_SEASON);
```

### Available API Functions

| Function | Description |
|----------|-------------|
| `getLeagues()` | Get available leagues |
| `getTeams()` | Get teams by league |
| `getStandings()` | Get league standings |
| `getFixtures()` | Get match fixtures |
| `getLiveFixtures()` | Get live matches |

## API Configuration

The free tier of API-Football includes:
- 100 requests/day
- Access to leagues, teams, players, fixtures, and standings

Get your free API key at: [RapidAPI - API-Football](https://rapidapi.com/api-sports/api/api-football)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

This is a personal practice repository. Feel free to fork and experiment!

## License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js and Tailwind CSS

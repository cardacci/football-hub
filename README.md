# Football Hub ⚽

## Description

**Football Hub** is a modern web application that provides real-time football data including league standings, match fixtures, and comprehensive team information. Built with Next.js and powered by API-Football, it delivers a seamless experience for football enthusiasts who want to stay updated with their favorite leagues.

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
    git clone https://github.com/cardacci/football-hub.git
    cd football-hub
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

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Technologies Used

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[API-Football](https://www.api-football.com/)** - Football data API

## Project Structure

```
football-hub/
├── 📁 .vscode/                          # VS Code workspace settings
│   └── settings.json                    # Editor configuration (tabs, formatting)
├── 📁 public/                           # Static assets
│   ├── favicon.svg                      # App favicon
│   ├── stadium-pattern.png              # Background pattern for header
│   ├── file.svg                         # Generic file icon
│   ├── globe.svg                        # Globe icon
│   ├── next.svg                         # Next.js logo
│   └── vercel.svg                       # Vercel logo
├── 📁 src/                              # Source code
│   ├── 📁 app/                          # Next.js App Router
│   │   ├── 📁 leagues/                  # Dynamic routes
│   │   │   └── 📁 [id]/                 # League detail pages (/leagues/39)
│   │   │       └── page.tsx             # League standings page
│   │   ├── globals.css                  # Global CSS styles
│   │   ├── layout.tsx                   # Root layout component
│   │   └── page.tsx                     # Home page (Football Hub)
│   ├── 📁 components/                   # Reusable React components
│   │   ├── 📁 football/                 # Football-specific components
│   │   │   ├── FixtureCard.tsx          # Match fixture display
│   │   │   ├── LeagueCard.tsx           # League selection card
│   │   │   ├── StandingsTable.tsx       # League standings table
│   │   │   └── index.ts                 # Component exports
│   │   └── index.ts                     # Main component exports
│   └── 📁 lib/                          # Utilities and services
│       └── 📁 api/                      # API layer
│           ├── football.ts              # Football API functions & types
│           └── index.ts                 # API exports
├── 📄 .editorconfig                     # Universal editor settings
├── 📄 .env.example                      # Environment variables template
├── 📄 .env.local                        # Local environment variables
├── 📄 .gitignore                        # Git ignore rules
├── 📄 .prettierrc                       # Prettier configuration
├── 📄 eslint.config.mjs                 # ESLint configuration
├── 📄 next.config.ts                    # Next.js configuration
├── 📄 package.json                      # Project dependencies & scripts
├── 📄 postcss.config.mjs                # PostCSS configuration
├── 📄 README.md                         # Project documentation
├── 📄 tailwind.config.ts                # Tailwind CSS configuration
└── 📄 tsconfig.json                     # TypeScript configuration
```

### 🏗️ **App Architecture Overview**

#### **Frontend Structure (Next.js App Router)**

- **`app/layout.tsx`** - Root layout with metadata, fonts, and global styles
- **`app/page.tsx`** - Home page with league selection and features showcase
- **`app/leagues/[id]/page.tsx`** - Dynamic league pages with standings

#### **Component Architecture**

- **`components/football/`** - Specialized football components
    - `StandingsTable` - Displays league tables with team stats
    - `FixtureCard` - Shows match information and scores
    - `LeagueCard` - Interactive league selection cards

#### **API Layer**

- **`lib/api/football.ts`** - Complete API service layer
    - TypeScript interfaces for all API responses
    - Functions for leagues, teams, standings, and fixtures
    - Error handling and caching configuration

#### **Configuration Files**

- **`.vscode/settings.json`** - VS Code workspace settings (tabs, formatting)
- **`.editorconfig`** - Universal editor configuration
- **`.prettierrc`** - Code formatting rules (tabs of 4 spaces)
- **`next.config.ts`** - Next.js configuration (images, compiler)
- **`tailwind.config.ts`** - Tailwind CSS customization

### 📂 **Key Directories Explained**

| Directory         | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `src/app/`        | Next.js pages and layouts (App Router)      |
| `src/components/` | Reusable React components                   |
| `src/lib/`        | Utilities, API services, and business logic |
| `public/`         | Static assets served directly               |
| `.vscode/`        | VS Code workspace configuration             |

### 🔄 **Data Flow**

1. **User visits** `/` → `app/page.tsx` renders league selection
2. **User clicks league** → Navigates to `/leagues/[id]`
3. **Server fetches data** → `getStandings()` from API
4. **SSR renders page** → `StandingsTable` displays data
5. **Client hydration** → Interactive features activate

## API Layer Architecture

The project includes a clean API layer for connecting to external services:

```typescript
// Example usage
import { getStandings, POPULAR_LEAGUES, CURRENT_SEASON } from '@/lib/api';

const standings = await getStandings(POPULAR_LEAGUES.PREMIER_LEAGUE, CURRENT_SEASON);
```

### Available API Functions

| Function            | Description           |
| ------------------- | --------------------- |
| `getLeagues()`      | Get available leagues |
| `getTeams()`        | Get teams by league   |
| `getStandings()`    | Get league standings  |
| `getFixtures()`     | Get match fixtures    |
| `getLiveFixtures()` | Get live matches      |

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

Contributions are welcome! Feel free to open issues or submit pull requests to help improve Football Hub.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

Built with ❤️ using Next.js and Tailwind CSS

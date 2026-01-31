import Link from 'next/link';
import { POPULAR_LEAGUES } from '@/lib/api';

export default function Home() {
  const featuredLeagues = [
    { id: POPULAR_LEAGUES.PREMIER_LEAGUE, name: 'Premier League', country: 'England', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { id: POPULAR_LEAGUES.LA_LIGA, name: 'La Liga', country: 'Spain', emoji: '🇪🇸' },
    { id: POPULAR_LEAGUES.SERIE_A, name: 'Serie A', country: 'Italy', emoji: '🇮🇹' },
    { id: POPULAR_LEAGUES.BUNDESLIGA, name: 'Bundesliga', country: 'Germany', emoji: '🇩🇪' },
    { id: POPULAR_LEAGUES.LIGUE_1, name: 'Ligue 1', country: 'France', emoji: '🇫🇷' },
    { id: POPULAR_LEAGUES.CHAMPIONS_LEAGUE, name: 'Champions League', country: 'Europe', emoji: '🏆' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/stadium-pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            ⚽ Football Hub
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-2xl mx-auto mb-8">
            Your gateway to real-time football data. Explore leagues, standings, fixtures, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/leagues"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-700 bg-white rounded-full hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
            >
              Explore Leagues
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="/fixtures"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white/10 transition-colors"
            >
              View Fixtures
            </Link>
          </div>
        </div>
      </header>

      {/* Featured Leagues */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Top Leagues
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredLeagues.map((league) => (
              <Link
                key={league.id}
                href={`/leagues/${league.id}`}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{league.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {league.name}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">{league.country}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Live Standings</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Real-time league tables with complete statistics
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Match Fixtures</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Upcoming matches and live scores from top leagues
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏟️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Team Info</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Detailed information about teams and venues
              </p>
            </div>
          </div>
        </section>

        {/* API Info */}
        <section className="bg-gray-900 dark:bg-gray-800 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Powered by Real Data</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            This project uses the API-Football service to fetch real football data. 
            To use the API features, you&apos;ll need to configure your API key.
          </p>
          <a
            href="https://rapidapi.com/api-sports/api/api-football"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors"
          >
            Get API Key
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500 dark:text-gray-400">
          <p>
            Built with{' '}
            <a href="https://nextjs.org" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Next.js
            </a>
            {' '}and{' '}
            <a href="https://tailwindcss.com" className="text-green-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Tailwind CSS
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

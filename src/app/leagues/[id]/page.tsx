import { getStandings, POPULAR_LEAGUES, CURRENT_SEASON } from '@/lib/api';
import { StandingsTable } from '@/components/football';
import Link from 'next/link';

interface LeaguePageProps {
	params: Promise<{
		id: string;
	}>;
}

const LEAGUE_NAMES: Record<number, string> = {
	[POPULAR_LEAGUES.PREMIER_LEAGUE]: 'Premier League',
	[POPULAR_LEAGUES.LA_LIGA]: 'La Liga',
	[POPULAR_LEAGUES.SERIE_A]: 'Serie A',
	[POPULAR_LEAGUES.BUNDESLIGA]: 'Bundesliga',
	[POPULAR_LEAGUES.LIGUE_1]: 'Ligue 1',
	[POPULAR_LEAGUES.CHAMPIONS_LEAGUE]: 'UEFA Champions League',
	[POPULAR_LEAGUES.EUROPA_LEAGUE]: 'UEFA Europa League',
	[POPULAR_LEAGUES.MLS]: 'MLS',
	[POPULAR_LEAGUES.LIGA_MX]: 'Liga MX',
};

export default async function LeaguePage({ params }: LeaguePageProps) {
	const { id } = await params;
	const leagueId = parseInt(id);
	const leagueName = LEAGUE_NAMES[leagueId] || `League ${leagueId}`;

	let standings;
	let error = null;

	try {
		standings = await getStandings(leagueId, CURRENT_SEASON);
	} catch (e) {
		error = e instanceof Error ? e.message : 'Failed to fetch standings';
	}

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Header */}
			<header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-green-100 hover:text-white mb-4 transition-colors"
					>
						<svg
							className="w-5 h-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Back to Home
					</Link>
					<h1 className="text-4xl font-bold">{leagueName}</h1>
					<p className="text-green-100 mt-2">
						Season {CURRENT_SEASON}/{CURRENT_SEASON + 1}
					</p>
				</div>
			</header>

			{/* Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{error ? (
					<div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
						<h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
							⚠️ API Configuration Required
						</h2>
						<p className="text-yellow-700 dark:text-yellow-300 mb-4">
							To display real standings data, you need to configure your API key:
						</p>
						<ol className="list-decimal list-inside text-yellow-700 dark:text-yellow-300 space-y-2">
							<li>
								Get a free API key from{' '}
								<a
									href="https://rapidapi.com/api-sports/api/api-football"
									className="underline hover:no-underline"
									target="_blank"
									rel="noopener noreferrer"
								>
									RapidAPI
								</a>
							</li>
							<li>
								Add it to your{' '}
								<code className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
									.env.local
								</code>{' '}
								file
							</li>
							<li>Restart the development server</li>
						</ol>
						<p className="text-yellow-600 dark:text-yellow-400 mt-4 text-sm">
							Error: {error}
						</p>
					</div>
				) : standings && standings.length > 0 ? (
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
						<div className="p-6">
							<StandingsTable standings={standings} />
						</div>
					</div>
				) : (
					<div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
						<p className="text-gray-500 dark:text-gray-400">
							No standings data available for this league.
						</p>
					</div>
				)}

				{/* Legend */}
				<div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
					<h3 className="font-semibold text-gray-900 dark:text-white mb-4">Legend</h3>
					<div className="flex flex-wrap gap-6 text-sm">
						<div className="flex items-center gap-2">
							<span className="w-6 h-6 bg-green-500 rounded-full"></span>
							<span className="text-gray-600 dark:text-gray-400">
								Champions League
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="w-6 h-6 bg-red-500 rounded-full"></span>
							<span className="text-gray-600 dark:text-gray-400">Relegation</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="w-5 h-5 bg-green-500 text-white text-xs font-bold flex items-center justify-center rounded">
								W
							</span>
							<span className="text-gray-600 dark:text-gray-400">Win</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="w-5 h-5 bg-gray-400 text-white text-xs font-bold flex items-center justify-center rounded">
								D
							</span>
							<span className="text-gray-600 dark:text-gray-400">Draw</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded">
								L
							</span>
							<span className="text-gray-600 dark:text-gray-400">Loss</span>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

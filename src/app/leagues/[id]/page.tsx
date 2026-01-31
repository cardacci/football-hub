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
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<Link
						href="/"
						className="mb-4 inline-flex items-center gap-2 text-green-100 transition-colors hover:text-white"
					>
						<svg
							className="h-5 w-5"
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
					<p className="mt-2 text-green-100">
						Season {CURRENT_SEASON}/{CURRENT_SEASON + 1}
					</p>
				</div>
			</header>

			{/* Content */}
			<main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{error ? (
					<div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
						<h2 className="mb-2 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
							⚠️ API Configuration Required
						</h2>
						<p className="mb-4 text-yellow-700 dark:text-yellow-300">
							To display real standings data, you need to configure your API key:
						</p>
						<ol className="list-inside list-decimal space-y-2 text-yellow-700 dark:text-yellow-300">
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
								<code className="rounded bg-yellow-200 px-1 dark:bg-yellow-800">
									.env.local
								</code>{' '}
								file
							</li>
							<li>Restart the development server</li>
						</ol>
						<p className="mt-4 text-sm text-yellow-600 dark:text-yellow-400">
							Error: {error}
						</p>
					</div>
				) : standings && standings.length > 0 ? (
					<div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
						<div className="p-6">
							<StandingsTable standings={standings} />
						</div>
					</div>
				) : (
					<div className="rounded-xl bg-white p-8 text-center shadow-lg dark:bg-gray-800">
						<p className="text-gray-500 dark:text-gray-400">
							No standings data available for this league.
						</p>
					</div>
				)}

				{/* Legend */}
				<div className="mt-8 rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
					<h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Legend</h3>
					<div className="flex flex-wrap gap-6 text-sm">
						<div className="flex items-center gap-2">
							<span className="h-6 w-6 rounded-full bg-green-500" />
							<span className="text-gray-600 dark:text-gray-400">
								Champions League
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="h-6 w-6 rounded-full bg-red-500" />
							<span className="text-gray-600 dark:text-gray-400">Relegation</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="flex h-5 w-5 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
								W
							</span>
							<span className="text-gray-600 dark:text-gray-400">Win</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="flex h-5 w-5 items-center justify-center rounded bg-gray-400 text-xs font-bold text-white">
								D
							</span>
							<span className="text-gray-600 dark:text-gray-400">Draw</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="flex h-5 w-5 items-center justify-center rounded bg-red-500 text-xs font-bold text-white">
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

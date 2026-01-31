import {
	getStandings,
	getLeagueSeasons,
	POPULAR_LEAGUES,
	CURRENT_SEASON,
	LEAGUES_BY_CONTINENT,
	type LeagueInfo,
} from '@/lib/api';
import { COMPETITION_HISTORY, calculateTitlesCount } from '@/data';
import { StandingsTable } from '@/components/football';
import Link from 'next/link';

interface LeaguePageProps {
	params: Promise<{
		id: string;
	}>;
}

// Find league info from LEAGUES_BY_CONTINENT
function findLeagueInfo(leagueId: number): LeagueInfo | null {
	for (const continent of Object.values(LEAGUES_BY_CONTINENT)) {
		const league = continent.leagues.find((l) => l.id === leagueId);

		if (league) {
			return league;
		}
	}
	return null;
}

const LEAGUE_NAMES: Record<number, string> = {
	[POPULAR_LEAGUES.PREMIER_LEAGUE]: 'Premier League',
	[POPULAR_LEAGUES.LA_LIGA]: 'La Liga',
	[POPULAR_LEAGUES.SERIE_A]: 'Serie A',
	[POPULAR_LEAGUES.BUNDESLIGA]: 'Bundesliga',
	[POPULAR_LEAGUES.LIGUE_1]: 'Ligue 1',
	[POPULAR_LEAGUES.CHAMPIONS_LEAGUE]: 'UEFA Champions League',
	[POPULAR_LEAGUES.EUROPA_LEAGUE]: 'UEFA Europa League',
	[POPULAR_LEAGUES.EUROPA_CONFERENCE_LEAGUE]: 'UEFA Europa Conference League',
	[POPULAR_LEAGUES.MLS]: 'MLS',
	[POPULAR_LEAGUES.LIGA_MX]: 'Liga MX',
	[POPULAR_LEAGUES.ARGENTINA_PRIMERA]: 'Liga Profesional Argentina',
	[POPULAR_LEAGUES.BRASIL_SERIE_A]: 'Brasileirão Série A',
	[POPULAR_LEAGUES.SAUDI_PRO_LEAGUE]: 'Saudi Pro League',
	[POPULAR_LEAGUES.COPA_LIBERTADORES]: 'Copa Libertadores',
	[POPULAR_LEAGUES.COPA_SUDAMERICANA]: 'Copa Sudamericana',
	[POPULAR_LEAGUES.AFC_CHAMPIONS_LEAGUE]: 'AFC Champions League',
	[POPULAR_LEAGUES.CAF_CHAMPIONS_LEAGUE]: 'CAF Champions League',
	[POPULAR_LEAGUES.CONCACAF_CHAMPIONS_LEAGUE]: 'CONCACAF Champions Cup',
	[POPULAR_LEAGUES.WORLD_CUP]: 'FIFA World Cup',
	[POPULAR_LEAGUES.EURO]: 'UEFA European Championship',
	[POPULAR_LEAGUES.COPA_AMERICA]: 'Copa América',
	[POPULAR_LEAGUES.AFRICA_CUP]: 'Africa Cup of Nations',
	[POPULAR_LEAGUES.ASIA_CUP]: 'AFC Asian Cup',
	[POPULAR_LEAGUES.CONCACAF_GOLD_CUP]: 'CONCACAF Gold Cup',
};

export default async function LeaguePage({ params }: LeaguePageProps) {
	const { id } = await params;
	const leagueId = parseInt(id);
	const leagueName = LEAGUE_NAMES[leagueId] || `League ${leagueId}`;
	const leagueInfo = findLeagueInfo(leagueId);
	const isNational = leagueInfo?.type === 'national';

	// Check if this competition has historical data
	const competitionHistory = COMPETITION_HISTORY[leagueId];
	const titlesRanking = competitionHistory ? calculateTitlesCount(competitionHistory) : null;

	let standings;
	let seasons: number[] = [];
	let error = null;

	try {
		// Get available seasons
		seasons = await getLeagueSeasons(leagueId);

		// Only fetch standings for club leagues (not national team competitions)
		if (!isNational) {
			standings = await getStandings(leagueId, CURRENT_SEASON);
		}
	} catch (e) {
		error = e instanceof Error ? e.message : 'Failed to fetch data';
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			{/* Header */}
			<header
				className={`relative overflow-hidden ${
					isNational
						? 'bg-gradient-to-r from-amber-500 via-orange-500 to-red-500'
						: 'bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500'
				}`}
			>
				<div className="absolute inset-0 bg-black/10" />
				<div className="absolute inset-0 bg-[url('/stadium-pattern.png')] opacity-5" />

				<div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
					<Link
						className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/30"
						href="/"
					>
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M15 19l-7-7 7-7"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
							/>
						</svg>
						Back to Home
					</Link>

					<div className="flex items-center gap-4">
						<span className="text-5xl">{leagueInfo?.emoji || '🏆'}</span>
						<div>
							<h1 className="text-4xl font-extrabold text-white md:text-5xl">
								{leagueName}
							</h1>
							<div className="mt-2 flex items-center gap-3">
								<span className="text-white/80">{leagueInfo?.country}</span>
								<span
									className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${
										isNational
											? 'bg-white/20 text-white'
											: 'bg-white/20 text-white'
									}`}
								>
									{isNational ? '🏳️ National Teams' : '⚽ Club Competition'}
								</span>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Content */}
			<main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
				{/* Tabs / Navigation */}
				<div className="mb-8 flex flex-wrap gap-4">
					{!isNational && (
						<a
							className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:text-gray-200"
							href="#standings"
						>
							📊 Current Standings
						</a>
					)}
					{competitionHistory && (
						<>
							<a
								className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:text-gray-200"
								href="#history"
							>
								📅 Edition History
							</a>
							<a
								className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:text-gray-200"
								href="#titles"
							>
								🏆 Titles Ranking
							</a>
						</>
					)}
					{seasons.length > 0 && (
						<a
							className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-gray-700 shadow-md transition-all hover:shadow-lg dark:bg-gray-800 dark:text-gray-200"
							href="#seasons"
						>
							📆 Available Seasons
						</a>
					)}
				</div>

				{/* Available Seasons */}
				{seasons.length > 0 && (
					<section className="mb-10" id="seasons">
						<div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
							<h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
								<span>📆</span> Available Seasons/Editions
							</h2>
							<div className="flex flex-wrap gap-2">
								{seasons.slice(0, 30).map((season) => (
									<span
										key={season}
										className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
											season === CURRENT_SEASON
												? isNational
													? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
													: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
												: 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
										}`}
									>
										{isNational
											? season
											: `${season}/${(season + 1).toString().slice(-2)}`}
									</span>
								))}
								{seasons.length > 30 && (
									<span className="px-3 py-1.5 text-sm text-gray-500">
										+{seasons.length - 30} more
									</span>
								)}
							</div>
						</div>
					</section>
				)}

				{/* Current Standings (only for club competitions) */}
				{!isNational && (
					<section className="mb-10" id="standings">
						<h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
							<span>📊</span> Current Standings ({CURRENT_SEASON}/{CURRENT_SEASON + 1}
							)
						</h2>
						{error ? (
							<div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-900/20">
								<h3 className="mb-2 text-lg font-semibold text-yellow-800 dark:text-yellow-200">
									⚠️ API Configuration Required
								</h3>
								<p className="mb-4 text-yellow-700 dark:text-yellow-300">
									To display real standings data, you need to configure your API
									key:
								</p>
								<ol className="list-inside list-decimal space-y-2 text-yellow-700 dark:text-yellow-300">
									<li>
										Get a free API key from{' '}
										<a
											className="underline hover:no-underline"
											href="https://rapidapi.com/api-sports/api/api-football"
											rel="noopener noreferrer"
											target="_blank"
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
							</div>
						) : standings && standings.length > 0 ? (
							<div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
								<div className="p-6">
									<StandingsTable standings={standings} />
								</div>
							</div>
						) : (
							<div className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-800">
								<p className="text-gray-500 dark:text-gray-400">
									No standings data available for this league.
								</p>
							</div>
						)}
					</section>
				)}

				{/* Competition History */}
				{competitionHistory && (
					<>
						{/* Titles Ranking */}
						<section className="mb-10" id="titles">
							<h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
								<span>🏆</span> All-Time Titles Ranking
							</h2>
							<div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead
											className={`${
												isNational
													? 'bg-gradient-to-r from-amber-500 to-orange-500'
													: 'bg-gradient-to-r from-blue-500 to-cyan-500'
											} text-white`}
										>
											<tr>
												<th className="px-6 py-4 text-left text-sm font-semibold">
													#
												</th>
												<th className="px-6 py-4 text-left text-sm font-semibold">
													{isNational ? 'Nation' : 'Team'}
												</th>
												<th className="px-6 py-4 text-center text-sm font-semibold">
													🥇 Titles
												</th>
												<th className="px-6 py-4 text-center text-sm font-semibold">
													🥈 Runner-ups
												</th>
												<th className="px-6 py-4 text-center text-sm font-semibold">
													Finals
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-100 dark:divide-gray-700">
											{titlesRanking?.slice(0, 15).map((team, index) => (
												<tr
													key={team.name}
													className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
														index < 3 ? 'bg-gradient-to-r' : ''
													} ${index === 0 ? 'from-yellow-50 to-transparent dark:from-yellow-900/20' : ''} ${index === 1 ? 'from-gray-100 to-transparent dark:from-gray-600/20' : ''} ${index === 2 ? 'from-amber-50 to-transparent dark:from-amber-900/20' : ''}`}
												>
													<td className="px-6 py-4">
														<span
															className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
																index === 0
																	? 'bg-yellow-400 text-yellow-900'
																	: index === 1
																		? 'bg-gray-300 text-gray-700'
																		: index === 2
																			? 'bg-amber-400 text-amber-900'
																			: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
															}`}
														>
															{index + 1}
														</span>
													</td>
													<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
														{team.name}
													</td>
													<td className="px-6 py-4 text-center">
														<span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-full bg-yellow-100 px-3 py-1 font-bold text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
															{team.titles}
														</span>
													</td>
													<td className="px-6 py-4 text-center">
														<span className="inline-flex min-w-[2.5rem] items-center justify-center rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
															{team.runnerUps}
														</span>
													</td>
													<td className="px-6 py-4 text-center">
														<span className="font-medium text-gray-700 dark:text-gray-300">
															{team.total}
														</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</section>

						{/* Edition History */}
						<section className="mb-10" id="history">
							<h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
								<span>📅</span> Edition History
							</h2>
							<div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
								<div className="overflow-x-auto">
									<table className="w-full">
										<thead
											className={`${
												isNational
													? 'bg-gradient-to-r from-amber-500 to-orange-500'
													: 'bg-gradient-to-r from-blue-500 to-cyan-500'
											} text-white`}
										>
											<tr>
												<th className="px-6 py-4 text-left text-sm font-semibold">
													Year
												</th>
												{isNational && (
													<th className="px-6 py-4 text-left text-sm font-semibold">
														Host
													</th>
												)}
												<th className="px-6 py-4 text-left text-sm font-semibold">
													🥇 Winner
												</th>
												<th className="px-6 py-4 text-left text-sm font-semibold">
													🥈 Runner-up
												</th>
												<th className="px-6 py-4 text-left text-sm font-semibold">
													Final Score
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-100 dark:divide-gray-700">
											{competitionHistory.editions.map((edition, index) => (
												<tr
													key={edition.year}
													className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
														index === 0
															? 'bg-gradient-to-r from-yellow-50 to-transparent dark:from-yellow-900/10'
															: ''
													}`}
												>
													<td className="px-6 py-4">
														<span
															className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-bold ${
																index === 0
																	? isNational
																		? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
																		: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
																	: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
															}`}
														>
															{edition.year}
														</span>
													</td>
													{isNational && (
														<td className="px-6 py-4 text-gray-600 dark:text-gray-400">
															{edition.host}
														</td>
													)}
													<td className="px-6 py-4">
														<span className="font-semibold text-gray-900 dark:text-white">
															{edition.winner}
														</span>
													</td>
													<td className="px-6 py-4 text-gray-600 dark:text-gray-400">
														{edition.runnerUp}
													</td>
													<td className="px-6 py-4">
														<span className="rounded bg-gray-100 px-2 py-1 font-mono text-sm text-gray-700 dark:bg-gray-700 dark:text-gray-300">
															{edition.finalScore}
														</span>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</section>
					</>
				)}

				{/* Legend for Standings */}
				{!isNational && standings && standings.length > 0 && (
					<div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-gray-800">
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
				)}
			</main>
		</div>
	);
}

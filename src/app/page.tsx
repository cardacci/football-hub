/* ===== Imports ===== */
import Link from 'next/link';
import { type Continent, LEAGUES_BY_CONTINENT } from '@/lib/api';

/* ===== Constants & Enums ===== */
const CONTINENT_ORDER: Continent[] = [
	'africa',
	'asia',
	'europe',
	'international',
	'north-america',
	'south-america',
];

/* ===== Component Function ===== */
export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
			{/* Hero Section */}
			<header className="relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 opacity-90" />

				<div className="absolute inset-0 bg-[url('/stadium-pattern.png')] opacity-10" />

				<div className="relative mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
					<h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
						⚽ Football Hub
					</h1>

					<p className="mx-auto mb-8 max-w-2xl text-xl text-green-100 md:text-2xl">
						Your gateway to real-time football data. Explore leagues, standings,
						fixtures, and more!
					</p>

					<div className="flex flex-col justify-center gap-4 sm:flex-row">
						<Link
							className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg transition-colors hover:bg-green-50 hover:shadow-xl"
							href="/leagues"
						>
							Explore Leagues
							<svg
								className="ml-2 h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									d="M13 7l5 5m0 0l-5 5m5-5H6"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
								/>
							</svg>
						</Link>

						<Link
							className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
							href="/fixtures"
						>
							View Fixtures
						</Link>
					</div>
				</div>
			</header>

			{/* Featured Leagues */}
			<main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<section className="mb-16">
					<h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
						Leagues by Continent
					</h2>

					{/* Legend */}
					<div className="mb-8 flex flex-wrap items-center justify-center gap-6">
						<div className="flex items-center gap-2">
							<span className="inline-flex h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
							<span className="text-sm text-gray-600 dark:text-gray-400">
								Club Competitions
							</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="inline-flex h-3 w-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
							<span className="text-sm text-gray-600 dark:text-gray-400">
								National Team Competitions
							</span>
						</div>
					</div>

					<div className="space-y-16">
						{CONTINENT_ORDER.map((continentKey) => {
							const continent = LEAGUES_BY_CONTINENT[continentKey];
							return (
								<div key={continentKey}>
									<div className="mb-6 flex items-center gap-3">
										<span className="text-3xl">{continent.emoji}</span>
										<h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
											{continent.name}
										</h3>
										<div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700" />
									</div>
									<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
										{continent.leagues.map((league) => {
											const isNational = league.type === 'national';
											return (
												<Link
													key={league.id}
													className={`group relative overflow-hidden rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
														isNational
															? 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500'
															: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500'
													}`}
													href={`/leagues/${league.id}`}
												>
													<div className="group-hover:bg-opacity-95 dark:group-hover:bg-opacity-95 relative h-full rounded-2xl bg-white p-5 transition-all duration-300 dark:bg-gray-800">
														{/* Glow effect */}
														<div
															className={`absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40 ${
																isNational
																	? 'bg-amber-500'
																	: 'bg-blue-500'
															}`}
														/>

														<div className="relative flex items-center gap-4">
															{/* Emoji with animated background */}
															<div
																className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl transition-transform duration-300 group-hover:scale-110 ${
																	isNational
																		? 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30'
																		: 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30'
																}`}
															>
																{league.emoji}
															</div>

															<div className="min-w-0 flex-1">
																<h4 className="truncate text-lg font-bold text-gray-900 transition-colors group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-100">
																	{league.name}
																</h4>

																<div className="mt-1 flex items-center gap-2">
																	<p className="text-sm text-gray-500 dark:text-gray-400">
																		{league.country}
																	</p>
																	<span
																		className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${
																			isNational
																				? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400'
																				: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'
																		}`}
																	>
																		{isNational
																			? '🏳️ Nations'
																			: '⚽ Clubs'}
																	</span>
																</div>
															</div>

															{/* Arrow */}
															<div
																className={`transition-all duration-300 group-hover:translate-x-1 ${
																	isNational
																		? 'text-amber-400'
																		: 'text-blue-400'
																}`}
															>
																<svg
																	className="h-5 w-5"
																	fill="none"
																	stroke="currentColor"
																	viewBox="0 0 24 24"
																>
																	<path
																		d="M9 5l7 7-7 7"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={2}
																	/>
																</svg>
															</div>
														</div>
													</div>
												</Link>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</section>

				{/* Features Section */}
				<section className="mb-16">
					<h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
						Features
					</h2>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						<div className="rounded-2xl bg-white p-8 text-center shadow-md dark:bg-gray-800">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
								<span className="text-3xl">📊</span>
							</div>

							<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
								Live Standings
							</h3>

							<p className="text-gray-500 dark:text-gray-400">
								Real-time league tables with complete statistics
							</p>
						</div>
						<div className="rounded-2xl bg-white p-8 text-center shadow-md dark:bg-gray-800">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
								<span className="text-3xl">📅</span>
							</div>
							<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
								Match Fixtures
							</h3>
							<p className="text-gray-500 dark:text-gray-400">
								Upcoming matches and live scores from top leagues
							</p>
						</div>
						<div className="rounded-2xl bg-white p-8 text-center shadow-md dark:bg-gray-800">
							<div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
								<span className="text-3xl">🏟️</span>
							</div>
							<h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
								Team Info
							</h3>
							<p className="text-gray-500 dark:text-gray-400">
								Detailed information about teams and venues
							</p>
						</div>
					</div>
				</section>

				{/* API Info */}
				<section className="rounded-2xl bg-gray-900 p-8 text-center dark:bg-gray-800">
					<h2 className="mb-4 text-2xl font-bold text-white">Powered by Real Data</h2>
					<p className="mx-auto mb-6 max-w-2xl text-gray-300">
						This project uses the API-Football service to fetch real football data. To
						use the API features, you&apos;ll need to configure your API key.
					</p>
					<a
						className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
						href="https://rapidapi.com/api-sports/api/api-football"
						rel="noopener noreferrer"
						target="_blank"
					>
						Get API Key
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
							/>
						</svg>
					</a>
				</section>
			</main>

			{/* Footer */}
			<footer className="mt-16 border-t border-gray-200 dark:border-gray-700">
				<div className="mx-auto max-w-7xl px-4 py-8 text-center text-gray-500 sm:px-6 lg:px-8 dark:text-gray-400">
					<p>
						Built with{' '}
						<a
							className="text-green-600 hover:underline"
							href="https://nextjs.org"
							rel="noopener noreferrer"
							target="_blank"
						>
							Next.js
						</a>{' '}
						and{' '}
						<a
							className="text-green-600 hover:underline"
							href="https://tailwindcss.com"
							rel="noopener noreferrer"
							target="_blank"
						>
							Tailwind CSS
						</a>
					</p>
				</div>
			</footer>
		</div>
	);
}

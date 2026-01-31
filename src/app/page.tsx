import Link from 'next/link';
import { LEAGUES_BY_CONTINENT, type Continent } from '@/lib/api';

export default function Home() {
	const continentOrder: Continent[] = [
		'europe',
		'south-america',
		'north-america',
		'asia',
		'international',
	];

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
							href="/leagues"
							className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-lg transition-colors hover:bg-green-50 hover:shadow-xl"
						>
							Explore Leagues
							<svg
								className="ml-2 h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</Link>

						<Link
							href="/fixtures"
							className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
						>
							View Fixtures
						</Link>
					</div>
				</div>
			</header>

			{/* Featured Leagues */}
			<main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
				<section className="mb-16">
					<h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
						Leagues by Continent
					</h2>

					<div className="space-y-12">
						{continentOrder.map((continentKey) => {
							const continent = LEAGUES_BY_CONTINENT[continentKey];
							return (
								<div key={continentKey}>
									<h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-800 dark:text-gray-200">
										<span className="text-2xl">{continent.emoji}</span>
										{continent.name}
									</h3>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{continent.leagues.map((league) => (
											<Link
												key={league.id}
												href={`/leagues/${league.id}`}
												className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-green-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-500"
											>
												<div className="flex items-center gap-4">
													<span className="text-4xl">{league.emoji}</span>

													<div>
														<h4 className="text-xl font-bold text-gray-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
															{league.name}
														</h4>

														<p className="text-gray-500 dark:text-gray-400">
															{league.country}
														</p>
													</div>
												</div>
											</Link>
										))}
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
						href="https://rapidapi.com/api-sports/api/api-football"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
					>
						Get API Key
						<svg
							className="h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
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
							href="https://nextjs.org"
							className="text-green-600 hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Next.js
						</a>{' '}
						and{' '}
						<a
							href="https://tailwindcss.com"
							className="text-green-600 hover:underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Tailwind CSS
						</a>
					</p>
				</div>
			</footer>
		</div>
	);
}

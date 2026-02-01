import { type Fixture } from '@/lib/api';
import Image from 'next/image';

interface FixtureCardProps {
	fixture: Fixture;
}

export function FixtureCard({ fixture }: FixtureCardProps) {
	/* ===== Constants ===== */
	const isLive =
		fixture.fixture.status.short === 'LIVE' ||
		fixture.fixture.status.short === '1H' ||
		fixture.fixture.status.short === '2H' ||
		fixture.fixture.status.short === 'HT';
	const isFinished =
		fixture.fixture.status.short === 'FT' ||
		fixture.fixture.status.short === 'AET' ||
		fixture.fixture.status.short === 'PEN';

	/* ===== Functions ===== */
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			day: 'numeric',
			month: 'short',
			weekday: 'short',
		});
	};

	const formatTime = (dateString: string) => {
		const date = new Date(dateString);

		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	return (
		<div className="rounded-xl border border-gray-100 bg-white p-4 shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
			{/* League Info */}
			<div className="mb-3 flex items-center gap-2 border-b border-gray-100 pb-2 dark:border-gray-700">
				<Image
					alt={fixture.league.name}
					className="object-contain"
					height={20}
					src={fixture.league.logo}
					width={20}
				/>

				<span className="text-xs text-gray-500 dark:text-gray-400">
					{fixture.league.name} • {fixture.league.round}
				</span>
			</div>

			{/* Match Status */}
			<div className="mb-3 text-center">
				{isLive ? (
					<span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-600 dark:bg-red-900/30 dark:text-red-400">
						<span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
						LIVE {fixture.fixture.status.elapsed}&apos;
					</span>
				) : isFinished ? (
					<span className="text-xs font-medium text-gray-500 dark:text-gray-400">
						Full Time
					</span>
				) : (
					<div className="text-xs text-gray-500 dark:text-gray-400">
						<div>{formatDate(fixture.fixture.date)}</div>

						<div className="font-semibold text-gray-700 dark:text-gray-300">
							{formatTime(fixture.fixture.date)}
						</div>
					</div>
				)}
			</div>

			{/* Teams */}
			<div className="flex items-center justify-between gap-4">
				{/* Home Team */}
				<div className="flex-1 text-center">
					<div className="flex flex-col items-center gap-2">
						<Image
							alt={fixture.teams.home.name}
							className="object-contain"
							height={48}
							src={fixture.teams.home.logo}
							width={48}
						/>

						<span className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
							{fixture.teams.home.name}
						</span>
					</div>
				</div>

				{/* Score */}
				<div className="flex items-center gap-2">
					<span
						className={`text-2xl font-bold ${
							fixture.teams.home.winner
								? 'text-green-600 dark:text-green-400'
								: 'text-gray-900 dark:text-white'
						}`}
					>
						{fixture.goals.home ?? '-'}
					</span>

					<span className="text-gray-400">:</span>

					<span
						className={`text-2xl font-bold ${
							fixture.teams.away.winner
								? 'text-green-600 dark:text-green-400'
								: 'text-gray-900 dark:text-white'
						}`}
					>
						{fixture.goals.away ?? '-'}
					</span>
				</div>

				{/* Away Team */}
				<div className="flex-1 text-center">
					<div className="flex flex-col items-center gap-2">
						<Image
							alt={fixture.teams.away.name}
							className="object-contain"
							height={48}
							src={fixture.teams.away.logo}
							width={48}
						/>

						<span className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
							{fixture.teams.away.name}
						</span>
					</div>
				</div>
			</div>

			{/* Venue */}
			{fixture.fixture.venue.name && (
				<div className="mt-3 border-t border-gray-100 pt-2 text-center dark:border-gray-700">
					<span className="text-xs text-gray-400">
						📍 {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
					</span>
				</div>
			)}
		</div>
	);
}

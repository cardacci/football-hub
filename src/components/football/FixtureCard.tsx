import { Fixture } from '@/lib/api';
import Image from 'next/image';

interface FixtureCardProps {
	fixture: Fixture;
}

export function FixtureCard({ fixture }: FixtureCardProps) {
	const isLive =
		fixture.fixture.status.short === 'LIVE' ||
		fixture.fixture.status.short === '1H' ||
		fixture.fixture.status.short === '2H' ||
		fixture.fixture.status.short === 'HT';

	const isFinished =
		fixture.fixture.status.short === 'FT' ||
		fixture.fixture.status.short === 'AET' ||
		fixture.fixture.status.short === 'PEN';

	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			month: 'short',
			day: 'numeric',
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
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 border border-gray-100 dark:border-gray-700">
			{/* League Info */}
			<div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
				<Image
					src={fixture.league.logo}
					alt={fixture.league.name}
					width={20}
					height={20}
					className="object-contain"
				/>
				<span className="text-xs text-gray-500 dark:text-gray-400">
					{fixture.league.name} • {fixture.league.round}
				</span>
			</div>

			{/* Match Status */}
			<div className="text-center mb-3">
				{isLive ? (
					<span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full">
						<span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
						LIVE {fixture.fixture.status.elapsed}&apos;
					</span>
				) : isFinished ? (
					<span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
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
							src={fixture.teams.home.logo}
							alt={fixture.teams.home.name}
							width={48}
							height={48}
							className="object-contain"
						/>
						<span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
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
							src={fixture.teams.away.logo}
							alt={fixture.teams.away.name}
							width={48}
							height={48}
							className="object-contain"
						/>
						<span className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
							{fixture.teams.away.name}
						</span>
					</div>
				</div>
			</div>

			{/* Venue */}
			{fixture.fixture.venue.name && (
				<div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 text-center">
					<span className="text-xs text-gray-400">
						📍 {fixture.fixture.venue.name}, {fixture.fixture.venue.city}
					</span>
				</div>
			)}
		</div>
	);
}

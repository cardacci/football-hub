import { type League } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

interface LeagueCardProps {
	league: League;
}

export function LeagueCard({ league }: LeagueCardProps) {
	const currentSeason = league.seasons.find((s) => s.current);

	return (
		<Link
			href={`/leagues/${league.league.id}`}
			className="group block rounded-xl border border-gray-100 bg-white p-6 shadow-md transition-all duration-300 hover:border-green-500 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-500"
		>
			<div className="flex items-center gap-4">
				{/* League Logo */}
				<div className="relative h-16 w-16 flex-shrink-0">
					<Image
						src={league.league.logo}
						alt={league.league.name}
						fill
						className="object-contain transition-transform duration-300 group-hover:scale-110"
					/>
				</div>

				{/* League Info */}
				<div className="min-w-0 flex-1">
					<h3 className="truncate text-lg font-bold text-gray-900 transition-colors group-hover:text-green-600 dark:text-white dark:group-hover:text-green-400">
						{league.league.name}
					</h3>
					<div className="mt-1 flex items-center gap-2">
						{league.country.flag && (
							<Image
								src={league.country.flag}
								alt={league.country.name}
								width={20}
								height={14}
								className="rounded object-contain"
							/>
						)}
						<span className="text-sm text-gray-500 dark:text-gray-400">
							{league.country.name}
						</span>
					</div>
					{currentSeason && (
						<span className="mt-2 inline-block rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
							Season {currentSeason.year}
						</span>
					)}
				</div>

				{/* Arrow */}
				<div className="text-gray-300 transition-colors group-hover:text-green-500 dark:text-gray-600">
					<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</div>
			</div>

			{/* League Type Badge */}
			<div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700">
				<span
					className={`inline-block rounded px-2 py-1 text-xs font-medium ${
						league.league.type === 'League'
							? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
							: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
					}`}
				>
					{league.league.type}
				</span>
			</div>
		</Link>
	);
}

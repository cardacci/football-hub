import { type League } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

interface LeagueCardProps {
	league: League;
	variant?: 'clubs' | 'national';
}

export function LeagueCard({ league, variant = 'clubs' }: LeagueCardProps) {
	const currentSeason = league.seasons.find((s) => s.current);
	const isNational = variant === 'national';

	return (
		<Link
			href={`/leagues/${league.league.id}`}
			className={`group relative block overflow-hidden rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
				isNational
					? 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500'
					: 'bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500'
			}`}
		>
			<div className="group-hover:bg-opacity-95 dark:group-hover:bg-opacity-95 relative h-full rounded-2xl bg-white p-6 transition-all duration-300 dark:bg-gray-800">
				{/* Glow effect */}
				<div
					className={`absolute -top-8 -right-8 h-32 w-32 rounded-full opacity-20 blur-3xl transition-opacity duration-300 group-hover:opacity-40 ${
						isNational ? 'bg-amber-500' : 'bg-blue-500'
					}`}
				/>

				<div className="relative flex items-center gap-4">
					{/* League Logo */}
					<div
						className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl p-2 transition-transform duration-300 group-hover:scale-110 ${
							isNational
								? 'bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20'
								: 'bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20'
						}`}
					>
						<Image
							src={league.league.logo}
							alt={league.league.name}
							fill
							className="object-contain p-1"
						/>
					</div>

					{/* League Info */}
					<div className="min-w-0 flex-1">
						<h3 className="truncate text-lg font-bold text-gray-900 transition-colors dark:text-white">
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
							<span
								className={`mt-2 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
									isNational
										? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
										: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
								}`}
							>
								Season {currentSeason.year}
							</span>
						)}
					</div>

					{/* Arrow */}
					<div
						className={`transition-all duration-300 group-hover:translate-x-1 ${
							isNational ? 'text-amber-400' : 'text-blue-400'
						}`}
					>
						<svg
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
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
				<div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700/50">
					<span
						className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
							league.league.type === 'League'
								? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
								: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
						}`}
					>
						{league.league.type === 'League' ? '📊' : '🏆'} {league.league.type}
					</span>
					<span
						className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
							isNational
								? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
								: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
						}`}
					>
						{isNational ? '🏳️ Nations' : '⚽ Clubs'}
					</span>
				</div>
			</div>
		</Link>
	);
}

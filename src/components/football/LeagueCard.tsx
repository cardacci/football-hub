import { League } from '@/lib/api';
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
      className="group block bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500"
    >
      <div className="flex items-center gap-4">
        {/* League Logo */}
        <div className="relative w-16 h-16 flex-shrink-0">
          <Image
            src={league.league.logo}
            alt={league.league.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* League Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
            {league.league.name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            {league.country.flag && (
              <Image
                src={league.country.flag}
                alt={league.country.name}
                width={20}
                height={14}
                className="object-contain rounded"
              />
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {league.country.name}
            </span>
          </div>
          {currentSeason && (
            <span className="inline-block mt-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded">
              Season {currentSeason.year}
            </span>
          )}
        </div>

        {/* Arrow */}
        <div className="text-gray-300 dark:text-gray-600 group-hover:text-green-500 transition-colors">
          <svg
            className="w-6 h-6"
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
      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
            league.league.type === 'League'
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
          }`}
        >
          {league.league.type}
        </span>
      </div>
    </Link>
  );
}

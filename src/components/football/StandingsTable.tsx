/* ===== Imports ===== */
import Image from 'next/image';
import { type Standing } from '@/lib/api';

/* ===== Types & Interfaces ===== */
interface StandingsTableProps {
	leagueName?: string;
	standings: Standing[];
}

/* ===== Component Function ===== */
export function StandingsTable({ leagueName, standings }: StandingsTableProps) {
	if (standings.length === 0) {
		return <div className="py-8 text-center text-gray-500">No standings data available</div>;
	}

	return (
		<div className="overflow-x-auto">
			{leagueName && (
				<h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
					{leagueName}
				</h2>
			)}
			<table className="w-full text-left text-sm">
				<thead className="bg-gray-100 text-xs text-gray-700 uppercase dark:bg-gray-800 dark:text-gray-400">
					<tr>
						<th className="w-12 px-4 py-3" scope="col">
							#
						</th>
						<th className="px-4 py-3" scope="col">
							Team
						</th>
						<th className="px-4 py-3 text-center" scope="col">
							P
						</th>
						<th className="px-4 py-3 text-center" scope="col">
							W
						</th>
						<th className="px-4 py-3 text-center" scope="col">
							D
						</th>
						<th className="px-4 py-3 text-center" scope="col">
							L
						</th>
						<th className="px-4 py-3 text-center" scope="col">
							GF
						</th>
						<th className="px-4 py-3 text-center" scope="col">
							GA
						</th>
						<th className="px-4 py-3 text-center" scope="col">
							GD
						</th>
						<th className="px-4 py-3 text-center font-bold" scope="col">
							Pts
						</th>
						<th className="px-4 py-3 text-center" scope="col">
							Form
						</th>
					</tr>
				</thead>
				<tbody>
					{standings.map((team) => (
						<tr
							key={team.team.id}
							className="border-b bg-white transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
						>
							<td className="px-4 py-3 font-medium">
								<span
									className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
										team.rank <= 4
											? 'bg-green-500 text-white'
											: team.rank >= standings.length - 2
												? 'bg-red-500 text-white'
												: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
									}`}
								>
									{team.rank}
								</span>
							</td>
							<td className="px-4 py-3">
								<div className="flex items-center gap-3">
									<Image
										alt={team.team.name}
										className="object-contain"
										height={24}
										src={team.team.logo}
										width={24}
									/>
									<span className="font-medium text-gray-900 dark:text-white">
										{team.team.name}
									</span>
								</div>
							</td>
							<td className="px-4 py-3 text-center">{team.all.played}</td>
							<td className="px-4 py-3 text-center text-green-600 dark:text-green-400">
								{team.all.win}
							</td>
							<td className="px-4 py-3 text-center text-gray-500">{team.all.draw}</td>
							<td className="px-4 py-3 text-center text-red-600 dark:text-red-400">
								{team.all.lose}
							</td>
							<td className="px-4 py-3 text-center">{team.all.goals.for}</td>
							<td className="px-4 py-3 text-center">{team.all.goals.against}</td>
							<td className="px-4 py-3 text-center font-medium">
								<span
									className={
										team.goalsDiff > 0
											? 'text-green-600 dark:text-green-400'
											: team.goalsDiff < 0
												? 'text-red-600 dark:text-red-400'
												: ''
									}
								>
									{team.goalsDiff > 0 ? '+' : ''}
									{team.goalsDiff}
								</span>
							</td>
							<td className="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">
								{team.points}
							</td>
							<td className="px-4 py-3">
								<div className="flex justify-center gap-1">
									{team.form?.split('').map((result, index) => (
										<span
											key={index}
											className={`flex h-5 w-5 items-center justify-center rounded text-xs font-bold text-white ${
												result === 'W'
													? 'bg-green-500'
													: result === 'D'
														? 'bg-gray-400'
														: 'bg-red-500'
											}`}
										>
											{result}
										</span>
									))}
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

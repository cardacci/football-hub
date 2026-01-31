import { Standing } from '@/lib/api';
import Image from 'next/image';

interface StandingsTableProps {
	standings: Standing[];
	leagueName?: string;
}

export function StandingsTable({ standings, leagueName }: StandingsTableProps) {
	if (standings.length === 0) {
		return <div className="text-center py-8 text-gray-500">No standings data available</div>;
	}

	return (
		<div className="overflow-x-auto">
			{leagueName && (
				<h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
					{leagueName}
				</h2>
			)}
			<table className="w-full text-sm text-left">
				<thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-4 py-3 w-12">
							#
						</th>
						<th scope="col" className="px-4 py-3">
							Team
						</th>
						<th scope="col" className="px-4 py-3 text-center">
							P
						</th>
						<th scope="col" className="px-4 py-3 text-center">
							W
						</th>
						<th scope="col" className="px-4 py-3 text-center">
							D
						</th>
						<th scope="col" className="px-4 py-3 text-center">
							L
						</th>
						<th scope="col" className="px-4 py-3 text-center">
							GF
						</th>
						<th scope="col" className="px-4 py-3 text-center">
							GA
						</th>
						<th scope="col" className="px-4 py-3 text-center">
							GD
						</th>
						<th scope="col" className="px-4 py-3 text-center font-bold">
							Pts
						</th>
						<th scope="col" className="px-4 py-3 text-center">
							Form
						</th>
					</tr>
				</thead>
				<tbody>
					{standings.map((team) => (
						<tr
							key={team.team.id}
							className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
						>
							<td className="px-4 py-3 font-medium">
								<span
									className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
										team.rank <= 4
											? 'bg-green-500 text-white'
											: team.rank >= standings.length - 2
												? 'bg-red-500 text-white'
												: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
									}`}
								>
									{team.rank}
								</span>
							</td>
							<td className="px-4 py-3">
								<div className="flex items-center gap-3">
									<Image
										src={team.team.logo}
										alt={team.team.name}
										width={24}
										height={24}
										className="object-contain"
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
								<div className="flex gap-1 justify-center">
									{team.form?.split('').map((result, index) => (
										<span
											key={index}
											className={`w-5 h-5 flex items-center justify-center rounded text-xs font-bold text-white ${
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

/**
 * Competition History Data
 *
 * This module loads and exports all competition history data from JSON files.
 * Data is separated by competition for better organization and maintainability.
 * Since these are historical records (champions never change), they are stored as static JSON.
 */

/* ===== Imports ===== */
import { POPULAR_LEAGUES } from '../lib/api/football';
import africaCupData from './competitions/africa-cup.json';
import asiaCupData from './competitions/asia-cup.json';
import championsLeagueData from './competitions/champions-league.json';
import copaAmericaData from './competitions/copa-america.json';
import copaLibertadoresData from './competitions/copa-libertadores.json';
import euroData from './competitions/euro.json';
import europaLeagueData from './competitions/europa-league.json';
import goldCupData from './competitions/gold-cup.json';
import worldCupData from './competitions/world-cup.json';

/* ===== Types & Interfaces ===== */
export interface CompetitionEdition {
	finalScore?: string;
	host?: string;
	runnerUp: string;
	runnerUpLogo?: string;
	winner: string;
	winnerLogo?: string;
	year: number | string;
}

export interface CompetitionHistory {
	editions: CompetitionEdition[];
	id: number;
	name: string;
	type: 'clubs' | 'national';
}

/* ===== Constants & Enums ===== */
export const COMPETITION_HISTORY: Record<number, CompetitionHistory> = {
	[POPULAR_LEAGUES.AFRICA_CUP]: africaCupData as CompetitionHistory,
	[POPULAR_LEAGUES.ASIA_CUP]: asiaCupData as CompetitionHistory,
	[POPULAR_LEAGUES.CHAMPIONS_LEAGUE]: championsLeagueData as CompetitionHistory,
	[POPULAR_LEAGUES.CONCACAF_GOLD_CUP]: goldCupData as CompetitionHistory,
	[POPULAR_LEAGUES.COPA_AMERICA]: copaAmericaData as CompetitionHistory,
	[POPULAR_LEAGUES.COPA_LIBERTADORES]: copaLibertadoresData as CompetitionHistory,
	[POPULAR_LEAGUES.EURO]: euroData as CompetitionHistory,
	[POPULAR_LEAGUES.EUROPA_LEAGUE]: europaLeagueData as CompetitionHistory,
	[POPULAR_LEAGUES.WORLD_CUP]: worldCupData as CompetitionHistory,
};

/* ===== Functions ===== */
/**
 * Calculate titles count from competition history
 */
export function calculateTitlesCount(history: CompetitionHistory): Array<{
	name: string;
	runnerUps: number;
	titles: number;
	total: number;
}> {
	const stats: Record<string, { runnerUps: number; titles: number }> = {};

	history.editions.forEach((edition) => {
		if (!stats[edition.winner]) {
			stats[edition.winner] = { runnerUps: 0, titles: 0 };
		}
		stats[edition.winner].titles++;

		if (!stats[edition.runnerUp]) {
			stats[edition.runnerUp] = { runnerUps: 0, titles: 0 };
		}
		stats[edition.runnerUp].runnerUps++;
	});

	return Object.entries(stats)
		.map(([name, data]) => ({
			name,
			runnerUps: data.runnerUps,
			titles: data.titles,
			total: data.titles + data.runnerUps,
		}))
		.sort((a, b) => b.titles - a.titles || b.runnerUps - a.runnerUps);
}

/**
 * Get all available competitions with history
 */
export function getAllCompetitionsWithHistory(): CompetitionHistory[] {
	return Object.values(COMPETITION_HISTORY);
}

/**
 * Get competition history by league ID
 */
export function getCompetitionHistory(leagueId: number): CompetitionHistory | null {
	return COMPETITION_HISTORY[leagueId] || null;
}

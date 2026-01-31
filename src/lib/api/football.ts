/**
 * Football API Service Layer
 *
 * This module provides a clean abstraction for connecting to the API-Football service.
 * Uses the free tier from api-football.com (RapidAPI) for real football data.
 *
 * Free tier includes:
 * - 100 requests/day
 * - Access to leagues, teams, players, fixtures, and standings
 */

const API_BASE_URL = 'https://api-football-v1.p.rapidapi.com/v3';

// Environment variables for API configuration
const API_KEY = process.env.FOOTBALL_API_KEY || '';
const API_HOST = 'api-football-v1.p.rapidapi.com';

/**
 * Base headers for API requests
 */
const getHeaders = (): HeadersInit => ({
	'x-rapidapi-key': API_KEY,
	'x-rapidapi-host': API_HOST,
});

/**
 * Generic fetch wrapper with error handling
 */
async function fetchFromAPI<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
	const url = new URL(`${API_BASE_URL}${endpoint}`);

	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			url.searchParams.append(key, value);
		});
	}

	const response = await fetch(url.toString(), {
		method: 'GET',
		headers: getHeaders(),
		next: { revalidate: 3600 }, // Cache for 1 hour
	});

	if (!response.ok) {
		throw new Error(`API Error: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	return data;
}

// =============================================================================
// TYPES
// =============================================================================

export interface League {
	league: {
		id: number;
		name: string;
		type: string;
		logo: string;
	};
	country: {
		name: string;
		code: string;
		flag: string;
	};
	seasons: Array<{
		year: number;
		start: string;
		end: string;
		current: boolean;
	}>;
}

export interface Team {
	team: {
		id: number;
		name: string;
		code: string;
		country: string;
		founded: number;
		national: boolean;
		logo: string;
	};
	venue: {
		id: number;
		name: string;
		address: string;
		city: string;
		capacity: number;
		surface: string;
		image: string;
	};
}

export interface Standing {
	rank: number;
	team: {
		id: number;
		name: string;
		logo: string;
	};
	points: number;
	goalsDiff: number;
	group: string;
	form: string;
	status: string;
	description: string;
	all: {
		played: number;
		win: number;
		draw: number;
		lose: number;
		goals: {
			for: number;
			against: number;
		};
	};
}

export interface Fixture {
	fixture: {
		id: number;
		referee: string;
		timezone: string;
		date: string;
		timestamp: number;
		venue: {
			id: number;
			name: string;
			city: string;
		};
		status: {
			long: string;
			short: string;
			elapsed: number;
		};
	};
	league: {
		id: number;
		name: string;
		country: string;
		logo: string;
		flag: string;
		season: number;
		round: string;
	};
	teams: {
		home: {
			id: number;
			name: string;
			logo: string;
			winner: boolean | null;
		};
		away: {
			id: number;
			name: string;
			logo: string;
			winner: boolean | null;
		};
	};
	goals: {
		home: number | null;
		away: number | null;
	};
	score: {
		halftime: { home: number | null; away: number | null };
		fulltime: { home: number | null; away: number | null };
		extratime: { home: number | null; away: number | null };
		penalty: { home: number | null; away: number | null };
	};
}

export interface APIResponse<T> {
	get: string;
	parameters: Record<string, string>;
	errors: Record<string, string> | string[];
	results: number;
	paging: {
		current: number;
		total: number;
	};
	response: T;
}

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Get available leagues
 * @param country - Optional country filter
 * @param season - Optional season year (e.g., 2024)
 */
export async function getLeagues(country?: string, season?: number): Promise<League[]> {
	const params: Record<string, string> = {};

	if (country) {
		params.country = country;
	}

	if (season) {
		params.season = season.toString();
	}

	const data = await fetchFromAPI<APIResponse<League[]>>('/leagues', params);

	return data.response;
}

/**
 * Get teams by league and season
 * @param leagueId - League ID
 * @param season - Season year (e.g., 2024)
 */
export async function getTeams(leagueId: number, season: number): Promise<Team[]> {
	const data = await fetchFromAPI<APIResponse<Team[]>>('/teams', {
		league: leagueId.toString(),
		season: season.toString(),
	});
	return data.response;
}

/**
 * Get team information by ID
 * @param teamId - Team ID
 */
export async function getTeamById(teamId: number): Promise<Team | null> {
	const data = await fetchFromAPI<APIResponse<Team[]>>('/teams', {
		id: teamId.toString(),
	});
	return data.response[0] || null;
}

/**
 * Get league standings
 * @param leagueId - League ID
 * @param season - Season year (e.g., 2024)
 */
export async function getStandings(leagueId: number, season: number): Promise<Standing[]> {
	const data = await fetchFromAPI<APIResponse<Array<{ league: { standings: Standing[][] } }>>>(
		'/standings',
		{
			league: leagueId.toString(),
			season: season.toString(),
		}
	);

	if (data.response.length > 0 && data.response[0].league.standings.length > 0) {
		return data.response[0].league.standings[0];
	}
	return [];
}

/**
 * Get fixtures/matches
 * @param options - Filter options
 */
export async function getFixtures(options: {
	leagueId?: number;
	season?: number;
	teamId?: number;
	date?: string; // YYYY-MM-DD format
	from?: string;
	to?: string;
	status?: 'NS' | 'LIVE' | 'FT' | 'PST' | 'CANC'; // Not Started, Live, Finished, Postponed, Cancelled
	last?: number;
	next?: number;
}): Promise<Fixture[]> {
	const params: Record<string, string> = {};

	if (options.leagueId) {
		params.league = options.leagueId.toString();
	}
	if (options.season) {
		params.season = options.season.toString();
	}
	if (options.teamId) {
		params.team = options.teamId.toString();
	}
	if (options.date) {
		params.date = options.date;
	}
	if (options.from) {
		params.from = options.from;
	}
	if (options.to) {
		params.to = options.to;
	}
	if (options.status) {
		params.status = options.status;
	}
	if (options.last) {
		params.last = options.last.toString();
	}
	if (options.next) {
		params.next = options.next.toString();
	}

	const data = await fetchFromAPI<APIResponse<Fixture[]>>('/fixtures', params);
	return data.response;
}

/**
 * Get live fixtures
 */
export async function getLiveFixtures(): Promise<Fixture[]> {
	const data = await fetchFromAPI<APIResponse<Fixture[]>>('/fixtures', {
		live: 'all',
	});
	return data.response;
}

// =============================================================================
// POPULAR LEAGUE IDS (for convenience)
// =============================================================================

export const POPULAR_LEAGUES = {
	// Europe - Domestic Leagues
	PREMIER_LEAGUE: 39,
	LA_LIGA: 140,
	SERIE_A: 135,
	BUNDESLIGA: 78,
	LIGUE_1: 61,
	// Europe - Continental Competitions
	CHAMPIONS_LEAGUE: 2,
	EUROPA_LEAGUE: 3,
	EUROPA_CONFERENCE_LEAGUE: 848,
	// South America - Domestic Leagues
	ARGENTINA_PRIMERA: 128,
	BRASIL_SERIE_A: 71,
	// South America - Continental Competitions
	COPA_LIBERTADORES: 13,
	COPA_SUDAMERICANA: 11,
	// North/Central America - Domestic Leagues
	MLS: 253,
	LIGA_MX: 262,
	// North/Central America - Continental Competitions
	CONCACAF_CHAMPIONS_LEAGUE: 16,
	// Asia - Domestic Leagues
	SAUDI_PRO_LEAGUE: 307,
	// Asia - Continental Competitions
	AFC_CHAMPIONS_LEAGUE: 17,
	// Africa - Continental Competitions
	CAF_CHAMPIONS_LEAGUE: 12,
	// International - World
	WORLD_CUP: 1,
	// International - Continental
	COPA_AMERICA: 9,
	EURO: 4,
	AFRICA_CUP: 6,
	ASIA_CUP: 7,
	CONCACAF_GOLD_CUP: 22,
} as const;

// =============================================================================
// LEAGUES BY CONTINENT
// =============================================================================

export type Continent =
	| 'europe'
	| 'south-america'
	| 'north-america'
	| 'asia'
	| 'africa'
	| 'international';

export interface LeagueInfo {
	id: number;
	name: string;
	country: string;
	emoji: string;
	type: 'clubs' | 'national';
}

export interface ContinentLeagues {
	name: string;
	emoji: string;
	leagues: LeagueInfo[];
}

export const LEAGUES_BY_CONTINENT: Record<Continent, ContinentLeagues> = {
	europe: {
		name: 'Europe',
		emoji: '🌍',
		leagues: [
			{
				id: POPULAR_LEAGUES.PREMIER_LEAGUE,
				name: 'Premier League',
				country: 'England',
				emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.LA_LIGA,
				name: 'La Liga',
				country: 'Spain',
				emoji: '🇪🇸',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.SERIE_A,
				name: 'Serie A',
				country: 'Italy',
				emoji: '🇮🇹',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.BUNDESLIGA,
				name: 'Bundesliga',
				country: 'Germany',
				emoji: '🇩🇪',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.LIGUE_1,
				name: 'Ligue 1',
				country: 'France',
				emoji: '🇫🇷',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.CHAMPIONS_LEAGUE,
				name: 'Champions League',
				country: 'UEFA',
				emoji: '🏆',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.EUROPA_LEAGUE,
				name: 'Europa League',
				country: 'UEFA',
				emoji: '🏆',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.EUROPA_CONFERENCE_LEAGUE,
				name: 'Conference League',
				country: 'UEFA',
				emoji: '🏆',
				type: 'clubs',
			},
		],
	},
	'south-america': {
		name: 'South America',
		emoji: '🌎',
		leagues: [
			{
				id: POPULAR_LEAGUES.ARGENTINA_PRIMERA,
				name: 'Liga Profesional',
				country: 'Argentina',
				emoji: '🇦🇷',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.BRASIL_SERIE_A,
				name: 'Brasileirão',
				country: 'Brazil',
				emoji: '🇧🇷',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.COPA_LIBERTADORES,
				name: 'Copa Libertadores',
				country: 'CONMEBOL',
				emoji: '🏆',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.COPA_SUDAMERICANA,
				name: 'Copa Sudamericana',
				country: 'CONMEBOL',
				emoji: '🏆',
				type: 'clubs',
			},
		],
	},
	'north-america': {
		name: 'North & Central America',
		emoji: '🌎',
		leagues: [
			{ id: POPULAR_LEAGUES.MLS, name: 'MLS', country: 'USA', emoji: '🇺🇸', type: 'clubs' },
			{
				id: POPULAR_LEAGUES.LIGA_MX,
				name: 'Liga MX',
				country: 'Mexico',
				emoji: '🇲🇽',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.CONCACAF_CHAMPIONS_LEAGUE,
				name: 'CONCACAF Champions Cup',
				country: 'CONCACAF',
				emoji: '🏆',
				type: 'clubs',
			},
		],
	},
	asia: {
		name: 'Asia',
		emoji: '🌏',
		leagues: [
			{
				id: POPULAR_LEAGUES.SAUDI_PRO_LEAGUE,
				name: 'Saudi Pro League',
				country: 'Saudi Arabia',
				emoji: '🇸🇦',
				type: 'clubs',
			},
			{
				id: POPULAR_LEAGUES.AFC_CHAMPIONS_LEAGUE,
				name: 'AFC Champions League',
				country: 'AFC',
				emoji: '🏆',
				type: 'clubs',
			},
		],
	},
	africa: {
		name: 'Africa',
		emoji: '🌍',
		leagues: [
			{
				id: POPULAR_LEAGUES.CAF_CHAMPIONS_LEAGUE,
				name: 'CAF Champions League',
				country: 'CAF',
				emoji: '🏆',
				type: 'clubs',
			},
		],
	},
	international: {
		name: 'International',
		emoji: '🌐',
		leagues: [
			{
				id: POPULAR_LEAGUES.WORLD_CUP,
				name: 'World Cup',
				country: 'FIFA',
				emoji: '🏆',
				type: 'national',
			},
			{
				id: POPULAR_LEAGUES.EURO,
				name: 'Euro',
				country: 'UEFA',
				emoji: '🏆',
				type: 'national',
			},
			{
				id: POPULAR_LEAGUES.COPA_AMERICA,
				name: 'Copa América',
				country: 'CONMEBOL',
				emoji: '🏆',
				type: 'national',
			},
			{
				id: POPULAR_LEAGUES.AFRICA_CUP,
				name: 'Africa Cup of Nations',
				country: 'CAF',
				emoji: '🏆',
				type: 'national',
			},
			{
				id: POPULAR_LEAGUES.ASIA_CUP,
				name: 'AFC Asian Cup',
				country: 'AFC',
				emoji: '🏆',
				type: 'national',
			},
			{
				id: POPULAR_LEAGUES.CONCACAF_GOLD_CUP,
				name: 'CONCACAF Gold Cup',
				country: 'CONCACAF',
				emoji: '🏆',
				type: 'national',
			},
		],
	},
};

export const CURRENT_SEASON = 2025;

// =============================================================================
// COMPETITION HISTORY TYPES (Data is loaded from src/data/competitions/)
// =============================================================================

export interface CompetitionEdition {
	year: number | string; // Can be "1992-93" for leagues or 1930 for cups
	winner: string;
	winnerLogo?: string;
	runnerUp: string;
	runnerUpLogo?: string;
	host?: string;
	finalScore?: string;
}

export interface CompetitionHistory {
	id: number;
	name: string;
	type: 'clubs' | 'national';
	editions: CompetitionEdition[];
}

/**
 * Get league seasons/years from API
 */
export async function getLeagueSeasons(leagueId: number): Promise<number[]> {
	const data = await fetchFromAPI<APIResponse<League[]>>('/leagues', {
		id: leagueId.toString(),
	});

	if (data.response.length > 0) {
		return data.response[0].seasons.map((s) => s.year).sort((a, b) => b - a);
	}
	return [];
}

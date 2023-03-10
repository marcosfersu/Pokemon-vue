export const IngredientNames = ["red", "green", "yellow", "blue"] as const;
export type Ingredients = (typeof IngredientNames)[number];

export type Position = [number, number];

export interface CellInfo {
	id: string;
	type: number;
	position: Position;
}
export interface PokeTypes {
	type: {
		name: string;
	};
}
export interface PokeStatsApi {
	base_stat: number;
	stat: {
		name: string;
	};
}
export interface PokeAbilitiesApi {
	is_hidden: boolean;
	ability: {
		name: string;
	};
}
export interface PokeAbilities {
	isHidden: boolean;
	name: string;
}
export interface PokeStats {
	baseStat: number;
	name: string;
}

export interface PokeEvo {
	speciesName: string;
	minLevel: number;
	triggerName: string | null;
	item: { name: string; url: string } | null;
	sprite?: string;
	stone?: any;
	id?: number;
	backSprite?: string;
}

export interface IevoData {
	speciesName: string;
	minLevel: number;
	triggerName: string | null;
	item: { name: string; url: string } | null;
	sprite?: string;
	stone?: string;
	id?: number;
	backSprite?: string;
}

export interface IflavorText {
	flavor_text: string;
	language: {
		name: string;
	};
}

export interface IextraData {
	flavor_text_entries: IflavorText[];
}

export interface PokeInfo {
	id: number;
	name: string;
	nameJp: string;
	flavorText: string;
	height: number;
	weight: number;
	sprites: string;
	types: string[];
	evoId: number;
	officialArtwork: string;
	officialArtworkShiny: string;
	stats: PokeStats[];
	abilities: string[];
	abilitiesHidden: string[];
}
export interface IType {
	type: string;
	pokesTypes: PokeInfo[];
}

export type BoardState = (CellInfo | null)[][];

export type PokeStoreInfo = PokeInfo[];

export type EvoStoreInfo = {
	id: number;
	data: (PokeEvo | PokeEvo[])[];
}[];

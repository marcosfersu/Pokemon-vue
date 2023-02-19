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
export interface PokeStats {
  baseStat: number;
  name: string;
}

export interface PokeEvo {
  speciesName: string;
  minLevel: number;
  triggerName: string;
  item: { name: string; url: string };
  sprite?: string;
  stone?: string;
  id?: number;
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
}

export type BoardState = (CellInfo | null)[][];

export type PokeStoreInfo = PokeInfo[];

export type EvoStoreInfo = {
  id: number;
  data: PokeEvo[];
}[];

export type OrthDirection = 0 | 1 | 2 | 4 | 8;
export interface LineDef {
  cell: CellInfo;
  direction: OrthDirection;
}

export interface RecipeResponse {
  success: boolean;
  type?: "request" | "match";
  payload?: number;
}

export type SkillNames = "recipelimit" | "boardsize";

export interface SkillInfoBase {
  name: SkillNames;
  prices: number[];
  description: string;
}

export interface PxLocation {
  xPos: string;
  yPos: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types?: string[];
  sprite?: string;
}

export interface PokemonDetail extends Pokemon {
  capture_rate: number;
  weight: number;
  height: number;
  base_stats: {
    hp: number;
    attack: number;
    defense: number;
    sp_atk: number;
    sp_def: number;
    speed: number;
    total: number;
  };
}

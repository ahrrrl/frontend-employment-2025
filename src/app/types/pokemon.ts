export interface Pokemon {
  name: string;
  image: string;
}

export interface PokemonResponse {
  results: Pokemon[];
  total: number;
}

import { PokemonResponse } from '@/app/types/pokemon';

export async function fetchPokemonData(limit: number, offset: number): Promise<PokemonResponse> {
  const response = await fetch(`/api/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon data');
  }
  return response.json();
}

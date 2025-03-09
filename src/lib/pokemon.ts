import { PokemonResponse } from '@/app/types/pokemon';

export async function fetchPokemonData(limit: number, offset: number): Promise<PokemonResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon data');
  }
  return response.json();
}

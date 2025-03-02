import { PokemonResponse } from '@/app/types/pokemon';

export async function fetchPokemonData(limit: number, offset: number): Promise<PokemonResponse> {
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer ? 'http://localhost:3000' : ''; // SSR에서는 절대 경로, CSR에서는 상대 경로
  const response = await fetch(`${baseUrl}/api/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch pokemon data');
  }
  return response.json();
}

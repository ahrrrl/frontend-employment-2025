import PokemonList from '@/app/components/PokemonList';
import { PokemonResponse } from '@/app/types/pokemon';
import { fetchPokemonData } from '@/lib/pokemon';

export default async function Pokemons() {
  const limit = 20;
  const offset = 0;

  const initialData: PokemonResponse = await fetchPokemonData(limit, offset);

  return (
    <section>
      <PokemonList initialData={initialData} />
    </section>
  );
}

import PokemonList from '@/app/components/PokemonList';
import { fetchPokemonData } from '@/lib/pokemon';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async function Pokemons() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['pokemon', 20, 0],
    queryFn: () => fetchPokemonData(20, 0),
  });

  return (
    <section>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PokemonList />
      </HydrationBoundary>
    </section>
  );
}

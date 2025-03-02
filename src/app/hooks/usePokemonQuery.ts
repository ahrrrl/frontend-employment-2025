import { useQuery } from '@tanstack/react-query';
import { PokemonResponse } from '../types/pokemon';
import { fetchPokemonData } from '@/lib/pokemon';

export const usePokemonQuery = (limit: number, offset: number, initialData?: PokemonResponse) => {
  return useQuery({
    queryKey: ['pokemon', limit, offset],
    queryFn: () => fetchPokemonData(limit, offset),
    placeholderData: (previousData) => {
      // offset이 0일 때는 initialData를 사용
      if (offset === 0 && initialData) {
        return initialData;
      }
      // 그렇지 않으면 이전 데이터를 유지
      return previousData;
    },
  });
};

import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';

const QuerySchema = z.object({
  limit: z.string().transform(Number).nullable(),
  offset: z.string().transform(Number).nullable(),
});

export async function GET(request: NextRequest) {
  const limit = request.nextUrl.searchParams.get('limit');
  const offset = request.nextUrl.searchParams.get('offset');

  const { data: parsedQuery, success, error } = QuerySchema.safeParse({ limit, offset });

  if (!success && error) {
    return NextResponse.json({ ok: false, message: error.message }, { status: 400 });
  }

  const query = new URLSearchParams();
  if (parsedQuery.limit && !isNaN(parsedQuery.limit)) query.set('limit', parsedQuery.limit.toString());
  if (parsedQuery.offset && !isNaN(parsedQuery.offset)) query.set('offset', parsedQuery.offset.toString());

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?${query.toString()}`);
  const data = await response.json();
  const pokemonCount = data.count; // 전체 포켓몬 수
  const pokemonData = await Promise.all(
    data.results.map(async (pokemon: { name: string; url: string }) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        name: details.name,
        image: details.sprites.front_default,
      };
    }),
  );

  return NextResponse.json({
    results: pokemonData, // 포켓몬 데이터
    total: pokemonCount, // 전체 포켓몬 수
  });
}

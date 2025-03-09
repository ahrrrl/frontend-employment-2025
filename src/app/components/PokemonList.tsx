'use client';

import { useState } from 'react';
import { useThemeStore } from '../stores/themesStore';
import Image from 'next/image';
import { usePokemonQuery } from '../hooks/usePokemonQuery';

export default function PokemonList() {
  const [limit] = useState<number>(20);
  const [offset, setOffset] = useState<number>(0);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  // 클라이언트에서 데이터 가져오기
  const { data, isLoading, isError, error, isFetching } = usePokemonQuery(limit, offset);

  const handlePrevious = () => {
    setOffset(Math.max(0, offset - limit));
  };

  const handleNext = () => {
    if (data && offset + limit < data.total) {
      setOffset(offset + limit);
      console.log(offset, limit, data.total);
    }
  };

  // 페이지 점프 기능
  const handleJump = (page: number) => {
    const newOffset = (page - 1) * limit;
    if (data && newOffset >= 0 && newOffset < data.total) {
      setOffset(newOffset);
    }
  };

  // 총 페이지 수 계산
  const totalPages = data ? Math.ceil(data.total / limit) : 0;
  const currentPage = Math.floor(offset / limit) + 1;

  if (isLoading) {
    return <div className="text-center p-4">포켓몬 찾는 중...</div>;
  }

  if (isError) {
    return <div className="text-center p-4 text-red-500">{error.message}</div>;
  }

  if (!data) {
    return <div className="text-center p-4">포켓몬이 존재하지 않습니다.</div>;
  }

  return (
    <div>
      {isFetching && <div className="fixed top-0 left-0 w-full bg-blue-500 h-1 animate-pulse"></div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20 mb-36">
        {data.results.map((poke) => (
          <div key={poke.name}>
            <div
              className={`${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              } p-4 rounded-lg shadow-md flex flex-col items-center`}
            >
              <div className="w-36 h-36 relative">
                {poke.image ? (
                  <Image src={poke.image} alt={poke.name} width={600} height={800} className="object-cover" />
                ) : (
                  'No Image'
                )}
              </div>
            </div>
            <h3 className="text-sm font-semibold capitalize">{poke.name}</h3>
          </div>
        ))}
      </div>

      <div className="flex justify-around items-center mt-6 fixed bottom-0 left-0 w-full p-4 backdrop-blur-sm">
        <button
          onClick={handlePrevious}
          disabled={offset === 0}
          className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white disabled:opacity-50`}
        >
          이전
        </button>

        <div className="flex flex-col items-center shrink-0">
          <div className="flex items-center">
            <span className="mr-2">페이지:</span>
            <select
              value={currentPage}
              onChange={(e) => handleJump(Number(e.target.value))}
              className={`${isDarkMode ? 'bg-gray-700' : 'bg-white'} border rounded px-2 py-1`}
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="ml-2">/ {totalPages}</span>
          </div>
          <div className="text-center mt-2 ">
            Showing {offset + 1}-{Math.min(offset + limit, data.total)} of {data.total}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={offset + limit >= data.total}
          className={`px-4 py-2 rounded ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white disabled:opacity-50`}
        >
          다음
        </button>
      </div>
    </div>
  );
}

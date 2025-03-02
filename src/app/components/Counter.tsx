'use client';

import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../stores/themesStore';

const Counter = () => {
  const [count, setCount] = useState<number>(Number(localStorage.getItem('count')) || 0);

  // 컴포넌트 내부에서 선택자 사용
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  // 로컬스토리에서 count 값 가져오기
  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
      setCount(parseInt(savedCount, 10));
    }
  }, []);

  // count 값이 변경될 때마다 테마 변경
  useEffect(() => {
    toggleTheme(count);
    localStorage.setItem('count', count.toString());
  }, [count, toggleTheme]);

  const incrementCount = () => {
    setCount((prevCount) => (prevCount < 10 ? prevCount + 1 : prevCount));
  };

  const decrementCount = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : prevCount));
  };

  return (
    <div
      className={`p-4 flex flex-col items-center ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
    >
      <h2 className="text-2xl font-bold mb-4">Count: {count}</h2>
      <div className="flex gap-4">
        <button
          onClick={incrementCount}
          className={`px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 ${
            isDarkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'
          }`}
          disabled={count >= 10}
        >
          증가
        </button>
        <button
          onClick={decrementCount}
          className={`px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 ${
            isDarkMode ? 'bg-red-400 text-white' : 'bg-red-500 text-white'
          }`}
          disabled={count <= 0}
        >
          감소
        </button>
      </div>
      <div className="mt-4">
        <p>Theme Mode: {isDarkMode ? 'Dark Mode' : 'Light Mode'}</p>
      </div>
    </div>
  );
};

export default Counter;

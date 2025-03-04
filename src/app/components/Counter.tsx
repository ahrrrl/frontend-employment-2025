'use client';

import React, { useState, useEffect } from 'react';
import { useThemeStore } from '../stores/themesStore';
import { getLocalStorage, setLocalStorage } from '@/lib/utils';

const Counter = () => {
  // 함수형 초기값을 사용하여 컴포넌트 최초 렌더링 시에만 실행되도록 함
  const [count, setCount] = useState<number>(0);

  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    const storedCount = getLocalStorage('count', 0);
    setCount(storedCount);
  }, []);

  // count 값 변경될 때 localStorage 저장 및 테마 변경
  useEffect(() => {
    // Link 컴포넌트 사용으로인한 재랜더링 시 count 값이 0으로 초기화되는 문제 해결
    if (count === 0) {
      return;
    }
    toggleTheme(count);
    setLocalStorage('count', count);
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

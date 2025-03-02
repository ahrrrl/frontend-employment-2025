'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: (count: number) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: (count) => set({ isDarkMode: count >= 5 }),
    }),
    {
      name: 'theme-storage',
    },
  ),
);

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useThemeStore } from '../stores/themesStore';

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [mounted, setMounted] = useState(false);

  // useEffect는 클라이언트에서만 실행됨
  useEffect(() => {
    setMounted(true);

    // 다크 모드에 따라 html 요소에 .dark 클래스 토글
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 첫 마운트 전에는 렌더링하지 않음(플래시 방지)
  if (!mounted) {
    return <div className="invisible">{children}</div>;
  }

  // 전역적으로 테마를 적용 (isDarkMode를 import하여 다른 컴포넌트에서 개별적으로 사용 가능)
  return <div className="min-h-screen">{children}</div>;
}

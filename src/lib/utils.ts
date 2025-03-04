import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 클라이언트 사이드인지 확인
export const isClient = (): boolean => typeof window !== 'undefined';

// 로컬 스토리지에서 값을 가져오기
export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  if (!isClient()) return defaultValue;
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

// 로컬 스토리지에 값 저장하기
export const setLocalStorage = <T>(key: string, value: T): void => {
  if (!isClient()) return;
  localStorage.setItem(key, JSON.stringify(value));
};

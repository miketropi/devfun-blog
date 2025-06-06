'use client';

import { useEffect, useRef } from 'react';
import useStore from '../(main)/store/useStore';

export default function useDarkMode() {
  const { darkMode, toggleDarkMode, setDarkMode } = useStore();
  const isInitialized = useRef(false);

  // Apply dark mode class to document when darkMode state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
}
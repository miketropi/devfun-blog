'use client';

import { useState } from 'react';
import Link from 'next/link';
import useDarkMode from '../hooks/useDarkMode';
import { LoginButton } from './LoginModal';

export default function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <header className=""> 
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-semibold">DevFun</h1>
          <div className="flex items-center">
            <nav className="flex space-x-4 sm:space-x-8 mr-4 sm:mr-6">
              <Link href="/" className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">Articles</Link>
              <Link href="/about" className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">About</Link>
              {/* <Link href="/login-example" className="text-sm sm:text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200">Login Example</Link> */}
            </nav>
            
            {/* Login Button */}
            <div className="mr-4">
              <LoginButton className="text-sm sm:text-base px-3 py-1.5 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors duration-200" />
            </div>
            
            {/* Dark Mode Toggle */}
            <div className="relative">
              <button 
                onClick={toggleDarkMode}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              {showTooltip && (
                <div className="absolute right-0 mt-2 py-1 px-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded shadow-lg whitespace-nowrap z-10">
                  {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
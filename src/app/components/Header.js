'use client';

import { useState } from 'react';
import Link from 'next/link';
import useDarkMode from '../hooks/useDarkMode';
import { LoginButton } from './LoginModal';
import { Sun, Moon } from 'lucide-react';

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
              <LoginButton />
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
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
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
'use client';

import { useState, useRef, useEffect } from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';
import useStore from '../store/useStore';
import Link from 'next/link';
import { ChevronDown, User, LogOut } from 'lucide-react';

const LoginModal = ({ isOpen, onClose }) => {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  
  // If user is already authenticated, close the modal
  if (isAuthenticated && isOpen) {
    onClose();
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      title="Account Access"
      size="medium"
    >
      <LoginForm />
    </Modal>
  );
};

// Higher-order component to create a button that opens the login modal
export const LoginButton = ({ children, className }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      // If user is logged in, toggle dropdown
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      // If user is not logged in, open the login modal
      setIsModalOpen(true);
    }
  };

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleClick}
          className={className || 'flex items-center px-4 py-2 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors duration-200'}
        >
          {isAuthenticated ? (
            <>
              <span>Hi, {user?.user_display_name || 'User'}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          ) : (
            'Login / Register'
          )}
        </button>
        
        {isAuthenticated && isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-20">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link 
                href="/dashboard" 
                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
      
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default LoginModal;
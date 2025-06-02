'use client';

import { useState } from 'react';
import Modal from './Modal';
import LoginForm from './LoginForm';
import useStore from '../store/useStore';

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
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

  // If no custom children are provided, use default text
  const buttonText = children || (isAuthenticated ? `Logout (${user?.username || 'User'})` : 'Login / Register');

  const handleClick = () => {
    if (isAuthenticated) {
      // If user is logged in, log them out
      logout();
    } else {
      // If user is not logged in, open the login modal
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={className || 'px-4 py-2 rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white transition-colors duration-200'}
      >
        {buttonText}
      </button>
      
      <LoginModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default LoginModal;
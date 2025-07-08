'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import useStore from '../store/useStore';

const Modal = ({ isOpen, onClose, title, children, size = 'medium' }) => { 
  const darkMode = useStore((state) => state.darkMode);
  const modalRef = useRef(null);
  const [__isClient, __setIsClient] = useState(false);

  // Handle size classes
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-lg',
    large: 'max-w-2xl',
    fullWidth: 'max-w-full mx-4'
  };
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    // Close modal on escape key press
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscKey);
      // Restore scrolling when modal is closed
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    __setIsClient(true);
  }, []);

  if (!__isClient) return <></>;

  // Framer Motion variants for modal and overlay
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.18 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 40 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 30 } },
    exit: { opacity: 0, scale: 0.96, y: 40, transition: { duration: 0.15 } },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={overlayVariants}
          aria-modal="true"
          role="dialog"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            ref={modalRef}
            className={`${sizeClasses[size]} w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all duration-300 ease-in-out relative z-10`}
            style={{
              backgroundColor: darkMode ? 'var(--card-bg)' : 'white',
              color: darkMode ? 'var(--foreground)' : 'inherit',
              borderColor: 'var(--card-border)'
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Modal body */}
            <div className="p-4 sm:p-6">
              {children}
            </div>
            
            {/* Modal footer - optional, can be included in children if needed */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

const ModalOffcanvas = ({
  isOpen,
  onClose,
  title,
  children,
  width = 'max-w-md', // Tailwind width class or custom
  position = 'right', // 'right' or 'left'
  showClose = true,
  overlayOpacity = '', // slightly lighter for glass effect
  className = '',
}) => {
  const [__isClient, __setIsClient] = useState(false);
  const offcanvasRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (offcanvasRef.current && !offcanvasRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleEsc = (event) => {
      if (event.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    __setIsClient(true);
  }, []);

  if (!__isClient) return <></>;

  // Slide direction and anchor
  const anchorClass = position === 'left' ? 'left-0' : 'right-0';
  const variants = {
    hidden: {
      x: position === 'right' ? '100%' : '-100%',
      opacity: 0.7,
      filter: 'blur(2px)',
    },
    visible: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 35 },
        opacity: { duration: 0.25 },
        filter: { duration: 0.25 },
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      x: position === 'right' ? '100%' : '-100%',
      opacity: 0.7,
      filter: 'blur(2px)',
      transition: {
        x: { type: 'spring', stiffness: 250, damping: 30 },
        opacity: { duration: 0.2 },
        filter: { duration: 0.2 },
        ease: [0.55, 0, 0.55, 0.2],
      },
    },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className={`fixed inset-0 z-50 flex items-stretch ${overlayOpacity} backdrop-blur-[6px] transition-opacity duration-300`}
          aria-modal="true" role="dialog"
        >
          {/* Overlay (click to close) */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
          {/* Offcanvas panel */}
          <motion.div
            ref={offcanvasRef}
            className={`fixed top-0 h-full ${anchorClass} flex flex-col bg-white dark:bg-gray-800/70 shadow-2xl backdrop-blur-[16px] border border-white/30 dark:border-gray-700/30 ${width} ${className}`}
            style={{
              borderTopRightRadius: position === 'left' ? 0 : '1rem',
              borderBottomRightRadius: position === 'left' ? 0 : '1rem',
              borderTopLeftRadius: position === 'right' ? 0 : '1rem',
              borderBottomLeftRadius: position === 'right' ? 0 : '1rem',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              maxWidth: undefined, // Remove hardcoded maxWidth
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
          >
            {/* Header */}
            {(title || showClose) && (
              <div className="flex items-center justify-between p-4 border-b border-gray-200/60 dark:border-gray-700/60 bg-white/40 dark:bg-gray-900/30 backdrop-blur-[8px] rounded-t-lg">
                <h3 className="text-lg font-semibold truncate text-gray-900 dark:text-gray-100">{title}</h3>
                {showClose && (
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    aria-label="Close offcanvas"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ModalOffcanvas;

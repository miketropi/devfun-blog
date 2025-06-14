import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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

  if (!isOpen) return null;

  // Slide direction
  const side = position === 'left' ? 'left-0' : 'right-0';
  const translateClosed = position === 'left' ? '-translate-x-full' : 'translate-x-full';
  const translateOpen = 'translate-x-0';

  return createPortal(
    <div className={`fixed inset-0 z-50 flex items-stretch ${overlayOpacity} backdrop-blur-[6px] transition-opacity duration-300`}
      aria-modal="true" role="dialog"
    >
      {/* Overlay (click to close) */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />
      {/* Offcanvas panel */}
      <div
        ref={offcanvasRef}
        className={`relative h-full ${width} w-full sm:w-auto bg-white/70 dark:bg-gray-800/70 shadow-2xl ${side} top-0 flex flex-col
          transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          backdrop-blur-[16px] border border-white/30 dark:border-gray-700/30
          ${isOpen ? translateOpen : translateClosed} ${className}`}
        style={{
          // maxWidth: '90vw',
          borderTopRightRadius: position === 'left' ? 0 : '1rem',
          borderBottomRightRadius: position === 'left' ? 0 : '1rem',
          borderTopLeftRadius: position === 'right' ? 0 : '1rem',
          borderBottomLeftRadius: position === 'right' ? 0 : '1rem',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200/60 dark:border-gray-700/60 bg-white/40 dark:bg-gray-900/30 backdrop-blur-[8px] rounded-t-lg">
            <h3 className="text-lg font-semibold truncate">{title}</h3>
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
      </div>
    </div>,
    document.body
  );
};

export default ModalOffcanvas;

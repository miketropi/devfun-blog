'use client';

import { useState, useRef, useEffect } from 'react';
import useStore from '../store/useStore';

// This component ensures proper hydration of the Zustand store
// It handles initialization and prevents hydration mismatches
export default function StoreProvider({ children }) {
  // Track if we're in the hydration process
  const [isHydrating, setIsHydrating] = useState(true);
  const initialized = useRef(false);
  const { setLoading } = useStore();
  
  // Initialize store on client-side only
  useEffect(() => {
    // Only run once
    if (!initialized.current) {
      initialized.current = true;
      
      // Set initial loading state to false after hydration
      // This prevents hydration mismatches when server and client states differ
      setLoading(false);
      
      // Mark hydration as complete
      setIsHydrating(false);
    }
  }, [setLoading]);
  
  // During hydration, render nothing to avoid hydration mismatch errors
  // This is important when using persisted state that might differ between server and client
  if (isHydrating) {
    return null;
  }
  
  return children;
}
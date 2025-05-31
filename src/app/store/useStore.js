import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist, createJSONStorage } from 'zustand/middleware';

// Create a store with Zustand, Immer, and persist middleware
const useStore = create(
  persist(
    immer((set) => ({
      // Blog state
      darkMode: false,
      posts: [],
      isLoading: false,
      error: null,
      
      // Actions
      toggleDarkMode: () => set((state) => {
        state.darkMode = !state.darkMode;
      }),
      
      setDarkMode: (value) => set((state) => {
        state.darkMode = value;
      }),
    
      setPosts: (posts) => set((state) => {
        state.posts = posts;
      }),
      
      addPost: (post) => set((state) => {
        state.posts.push(post);
      }),
      
      updatePost: (id, updatedPost) => set((state) => {
        const index = state.posts.findIndex(post => post.id === id);
        if (index !== -1) {
          state.posts[index] = { ...state.posts[index], ...updatedPost };
        }
      }),
      
      deletePost: (id) => set((state) => {
        state.posts = state.posts.filter(post => post.id !== id);
      }),
      
      setLoading: (isLoading) => set((state) => {
        state.isLoading = isLoading;
      }),
      
      setError: (error) => set((state) => {
        state.error = error;
      }),
    })
  ),
  {
    name: 'devfun-blog-storage', // unique name for localStorage key
    storage: createJSONStorage(() => {
      // Use localStorage only on the client side
      return typeof window !== 'undefined' ? window.localStorage : null;
    }),
    // Only persist the darkMode state
    partialize: (state) => ({ darkMode: state.darkMode }),
    // Skip hydration to prevent mismatches between server and client
    // skipHydration: true,
  }
));

export default useStore;
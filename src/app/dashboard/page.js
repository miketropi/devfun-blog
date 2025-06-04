'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';
import useStore from '../store/useStore';

export default function Dashboard() {
  const { user, isAuthenticated, token } = useStore();
  const [stats, setStats] = useState({
    posts: 0,
    comments: 0,
    views: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Fetch user data and stats
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchUserData();
    }
  }, [isAuthenticated, token]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      // Fetch user profile from the API
      const response = await fetch('/api/v1/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      
      // Set mock stats for demonstration
      setStats({
        posts: Math.floor(Math.random() * 10),
        comments: Math.floor(Math.random() * 50),
        views: Math.floor(Math.random() * 1000)
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Dashboard</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--accent)]"></div>
          </div>
        ) : error ? (
          <div className="p-4 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            {/* User Profile Section */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">Profile</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xl font-bold">
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="text-lg font-medium">{user?.username || 'User'}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{user?.email || 'email@example.com'}</p>
                </div>
              </div>
            </div>
            
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <h3 className="text-lg font-medium mb-2">Posts</h3>
                <p className="text-3xl font-bold text-[var(--accent)]">{stats.posts}</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <h3 className="text-lg font-medium mb-2">Comments</h3>
                <p className="text-3xl font-bold text-[var(--accent)]">{stats.comments}</p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <h3 className="text-lg font-medium mb-2">Views</h3>
                <p className="text-3xl font-bold text-[var(--accent)]">{stats.views}</p>
              </div>
            </div>
            
            {/* Recent Activity Section */}
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-start space-x-3 p-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="w-2 h-2 mt-2 rounded-full bg-[var(--accent)]"></div>
                    <div>
                      <p className="font-medium">Activity {item}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
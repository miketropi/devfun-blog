'use client';

import usePosts from '../hooks/usePosts';

export default function ArticleList({ limit }) {
  const { posts, isLoading, error } = usePosts();
  
  // Apply limit if provided
  const displayedPosts = limit ? posts.slice(0, limit) : posts;

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="text-[var(--foreground)] opacity-70">
              Loading posts...
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">Error loading posts</span>
          </div>
          <p className="ml-7 text-sm opacity-80">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
      <div className="space-y-8 sm:space-y-12">
        {displayedPosts.map((post) => (
          <article 
            key={post.id} 
            className="group cursor-pointer "
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-[var(--accent)] transition-colors mb-2 sm:mb-0 pr-0 sm:pr-6" dangerouslySetInnerHTML={{__html: post.title}}>
              </h3>
              <div className="text-sm opacity-70 whitespace-nowrap">
                {post.readTime}
              </div>
            </div>
            <div className="opacity-80 mb-3 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{__html: post.excerpt}}>
            </div>
            <div className="text-sm opacity-70 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {post.date}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
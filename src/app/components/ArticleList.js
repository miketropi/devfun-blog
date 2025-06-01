'use client';

import Link from 'next/link';

export default function ArticleList({ posts }) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
      <div className="space-y-8 sm:space-y-12">
        {posts.map((post) => (
          <article 
            key={post.id} 
            className="group cursor-pointer "
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
              <h3 className="text-xl sm:text-2xl font-semibold group-hover:text-[var(--accent)] transition-colors mb-2 sm:mb-0 pr-0 sm:pr-6">
                <Link href={`/article/${post.slug}`} dangerouslySetInnerHTML={{__html: post.title}}>
                </Link>
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
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function Pagination({ totalPosts, currentPage, perPage }) {
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalPosts / perPage);
  
  // Don't render pagination if there's only one page or no posts
  if (totalPages <= 1) return null;
  
  const createPageUrl = (page) => {
    const params = new URLSearchParams(searchParams);
    if (page == 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    const queryString = params.toString();
    return `?${queryString}`;
    return queryString ? `?${queryString}` : '';
  };
  
  const getVisiblePages = () => {
    const pages = [];
    const showPages = 5; // Show max 5 page numbers
    
    if (totalPages <= showPages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + showPages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };
  
  const visiblePages = getVisiblePages();
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
      <nav className="flex justify-center mt-8 mb-6" aria-label="Pagination">
        <div className="flex items-center gap-1">
          {/* Previous Button */}
          {currentPage > 1 ? (
            <Link
              href={createPageUrl(currentPage - 1)}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              Prev
            </Link>
          ) : (
            <span className="px-3 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
              Prev
            </span>
          )}
          
          {/* Page Numbers */}
          {visiblePages.map((page) => {
            const isCurrentPage = page == currentPage;
            
            return isCurrentPage ? (
              <span
                key={page}
                className="px-3 py-2 text-sm font-bold"
                aria-current="page"
              >
                {page}
              </span>
            ) : (
              <Link
                key={page}
                href={createPageUrl(page)}
                className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
              >
                {page}
              </Link>
            );
          })}
          
          {/* Next Button */}
          {currentPage < totalPages ? (
            <Link
              href={createPageUrl(parseInt(currentPage) + 1)}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            >
              Next
            </Link>
          ) : (
            <span className="px-3 py-2 text-sm text-gray-400 dark:text-gray-600 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}
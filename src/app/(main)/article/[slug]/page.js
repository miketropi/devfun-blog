import { notFound } from 'next/navigation';
import Hero from '../../../components/Hero';
import CommentForm from '../../../components/CommentForm';
import Link from 'next/link';

async function fetchPostBySlug(slug) {
  const calcReadTime = (content) => {
    const wordsPerMinute = 200;
    const numberOfWords = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    return minutes;
  }

  const convertDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}wp/v2/posts?slug=${slug}`, {
      // next: { revalidate: 3600 },
      cache: 'force-cache'
    });
    
    if (!res.ok) {
      return null;
    }
    
    const posts = await res.json();
    
    if (posts.length === 0) {
      return null;
    }
    
    const post = posts[0];
    
    return {
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      date: convertDate(post.date),
      readTime: calcReadTime(post.content.rendered) + ' min read',
      content: post.content.rendered,
      featuredImage: post.featured_media,
      slug: post.slug,
      categories: post.categories,
      tags: post.tags,
      author: post.author,
      comments: post.comment_count,
      status: post.status,
      type: post.type,
      link: post.link,
      meta: post.meta
    };
  } catch (error) {
    console.error('Failed to fetch post by slug:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  
  if (!post) {
    return { 
      title: 'Article Not Found | DevFun Blog',
      description: 'The requested article could not be found.',
    };
  }
  
  // Strip HTML tags from excerpt for the description
  const description = post.excerpt.replace(/<[^>]*>/g, '');
  
  return {
    title: `${post.title} | DevFun Blog`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      type: 'article',
      publishedTime: post.date,
      authors: ['DevFun Blog'],
    },
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div>
      <div className="bg-gradient-to-b from-[var(--card-bg)] to-transparent pt-8 pb-16">
        <Hero 
          title={post.title}
          // subtitle={`${post.date} · ${post.readTime}`}
        />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Article metadata */}
          <div className="flex items-center gap-4 mb-8 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>{post.date}</span>
            </div>
          </div>
          
          {/* Article content */}
          <article className="prose dark:prose-invert lg:prose-lg mx-auto">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          {/* Article footer */}
          <div className="mt-12 pt-8 border-t border-[var(--card-border)] max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <Link href="/" className="inline-flex items-center text-[var(--accent)] hover:underline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Back to all articles
              </Link>
              
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors" aria-label="Share on Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors" aria-label="Share on LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors" aria-label="Copy link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Comments section */}
          <div className="mt-12 pt-8 border-t border-[var(--card-border)] max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Comments</h2>
            <CommentForm postId={post.id} />
          </div>
        </main>
      </div>
    </div>
  );
}
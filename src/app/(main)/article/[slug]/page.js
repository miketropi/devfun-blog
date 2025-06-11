import { notFound } from 'next/navigation';
import Hero from '../../../components/Hero';
import CommentForm from '../../../components/CommentForm';
import Link from 'next/link';
import { ArrowLeft, Twitter, Linkedin, Link as LinkIcon, Calendar, Clock } from 'lucide-react';

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
      // cache: 'force-cache'
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
      meta: post.meta,
      categories_full: post.categories_full,
      tags_full: post.tags_full,
      author_full: post.author_full,
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

  const authorTemp = (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <img 
          src={post.author_full.avatar} 
          alt={post.author_full.fullname}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h3 className="font-medium text-sm">{post.author_full.fullname}</h3>
      </div>
    </div>
  )

  const categoriesTemp = (
  <div className="flex flex-wrap gap-2">
    {post.categories_full.map((category) => (
      <span
        key={category.term_id}
        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800"
      >
        {category.name}
      </span>
    ))} 
  </div>
  )
  
  return (
    <div>
      <div className="bg-gradient-to-b from-[var(--card-bg)] to-transparent pt-8 pb-16">

        <Hero 
          title={post.title}
          subtitle={ categoriesTemp }
        />
        
        <main className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Article metadata */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              { authorTemp }
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-500 dark:text-gray-500" />
              <span>{post.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-gray-500 dark:text-gray-500" />
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
                <ArrowLeft className="mr-2" width={20} height={20} />
                Back to all articles
              </Link>
              
              <div className="flex gap-2">
                <button className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors" aria-label="Share on Twitter">
                  <Twitter width={20} height={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors" aria-label="Share on LinkedIn">
                  <Linkedin width={20} height={20} />
                </button>
                <button className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-colors" aria-label="Copy link">
                  <LinkIcon width={20} height={20} />
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
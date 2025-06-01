import Layout from './components/Layout';
import Hero from './components/Hero';
import ArticleList from './components/ArticleList';

async function fetchPosts(page = 1, perPage = 3) {
  const calcReadTime = (content) => {
    const wordsPerMinute = 200;
    const numberOfWords = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(numberOfWords / wordsPerMinute);
    return minutes;
  }

  // function convert date "2025-05-31T09:20:45" to beautiful date "31 May 2025"
  const convertDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}wp/v2/posts?page=${page}&per_page=${perPage}`)
    const posts = await res.json()
    const totalPosts = res.headers.get('X-WP-Total');
    const __post = posts.map((post) => {
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
      }
    })
    return {
      posts: __post,
      pagination: {
        totalPosts: Number(totalPosts),
        currentPage: page,
        perPage
      }
    };
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
    return {
      posts: [],
      pagination: {
        totalPosts: 0,
        currentPage: page,
        perPage
      }
    }
  }
}

export default async function Home() {
  const { posts, pagination } = await fetchPosts();
  console.log(posts)
  return (
    <Layout>
      <Hero 
        title="Web Development Insights & Tutorials" 
        subtitle="Discover modern web development techniques, best practices, and the latest trends in technology."
      />
      <ArticleList posts={ posts } />
    </Layout>
  );
}

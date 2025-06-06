'use client';

import { useEffect } from 'react';
import useStore from '../(main)/store/useStore';
import { posts as postsData } from '../data/posts';

// Custom hook to load posts into the store
export default function usePosts() {
  const { 
    posts, 
    setPosts, 
    addPost, 
    updatePost, 
    deletePost,
    isLoading,
    error,
    setLoading,
    setError 
  } = useStore();

  // function get posts from "http://localhost:8888/wp-json/wp/v2/posts"
  const getPosts = async () => {
    const enpoint = 'http://localhost:8888/wp-json/wp/v2/posts'
    try {
      const response = await fetch(enpoint);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // function calc content length to minutes read
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

  // Load posts from data file on mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For now, we're just using the local data
        getPosts().then((data) => {
          // console.log(data);
          const __posts = data.map((post) => {
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
          setPosts(__posts);
          setLoading(false);
        })

        // setPosts(postsData);
        // setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    // Only load posts if the store is empty
    if (posts.length === 0) {
      loadPosts();
    }
  }, [posts.length, setPosts, setLoading, setError]);

  return {
    posts,
    addPost,
    updatePost,
    deletePost,
    isLoading,
    error
  };
}
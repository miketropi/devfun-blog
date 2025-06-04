'use client';

import { useState } from 'react';
import useDarkMode from '../hooks/useDarkMode';
import useStore from '../store/useStore';

export default function CommentForm({ postId }) {
  const { darkMode } = useDarkMode();
  const { token } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.comment.trim()) {
      newErrors.comment = 'Comment is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Replace with your actual WordPress REST API endpoint for comments
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}wp/v2/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token // Replace with your actual API key
        },
        body: JSON.stringify({
          post: postId,
          author_name: formData.name,
          author_email: formData.email,
          content: formData.comment
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        comment: ''
      });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 mb-12">
      <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
      
      {submitStatus === 'success' && (
        <div className="p-4 mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200">
          Your comment has been submitted and is awaiting moderation.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
          There was an error submitting your comment. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
              placeholder="Your name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="5"
            className={`w-full px-4 py-2 rounded-lg border ${errors.comment ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
            placeholder="Your comment"
            disabled={isSubmitting}
          ></textarea>
          {errors.comment && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.comment}</p>
          )}
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </button>
        </div>
      </form>
    </div>
  );
}
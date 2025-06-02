'use client';

import { useState } from 'react';
import useDarkMode from '../hooks/useDarkMode';
import useStore from '../store/useStore';

export default function LoginForm() {
  const { darkMode } = useDarkMode();
  const { login } = useStore();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
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

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData(prev => ({
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

  const validateLogin = () => {
    const newErrors = {};
    
    if (!loginData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegister = () => {
    const newErrors = {};
    
    if (!registerData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!registerData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(registerData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!registerData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateLogin()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // WordPress REST API JWT authentication endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store user data and token in the global store
      login(data.user, data.token);
      
      // Reset form and show success message
      setLoginData({
        username: '',
        password: ''
      });
      setSubmitStatus('success');
      
      // Redirect or update UI as needed
      // window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);
      setSubmitStatus('error');
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Login failed. Please check your credentials.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRegister()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // WordPress REST API users endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/wp-headless/v1/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerData.username,
          email: registerData.email,
          password: registerData.password
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Reset form and show success message
      setRegisterData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setSubmitStatus('success');
      
      // Switch to login tab after successful registration
      setActiveTab('login');
    } catch (error) {
      console.error('Registration error:', error);
      setSubmitStatus('error');
      setErrors(prev => ({
        ...prev,
        form: error.message || 'Registration failed. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      {/* Form Tabs */}
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-3 font-medium text-center transition-colors ${activeTab === 'login' ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-3 font-medium text-center transition-colors ${activeTab === 'register' ? 'text-[var(--accent)] border-b-2 border-[var(--accent)]' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'}`}
        >
          Register
        </button>
      </div>
      
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="p-4 mb-4 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200">
          {activeTab === 'login' ? 'You have successfully logged in.' : 'Registration successful! You can now log in.'}
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="p-4 mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200">
          {errors.form || 'An error occurred. Please try again.'}
        </div>
      )}
      
      {/* Login Form */}
      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-username" className="block text-sm font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="login-username"
              name="username"
              value={loginData.username}
              onChange={handleLoginChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.username ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
              placeholder="Your username"
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="login-password"
              name="password"
              value={loginData.password}
              onChange={handleLoginChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
              placeholder="Your password"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.password}</p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[var(--accent)] focus:ring-[var(--accent)] border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]">
              Forgot password?
            </a>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </button>
          </div>
        </form>
      )}
      
      {/* Register Form */}
      {activeTab === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label htmlFor="register-username" className="block text-sm font-medium mb-1">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="register-username"
              name="username"
              value={registerData.username}
              onChange={handleRegisterChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.username ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
              placeholder="Choose a username"
              disabled={isSubmitting}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.username}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="register-email" className="block text-sm font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="register-email"
              name="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
              placeholder="your.email@example.com"
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="register-password" className="block text-sm font-medium mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="register-password"
              name="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.password ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
              placeholder="Create a password"
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.password}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="register-confirm-password" className="block text-sm font-medium mb-1">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="register-confirm-password"
              name="confirmPassword"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              className={`w-full px-4 py-2 rounded-lg border ${errors.confirmPassword ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent outline-none transition-colors duration-200`}
              placeholder="Confirm your password"
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.confirmPassword}</p>
            )}
          </div>
          
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-[var(--accent)] focus:ring-[var(--accent)] border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              I agree to the <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">Terms of Service</a> and <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">Privacy Policy</a>
            </label>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 rounded-lg bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>
      )}
      
      {/* Social Login Options */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="ml-2">Google</span>
          </button>
          
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0110 4.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
            </svg>
            <span className="ml-2">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
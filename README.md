# DevFun Blog

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), featuring a modern blog with Zustand and Immer for state management.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Features

- Modern, responsive design
- Dark mode support
- Component-based architecture
- State management with Zustand and Immer

## State Management

This project uses Zustand with Immer for state management. Here's how it's set up:

### Store Structure

- `/src/app/store/useStore.js` - Main Zustand store with Immer middleware
- `/src/app/hooks/usePosts.js` - Custom hook for managing blog posts
- `/src/app/hooks/useDarkMode.js` - Custom hook for managing dark mode

### Using the Store

To use the store in a component:

```jsx
'use client';

import usePosts from '../hooks/usePosts';

export default function MyComponent() {
  const { posts, addPost, updatePost, deletePost } = usePosts();
  
  // Use the store data and actions
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
```

### Dark Mode

The dark mode functionality is implemented using Zustand and CSS classes:

```jsx
'use client';

import useDarkMode from '../hooks/useDarkMode';

export default function MyComponent() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </button>
  );
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

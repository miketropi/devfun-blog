import Link from 'next/link';
import Layout from '../../components/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Article Not Found</h2>
        <p className="text-lg mb-8 opacity-80">
          Sorry, the article you&#39;re looking for doesn&#39;t exist or has been removed.
        </p>
        <Link 
          href="/"
          className="px-6 py-3 bg-[var(--accent)] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Return to Home
        </Link>
      </div>
    </Layout>
  );
}
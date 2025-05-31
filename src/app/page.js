import Layout from './components/Layout';
import Hero from './components/Hero';
import ArticleList from './components/ArticleList';

export default function Home() {
  return (
    <Layout>
      <Hero 
        title="Web Development Insights & Tutorials" 
        subtitle="Discover modern web development techniques, best practices, and the latest trends in technology."
      />
      <ArticleList limit={3} />
    </Layout>
  );
}

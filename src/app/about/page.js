import Layout from '../components/Layout';
import Hero from '../components/Hero';

// This is now a server component (no 'use client' directive)
export default function About() {
  return (
    <Layout>
      <Hero 
        title="About DevFun Blog" 
        subtitle="Learn more about our mission and the team behind DevFun Blog."
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[var(--foreground)]">
            <span className="inline-block">Our Mission</span>
          </h2>
          <p className="opacity-80 mb-6 leading-relaxed text-sm sm:text-base">
            At DevFun Blog, we believe that web development should be both powerful and enjoyable. 
            Our mission is to provide high-quality tutorials, insights, and resources that help developers 
            of all skill levels build better web applications and grow their careers.
          </p>
          <p className="opacity-80 mb-6 leading-relaxed text-sm sm:text-base">
            We focus on modern technologies like React, Next.js, and Tailwind CSS, but we also cover 
            fundamental concepts and best practices that are essential for any web developer.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[var(--foreground)]">
            <span className="inline-block">Our Team</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-semibold mb-2">Jane Doe</h3>
              <p className="opacity-70 mb-4 text-sm">Founder & Lead Developer</p>
              <p className="opacity-80 text-sm sm:text-base">
                Jane has over 10 years of experience in web development and has worked with companies 
                like Google and Microsoft. She&#39;s passionate about creating intuitive user experiences 
                and teaching others how to do the same.
              </p>
            </div>
            <div className="bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="text-xl font-semibold mb-2">John Smith</h3>
              <p className="opacity-70 mb-4 text-sm">Technical Writer & Developer</p>
              <p className="opacity-80 text-sm sm:text-base">
                John specializes in JavaScript frameworks and performance optimization. He loves breaking 
                down complex concepts into simple, easy-to-understand tutorials that help developers 
                level up their skills.
              </p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[var(--foreground)]">
            <span className="inline-block">Contact Us</span>
          </h2>
          <p className="opacity-80 mb-6 leading-relaxed text-sm sm:text-base">
            Have a question or suggestion? We&#39;d love to hear from you! You can reach us at 
            <a href="mailto:hello@devfun.blog" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline ml-1 transition-colors duration-200">
              hello@devfun.blog
            </a>
          </p>
          <p className="opacity-80 leading-relaxed text-sm sm:text-base">
            Follow us on 
            <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline mx-1 transition-colors duration-200">Twitter</a> 
            and 
            <a href="#" className="text-[var(--accent)] hover:text-[var(--accent-hover)] hover:underline mx-1 transition-colors duration-200">GitHub</a> 
            for the latest updates and resources.
          </p>
        </section>
      </div>
    </Layout>
  );
}
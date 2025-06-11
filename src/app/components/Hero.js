'use client';

export default function Hero({ title, subtitle }) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
      {/* Background gradient effect */}
      
      <div className="relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
          {title.split(' ').slice(0, 2).join(' ')}<br className="hidden sm:block" />
          <span className="sm:hidden">{title.split(' ').slice(0, 2).join(' ')} </span>
          <span className="text-[var(--accent)]">{title.split(' ').slice(2).join(' ')}</span>
        </h2>
        <div className="text-lg sm:text-xl opacity-80 max-w-2xl leading-relaxed">
          {subtitle}
        </div>
      </div>
    </section>
  );
}
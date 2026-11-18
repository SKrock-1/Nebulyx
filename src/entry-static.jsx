import React from 'react';
import { renderToString } from 'react-dom/server';
import SiteNav from './components/site/SiteNav';
import { Welcome, About, Services, Process, Work, Studio, Contact } from './components/site/Sections';
import FaqSection from './components/FaqSection';
import { FAQS } from './data/faqs';

const noop = () => {};

function StaticPage() {
  return (
    <div className="relative text-white antialiased">
      <SiteNav chapter={0} onBook={noop} />
      <main>
        <Welcome onBook={noop} />
        <About />
        <Services onBookService={noop} />
        <Process />
        <Work />
        <Studio />
        <FaqSection />
        <Contact onBook={noop} />
      </main>
    </div>
  );
}

export function render() {
  return renderToString(<StaticPage />);
}

export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

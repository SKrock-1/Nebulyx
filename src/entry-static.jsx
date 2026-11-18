import React from 'react';
import { renderToString } from 'react-dom/server';
import SiteNav from './components/site/SiteNav';
import { Welcome, About, Services, Process, Work, Studio, Contact } from './components/site/Sections';
import FaqSection from './components/FaqSection';
import ServicePage, { servicePath } from './components/site/ServicePage';
import { FAQS } from './data/faqs';
import { SERVICES_DATA } from './data/services';
import { SERVICE_PAGES } from './data/servicePages';
import { CONTACT } from './data/contact';

const SITE = 'https://www.nebulyx.live';
const noop = () => {};

function StaticHome() {
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

function faqPage(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function renderHome() {
  return { html: renderToString(<StaticHome />), schemas: [faqPage(FAQS)] };
}

export const SERVICE_ROUTES = SERVICES_DATA.map((service) => {
  const page = SERVICE_PAGES[service.id];
  const path = servicePath(page.slug);
  const url = `${SITE}${path}`;
  return {
    id: service.id,
    path,
    url,
    title: page.seoTitle,
    description: page.metaDescription,
    render: () => renderToString(<ServicePage id={service.id} />),
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.title,
        serviceType: service.title,
        description: page.metaDescription,
        url,
        areaServed: 'Worldwide',
        provider: {
          '@type': 'ProfessionalService',
          name: 'Nebulyx',
          url: `${SITE}/`,
          email: CONTACT.email,
          address: { '@type': 'PostalAddress', addressLocality: 'Chandigarh', addressCountry: 'IN' },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/#services` },
          { '@type': 'ListItem', position: 3, name: service.title, item: url },
        ],
      },
      faqPage(page.faqs),
    ],
  };
});

export const STATIC_PAGES = ['/privacy.html', '/terms.html'];
export const SITE_URL = SITE;

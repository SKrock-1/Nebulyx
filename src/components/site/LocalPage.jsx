import React from 'react';
import { Shell } from './JournalPages';
import { delay, Check, Frame } from './labs';
import { servicePath } from './ServicePage';
import { SERVICES_DATA } from '../../data/services';
import { SERVICE_PAGES } from '../../data/servicePages';
import { WEBSITES, workPath } from '../../data/work';
import { CONTACT } from '../../data/contact';

export const LOCAL_PATH = '/website-design-chandigarh/';

export const LOCAL_FAQS = [
  { q: 'Are you based in Chandigarh?', a: `Yes. Nebulyx is a studio based in ${CONTACT.location}. We work with businesses in Chandigarh, Mohali and Panchkula, and with founders across India and worldwide.` },
  { q: 'How much does a website cost?', a: 'We price each project to its scope instead of using a rate card. After a short scoping call you get one fixed price in a written scope, and nothing starts until you approve it.' },
  { q: 'Can you build a website in Hindi and English?', a: 'Yes. The Ecavo website we designed and built for a Prayagraj food brand has English and Hindi versions behind a single language switch.' },
  { q: 'Do I own the website when it is finished?', a: 'Yes. The code, domain and accounts are set up in your name, so you can keep them, change them or move to another team.' },
  { q: 'Can you also help us get found on Google and in ChatGPT?', a: 'Yes. Every site is built search-friendly from day one, and our AI search service makes sure assistants like ChatGPT, Perplexity, Gemini and Claude describe your business accurately.' },
];

const ink = 'text-[color:var(--sp-ink)]';
const muted = 'text-[color:var(--sp-muted)]';
const accent = 'text-[color:var(--sp-accent-ink)]';
const line = 'border-[color:var(--sp-line)]';
const kicker = `font-mono text-[12px] tracking-[0.18em] uppercase ${muted}`;
const h2 = `font-display font-medium ${ink} text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.06] tracking-[-0.025em]`;

const REASONS = [
  ['One team, every service', 'Design, development, AI automation, social growth and AI search under one roof, so nothing gets lost between vendors.'],
  ['A fixed price in writing', 'A written scope, timeline and price you approve before anything starts. No hourly meter.'],
  ['Progress every week', 'We build in short cycles and show you working software every week.'],
  ['Yours to keep', 'Code, accounts and content in your name, with notes on how to run and change it.'],
];

export default function LocalPage() {
  return (
    <Shell
      current="local"
      crumbs={[['Home', '/'], ['Chandigarh', null]]}
      title="Website design and AI automation in Chandigarh"
      lead={(
        <>
          <p className="mt-6 mx-auto max-w-2xl text-[19px] leading-relaxed text-white/75">A Chandigarh studio that designs and builds websites, AI automation and growth for businesses in Chandigarh, Mohali and Panchkula, and for founders across India.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href="/?book=" className="sp-btn sp-btn-light h-12 px-6 text-[15px]">Request a scoping call</a>
            <a href="/work/" className="sp-btn sp-btn-ghost h-12 px-6 text-[15px]">See our work</a>
          </div>
        </>
      )}
    >
      <section className="px-5 sm:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <p className={kicker} data-io>What we build</p>
          <h2 className={`mt-3 ${h2}`} data-io style={delay(1)}>Five services for Tricity businesses</h2>
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_DATA.map((s, i) => (
              <li key={s.id} data-io style={delay(i, 0.08)}>
                <a href={servicePath(SERVICE_PAGES[s.id].slug)} className="sp-card focus-ring flex flex-col h-full p-7">
                  <span className={`font-mono text-[12px] ${muted}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`mt-3 font-display text-[22px] leading-tight ${ink}`}>{s.title}</span>
                  <span className="mt-2 text-[15px] leading-relaxed">{s.tagline}</span>
                  <span className={`mt-auto pt-5 text-[14px] font-medium ${accent}`}>More about {s.shortTitle.startsWith('AI') ? s.shortTitle : s.shortTitle.toLowerCase()} →</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1100px]">
          <p className={kicker} data-io>Recent work</p>
          <h2 className={`mt-3 ${h2}`} data-io style={delay(1)}>Websites we designed and built</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {WEBSITES.map((p, i) => (
              <li key={p.slug} data-io style={delay(i, 0.1)}>
                <a href={workPath(p.slug)} className="sp-card focus-ring flex flex-col h-full p-4">
                  <Frame image={p.image} name={`work-${p.slug}`} className="work-frame--crop" sizes="(min-width: 768px) 360px, 100vw" />
                  <span className={`mt-4 px-1 ${kicker}`}>{p.industry}</span>
                  <span className={`mt-1.5 px-1 font-display text-[21px] leading-tight ${ink}`}>{p.name}</span>
                  <span className="mt-1 px-1 pb-1 text-[15px] leading-relaxed">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-[1100px] grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div data-io>
            <p className={kicker}>Why Nebulyx</p>
            <h2 className={`mt-3 ${h2}`}>A senior studio in your city</h2>
            <p className="mt-5 text-[17px] leading-relaxed">Most businesses hire a designer, a developer, an automation freelancer, a social agency and an SEO consultant, then spend their week keeping them in sync. We put those skills in one team that plans your launch together and ships it.</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {REASONS.map(([t, d], i) => (
              <li key={t} className="sp-card p-6" data-io style={delay(i, 0.08)}>
                <p className={`flex gap-3 font-display text-[19px] leading-snug ${ink}`}><Check />{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-16 sm:pb-24">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${h2} text-center`} data-io>Questions</h2>
          <div className={`mt-10 border-t ${line}`} data-io>
            {LOCAL_FAQS.map(({ q, a }) => (
              <details key={q} className={`faq-item border-b ${line}`}>
                <summary className={`focus-ring py-6 cursor-pointer text-[18px] ${ink}`}>{q}</summary>
                <p className="pb-6 text-[16px] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
          <div className="mt-12 text-center" data-io>
            <a href="/?book=" className="sp-btn h-12 px-7 text-[15px]">Request a scoping call</a>
            <p className={`mt-4 text-[15px] ${muted}`}>or email <a href={`mailto:${CONTACT.email}`} className={`focus-ring inline-block py-2 underline underline-offset-4 ${accent}`}>{CONTACT.email}</a></p>
          </div>
        </div>
      </section>
    </Shell>
  );
}

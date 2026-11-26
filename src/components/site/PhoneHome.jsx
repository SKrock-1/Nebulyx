import React, { useEffect, useRef, useState } from 'react';
import { NebulyxLogo } from './Brand';
import { servicePath } from './ServicePage';
import { STEPS } from './Sections';
import { delay, BgShape, StepIcon, Frame, Check } from './labs';
import { WEBSITES, AUTOMATIONS, WORK_PATH, workPath } from '../../data/work';
import { SERVICES_DATA } from '../../data/services';
import { SERVICE_PAGES } from '../../data/servicePages';
import { CONTACT } from '../../data/contact';
import { FAQS } from '../../data/faqs';

const ink = 'text-[color:var(--sp-ink)]';
const muted = 'text-[color:var(--sp-muted)]';
const accent = 'text-[color:var(--sp-accent-ink)]';
const line = 'border-[color:var(--sp-line)]';
const link = 'text-[color:var(--sp-accent-ink)] underline decoration-[color:var(--sp-line-strong)] underline-offset-4';
const kicker = `font-mono text-[12px] tracking-[0.18em] uppercase ${muted}`;
const h2 = `font-display font-medium ${ink} text-[clamp(2rem,8.4vw,2.6rem)] leading-[1.05] tracking-[-0.025em]`;
const footLink = 'focus-ring inline-block py-3 transition-colors hover:text-[color:var(--sp-ink)]';
const num = (i) => String(i + 1).padStart(2, '0');

function BookLink({ service = '', onBook, className, children }) {
  return (
    <a
      href={`/?book=${encodeURIComponent(service)}`}
      onClick={(e) => {
        if (!onBook) return;
        e.preventDefault();
        onBook(service);
      }}
      className={className}
    >
      {children}
    </a>
  );
}

const NEEDS = [
  ['Website Building', 'A website'],
  ['AI Automations', 'AI automation'],
  ['Social Media Growth', 'Social growth'],
  ['AI Search Visibility (AEO & GEO)', 'AI search'],
  ['Online Stores & Dropshipping', 'An online store'],
];
const STAGES = ['Just starting', 'Growing', 'Established'];
const TIMING = ['This month', 'In 1–3 months', 'Just exploring'];
const ALWAYS = [
  'A written scope and fixed price before any work starts',
  'Progress you can see every week',
  'Code, accounts and content in your name',
  'No commitment until you approve the scope',
];

function Choice({ on, onClick, children }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={`price-chip focus-ring ${on ? 'is-on' : ''}`}>
      {children}
    </button>
  );
}

function PriceBuilder({ onBook }) {
  const [needs, setNeeds] = useState([]);
  const [stage, setStage] = useState('');
  const [timing, setTiming] = useState('');
  const toggle = (key) => setNeeds((cur) => (cur.includes(key) ? cur.filter((k) => k !== key) : [...cur, key]));
  const done = [needs.length > 0, !!stage, !!timing].filter(Boolean).length;
  const ready = done === 3;
  const labels = NEEDS.filter(([k]) => needs.includes(k)).map(([, l]) => l);
  const lower = (t) => (t.startsWith('AI') ? t : t.charAt(0).toLowerCase() + t.slice(1));
  const summary = labels.length > 1 ? `${labels.slice(0, -1).join(', ')} and ${lower(labels[labels.length - 1])}` : labels[0];

  const request = () => {
    const service = needs.length === 1 ? needs[0] : 'Several services';
    const message = `Price builder: ${labels.join(', ')}. Stage: ${stage}. Timing: ${timing}.`;
    onBook(service, { stage, message });
  };

  return (
    <div className="sp-card p-5 mt-8" data-io>
      <div className="flex items-center justify-between">
        <p className={kicker}>Step {Math.min(3, done + 1)} of 3</p>
        <span className="price-progress" aria-hidden="true"><span style={{ transform: `scaleX(${done / 3})` }} /></span>
      </div>

      <fieldset className="mt-5">
        <legend className={`text-[16px] font-medium ${ink}`}>What do you need?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {NEEDS.map(([k, l]) => <Choice key={k} on={needs.includes(k)} onClick={() => toggle(k)}>{l}</Choice>)}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={`text-[16px] font-medium ${ink}`}>Where is your business now?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {STAGES.map((x) => <Choice key={x} on={stage === x} onClick={() => setStage(x)}>{x}</Choice>)}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className={`text-[16px] font-medium ${ink}`}>When do you want to start?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {TIMING.map((x) => <Choice key={x} on={timing === x} onClick={() => setTiming(x)}>{x}</Choice>)}
        </div>
      </fieldset>

      <div className={`price-result mt-7 ${ready ? 'is-ready' : ''}`} aria-live="polite">
        {ready ? (
          <>
            <p className={kicker}>Your plan</p>
            <p className={`mt-2 font-display text-[22px] leading-snug ${ink}`}>{summary}, for a business that's {stage.toLowerCase()}, starting {timing === 'Just exploring' ? 'when you are ready' : timing.toLowerCase()}.</p>
            <p className="mt-2 text-[15px] leading-relaxed">Your fixed price comes in a written scope after a short call. We reply within 24 hours.</p>
          </>
        ) : (
          <p className="text-[15px] leading-relaxed">Answer three quick questions and we'll prepare a fixed price for exactly what you need.</p>
        )}
        <button type="button" disabled={!ready} onClick={request} className="sp-btn mt-5 w-full justify-center h-12 text-[15px] disabled:opacity-40 disabled:cursor-not-allowed">
          Get my fixed price
        </button>
      </div>
    </div>
  );
}

function useStickyCta(heroRef, endRef, quietRef) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window) || !heroRef.current || !endRef.current) return undefined;
    const seen = { hero: true, end: false, quiet: false };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const key = e.target === heroRef.current ? 'hero' : e.target === endRef.current ? 'end' : 'quiet';
        seen[key] = e.isIntersecting;
      });
      setShow(!seen.hero && !seen.end && !seen.quiet);
    });
    io.observe(heroRef.current);
    io.observe(endRef.current);
    if (quietRef?.current) io.observe(quietRef.current);
    return () => io.disconnect();
  }, [heroRef, endRef, quietRef]);
  return show;
}

export default function PhoneHome({ onBook }) {
  const heroRef = useRef(null);
  const endRef = useRef(null);
  const pricingRef = useRef(null);
  const sticky = useStickyCta(heroRef, endRef, pricingRef);
  const showcase = [...WEBSITES, ...AUTOMATIONS];

  return (
    <div className="service-page phone-home min-h-[100svh] antialiased">
      <header data-header data-surface="dark" className="sp-header">
        <div className="px-5 h-16 flex items-center justify-between gap-4">
          <a href="/" aria-label="Nebulyx home" className="focus-ring py-2"><NebulyxLogo /></a>
          <span className={`transition-opacity duration-300 ${sticky ? 'opacity-0 pointer-events-none' : ''}`} inert={sticky ? '' : undefined}>
            <BookLink onBook={onBook} className="sp-btn sp-btn-light h-11 px-5 text-[14px]">Request a call</BookLink>
          </span>
        </div>
      </header>

      <section ref={heroRef} className="phone-hero sp-hero-band sp-hero-band--full" aria-labelledby="phone-hero-title">
        <div data-hero className="sp-hero-sentinel" aria-hidden="true" />
        <div className="relative px-5 pt-10">
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase text-white/55">Design · Build · Automate</p>
          <h1 id="phone-hero-title" className="mt-4 font-display font-medium text-white text-[clamp(2.9rem,13.4vw,3.9rem)] leading-[0.95] tracking-[-0.04em]">
            <span className="sr-only">Nebulyx builds </span>Websites and AI <span className="phone-hero-ship">that ship.</span>
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-white/75">
            Sites for DataBahn, Vibe3D and Ecavo. AI systems that rescue deliveries, flag fraud and publish video. A fixed price before we start, and you own everything.
          </p>
        </div>

        <div className="phone-showcase relative mt-8" aria-label="Shipped work">
          <ul className="phone-showcase-track">
            {showcase.map((p, i) => (
              <li key={p.slug} className="phone-showcase-item">
                <a href={workPath(p.slug)} className="phone-showcase-card focus-ring">
                  <img
                    src={p.image.src}
                    srcSet={`${p.image.thumb} 480w, ${p.image.src} 1200w`}
                    sizes="80vw"
                    width="1200"
                    height="750"
                    alt=""
                    loading={i < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="phone-showcase-meta">
                    <span className="text-[15px] font-medium text-white">{p.name}</span>
                    <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-white/55">{p.kind === 'website' ? 'Website' : 'AI system'}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative px-5 pt-7 pb-12">
          <BookLink onBook={onBook} className="sp-btn sp-btn-light w-full justify-center h-12 text-[15px]">Request a scoping call</BookLink>
          <a href="#pricing" className="sp-btn sp-btn-ghost mt-3 w-full justify-center h-12 text-[15px]">What will it cost?</a>
        </div>
      </section>

      <main className="relative">
        <section id="services" className="relative px-5 pt-20 pb-8 scroll-mt-16">
          <p className={kicker} data-io>Five services</p>
          <h2 className={`mt-3 ${h2}`} data-io style={delay(1)}>What we build</h2>
          <ul className="mt-8 sp-card divide-y divide-[color:var(--sp-line)] overflow-hidden" data-io style={delay(2)}>
            {SERVICES_DATA.map((s, i) => (
              <li key={s.id}>
                <a href={servicePath(SERVICE_PAGES[s.id].slug)} className="phone-service-row focus-ring grid grid-cols-[auto_1fr_auto] gap-x-4 items-start px-5 py-5">
                  <span className={`pt-1 font-mono text-[12px] ${muted}`}>{num(i)}</span>
                  <span className="min-w-0">
                    <span className={`block font-display text-[19px] leading-tight ${ink}`}>{s.title}</span>
                    <span className="mt-1 block text-[15px] leading-snug">{s.tagline}</span>
                  </span>
                  <span aria-hidden="true" className={`pt-0.5 text-[18px] ${accent}`}>→</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section id="pricing" ref={pricingRef} className="px-5 py-16 scroll-mt-16">
          <p className={kicker} data-io>Pricing</p>
          <h2 className={`mt-3 ${h2}`} data-io style={delay(1)}>What will your launch cost?</h2>
          <p className="mt-4 text-[16px] leading-relaxed" data-io style={delay(2)}>No vague quotes and no hourly meter. Tell us what you need and you get one fixed price, in writing, before anything starts.</p>
          <PriceBuilder onBook={onBook} />
          <div className="mt-8" data-io>
            <p className={kicker}>Always included</p>
            <ul className="mt-4 space-y-3">
              {ALWAYS.map((x) => <li key={x} className="flex gap-3 text-[15px] leading-snug"><Check />{x}</li>)}
            </ul>
          </div>
        </section>

        <section id="process" className="px-5 py-16 scroll-mt-16">
          <h2 className={h2} data-io>How a project works</h2>
          <p className="mt-4 text-[16px] leading-relaxed" data-io style={delay(1)}>Four steps, a fixed price, and no surprises at the end.</p>
          <ol className="mt-12 space-y-10">
            {STEPS.map((step, i) => (
              <li key={step.key} className="grid grid-cols-[88px_1fr] gap-5 items-start" data-io>
                <StepIcon step={step} />
                <div className="pt-1 min-w-0">
                  <p className={`flex items-baseline gap-2 font-display text-[21px] ${ink}`}>
                    <span className={`font-mono text-[13px] ${muted}`}>{num(i)}</span>{step.key}
                  </p>
                  <p className={`mt-1 text-[16px] ${ink}`}>{step.line}</p>
                  <p className="mt-1.5 text-[15px] leading-relaxed">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="work" className="px-5 py-16 scroll-mt-16">
          <p className={kicker} data-io>Selected work</p>
          <h2 className={`mt-3 ${h2}`} data-io style={delay(1)}>Websites we designed and built</h2>
          <ul className="mt-8 space-y-5">
            {WEBSITES.map((p) => (
              <li key={p.slug} data-io>
                <a href={workPath(p.slug)} className="sp-card focus-ring block p-3">
                  <Frame image={p.image} name={`work-${p.slug}`} sizes="100vw" className="work-frame--crop" />
                  <span className={`mt-4 px-2 block ${kicker}`}>{p.industry}</span>
                  <span className={`mt-1.5 px-2 block font-display text-[22px] leading-tight ${ink}`}>{p.name}</span>
                  <span className="mt-1 px-2 pb-2 block text-[15px] leading-snug">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>

          <h3 className={`mt-14 font-display font-medium text-[24px] leading-tight ${ink}`} data-io>AI systems built for clients</h3>
          <ul className="mt-5 space-y-5">
            {AUTOMATIONS.map((p) => (
              <li key={p.slug} data-io>
                <a href={workPath(p.slug)} className="sp-card focus-ring block p-3">
                  <Frame image={p.image} name={`work-${p.slug}`} sizes="100vw" className="work-frame--crop" />
                  <span className={`mt-4 px-2 block ${kicker}`}>{p.industry}</span>
                  <span className={`mt-1.5 px-2 block font-display text-[22px] leading-tight ${ink}`}>{p.name}</span>
                  <span className="mt-1 px-2 pb-2 block text-[15px] leading-snug">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6"><a href={WORK_PATH} className={`focus-ring inline-block py-3 text-[15px] font-medium ${accent}`}>See all work →</a></p>
        </section>

        <section id="faq" className="px-5 py-16 scroll-mt-16">
          <h2 className={h2} data-io>Questions</h2>
          <div className={`mt-8 border-t ${line}`} data-io>
            {FAQS.map(({ q, a }) => (
              <details key={q} className={`faq-item border-b ${line}`}>
                <summary className={`focus-ring py-5 cursor-pointer text-[17px] ${ink}`}>{q}</summary>
                <p className="pb-5 text-[15px] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section ref={endRef} className="relative px-5 py-24 overflow-hidden">
          <BgShape kind="orbit" color="#c3ceff" style={{ '--s': '300px', right: '-150px', top: '-10px' }} drift={{ '--dx': '12s', '--dy': '18s', '--dr': '22s', '--ax': '12px', '--ay': '16px' }} />
          <div className="relative" data-io>
            <h2 className={h2}>Ready to start your project?</h2>
            <p className="mt-5 text-[16px] leading-relaxed">Tell us what you want to build and when. We'll reply with a written scope, timeline and price. No commitment until you approve them.</p>
            <BookLink onBook={onBook} className="sp-btn mt-8 w-full justify-center h-12 text-[15px]">Request a scoping call</BookLink>
            <p className={`mt-5 text-center text-[15px] ${muted}`}>
              or email <a href={`mailto:${CONTACT.email}`} className={`focus-ring inline-block py-3 ${link}`}>{CONTACT.email}</a>
            </p>
          </div>
        </section>
      </main>

      <footer className={`px-5 pt-6 pb-10 border-t ${line} text-[13px] ${muted}`}>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6">
          <a href="/ai-visibility-check/" className={footLink}>Free AI check</a>
          <a href="/work/" className={footLink}>Work</a>
          <a href="/journal/" className={footLink}>Journal</a>
          <a href="/about/" className={footLink}>About</a>
          <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className={footLink}>Instagram</a>
          <a href="/privacy.html" className={footLink}>Privacy</a>
          <a href="/terms.html" className={footLink}>Terms</a>
        </nav>
        <p className="mt-6">© 2026 Nebulyx · {CONTACT.location}</p>
      </footer>

      <div className="phone-cta" data-show={sticky ? 'true' : 'false'} inert={sticky ? undefined : ''}>
        <BookLink onBook={onBook} className="sp-btn w-full justify-center h-12 text-[15px]">Request a scoping call</BookLink>
      </div>
    </div>
  );
}

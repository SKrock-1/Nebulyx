import React from 'react';
import { Shell } from './JournalPages';
import { delay, Check, Frame } from './labs';
import { PROJECTS, WEBSITES, AUTOMATIONS, WORK_PATH, workPath } from '../../data/work';

const ink = 'text-[color:var(--sp-ink)]';
const muted = 'text-[color:var(--sp-muted)]';
const accent = 'text-[color:var(--sp-accent-ink)]';
const line = 'border-[color:var(--sp-line)]';
const kicker = `font-mono text-[12px] tracking-[0.18em] uppercase ${muted}`;
const h2 = `font-display font-medium ${ink} text-[clamp(1.9rem,4vw,2.8rem)] leading-[1.06] tracking-[-0.025em]`;
const chip = `inline-flex items-center px-3 py-1.5 rounded-full border ${line} bg-[var(--sp-card)] text-[13px] ${ink}`;

function ProjectCard({ project, i, large = false }) {
  return (
    <li data-io style={delay(i, 0.1)}>
      <a href={workPath(project.slug)} className={`sp-card focus-ring group flex flex-col h-full ${large ? 'p-4 sm:p-5' : 'p-4'}`}>
        <Frame image={project.image} name={`work-${project.slug}`} className="work-frame--crop" sizes={large ? '(min-width: 1024px) 560px, 100vw' : '(min-width: 1024px) 380px, 100vw'} />
        <span className={`mt-5 px-1 ${kicker}`}>{project.industry}</span>
        <span className={`mt-2 px-1 block font-display ${large ? 'text-[24px]' : 'text-[21px]'} leading-tight ${ink}`}>{project.name}</span>
        <span className="mt-1.5 px-1 block text-[15px] leading-relaxed">{project.title}</span>
        <span className={`mt-auto pt-5 px-1 pb-1 block text-[14px] font-medium ${accent}`}>Read the case study →</span>
      </a>
    </li>
  );
}

function ClosingCta() {
  return (
    <section className="px-5 sm:px-8 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center" data-io>
        <h2 className={h2}>Want something like this built?</h2>
        <p className="mt-5 mx-auto max-w-xl text-[17px] leading-relaxed">Tell us what you want to build and when. We reply within 24 hours with next steps, and you get a written scope, timeline and price before anything starts.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a href="/?book=" className="sp-btn h-12 px-7 text-[15px]">Request a scoping call</a>
        </div>
      </div>
    </section>
  );
}

export function WorkIndex() {
  return (
    <Shell
      current="work"
      crumbs={[['Home', '/'], ['Work', null]]}
      title="Work that ships"
      lead={<p className="mt-6 mx-auto max-w-2xl text-[19px] leading-relaxed text-white/75">Websites and AI systems Nebulyx has designed, built and handed over: three public websites, and three automation systems built for clients who asked us not to name them.</p>}
    >
      <section className="px-5 sm:px-8 py-16 sm:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className={kicker} data-io>Websites</p>
          <h2 className={`mt-3 ${h2}`} data-io style={delay(1)}>Designed and built by Nebulyx</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WEBSITES.map((p, i) => <ProjectCard key={p.slug} project={p} i={i} large />)}
          </ul>
        </div>
      </section>

      <section className="px-5 sm:px-8 pb-8">
        <div className="mx-auto max-w-[1200px]">
          <p className={kicker} data-io>AI automation</p>
          <h2 className={`mt-3 ${h2}`} data-io style={delay(1)}>Systems that run the work for you</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed" data-io style={delay(2)}>Built for clients, shown here without their names. Where the code is public, each page links to it.</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {AUTOMATIONS.map((p, i) => <ProjectCard key={p.slug} project={p} i={i} />)}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </Shell>
  );
}

export function WorkCase({ slug }) {
  const p = PROJECTS.find((x) => x.slug === slug);
  const index = PROJECTS.indexOf(p);
  const related = [1, 2].map((k) => PROJECTS[(index + k) % PROJECTS.length]);
  const facts = [
    ['Client', p.client],
    ['Industry', p.industry],
    ['What we did', p.services.join(' · ')],
    ['Built with', p.builtWith.join(' · ')],
  ];

  return (
    <Shell
      current="work"
      crumbs={[['Home', '/'], ['Work', WORK_PATH], [p.name, null]]}
      title={p.title}
      lead={<p className="mt-6 mx-auto max-w-2xl text-[19px] leading-relaxed text-white/75">{p.oneLiner}</p>}
    >
      <section className="px-5 sm:px-8 pt-12 sm:pt-16">
        <div className="mx-auto max-w-[1100px]" data-io>
          <Frame image={p.image} name={`work-${p.slug}`} eager />
        </div>
      </section>

      <section className="px-5 sm:px-8 py-14 sm:py-20">
        <div className="mx-auto max-w-[1100px] grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="sp-card p-6 sm:p-8 self-start" data-io>
            <dl className="divide-y divide-[color:var(--sp-line)]">
              {facts.map(([k, v]) => (
                <div key={k} className="py-4 first:pt-0">
                  <dt className={kicker}>{k}</dt>
                  <dd className={`mt-1.5 text-[16px] leading-relaxed ${ink}`}>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="pt-5 flex flex-wrap gap-3">
              {p.link && <a href={p.link.href} target="_blank" rel="noopener noreferrer" className="sp-btn h-11 px-5 text-[14px]">{p.link.label} ↗</a>}
              {p.demo && <a href={p.demo.href} target="_blank" rel="noopener noreferrer" className={`${chip} h-11 px-5 focus-ring`}>{p.demo.label} ↗</a>}
            </div>
          </div>

          <div>
            <h2 className={h2} data-io>The brief</h2>
            <p className="mt-5 text-[17px] leading-relaxed" data-io style={delay(1)}>{p.brief}</p>
            <h2 className={`mt-14 ${h2}`} data-io>What we delivered</h2>
            <ul className="mt-6 space-y-3.5" data-io style={delay(1)}>
              {p.delivered.map((d) => (
                <li key={d} className="flex gap-3 text-[16px] leading-relaxed"><Check />{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {p.phone && (
        <section className="px-5 sm:px-8 pb-6">
          <div className="mx-auto max-w-[1100px] sp-card p-6 sm:p-10 grid gap-8 md:grid-cols-[1fr_auto] items-center" data-io>
            <div>
              <p className={kicker}>On a phone</p>
              <h2 className={`mt-3 ${h2}`}>The same site, on a phone</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed">The live homepage at phone width, captured as it is today.</p>
            </div>
            <img src={p.phone.src} width={p.phone.width} height={p.phone.height} alt={p.phone.alt} loading="lazy" decoding="async" className="work-phone mx-auto w-[220px] sm:w-[250px] h-auto" />
          </div>
        </section>
      )}

      <section className="px-5 sm:px-8 py-16 sm:py-20">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-end justify-between gap-6" data-io>
            <h2 className={h2}>More work</h2>
            <a href={WORK_PATH} className={`focus-ring py-3 text-[15px] font-medium ${accent}`}>All work →</a>
          </div>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((r, i) => <ProjectCard key={r.slug} project={r} i={i} />)}
          </ul>
        </div>
      </section>

      <ClosingCta />
    </Shell>
  );
}

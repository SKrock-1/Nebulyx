import React, { useEffect, useRef, useState } from 'react';
import { X, Check } from 'lucide-react';
import { submitForm } from '../utils/submitForm';
import { SERVICES_DATA } from '../data/services';
import { CONTACT } from '../data/contact';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TONES = {
  dark: {
    overlay: 'items-center p-4 sm:p-6 bg-[#05060a]/85',
    panel: 'max-w-lg max-h-[92vh] bg-[#0b0d14] border border-white/[0.16] p-6 sm:p-8',
    close: 'text-[#b6bccb] hover:text-white',
    title: 'text-white',
    body: 'text-[#b6bccb]',
    label: 'text-[#d5d9e3]',
    strong: 'text-white',
    note: 'text-[#9aa1b2]',
    link: 'text-white underline decoration-white/30 underline-offset-4',
    error: 'text-[#ff8a8a]',
    field: 'w-full px-3.5 py-3 bg-[#05060a] border border-white/[0.18] rounded-[2px] text-[16px] text-white placeholder:text-[#7f8799] focus:outline-none focus:border-[#8fa2ff] aria-[invalid=true]:border-[#ff8a8a]',
    chipOn: 'border-[#3a5bff] bg-[#3a5bff] text-white',
    chipOff: 'border-white/[0.18] text-[#b6bccb] hover:text-white hover:border-white/40',
    chipShape: 'rounded-[2px]',
    submit: 'btn-primary',
    submitWrap: '',
    done: 'btn-primary',
    badge: 'bg-[#3a5bff]',
  },
  light: {
    overlay: 'items-end bg-[#1c1a17]/55',
    panel: 'service-page max-h-[92svh] rounded-t-[28px] px-5 pt-7 pb-[max(1.5rem,env(safe-area-inset-bottom))]',
    close: 'text-[color:var(--sp-muted)] hover:text-[color:var(--sp-ink)]',
    title: 'text-[color:var(--sp-ink)]',
    body: 'text-[color:var(--sp-body)]',
    label: 'text-[color:var(--sp-ink)]',
    strong: 'text-[color:var(--sp-ink)]',
    note: 'text-[color:var(--sp-muted)]',
    link: 'text-[color:var(--sp-accent-ink)] underline decoration-[color:var(--sp-line-strong)] underline-offset-4',
    error: 'text-[#b4372f]',
    field: 'w-full px-4 py-3 bg-white border border-[color:var(--sp-line-strong)] rounded-xl text-[16px] text-[color:var(--sp-ink)] placeholder:text-[color:var(--sp-muted)] focus:outline-none focus:border-[color:var(--sp-accent)] focus:ring-2 focus:ring-[color:var(--sp-tint)] aria-[invalid=true]:border-[#b4372f]',
    chipOn: 'border-[color:var(--sp-accent)] bg-[var(--sp-accent)] text-white',
    chipOff: 'border-[color:var(--sp-line-strong)] bg-white text-[color:var(--sp-body)]',
    chipShape: 'rounded-full',
    submit: 'sp-btn',
    submitWrap: 'sticky -bottom-6 -mx-5 px-5 pt-3 pb-1 bg-[var(--sp-bg)]',
    done: 'sp-btn',
    badge: 'bg-[var(--sp-accent)] rounded-full',
  },
};

// App mounts this only while open, so state resets and preselectedService applies on each open.
export default function ConsultationDrawer({ onClose, preselectedService = '', initialStage = '', initialMessage = '', tone = 'dark' }) {
  const t = TONES[tone] || TONES.dark;
  const chip = (on) => `focus-ring min-h-11 px-3 py-2.5 ${t.chipShape} text-[14px] border text-center transition-colors cursor-pointer ${on ? t.chipOn : t.chipOff}`;
  const [selectedDate, setSelectedDate] = useState('Any time');
  const [service, setService] = useState(preselectedService || '');
  const [stage, setStage] = useState(initialStage || '');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ name: '', email: '', message: initialMessage || '', website: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  const dates = ['Mornings', 'Afternoons', 'Evenings', 'Any time'];

  useEffect(() => {
    const trigger = document.activeElement;
    const panel = panelRef.current;
    panel?.querySelector('input, button')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      if (trigger instanceof HTMLElement) trigger.focus();
    };
  }, []);

  useEffect(() => {
    if (isSuccess) panelRef.current?.querySelector('button')?.focus();
  }, [isSuccess]);

  const validate = () => {
    const next = {};
    if (!formData.name.trim()) next.name = 'Add your name so we know who to reply to.';
    if (!formData.email.trim()) next.email = 'Add your email so we can send you a time.';
    else if (!EMAIL.test(formData.email.trim())) next.email = 'Check your email address, it looks incomplete (for example you@company.com).';
    if (!service) next.service = 'Choose what you need help with, or pick "Several of these".';
    return next;
  };

  const clearError = (key) => {
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    const found = validate();
    setErrors(found);
    const firstBad = ['name', 'email', 'service'].find((k) => found[k]);
    if (firstBad) {
      panelRef.current?.querySelector(`#consult-${firstBad}`)?.focus();
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await submitForm('Scoping call request', {
        ...formData,
        service,
        stage: stage || 'Not given',
        preferredTime: selectedDate,
      });
      setIsSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center ${t.overlay}`}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
        className={`relative w-full overflow-y-auto ${t.panel}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className={`focus-ring absolute top-4 right-4 w-11 h-11 grid place-items-center ${t.close}`}
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {isSuccess ? (
          <div className="py-8" role="status">
            <span className={`grid place-items-center w-11 h-11 text-white ${t.badge}`} aria-hidden="true">
              <Check className="w-5 h-5" />
            </span>
            <h2 id="consult-title" className={`mt-6 font-display text-[30px] leading-tight tracking-[-0.03em] ${t.title}`}>Request sent</h2>
            <p className={`mt-3 text-[16px] leading-relaxed ${t.body}`}>
              Thanks, {formData.name}. We'll email you at <span className={t.strong}>{formData.email}</span> within 24 hours to set up a time for your call.
            </p>
            <button type="button" onClick={onClose} className={`${t.done} h-12 px-6 text-sm mt-8 ${tone === 'light' ? 'w-full justify-center' : ''}`}>
              Done
            </button>
          </div>
        ) : (
          <>
            <h2 id="consult-title" className={`pr-10 font-display text-[30px] leading-tight tracking-[-0.03em] ${t.title}`}>
              Request a scoping call
            </h2>
            <p className={`mt-3 text-[15px] leading-relaxed ${t.body}`}>
              A short call to understand what you want to build. Tell us a little about your project and we'll reply within 24 hours to set up a time.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="consult-name" className={`block text-[13px] mb-1.5 ${t.label}`}>Your name</label>
                  <input
                    id="consult-name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Alex Mercer"
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); clearError('name'); }}
                    aria-invalid={errors.name ? 'true' : undefined}
                    aria-describedby={errors.name ? 'consult-name-error' : undefined}
                    className={t.field}
                  />
                  {errors.name && <p id="consult-name-error" className={`mt-1.5 text-[13px] ${t.error}`}>{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="consult-email" className={`block text-[13px] mb-1.5 ${t.label}`}>Email</label>
                  <input
                    id="consult-email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); clearError('email'); }}
                    aria-invalid={errors.email ? 'true' : undefined}
                    aria-describedby={errors.email ? 'consult-email-error' : undefined}
                    className={t.field}
                  />
                  {errors.email && <p id="consult-email-error" className={`mt-1.5 text-[13px] ${t.error}`}>{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="consult-service" className={`block text-[13px] mb-1.5 ${t.label}`}>What do you need help with?</label>
                <select
                  id="consult-service"
                  required
                  value={service}
                  onChange={(e) => { setService(e.target.value); clearError('service'); }}
                  aria-invalid={errors.service ? 'true' : undefined}
                  aria-describedby={errors.service ? 'consult-service-error' : undefined}
                  className={t.field}
                >
                  <option value="" disabled>Choose one</option>
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>{s.shortTitle}</option>
                  ))}
                  <option value="Several services">Several of these</option>
                </select>
                {errors.service && <p id="consult-service-error" className={`mt-1.5 text-[13px] ${t.error}`}>{errors.service}</p>}
              </div>

              <div>
                <label htmlFor="consult-message" className={`block text-[13px] mb-1.5 ${t.label}`}>What do you want to build? (optional)</label>
                <textarea
                  id="consult-message"
                  rows="3"
                  placeholder="A few lines is plenty, e.g. a launch site for our app by March"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={t.field}
                />
              </div>

              <div>
                <div id="consult-stage-label" className={`block text-[13px] mb-1.5 ${t.label}`}>Where is your business now? (optional)</div>
                <div role="group" aria-labelledby="consult-stage-label" className="grid grid-cols-3 gap-2">
                  {['Just starting', 'Growing', 'Established'].map((s) => (
                    <button key={s} type="button" aria-pressed={stage === s} onClick={() => setStage(stage === s ? '' : s)} className={chip(stage === s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div id="consult-time-label" className={`block text-[13px] mb-1.5 ${t.label}`}>Best time for a call</div>
                <div role="group" aria-labelledby="consult-time-label" className="grid grid-cols-2 gap-2">
                  {dates.map((d) => (
                    <button key={d} type="button" aria-pressed={selectedDate === d} onClick={() => setSelectedDate(d)} className={chip(selectedDate === d)}>
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label htmlFor="consult-website">Leave this field empty</label>
                <input
                  id="consult-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              {error && (
                <div role="alert" className={`text-[14px] ${t.error}`}>{error}</div>
              )}

              <div className={t.submitWrap}>
              <button type="submit" disabled={isSubmitting} className={`${t.submit} w-full justify-center h-12 text-[15px] disabled:opacity-60 disabled:cursor-wait`}>
                {isSubmitting ? 'Sending…' : 'Request my scoping call'}
              </button>
              </div>

              <p className={`text-[13px] ${t.note}`}>
                No commitment. You'll get a written scope and price before anything starts. Prefer email? Write to{' '}
                <a href={`mailto:${CONTACT.email}`} className={`focus-ring inline-block py-2 ${t.link}`}>{CONTACT.email}</a>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

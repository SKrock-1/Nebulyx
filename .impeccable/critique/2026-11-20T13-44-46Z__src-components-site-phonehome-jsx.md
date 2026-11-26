---
target: phone home
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\sonu kumar\\AppData\\Local\\Claude-Data\\claude_pzs8sxrjxfjjc\\scratch-workspaces\\ce614ff8-95f5-45a0-aab3-5ad576500921\\07370395-fd04-4481-bafe-6366349e67e4\\scratch-2026-11-01-4f3104\\Nebulyx\\src\\components\\site\\PhoneHome.jsx"
target_fingerprint: "sha256:c50f1d5ea32023ecfc492d5778c03f0eae773247a71f8d236c0061970828a59d"
target_path: "C:\\Users\\sonu kumar\\AppData\\Local\\Claude-Data\\claude_pzs8sxrjxfjjc\\scratch-workspaces\\ce614ff8-95f5-45a0-aab3-5ad576500921\\07370395-fd04-4481-bafe-6366349e67e4\\scratch-2026-11-01-4f3104\\Nebulyx\\src\\components\\site\\PhoneHome.jsx"
timestamp: 2026-11-20T13-44-46Z
slug: src-components-site-phonehome-jsx
---
Method: dual-agent (A: design review sub-agent · B: detector sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | Booking form relies on native one-at-a-time validation bubbles; no position cue on an 11-screen page |
| 2 | Match System / Real World | 3 | Plain founder language; "Book a scoping call" actually opens a request form, not a calendar |
| 3 | User Control and Freedom | 3 | Drawer closes on Escape and returns focus; no way back up from deep in the page |
| 4 | Consistency and Standards | 2 | Three CTA labels; pill page vs square-cornered dark drawer; "More about ai search" casing |
| 5 | Error Prevention | 3 | Good autofill and per-service prefill, but generic CTA silently preselects Websites / Just starting |
| 6 | Recognition Rather Than Recall | 3 | Services restated under different names in the capabilities list |
| 7 | Flexibility and Efficiency | n/a | Persuade landing page |
| 8 | Aesthetic and Minimalist Design | 2 | "One team" headline 4 times; About statement and capabilities card repeat hero and services |
| 9 | Error Recovery | 2 | Browser-default bubbles only, no inline error copy |
| 10 | Help and Documentation | n/a | Persuade landing page; FAQ covers the real objections |
| **Total** | | **20/32** | **Acceptable (63%)** |

## Design Specificity Verdict
Partly specific. Process steps (Agreed in writing / Progress every week / On real devices / Yours to keep), the "Sample"-labelled sprint cards and the ownership FAQ are authored for Nebulyx. The hero (headline over decorative stars and planet), the "Designed with care" statement and the "One team. Every service." card are category-interchangeable. The speed promise has no number anywhere on the page.

Deterministic scan: 14 advisory findings in PhoneHome.jsx, all off-ramp font sizes (15/16/21/24px) because DESIGN.md documents only the dark homepage system. Browser overlay: 6 findings; 3 hero contrast hits are false positives (detector reads the ivory ancestor, not the dark hero band); muted #7b756b at 12px on ivory measures 4.05:1 (real); 1 bounce-easing advisory.

## Priority Issues
- [P1] Speed promise has no number; hero shows no work. Fix: state sprint length once confirmed (PRODUCT.md marks 21-day as unconfirmed); replace planet shape with a real artefact (flow diagram / service mini-visual). Command: /impeccable clarify, /impeccable bolder
- [P1] Generic CTA preselects "Websites", "Just starting" in the booking drawer, corrupting lead data. Fix: empty required "Choose one" default; stage unselected. Command: /impeccable harden
- [P1] Length and repetition (~11 screens, "one team" x4). Fix: cut capabilities card and About statement; lead with process + samples; compact service rows. Command: /impeccable distill
- [P2] CTA inconsistency and density: "Book a call" x6, "Book a scoping call" x2, "Send request"; 10 card actions; lowercase "ai search". Fix: one label, explicit link labels, whole-card tap. Command: /impeccable clarify
- [P2] Accessibility: muted 12-13px text 4.05:1; tap targets 40-42px CTAs, 36px links, 18-20px footer/email links. Fix: darken --sp-muted ~10%, h-11 minimum, padded footer links. Command: /impeccable audit

## Persona Red Flags
- Jordan: AEO/GEO unexplained until 6th FAQ; unclear what "scoping call" opens; no sprint length or price anchor; "Sample" chip could read as free sample.
- Riley: generic CTA submits "Websites"; native validation only; no reply-time promise; casing slip; drawer style mismatch.
- Casey: only CTA is top-right header (worst thumb reach), no bottom sticky CTA; 7-field dark drawer needs scrolling; hero buttons wrap raggedly at 360px.

## Minor Observations
- Closing comet shape reads as a stray clipped blob.
- Mixed numbering styles: "01 · Websites", "01 / 03", "01 Scope".
- Process icons scaled to 0.82 look squeezed.
- FAQ chevron affordance is faint.
- "Design · Build · Grow" kicker repeats the H1.
- "Free AI check" offer buried in 13px footer text; could be a secondary CTA.

## Questions to Consider
- Why does the first screen sell "one team" (a staffing fact) instead of "launched in N days, and you own it"?
- Should a phone visitor ever see five full service cards, or a picker that prefills the drawer?
- Is "Book a scoping call" honest when it opens a request form? Would "Request a call, reply within 1 business day" convert better?

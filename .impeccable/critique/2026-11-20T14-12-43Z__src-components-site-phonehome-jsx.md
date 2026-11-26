---
target: phone home
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\sonu kumar\\AppData\\Local\\Claude-Data\\claude_pzs8sxrjxfjjc\\scratch-workspaces\\ce614ff8-95f5-45a0-aab3-5ad576500921\\07370395-fd04-4481-bafe-6366349e67e4\\scratch-2026-11-01-4f3104\\Nebulyx\\src\\components\\site\\PhoneHome.jsx"
target_fingerprint: "sha256:10621cc06237e6bbd1251fca25e47b771a40332e6c8a393303738e3e84f209eb"
target_path: "C:\\Users\\sonu kumar\\AppData\\Local\\Claude-Data\\claude_pzs8sxrjxfjjc\\scratch-workspaces\\ce614ff8-95f5-45a0-aab3-5ad576500921\\07370395-fd04-4481-bafe-6366349e67e4\\scratch-2026-11-01-4f3104\\Nebulyx\\src\\components\\site\\PhoneHome.jsx"
timestamp: 2026-11-20T14-12-43Z
slug: src-components-site-phonehome-jsx
---
Method: dual-agent (A: design review sub-agent · B: detector sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Inline errors and focus move work; hero sprint track drawn fully filled reads as "complete" |
| 2 | Match System / Real World | 3 | "Scoping call" not explained before the button; AEO/GEO only in last FAQ |
| 3 | User Control and Freedom | 3 | Escape, close and backdrop tap work; no swipe-down dismiss; page behind not scroll-locked |
| 4 | Consistency and Standards | 2 | "Book a call" / "Book a scoping call" / "Request my scoping call"; "Book" promises a booking but the result is an email later |
| 5 | Error Prevention | 3 | Only 3 required fields, nothing preselected except "Any time" |
| 6 | Recognition Rather Than Recall | 3 | Services rail hides 4 of 5 behind a swipe |
| 7 | Flexibility and Efficiency | n/a | Persuade page |
| 8 | Aesthetic and Minimalist Design | 3 | Clean and calm; sample diagrams mostly padding with ~10px SVG text |
| 9 | Error Recovery | 3 | Specific, kind error copy; label scrolls out of view when focus jumps |
| 10 | Help and Documentation | n/a | Persuade page; FAQ covers price, ownership, overruns |
| **Total** | | **23/32** | **Good (72%)** |

## Design Specificity Verdict
About half product-specific. The hero "Your launch, built in 21 days." over the Day 1 → Day 21 track is the ownable device; "Illustrative" pills and the process lines carry the honesty and ownership promise. Below the hero, the kicker/H2/cards/FAQ/CTA rhythm and the ivory-plus-blue palette are category-common; step icons are decorative; no real people appear.

Deterministic scan: 21 advisory off-ramp font sizes (DESIGN.md documents only the dark homepage: false positives for this system). Overlay: 3 hero contrast hits (false positives, dark band misread as ivory), 1 straggler ("it." alone on the hero paragraph's last line, real), 1 kicker-above-heading style note. Computed: muted text 4.83:1 (passes AA), body 8.30:1, all page targets ≥43.5px, sheet chips 44px, no overflow.

## Priority Issues
- [P1] Booking promise mismatch: three CTAs say "Book" but the sheet says "we'll email you to set up a time", with no reply time on a speed-promise brand. Fix: "Request a scoping call" everywhere (or a real slot picker); add a true reply-time line under the sheet title and on success. Command: /impeccable clarify
- [P1] No human or real proof on the phone page: "senior engineers" is unsupported; only illustrative samples. Fix: compact founders strip linking to /about/ (needs owner approval; founder names are currently kept off the homepage). Command: /impeccable shape
- [P2] Sheet too long for one thumb: submit at y≈904 on an 844px screen, off-screen on open. Fix: move stage/time below the message or collapse under "Add details (optional)", or a sticky submit. Command: /impeccable layout
- [P2] Duplicate CTAs after the hero: header "Book a call" and sticky bar on screen together. Fix: quiet or hide the header button while the sticky bar shows. Command: /impeccable distill
- [P3] Services rail hides 80% of the offer with generic taglines. Fix: compact 5-row list with day-21 outcomes, or a dot indicator and more peek. Command: /impeccable layout

## Persona Red Flags
- Jordan: "scoping call" undefined before CTA; can't tell if one sprint covers one service or several; price FAQ gives no range.
- Riley: zero real projects or names; no reply time, so a sent form feels like a void.
- Casey: sheet opens with focus on top-right close, submit off-screen; fade-ins can show blank bands on fast flicks; no swipe-down dismiss.

## Minor Observations
- Orphans: hero paragraph ends "it." alone; closer H2 breaks "21-" / "day sprint?".
- Evenly spaced sprint ticks imply four equal phases.
- Focus ring shows on the hero CTA after Escape on touch.
- Success "Done" button not full width.

## Questions to Consider
- Why end a speed pitch with "we'll email you to set up a time" instead of a picked slot?
- The founders are the only real proof: why hide them on the device where trust is hardest?
- Could the Day 1 → Day 21 track carry the page's argument further than the hero?

## Your request, summarized

Redesign the **"The Commodity AI Approach"** section (the `Insight` block) so it feels like a ChatGPT / v0-style prompt UI — inspired by the screenshot you uploaded — while keeping all current copy and the site's existing motion language.

Layout you want:

1. Keep the eyebrow `The Commodity AI Approach`.
2. Keep the headline **"Anonymous Until Committed. Verified From Day One."** centered above the chat box (this is the "What can I help you ship?" slot in the reference).
3. Render a large, rounded **chat input mock** below the headline, with the placeholder text:
   *"We don't just digitise brokerage. We re-engineer the trust layer of commodity trade."*
   Include subtle chat-input chrome (attach icon on the left, a "+ New Deal" pill and a send arrow on the right) — purely visual, not functional.
4. Below the chat box, render the **4 existing cards** (Blind Broker Matching, AI-Verified Trust Score, Escrow-Secured Deals, Masked WhatsApp Relay) as **pill-shaped quick-action chips** in a single centered row that wraps on smaller screens — same style/feel as the "Clone a Screenshot / Import from Figma / Upload a Project / Landing Page / Sign Up Form" row in the reference.
   - Each pill: icon + short label.
   - On hover or click, the pill expands inline (or reveals a tooltip/popover card) showing the full description, so we don't lose the existing content.
5. Use the **existing motion vocabulary** (FadeUp, gentle staggered reveal, soft accent glow on hover) so it blends with the rest of the landing page — not a pasted screenshot.

## Plan

### File touched
- `src/components/landing/sections.tsx` — rewrite only the `Insight()` component. Nothing else changes.

### Component structure

```
<section> (existing padding, dark bg)
  Eyebrow:  The Commodity AI Approach
  H2:       Anonymous Until Committed. Verified From Day One.
  ChatComposer (new, presentational only)
    ┌──────────────────────────────────────────────┐
    │ placeholder: "We don't just digitise…"       │
    │                                              │
    │  📎                          [+ New Deal] ↑  │
    └──────────────────────────────────────────────┘
  QuickActionPills (row, wraps)
    [👁  Blind Broker Matching]
    [🛡  AI-Verified Trust Score]
    [🔒  Escrow-Secured Deals]
    [💬  Masked WhatsApp Relay]
```

### Visual / motion details
- Chat box: `rounded-2xl border border-border bg-surface-alt`, soft inner shadow, ~140px tall, placeholder in `text-subtext`. Subtle gold focus ring on hover (`hover:border-accent/40`), matching the rest of the page.
- A faint top-radial gold glow behind the composer (same `RadialGlowBackground` flavor used elsewhere) so it feels lit, not pasted.
- Pills: `rounded-full border border-border bg-surface-alt/80 px-4 py-2`, icon + label, hover lifts border to `accent/40` with a 30%-brightness glow (matching the prior hover-glow restraint you set in the grid sections).
- Pill click/hover reveals the original description text either:
  - **Default**: a `Popover`/tooltip-style card anchored below the pill, OR
  - **Alt (preferred for smoothness)**: an inline expanding panel under the pill row that fades the selected card's full description in/out using `motion.div` with `AnimatePresence` — same easing curve as `FadeUp` (`[0.22, 1, 0.36, 1]`, ~0.4s).
- Entrance: `FadeUp` on eyebrow, headline, composer, and pills (staggered ~0.1s) — identical to current pattern.

### What stays the same
- All 4 card titles and descriptions (no copy rewrites).
- Section bg, padding, eyebrow.
- Icons (`EyeOff`, `ShieldCheck`, `Lock`, `MessageSquareLock`).
- No new dependencies — uses existing `framer-motion`, `lucide-react`, and Tailwind tokens.

### Out of scope
- No changes to other sections, no new routes, no business logic.

Approve and I'll implement.
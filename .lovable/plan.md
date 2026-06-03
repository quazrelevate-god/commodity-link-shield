
## Keywords extracted from your request

Before doing anything, here is exactly how I'm reading your idea — please confirm these are the right keywords:

- **"very responsive"** → cards react smoothly to the cursor, not just on click.
- **"cursor goes near the card"** → proximity-based trigger, not just `:hover` on the card itself. Reaction begins while the cursor is *approaching*, not only when it's on top.
- **"micro reaction"** → small, tasteful motion (no big jumps, no flashy effects).
- **"popup a little bit"** → slight lift on the Z axis (translateY upward + soft shadow bloom).
- **"rest position in the slight slanting way"** → default/idle state of each card is **tilted** (a gentle rotate, ~ -4° to -6° for one card, +3° to +5° for the other, so they look casually stacked / off-axis).
- **"slight zoom in"** → on proximity: scale up subtly (~1.03–1.05).
- **"straight up"** → on proximity: rotation animates **back to 0°** (cards straighten out of their slant).
- **Two cards** → Buyer card + Seller card, still representing the two sides of the marketplace.
- **"real generic images"** → swap current images. **No warehouse. No Arabic/Gulf people. No Indian rice mill.** Use neutral, generic, globally-readable photography of a buyer and a seller (business-context, not region-coded, not stocky-cliché).

If any keyword above is wrong, tell me and I'll adjust before building.

---

## Plan

### 1. Replace the two hero images
Generate two new generic images (no regional/ethnic cues, no warehouses):
- **Buyer card** → a clean, generic "buyer" visual: e.g. a person at a laptop reviewing a purchase dashboard, neutral modern office, soft lighting. No headscarf, no thobe, no port.
- **Seller card** → a clean, generic "seller" visual: e.g. a person at a desk with a tablet/inventory screen, neutral workspace. No rice mill, no sacks, no warehouse floor.

Both images: dark-toned, cinematic, color-graded toward the page palette (warm gold highlights on near-black), shot at similar focal length so the pair feels like a set.

Old `seller-card.jpg` and `buyer-card.jpg` will be overwritten.

### 2. Rest state — slight slant
- Buyer card (top-right): `rotate: +4deg`, slight `translateY` so it sits naturally.
- Seller card (bottom-left of the stack): `rotate: -5deg`, offset down-left.
- Both keep current rounded-2xl, border, and gold ambient glow.
- A very subtle continuous idle float (≈ 6px up/down, 6s loop) so they feel alive even before interaction — optional, will keep extremely gentle.

### 3. Cursor-proximity micro-interaction
Implementation approach (Framer Motion + a small proximity hook):

- Track pointer position on the hero's right column via `onMouseMove`.
- For each card, compute distance from cursor to card center.
- Define a **proximity radius** (~220px). Within that radius, interpolate a `t` value from 0 → 1 as distance shrinks.
- Drive these properties from `t`:
  - `rotate`: from rest slant (+4° / −5°) → `0deg` (straightens up)
  - `scale`: `1` → `1.04`
  - `translateY`: `0` → `-10px` (the "popup")
  - `boxShadow`: subtle → stronger gold-tinted shadow
  - `z-index`: bump the active card above the other
- Use `useSpring` / `useTransform` so motion is smooth and damped, not snappy.
- On mouse leave of the hero area, everything eases back to the slanted rest pose.

### 4. Accessibility & responsiveness
- Respect `prefers-reduced-motion`: disable the float and proximity motion, keep only a simple hover scale.
- On touch / small screens (`md` breakpoint and below): no proximity tracking; cards display upright, stacked vertically, no slant — so mobile stays clean and tappable.

### 5. Files touched
- `src/assets/buyer-card.jpg` — regenerate (generic buyer)
- `src/assets/seller-card.jpg` — regenerate (generic seller)
- `src/components/landing/sections.tsx` — replace the two-card block in `Hero` with the new tilted + proximity-reactive version
- (Possibly) `src/components/landing/useCursorProximity.ts` — small new hook for the distance→intensity math

### 6. Out of scope
- No changes to copy, CTAs, headline animation, navbar, or any other section.
- No changes to color tokens or fonts.

---

**Please confirm:**
1. Keyword interpretation above is correct.
2. The generic image direction (person-at-laptop buyer, person-at-desk seller, no region cues) is what you want — or describe the exact imagery you'd prefer.

Once you approve, I'll switch to build mode and implement.

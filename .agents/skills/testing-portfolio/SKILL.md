# Testing: Ahmad Baehaqi Portfolio Website

## Overview
This is a static HTML/CSS/JS portfolio website with a SmoothieJuicy-inspired UI (dark gradients, glassmorphism, orange accent, floating particles, smooth animations).

## Deployment
- The site can be deployed using Devin's `deploy` tool with `command="frontend"` pointing to the repo root (which contains `index.html`)
- No build step required — it's plain HTML/CSS/JS

## Key Sections to Test
All sections are on a single page with smooth scroll navigation:
1. **Hero** — Dark gradient background, glassmorphism profile card, floating particles, stats counters (5+, 3+ thn, 4)
2. **Tentang (About)** — Two info cards with hover lift animation and orange top-bar
3. **Keahlian (Skills)** — 6 glassmorphism cards with colored icon badges and 3D tilt on hover
4. **Pengalaman (Experience)** — Timeline with 5 entries, orange filled marker on current job, tags
5. **Pendidikan (Education)** — Glassmorphism card with year badge
6. **Sertifikasi (Certifications)** — 4 cards with side ribbon accents and colored icons
7. **Hubungi (Contact)** — Orange gradient background, 3 contact cards, WhatsApp/Email CTAs

## Testing Checklist
- [ ] Site loads at deployed URL
- [ ] Navbar shows all 6 section links + "Hubungi" orange button
- [ ] Clicking nav links smooth-scrolls to correct section and highlights active link in orange
- [ ] Hero displays profile photo, name, role, stats, CTA buttons
- [ ] All 5 experience timeline entries render with tags
- [ ] Contact section shows correct email, phone, location
- [ ] Back-to-top button scrolls page to top (known issue: might not work if JS handler skips `#top` — check `script.js` for `return` on `#top` targetId)
- [ ] Mobile responsive (375px): hamburger menu opens with all links, layout stacks vertically
- [ ] Floating particle animations visible on hero section

## Known Issues
- **Back-to-top button**: The JS smooth scroll handler in `script.js` may skip `#top` links with an early `return`. If the back-to-top button doesn't scroll, check line ~149 in `script.js` for `if (targetId === '#' || targetId === '#top') return;` and replace with `window.scrollTo({ top: 0, behavior: 'smooth' })`.
- **Hover effects**: CSS hover animations (card lift, 3D tilt, top-bar reveal) cannot be tested via automation tools that lack a native hover action. Visual inspection or Playwright scripting may be needed.

## Responsive Breakpoints
- Desktop: full nav bar, 2-column hero, 3-column skills grid
- Tablet (~768px): adjusted spacing
- Mobile (~480px): hamburger menu, single column, stacked layout

## Tips
- Use Chrome DevTools device toolbar (Ctrl+Shift+M) to test responsive layouts
- Test on iPhone SE (375x667) for minimum mobile viewport
- The site uses Poppins font from Google Fonts CDN — verify it loads (text should not fall back to system font)
- Color scheme: primary orange `#ff6b35`, dark backgrounds `#0a192f`, `#112240`, `#1d3557`

## Devin Secrets Needed
None — this is a static site with no authentication or API keys required.

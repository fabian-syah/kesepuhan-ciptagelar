# Animation Specification: Odisha Tourism Demo Reverse Engineering

Target inspected: `https://codemedialabs.in/demo/odisha-tourism`
Engineers / Source analysis: Next.js + React 19 + Lenis 1.3.26 + Motion (Framer Motion) + Tailwind CSS.

---

## 1. Smooth-Scroll Library and Configuration
- **Library**: Lenis (v1.3.26).
- **Core Loop**: Native requestAnimationFrame RAF update loop (`lenis.raf(time)`).
- **Physics & Motion Smoothing**:
  - The scroll progress across the master container is smoothed via Motion's `useSpring`:
    ```ts
    const springConfig = { stiffness: 120, damping: 30, mass: 0.4 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);
    ```
  - All downstream transforms consume this single smoothed spring value to prevent jitter.

---

## 2. Section List & Architecture Hierarchy
The experience is divided into two primary structural zones:

### Zone A: Master Scrollytelling Sequence (`relative h-[1000vh]`)
Pinned viewport container (`sticky top-0 h-screen overflow-hidden bg-black`).
- **Hero Scene**: `progress: 0.00` → `0.10`
- **Chapter 1 ("Dawn" / Chilika Lake)**: `start: 0.10`, `end: 0.28` (Pinned viewport, cross-fades in place)
- **Chapter 2 ("Wilderness" / Forest)**: `start: 0.28`, `end: 0.46` (Pinned viewport, cross-fades in place)
- **Chapter 3 ("Devotion" / Temple)**: `start: 0.46`, `end: 0.64` (Pinned viewport, cross-fades in place)
- **Chapter 4 ("Celebrate" / Culture & Dance)**: `start: 0.64`, `end: 0.82` (Pinned viewport, cross-fades in place)
- **Chapter 5 ("Horizon" / Coastline)**: `start: 0.82`, `end: 1.00` (Pinned viewport, cross-fades in place)

### Zone B: Standard Flow Sections (Below `1000vh`)
- **Section 6 ("Explore Odisha")**: Interactive full-height panorama with perspective `1200px` and interactive 3D hotspot cards.
- **Section 7 ("More to Explore / Experiences")**: **Horizontal-scroll carousel** (`overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide`).
- **Section 8 ("Stay Close to What You Love")**: Handpicked accommodation grid (`grid grid-cols-1 md:grid-cols-3 gap-6`).
- **Section 9 ("Traveler Stories")**: Dark testimonials quote section (`bg-neutral-950`).
- **Section 10 ("Footer / Concept Statement")**: Clean black technical and redesign credits.

---

## 3. Mathematical Formula for Chapter Progressions
Every chapter in the 1000vh sequence has an exact relative span of `0.18` (18% of the total scroll) computed via the extracted factory function:
```ts
function getChapterTimeline(start: number, end: number) {
  const length = end - start; // 0.18
  return {
    start,                     // 0.00 * length + start
    enter:   start + 0.08 * length, // +1.44%
    reveal:  start + 0.22 * length, // +3.96%
    content: start + 0.40 * length, // +7.20%
    peak:    start + 0.70 * length, // +12.60%
    outro:   start + 0.90 * length, // +16.20%
    end,                       // +18.00%
  };
}
```

---

## 4. Animated Elements: Property, Range, Easing & Stagger

### A. Hero Scene (`progress: 0.00 → 0.10`)
1. **Ghost Watermark Word ("ODISHA")**:
   - `scale`: `[1.0, 1.18]` over `progress: [0.00, 0.09]`
   - `opacity`: `[0.28, 0.28, 0.0]` over `progress: [0.00, 0.04, 0.09]`
   - `filter`: `["blur(0px)", "blur(24px)"]` over `progress: [0.00, 0.09]`
2. **Eyebrow Tag ("Independent redesign...")**:
   - `translateY`: `[0px, -48px]` over `progress: [0.02, 0.06]`
   - `opacity`: `[1.0, 0.0]` over `progress: [0.02, 0.06]`
3. **Headline Line 1 ("Not all journeys")**:
   - `translateY`: `[0px, -80px]` over `progress: [0.02, 0.07]`
   - `opacity`: `[1.0, 1.0, 0.0]` over `progress: [0.02, 0.04, 0.07]`
4. **Headline Line 2 ("begin with a destination")**:
   - `translateY`: `[0px, -65px]` over `progress: [0.02, 0.07]`
   - `opacity`: `[1.0, 1.0, 0.0]` over `progress: [0.02, 0.04, 0.07]`
5. **Subtitle ("Forests · Temples · Wetlands · Coastlines")**:
   - `translateY`: `[0px, 44px]` over `progress: [0.02, 0.06]`
   - `opacity`: `[1.0, 0.0]` over `progress: [0.02, 0.06]`
6. **Scroll Indicator (Bottom Center)**:
   - `opacity`: `[1.0, 0.0]` over `progress: [0.00, 0.03]`
   - Infinite keyframe oscillation: `translateY: [0, 8px, 0]` with duration 2s easeInOut.
7. **Progress Bar (Right Edge)**:
   - Vertical track: `h-44 w-px bg-white/10`.
   - Fill bar: `scaleY: [0, 1]` mapped over `progress: [0.00, 1.00]`, `transformOrigin: "top"`.

### B. 5 Scrollytelling Chapters (`progress: 0.10 → 1.00`)
Every chapter executes identical standardized animation choreography over its local timeline:
1. **Section Wrapper Visibility**:
   - `opacity`: `[0, 1, 1, 0]` mapped to `[start, enter, outro, end]`.
2. **Background Primary Image**:
   - `scale`: `[1.0, 1.18]` mapped to `[start, end]`.
   - `y` (Vertical Parallax): `[0px, -100px]` mapped to `[start, end]`.
3. **Floating Secondary Detail / Accent Element**:
   - `x`: `[-300px, 400px]` mapped to `[start, end]`.
   - `y`: `[40px, -80px]` mapped to `[start, end]`.
4. **Secondary Floating Badge / Tag**:
   - `y`: `[-50px, 80px]`, `x`: `[0px, -40px]` mapped to `[start, end]`.
5. **Text Container (Eyebrow + H2 + Paragraph)**:
   - `opacity`: `[0, 1]` mapped to `[reveal, content]`.
   - `y`: `[80px, 0px]` mapped to `[reveal, content]`.
   - At departure (`peak` → `outro`): `y: [0px, -40px]`, `opacity: [1, 0]`.

---

## 5. Background & Media Transitions
- **Zero-Layout-Shift Cross-Dissolves**: All 5 chapter scenes exist simultaneously within the single sticky viewport.
- As the user scrolls from chapter $k$ to $k+1$, chapter $k$'s opacity decreases from 1 to 0 between `outro` and `end`, while chapter $k+1$'s opacity increases from 0 to 1 between `start` and `enter`.
- The background images are stacked edge-to-edge (`absolute inset-0 object-cover`) and gently zoom and glide on the Y-axis continuously to simulate filmic tracking shots.

---

## 6. Navbar Behavior
- Position: `fixed top-0 left-0 w-full z-50`.
- Inside the 1000vh sequence (`window.scrollY <= 10 * window.innerHeight`):
  - State: `bg-transparent border-b border-white/10 py-6`.
- Outside / Past 1000vh (`window.scrollY > 10 * window.innerHeight`):
  - State: `bg-[#050507]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-xl shadow-black/20`.
  - Transition duration: `500ms ease-in-out`.

---

## 7. Design Tokens: Typography, Spacing & Colors

### Typography
- **Headlines & Watermarks**: High-contrast humanist Serif (e.g. `Lora`, `Newsreader`, `Kumbh Sans`).
  - Giant Watermark: `font-serif font-light text-[20vw] sm:text-[16vw] lg:text-[15rem] tracking-[0.06em]`.
  - Hero Headline: `font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-[1.02] tracking-tight`.
  - Chapter Headline: `font-serif text-3xl sm:text-5xl md:text-6xl font-light leading-[1.1]`.
- **Body & Metadata**: Clean, neutral, open Sans-serif (e.g. `Plus Jakarta Sans`, `Urbanist`).
  - Eyebrow: `text-[10px] sm:text-xs uppercase tracking-[0.4em]` to `[0.9em]`.
  - Narrative Body: `text-sm sm:text-base md:text-lg font-light leading-relaxed`.
  - Metadata / Coordinates: `text-[11px] tracking-widest uppercase`.

### Palette (Target Reference)
- Backgrounds: Dark Obsidian (`#0d0a09`, `#050507`, `#000000`), Light sections (`#fcfbf7`).
- Text: Warm Off-White (`#f5ede4`), Muted Warm Grey (`#a89484`).
- Accent: Earth Terracotta / Warm Amber (`#c85a30`, `#d97706`).

### Adapted Palette for Kasepuhan Ciptagelar (Strict 3 Colors, No Gradients, No Purple)
1. **Deep Soil-Brown**: `#1C1814` (Volcanic humic soil, darkened timber).
2. **Warm Off-White**: `#F7F5EE` (Parchment, mountain fog, unbleached weave).
3. **Rice-Straw Gold**: `#C89B3C` (Unthreshed harvest grain / *pare*, brass gong accents).

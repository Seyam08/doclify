# Design System Inspired by Ollyo

## 1. Visual Theme & Atmosphere

Ollyo embodies a bold, tech-forward aesthetic that merges pixelated retro elements with clean, modern minimalism. The design celebrates engineering rigor through stark black-and-white contrast punctuated by electric, vibrant accent colors—particularly a striking lime green and deep purple. The atmosphere is confident and approachable, positioning Ollyo as a sophisticated yet accessible tool for developers, designers, and businesses. Typography scales dramatically, from massive headline statements down to subtle navigation links, creating visual hierarchy through sheer scale and weight. The overall impression is one of quiet power: tools that work transparently in the background, trusted and reliable, with visual accents that signal energy, innovation, and forward momentum.

**Key Characteristics**
- Extreme typographic scale and boldness
- High contrast monochromatic base with electric accent colors
- Minimal borders and shadows (mostly removed)
- Clean, spacious layouts with generous whitespace
- Vibrant neon-adjacent accent palette (lime, purple, cyan, electric green)
- Pixelated or geometric UI elements for visual interest
- Professional minimalism with creative flourishes
- Accessible, developer-centric aesthetic

## 2. Color Palette & Roles

### Primary
- **Brand Lime** (`#9FFA62`): Primary accent for buttons, highlights, interactive states, and brand identity; most frequently used accent color
- **Brand Purple** (`#5409DA`): Secondary primary for navigation highlights, premium features, and interactive accents; deep, rich contrast

### Accent Colors
- **Electric Cyan** (`#4BC3FF`): Tertiary accent for callouts, tags, and secondary highlights
- **Vivid Blue** (`#0049F8`): Strong call-to-action accent; used sparingly for critical interactive elements
- **Dark Purple** (`#360065`): Deep accent for shadows or subtle background tints
- **Lavender** (`#D8D5ED`): Light accent for backgrounds, subtle surface variations

### Interactive
- **Neon Green** (`#00F56C`): Interactive element highlight; hover and active states
- **Cobalt Blue** (`#1F40CC`): Link color; trust and navigation signaling

### Neutral Scale
- **Black** (`#000000`): Primary text, headings, borders; dominant neutral used 874 times
- **Charcoal** (`#2D2D2D`): Secondary text, muted body copy
- **Dark Gray** (`#464544`): Tertiary text and subtle elements
- **Medium Gray** (`#3D3D3D`): UI dividers and borders
- **Light Gray** (`#DDDDDD`): Subtle borders and dividers
- **Very Light Gray** (`#E7E7E7`): Minimal borders and hairlines
- **Off-White** (`#F1F1F1`): Soft background surfaces
- **White** (`#FFFFFF`): Primary surface, cards, and container backgrounds

### Surface & Borders
- **Card Background** (`#FFFFFF` at 60% opacity): Semi-transparent white for layered cards and containers
- **Input Border** (`#767676` inferred): Default input field borders
- **Neutral Border** (`#DDDDDD`): Subtle UI dividers

### Semantic / Status
- **Success** (`#00E75D`, `#2FCE2C`, `#61E916`): Positive feedback and validation states; prefer `#00E75D` as primary success color
- **Warning** (`#B7F626`): Alert states and warnings; yellowish-green tone

## 3. Typography Rules

### Font Family
**Primary Display:** Jersey 20 (Google Fonts). Fallback: `Georgia, serif`

**Secondary (Body/Emphasis):** Stack Sans Notch. Fallback: `'Segoe UI', Tahoma, Geneva, sans-serif`

**Tertiary (UI/Links):** -apple-system. Full stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| **Display/H1** | Jersey 20 | `274px` | 400 | `175px` | 0 | Massive hero headlines; pixelated presence |
| **Display/H2** | Jersey 20 | `200px` | 400 | `119px` | 0 | Large section headings |
| **Heading/H3** | Jersey 20 | `58px` | 400 | `46px` | 0 | Medium section headers |
| **Emphasis/Span** | Jersey 20 | `120px` | 400 | `96px` | 0 | Highlighted inline text; brand callouts |
| **Body Strong** | Stack Sans Notch | `58px` | 600 | `70px` | 0 | Bold body copy; feature descriptions |
| **Navigation/Link** | -apple-system | `16px` | 400 | `24px` | 0 | Primary navigation and links |
| **UI/List Item** | -apple-system | `14px` | 400 | `14px` | 0 | Compact UI labels and list items |
| **Body** | Plus Jakarta Sans (inferred) | `16px` | 400 | `24px` | 0 | Default body text |

### Principles
- **Typographic Contrast:** Use massive sizes for headlines to create visual hierarchy; minimize decoration and rely on scale
- **Readability:** Large line heights (1.3–1.5 ratio) ensure comfort at display sizes; tighter line heights for compact UI labels
- **Pixel-Perfect Scale:** All font sizes use exact pixel values; no rems or ems—maintain precision
- **Weight Discipline:** Stick to 400 (regular) for display; use 600 (semi-bold) only for emphasis; avoid intermediate weights
- **Mono-Friendly:** Support code snippets and data with monospace fallbacks where needed

## 4. Component Stylings

### Buttons

**Primary Button (CTA)**
- Background: `#9FFA62` (Brand Lime)
- Text Color: `#000000` (Black)
- Font: -apple-system, `16px`, weight `600`
- Padding: `16px 32px`
- Border Radius: `0px` (sharp corners)
- Border: none
- Box Shadow: none
- Hover: Background `#8FE646`; slightly darkened lime
- Active: Background `#7FD630`; deeper lime tone
- Focus: outline `2px solid #5409DA` with `2px` offset

**Secondary Button**
- Background: `#FFFFFF` (White) with border
- Text Color: `#5409DA` (Brand Purple)
- Font: -apple-system, `16px`, weight `500`
- Padding: `16px 32px`
- Border Radius: `0px`
- Border: `2px solid #5409DA`
- Box Shadow: none
- Hover: Background `#F1F1F1`; border remains
- Active: Background `#E7E7E7`
- Focus: Outline `2px solid #5409DA`

**Ghost Button (Tertiary)**
- Background: transparent
- Text Color: `#2D2D2D` (Charcoal)
- Font: -apple-system, `16px`, weight `400`
- Padding: `12px 24px`
- Border Radius: `0px`
- Border: `1px solid #DDDDDD`
- Box Shadow: none
- Hover: Border `1px solid #464544`; text `#000000`
- Active: Border `1px solid #000000`
- Focus: Outline `2px solid #5409DA`

### Cards & Containers

**Elevated Card (Glass Effect)**
- Background: `rgba(255, 255, 255, 0.6)` (white at 60% opacity)
- Text Color: `#000000` (Black)
- Font: Plus Jakarta Sans, `16px`, weight `400`
- Padding: `0px` (no internal padding; content handles spacing)
- Border Radius: `0px`
- Border: none
- Box Shadow: `rgba(0, 0, 0, 0.05) 0px 1px 1px 0px`
- Line Height: `24px`

**Card Container (Opaque Background)**
- Background: `rgba(0, 0, 0, 0)` (fully transparent for nesting)
- Text Color: `#000000`
- Font: Plus Jakarta Sans, `16px`, weight `400`
- Padding: `32px` (all sides)
- Border Radius: `0px`
- Border: none
- Box Shadow: none
- Use inside elevated cards for content spacing

**Section Card (Hero/Feature)**
- Background: `rgba(255, 255, 255, 0.6)`
- Text Color: `#000000`
- Font: Plus Jakarta Sans, `16px`, weight `400`
- Padding: `0px`
- Border Radius: `0px`
- Border: none
- Box Shadow: `rgba(0, 0, 0, 0.05) 0px 1px 1px 0px`
- Typical dimensions: `1110px` wide, `510px` tall for layout sections

### Inputs & Forms

**Text Input (Default)**
- Background: `#FFFFFF`
- Text Color: `#000000`
- Font: Plus Jakarta Sans, `16px`, weight `400`
- Padding: `12px 16px`
- Border Radius: `0px`
- Border: `1px solid #767676`
- Box Shadow: none
- Line Height: `24px`
- Focus: Border `2px solid #5409DA`; outline none
- Placeholder: Color `#464544`; font-style italic
- Error: Border `2px solid #00E75D` (Success green as alert; context-dependent)

**Input Label**
- Font: -apple-system, `14px`, weight `500`
- Color: `#2D2D2D`
- Margin Bottom: `8px`
- Letter Spacing: `0px`

**Checkbox & Radio**
- Size: `20px × 20px`
- Border: `2px solid #767676`
- Border Radius: `0px`
- Background: `#FFFFFF`
- Checked Background: `#9FFA62` (Brand Lime)
- Checked Border: `2px solid #9FFA62`
- Focus: Outline `2px solid #5409DA` with `2px` offset

### Navigation

**Top Navigation Bar**
- Background: `rgba(0, 0, 0, 0)` (transparent)
- Text Color: `#000000`
- Font: -apple-system, `16px`, weight `400`
- Padding: `20px 40px` (horizontal spacing)
- Border Radius: `0px`
- Border: none
- Box Shadow: none
- Height: `auto` (content-driven)
- Line Height: `24px`

**Navigation Link (Inactive)**
- Text Color: `#000000`
- Font: -apple-system, `16px`, weight `400`
- Text Decoration: none
- Margin Right: `32px`
- Transition: `color 200ms ease-in-out`

**Navigation Link (Active/Hover)**
- Text Color: `#5409DA` (Brand Purple)
- Font Weight: `500` (slight emphasis)
- Underline: `2px solid #9FFA62` positioned at `bottom -4px`

**Mobile Navigation (Collapsed)**
- Background: `#FFFFFF`
- Border Top: `1px solid #DDDDDD`
- Padding: `16px 20px`
- Display: stacked vertical at breakpoint `768px`

### Tags & Badges

**Success Tag**
- Background: `rgba(0, 229, 93, 0.1)` (Success green at 10%)
- Text Color: `#00E75D`
- Font: -apple-system, `12px`, weight `600`
- Padding: `6px 12px`
- Border Radius: `0px`
- Border: `1px solid #00E75D`

**Warning Tag**
- Background: `rgba(183, 246, 38, 0.1)` (Warning yellow-green at 10%)
- Text Color: `#B7F626`
- Font: -apple-system, `12px`, weight `600`
- Padding: `6px 12px`
- Border Radius: `0px`
- Border: `1px solid #B7F626`

**Accent Tag (Purple)**
- Background: `rgba(84, 9, 218, 0.1)` (Brand Purple at 10%)
- Text Color: `#5409DA`
- Font: -apple-system, `12px`, weight `600`
- Padding: `6px 12px`
- Border Radius: `0px`
- Border: `1px solid #5409DA`

**Accent Tag (Cyan)**
- Background: `rgba(75, 195, 255, 0.1)` (Electric Cyan at 10%)
- Text Color: `#4BC3FF`
- Font: -apple-system, `12px`, weight `600`
- Padding: `6px 12px`
- Border Radius: `0px`
- Border: `1px solid #4BC3FF`

## 5. Layout Principles

### Spacing System
**Base Unit:** `4px`

**Scale:** `8px`, `12px`, `16px`, `20px`, `24px`, `28px`, `32px`, `36px`, `40px`, `44px`, `48px`, `52px`

**Usage Context:**
- **8px:** Minimal spacing between tightly grouped elements; input padding
- **12px:** Gaps within component groups
- **16px:** Default margin for body text; button padding horizontal
- **20px:** Standard padding for medium containers; modal top spacing
- **24px:** Section gaps; card internal spacing
- **28px:** Moderate spacing between sections
- **32px:** Card padding; hero section padding
- **36px–40px:** Large section separations
- **44px–48px:** Major layout divisions
- **52px+:** Hero/full-screen section margins

### Grid & Container
**Max Width:** `1110px` (observed from card component)

**Column Strategy:** 12-column flexible grid; uses CSS `display: flex` or CSS Grid with equal column widths

**Section Patterns:**
- Hero: Full viewport width, `auto` height, padding `80px 40px`
- Content sections: `1110px` max-width, centered with margin `0 auto`
- Sidebar layouts: Two-column, 70/30 or 60/40 split
- Card grids: 3–4 columns at max width; 2 columns at tablet; 1 column mobile

**Container Nesting:**
- Outer section container: `100vw` width, `display: flex`, `justify-content: center`
- Inner content wrapper: `max-width: 1110px`, `width: 100%`, `padding: 0 40px`

### Whitespace Philosophy
Ollyo prioritizes generous, purposeful whitespace to create visual breathing room and emphasize content hierarchy. The design avoids cramped layouts; large typography benefits from expansive surrounding space. Negative space is a primary design tool—it directs attention, separates concerns, and conveys refinement. Section-to-section spacing typically uses `48px–80px` vertical gaps; internal component spacing uses the 4px base unit scale. The philosophy: empty space is as valuable as filled space.

### Border Radius Scale
- **None (0px):** All buttons, inputs, cards, navigation. Sharp, pixelated aesthetic honoring retro pixel-art roots
- **Sharp corners** reinforce tech-forward, minimalist identity
- **No rounded elements** to maintain cohesive, geometric visual language

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| **Surface (Base)** | `box-shadow: none` | Page background; main content layers |
| **Elevated (sm)** | `box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 1px 0px` | Cards, containers, modals with subtle lift |
| **Floating** | `box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px 0px` | Hover tooltips, floating action buttons (inferred) |
| **Modal** | `box-shadow: rgba(0, 0, 0, 0.15) 0px 8px 16px 0px` | Dialog overlays, top-layer components (inferred) |

**Shadow Philosophy:**
Ollyo uses minimal, subtle shadows to maintain a flat, modern aesthetic while preserving depth where necessary. The primary shadow (`sm`) is barely perceptible—only `1px` offset with 5% opacity—allowing semi-transparent cards to feel layered without visual heaviness. Deeper shadows are reserved for critical overlays (modals, dropdowns) and only used when content genuinely floats above the baseline. The overall approach: depth through opacity and subtle elevation, not dramatic shadow effects. Shadows support hierarchy without dominating the visual field.

## 7. Do's and Don'ts

### Do
- Use **sharp corners** (`0px` radius) on all interactive and container elements to maintain design cohesion
- Apply **extreme typographic scale** for headlines; embrace massive sizes (100px+) for visual impact
- Leverage **high contrast** between black text on white/light backgrounds and vice versa
- Use **Brand Lime** (`#9FFA62`) for primary call-to-action buttons and interactive highlights
- Employ **generous whitespace** around content sections; avoid cluttered layouts
- Default to **no shadows** or use only the subtle `sm` shadow for card elevation
- Build **transparent or very light card backgrounds** (`rgba(255, 255, 255, 0.6)`) for layered sophistication
- Prioritize **accessibility**: ensure 4.5:1 contrast minimum for text; test with screen readers
- Use **semantic color roles** (green for success, yellow-green for warning, purple for actions)
- Keep **padding consistent** within component groups using the 4px base unit scale

### Don't
- Don't add **rounded corners** to any interactive element; maintain sharp pixel-perfect edges
- Don't use **heavy or multiple shadows**; minimal elevation is the brand standard
- Don't mix **too many colors** in a single view; reserve accent colors for key interactions
- Don't overcrowd layouts; maintain breathing room equal to or exceeding content width
- Don't set **Font sizes below 14px** without explicit UX rationale; readability is paramount
- Don't apply **custom fonts** beyond Jersey 20, Stack Sans Notch, and system fonts
- Don't use **bold weight** casually; reserve weight `600` for emphasis
- Don't create **nested cards** without clear visual separation or color distinction
- Don't remove **focus states** from interactive elements; always maintain keyboard navigation support
- Don't ignore **responsive breakpoints**; collapse layouts intentionally, not as an afterthought

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| **Mobile** | `< 576px` | Single-column layout; `16px` side padding; `h1` scales to `150px`; stacked navigation |
| **Tablet** | `576px – 992px` | Two-column grids; `24px` side padding; `h1` scales to `200px`; collapsible nav |
| **Desktop** | `≥ 992px` | Full multi-column grids; `40px` side padding; max-width containers; full horizontal nav |
| **Wide** | `≥ 1400px` | Optional: expand content to `1200px`; increase spacing to `60px` sides |

**Typography Scaling:**
- **H1 Display:** `274px` (desktop) → `200px` (tablet) → `120px` (mobile)
- **H2 Display:** `200px` (desktop) → `120px` (tablet) → `80px` (mobile)
- **H3 Heading:** `58px` (desktop) → `40px` (tablet) → `28px` (mobile)
- **Body Text:** `16px` (all breakpoints; maintain readability)

### Touch Targets
- **Minimum tap area:** `44px × 44px` (WCAG AA standard)
- **Button padding:** `16px 32px` at desktop; adjust to `12px 24px` on mobile if space constrained
- **Link hover area:** Extend clickable area to `8px` beyond visible text
- **Navigation spacing:** Ensure `20px` minimum gap between navigation items for finger accuracy

### Collapsing Strategy
- **Hero sections:** Scale down background imagery; reduce padding from `80px` to `40px` at tablet, `20px` at mobile
- **Multi-column grids:** Collapse from 4-column (desktop) → 2-column (tablet) → 1-column (mobile) using CSS Grid `auto-fit` or flexbox wrapping
- **Navigation:** Full horizontal bar at desktop → collapsible hamburger menu below `992px`; drawer slides in from left
- **Card width:** Fixed at `1110px` on desktop; scale to `100% - 48px` padding on tablet; full-width minus `32px` on mobile
- **Spacing:** Decrease `gap` and `margin` values by 25–50% at tablet breakpoint; by 50–75% on mobile
- **Typography:** Use CSS `font-size` media queries; never force desktop sizes onto mobile viewports

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA:** Brand Lime (`#9FFA62`)
- **Secondary Action:** Brand Purple (`#5409DA`)
- **Tertiary Accent:** Electric Cyan (`#4BC3FF`)
- **Success Feedback:** Success Green (`#00E75D`)
- **Warning Feedback:** Warning Yellow-Green (`#B7F626`)
- **Primary Text:** Black (`#000000`)
- **Secondary Text:** Charcoal (`#2D2D2D`)
- **Background (Surface):** White (`#FFFFFF`)
- **Card Background (Glass):** Semi-transparent white (`rgba(255, 255, 255, 0.6)`)
- **Border/Divider:** Light Gray (`#DDDDDD`)
- **Link Color:** Cobalt Blue (`#1F40CC`)

### Iteration Guide

1. **Always use sharp corners.** Every button, card, input, and container must have `border-radius: 0px`. No exceptions—maintain the pixelated, geometric aesthetic.

2. **Enforce typographic scale hierarchy.** Display headings (h1, h2) should use Jersey 20 font at sizes `200px+`. Body text and UI labels use -apple-system or Plus Jakarta Sans at `14px–16px`. Never blur these boundaries.

3. **Prioritize whitespace over content density.** Minimum `24px` gap between sections; `32px` padding inside cards. If a layout feels cramped, increase spacing first before adding visual chrome.

4. **Apply lime green for primary interactive elements.** Buttons, toggles, and primary CTAs should default to `#9FFA62` with black text. Reserve purple for secondary or navigation highlights.

5. **Use minimal elevation.** Default card shadow is `rgba(0, 0, 0, 0.05) 0px 1px 1px 0px` only. No dropshadows, glows, or heavy effects—keep the interface flat and clean.

6. **Maintain high contrast.** Black on white, white on black, or accent colors on neutral backgrounds. Never place light text on light backgrounds or dark on dark. Test all copy at 4.5:1 contrast minimum.

7. **Layer transparency for depth.** Semi-transparent cards (`rgba(255, 255, 255, 0.6)`) and overlay backgrounds (`rgba(0, 0, 0, 0.05)`) create visual layering without relying on shadows.

8. **Responsive breakpoints:** Mobile `< 576px` (single column, `16px` padding), Tablet `576px–992px` (two-column, `24px` padding), Desktop `≥ 992px` (multi-column, `40px` padding, max-width `1110px`).

9. **Font sizing precision:** All sizes use exact pixels: `274px`, `200px`, `58px`, `16px`, `14px`. No rems, no ems—this ensures consistency across all scale transitions.

10. **Semantic color usage:** Green for success/validation, yellow-green for warnings, purple for actions/links, lime for primary CTAs. Match component states (hover, focus, active) to the brand palette.
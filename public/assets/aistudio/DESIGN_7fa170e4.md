---
name: Warm Editorial Tech
colors:
  surface: '#fef9f0'
  surface-dim: '#ded9d1'
  surface-bright: '#fef9f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ea'
  surface-container: '#f2ede4'
  surface-container-high: '#ece8df'
  surface-container-highest: '#e7e2d9'
  on-surface: '#1d1c16'
  on-surface-variant: '#5a403d'
  inverse-surface: '#32302b'
  inverse-on-surface: '#f5f0e7'
  outline: '#8e706c'
  outline-variant: '#e2beb9'
  surface-tint: '#b4271f'
  primary: '#900708'
  on-primary: '#ffffff'
  primary-container: '#b3261e'
  on-primary-container: '#ffcbc4'
  inverse-primary: '#ffb4aa'
  secondary: '#386852'
  on-secondary: '#ffffff'
  secondary-container: '#baeed2'
  on-secondary-container: '#3e6e58'
  tertiary: '#4c453d'
  on-tertiary: '#ffffff'
  tertiary-container: '#645c54'
  on-tertiary-container: '#e1d5ca'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#910809'
  secondary-fixed: '#baeed2'
  secondary-fixed-dim: '#9fd2b7'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#1f4f3b'
  tertiary-fixed: '#ece0d6'
  tertiary-fixed-dim: '#d0c5ba'
  on-tertiary-fixed: '#201b14'
  on-tertiary-fixed-variant: '#4d463e'
  background: '#fef9f0'
  on-background: '#1d1c16'
  surface-variant: '#e7e2d9'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 29px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.12em
  code-inline:
    fontFamily: JetBrains Mono
    fontSize: 13.5px
    fontWeight: '500'
    lineHeight: 20px
  code-block:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system articulates an educational platform that removes the intimidation of version control through a calm, humane, and literary sensibility. It rejects the hyperactive, neon-tinted tropes of modern developer tooling in favor of an artisanal, bookish, and mature atmosphere. 

The visual style is **Contemporary Editorial Minimalism**:
- Generous, breathable layouts reminiscent of curated print monographs and long-form journals.
- Tactile warmth introduced through ivory and stone surfaces, balanced by intentional typographic structure.
- Utilitarian developer elements (terminals, commit trees, and code frames) reinterpreted with restraint, precision, and elegance.

## Colors
The palette evokes premium archival paper, dark carbon ink, and natural mineral accents:
- **Canvas (`#FAF5EC`)**: A rich, comforting warm cream serving as the foundational background layer.
- **Surface Cards (`#FFFDF8`)**: An elevated ivory that lifts active reading surfaces off the canvas.
- **Primary Ink (`#1C1917`)**: High-contrast, dense charcoal black for titles, key milestones, and prominent structural UI.
- **Secondary Ink (`#57534E`)**: Warm stone-grey providing a soft, non-fatiguing reading tone across long prose.
- **Primary Accent (`#B3261E`)**: A deliberate crimson red reserved for focused actions, active highlights, and critical learning callouts.
- **Muted Sage (`#4F7F68`)**: A natural green used exclusively for success confirmations, passing tests, and merged branches.
- **Border & Dividers (`#E7DFD0`)**: A warm stone outline establishing soft, structural containment without visual clutter.
- **Callout Tint (`#F3E7DC`)**: A tinted warm ground used for editorial notes, tips, and highlighted conceptual blocks.

## Typography
Typographic rhythm sets the cadence of the curriculum:
- **Headings & Body**: Rendered in a modern, humanist geometric sans-serif that balances legibility with distinct editorial warmth.
- **Reading Measure**: Continuous explanatory prose must never exceed a maximum width of `65ch` to preserve effortless tracking.
- **Code & Syntax**: Set exclusively in `JetBrains Mono` for terminal simulations, branch names, Git commands, and file paths.
- **Eyebrows & Meta Labels**: Micro-copy uses uppercase styling with open letter-spacing (`0.12em`) set in stone-toned ink.

## Layout & Spacing
The layout follows a disciplined fluid-grid structure anchored by generous perimeter margins:
- **Desktop (1024px+)**: 12-column grid with `1.5rem` gutters and a maximum central content container of `1200px`. Asymmetric column spans (e.g., 7 columns for long-form lesson prose, 5 columns for interactive terminal mockups) reinforce the editorial rhythm.
- **Tablet (768px - 1023px)**: 8-column grid with `1.25rem` gutters and `2rem` margins. Interactive code mockups reflow beneath the primary concept sections.
- **Mobile (<768px)**: 4-column fluid layout with `1rem` gutters and `1.25rem` screen margins.
- **Vertical Flow**: Ample vertical spacing between thematic blocks prevents visual fatigue, encouraging reflective pacing throughout lessons.

## Elevation & Depth
Depth is created through gentle tactile layering rather than dramatic drop shadows:
- **Base Surfaces**: The primary background `#FAF5EC` holds zero elevation.
- **Cards & Panes**: Raised with a crisp `1px solid #E7DFD0` outline paired with a warm, low-intensity ambient shadow: `0 4px 20px -2px rgba(28, 25, 23, 0.04)`.
- **Active / Dragged Layers**: Modals and elevated flyouts use an extended soft blur: `0 12px 32px -4px rgba(28, 25, 23, 0.08)` coupled with the standard warm stone border.
- **Faux UI & Windows**: Layered directly over card surfaces with hairline internal dividers (`#E7DFD0`) to denote panes, tabs, and status strips.

## Shapes
A unified radius scale establishes cohesive, approachable contours:
- **Standard UI Cards & Containers**: Defined with a uniform `12px` (rounded-lg: `1rem`) corner radius.
- **Interactive Buttons & Form Fields**: Styled with matching `8px` (`0.5rem`) soft contours.
- **Pills & Code Tags**: Use compact or fully rounded geometries to differentiate system entities from lesson cards.
- **Terminals & Frame Mockups**: Maintain the standard `12px` exterior boundary while housing squared or subtly rounded internal panels.

## Components

### Buttons
- **Primary**: Solid Deep Crimson (`#B3261E`) background, crisp white typography, `8px` border radius, padding `10px 20px`. Subtle hover state deepens to `#982119`.
- **Secondary / Outline**: Card surface (`#FFFDF8`) background, `1px solid #E7DFD0`, Dark Ink typography (`#1C1917`). Hover state tints to `#F3E7DC`.
- **Ghost**: Transparent background, `#57534E` text, transitioning to `#F3E7DC` fill on hover.

### Callout Boxes
- Container filled with `#F3E7DC`.
- A prominent `3px` solid `#B3261E` border along the left edge.
- Right, top, and bottom borders set to `1px solid #E7DFD0`.
- Padding of `1.25rem`, with nested body text rendered in `#1C1917`.

### Code Pills & Snippets
- Inline tags styled in `JetBrains Mono` at `13.5px`.
- Surface background (`#FFFDF8`), `1px solid #E7DFD0` border, `4px` corner radius, horizontal padding of `6px`, vertical padding of `2px`. Text colored in `#1C1917`.

### Browser & Repository Mockup Frames
- Window wrapper with `12px` corner radius and `1px solid #E7DFD0` boundary.
- Header bar in `#FAF5EC` featuring three subtle window control dots (`6px` diameter, toned in `#E7DFD0` and `#57534E`) aligned to the left.
- Main interior canvas rendered in `#FFFDF8` with crisp monospaced directory trees, branch diagrams, and visual commit timelines.

### Cards & Lesson Units
- Background `#FFFDF8`, `1px solid #E7DFD0`, `12px` radius, padding `1.5rem` to `2rem`.
- Features an uppercase category eyebrow (`12px`, `#57534E`, tracking `0.12em`), followed by a `22px-28px` semi-bold heading.

### Input Fields & Controls
- Form inputs feature `#FFFDF8` fill, `1px solid #E7DFD0`, `8px` corner radius, and `12px` internal padding. Focus rings apply a `1px` ring in `#B3261E` with zero dramatic glow.
- Checkboxes and radios use `#FAF5EC` unselected fills, transitioning to `#4F7F68` or `#B3261E` on active check states.
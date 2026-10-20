---
name: Monochrome Minimalist Metric
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#45464c'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#575e70'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#141b2b'
  on-primary-container: '#7d8497'
  inverse-primary: '#c0c6db'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#151c27'
  on-tertiary-container: '#7d8492'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce2f7'
  primary-fixed-dim: '#c0c6db'
  on-primary-fixed: '#141b2b'
  on-primary-fixed-variant: '#404758'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#dce2f3'
  tertiary-fixed-dim: '#c0c7d6'
  on-tertiary-fixed: '#151c27'
  on-tertiary-fixed-variant: '#404754'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  metric-number:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1.25rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

The design system embodies modern executive clarity, high-focus productivity, and analytical precision. Built for data-dense productivity tools, enterprise CRMs, and task management platforms, the aesthetic draws deeply from Swiss modernist graphic design and contemporary neo-minimalism.

### Personality & Emotional Response
- **Surgical Clarity:** The interface strips away decorative noise, allowing metrics, tasks, and trends to dominate visual attention.
- **Calm Authority:** A restrained monochromatic palette creates an understated, premium work environment that prevents cognitive fatigue over extended usage sessions.
- **Tactile Modernism:** Sharp contrast between deep charcoal typography and crisp white card containers evokes the feel of high-end editorial stationery translated into a digital canvas.

### Visual Style
- **Monochromatic Architectural Minimalist:** Clean, layered white containers floating on a subtle off-white background canvas, framed by razor-thin hairline borders (`1px`) and anchored by stark black elements.
- **Precision Data Accents:** Color is used exclusively for state semantics—specifically an emerald mint green for growth indicators and positive trends, and a muted rose for negative variance.

## Colors

The palette relies on a tonal grayscale hierarchy punctuated by purposeful semantic badges.

### Palette Architecture
- **Primary (`#111827`):** Pure deep slate black. Used for key headlines, active metric values, dark action states, selected tags, and primary segments in charts.
- **Secondary / Growth Accent (`#10B981`):** A sharp, legible emerald green used strictly for positive financial variance, positive growth pills, and completed indicator rings. Paired with an ultra-light tint background (`#ECFDF5`).
- **Tertiary / Mid-Gray (`#6B7280`):** Neutral gray used for metadata timestamps, chart axes, inactive icons, and descriptive subtitles.
- **Canvas Neutral (`#F9FAFB`):** A barely perceptible warm-cool white for the application canvas and side navigation backdrop, producing a clean separation against `#FFFFFF` component cards.

### Semantic Tones & Data Shades
- **Negative Accent (`#EF4444`):** Soft rose-red reserved for negative trends, paired with `#FEF2F2` pill backgrounds.
- **Data Series Greyscale:** 
  - Tier 1 (High Priority / Dominant): `#111827`
  - Tier 2 (Intermediate): `#4B5563`
  - Tier 3 (Secondary): `#9CA3AF`
  - Tier 4 (Base / Background): `#E5E7EB`

## Typography

The typography pairs the geometric structure of Plus Jakarta Sans for high-visibility statistics and primary widget titles with the neutral readability of Inter for dense table records, navigation labels, and UI controls.

### Implementation Rules
- **Numerical Hierarchy:** Primary KPIs (`metric-number`) must always render with tight tracking (`-0.03em`) and tabular figures (`font-variant-numeric: tabular-nums`) to ensure vertical visual alignment across dashboards.
- **Section Headers:** Widget group labels (e.g., "DATABASE", "Task Management Summaries") must use `label-sm` with uppercase styling and subtle gray coloring (`#6B7280`) to establish hierarchy without competing with metric values.
- **Readability Rules:** Body text never drops below 12px. Contrast ratios strictly maintain a minimum of 4.5:1 against card backgrounds.

## Layout & Spacing

The layout is built upon an adaptive 12-column fluid grid system paired with an 8px base rhythm.

### Grid & Canvas Structure
- **Persistent Left Navigation:** A dedicated vertical rail width of 240px (desktop) or collapsible icon-only state of 64px (compact desktop/tablet).
- **Dashboard Workspace:** Fluid multi-column area spanning up to 1440px max-width, maintaining uniform horizontal gutters (`1.5rem` / 24px) between cards.
- **Card Padding Interior:** All cards adhere to a strict inner padding scheme: `space-lg` (20px) on standard cards, extending to `space-xl` (28px) on dominant analytical summary cards.

### Responsive Breakpoints
- **Desktop (≥ 1280px):** 12-column layout. Metric widgets occupy 3 or 4 columns; primary charts span 8 columns; sidebar widgets take 4 columns.
- **Tablet (768px – 1279px):** 6-column reflow. High-priority cards collapse to 3 columns; charts span the full 6 columns. Collapsible drawer for navigation.
- **Mobile (< 768px):** Single-column stacked stream. All cards span 100% width with `margin` set to `1.25rem` (20px). Bottom navigation replaces the desktop rail.

## Elevation & Depth

Visual hierarchy in this system relies on low-contrast ghost borders and tonal stratification rather than heavy, artificial drop shadows.

### Elevation Levels
- **Level 0 (Canvas Base):** Background workspace rendered in `#F9FAFB`. Zero elevation.
- **Level 1 (Card & Container Surface):** Crisp white (`#FFFFFF`) containers framed by a delicate 1px border (`#E5E7EB`). Drop shadows are suppressed or kept ultra-subtle: `0 1px 2px 0 rgba(0, 0, 0, 0.03)`.
- **Level 2 (Interactive Floating / Hover):** Used on card hover states, dropdown menus, and popovers. Elevated with `0 4px 12px -2px rgba(17, 24, 39, 0.06), 0 2px 4px -1px rgba(17, 24, 39, 0.03)` with a hairline border `#D1D5DB`.
- **Level 3 (Modals & Overlays):** Deep modal views centered over a softened charcoal backdrop (`rgba(17, 24, 39, 0.4)`), featuring `0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)`.

### Tonal Layering
Containers achieve depth by nesting darker tinted modules within white cards—such as pill indicators, progress track bars, and calendar heatmaps.

## Shapes

The design system maintains a balanced, contemporary rounded corner architecture (`roundedness: 2`).

### Corner Radius Tokens
- **Base Cards & Containers (`rounded-lg`):** 16px (1rem). Applied to all primary dashboard cards, panels, and metric groups.
- **Buttons, Controls & Input Fields (`rounded`):** 8px (0.5rem). Creates a defined, functional feel that visually separates interactive elements from structural containers.
- **Trend Badges & Filter Pills (`rounded-full`):** 9999px. Used for percentage status badges (e.g., `+12%`), status filters, and small category tags.
- **Heatmap Blocks:** 3px to 4px subtle softening on matrix squares (such as activity and calendar heatmaps).

## Components

### Buttons & Segmented Controls
- **Primary Button:** `#111827` background, white label, 8px border radius, 36px/40px height. Sharp hover transition to `#1F2937`.
- **Secondary Outline Button:** `#FFFFFF` background, 1px `#E5E7EB` border, `#111827` label with dropdown caret chevron. Hover invokes `#F9FAFB` fill and `#D1D5DB` border.
- **Icon Action Buttons (Circular/Subtle):** 32px diameter white circles with 1px border `#E5E7EB`, housing centered 16px charcoal stroke icons (e.g., forward arrows, overflow menus).

### Trend Badges & Status Pills
- **Positive Trend Badge:** Compact pill padding (`2px 8px`), `#ECFDF5` light mint background, `#10B981` text and upward directional arrow icon, font size `11px` bold.
- **Negative Trend Badge:** Compact pill padding (`2px 8px`), `#FEF2F2` background, `#EF4444` text and downward trend arrow icon.
- **Neutral / Meta Tag:** `#F3F4F6` background with `#4B5563` text.

### Data Visualization Components
- **Stacked Bar Charts:** Monochromatic multi-tone segments (`#111827`, `#4B5563`, `#9CA3AF`, `#E5E7EB`) with a unified 6px top radius on the terminal segment.
- **Activity & Attendance Heatmap:** Matrix of square blocks (12px × 12px) with 3px border radius, ramping from inactive `#F3F4F6` to saturated `#111827`.
- **Radial Donut Metric:** Thin track (`#F3F4F6`, 8px width) completed by a stark `#111827` progress ring with bold centered numerical percentage readout.
- **Sparklines:** Clean 2px stroke weight line plots in `#111827` overlaid on subtle vertical dashed grid guides (`#E5E7EB`).

### Form Inputs & Dropdowns
- **Selector Pickers (Date Range, View Mode):** Pill or soft-square control with 1px `#E5E7EB` border, trailing mini chevron icon, 13px medium typography.
- **Search & Filter Bars:** Inset `#F9FAFB` fill, no shadow, placeholder `#9CA3AF`, leading 16px magnifying glass stroke.

### Lists & Navigation
- **Sidebar Nav Items:** Minimalist styling with 20px gap rhythm. Active item denoted by deep `#111827` icon and text with optional light-gray pill backing; inactive items in `#6B7280` shifting to `#111827` on hover.
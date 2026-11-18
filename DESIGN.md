---
name: Adrian Villanueva Martinez
description: A personal website for work, writing, and interests.
colors:
  charcoal: "#10110f"
  surface: "#151613"
  surface-raised: "#1b1c18"
  surface-elevated: "#23251f"
  ivory: "#e8e5da"
  text-secondary: "#bbb9b0"
  text-muted: "#96958c"
  border: "#494b43"
  border-light: "#65665d"
  ember: "#cc5a3d"
  focus: "#f1bd73"
typography:
  display:
    fontFamily: '"Silkscreen", "IBM Plex Mono", monospace'
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: '"IBM Plex Mono", monospace'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: '"Silkscreen", "IBM Plex Mono", monospace'
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.04em"
  homepage-navigation:
    fontFamily: '"Silkscreen", monospace'
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.04em"
rounded:
  square: "0"
spacing:
  grid-gap: "2rem"
---

# Design System: Adrian Villanueva Martinez

## Overview

**Creative North Star: "Personal terminal"**

The site is a personal digital space: direct, individual, and grounded in the character of a terminal. Pixel lettering and a restrained dark palette support the work and personal material rather than turning the site into a generic corporate portfolio.

**Key Characteristics:**
- Dark, flat surfaces with warm light text and an ember accent.
- Pixel display type paired with monospaced body text.
- Square edges, visible rules, and direct navigation.
- Personal and authentic rather than corporate.

## Colors

Charcoal surfaces set a quiet foundation; ivory provides primary text and ember marks emphasis, links, and active details. Secondary and muted text establish hierarchy; borders define structure. The named values in the frontmatter come from `src/styles/global.css`.

## Typography

Silkscreen is the display and compact navigation face, with IBM Plex Mono as its fallback. IBM Plex Mono is the body and code face. Global headings use a 1.2 line height and -0.025em letter spacing, with `clamp(2.2rem, 5vw, 4rem)` for h1 and `clamp(1.6rem, 3vw, 2.5rem)` for h2. Page-specific headings override these values: the homepage heading uses `clamp(34px, 6.6vw, 88px)`, 1.14 line height and -0.06em letter spacing, changing to `clamp(29px, 10vw, 60px)` at 640px and below. Small uppercase labels commonly use 10px type with 1.5 line height; homepage navigation and footer text use 12px.

## Layout

The shared content width is 1120px. Interior navigation uses a centered container with 24px side margins, reduced to 16px at 640px and below. The homepage fills at least the dynamic viewport height, with a generous intro and a six-column navigation grid that becomes two columns at 640px. Interior layouts may differ by page; preserve their established content hierarchy.

## Elevation & Depth

Flat and structured: the shared shadow tokens are `none`. Surface tones and one-pixel borders create separation rather than drop shadows.

## Shapes

Shared radius tokens are zero. Square corners, straight dividers, and bordered grids are recurring patterns.

## Components

### Navigation

The interior header has a compact site mark and uppercase links. Current pages are underlined in ember; hover and active text become primary ivory. The homepage uses six bordered navigation cells with ember details and an inverted background on hover. On smaller screens the interior links wrap and the homepage grid becomes two columns.

### Links and focus

Links inherit their surrounding color and turn ember on hover; links in paragraphs are underlined. Keyboard focus uses a 2px warm outline with a 5px offset. The skip link becomes visible on focus.

### Reading content

Code blocks use a darker secondary surface, a one-pixel border, and 20px padding. Blockquotes use a 2px ember left border and horizontal inset.

## Do's and Don'ts

### Do:
- **Do** preserve the site's personal identity and direct voice.
- **Do** use existing surface tones and borders to establish hierarchy.
- **Do** retain visible keyboard focus and the skip link.

### Don't:
- **Don't** turn the personal site into a generic corporate portfolio.
- **Don't** replace the established flat, square visual language with ornamental shadows or rounded surfaces without a deliberate design decision.

# AI Project Intelligence - Design System Implementation Guide

## Complete Premium Design System

This design system provides Linear/Stripe/Vercel-quality UI components for AI Project Intelligence.

---

## Design System Overview

### Color Palette

- **Background:** `background-primary` (#0B0F19), `background-card` (#111827), `background-hover`, `background-elevated`
- **Text:** `text-primary`, `text-secondary`, `text-muted`
- **Accent:** `accent-indigo`, `accent-cyan`, `accent-purple`
- **Semantic:** `semantic-success`, `semantic-warning`, `semantic-danger`, `semantic-info`

### Components

- **UI:** `Button`, `Card`, `DashboardCard`, `MetricCard`, `FeatureCard`, `Badge`, `StatusBadge`, `PriorityBadge`, `Input`, `Textarea`, `SearchInput`, `Carousel`, `LogoCarousel`, `TestimonialCarousel`
- **Layout:** `DashboardLayout` (design reference)
- **Sections:** `HeroSection`

### Files

- `lib/designTokens.ts` - Design tokens
- `lib/animations.ts` - GSAP animation utilities
- `lib/utils.ts` - `cn()` helper
- `app/globals.css` - Glass components, utilities
- `tailwind.config.ts` - Theme (colors, spacing, typography, shadows, animations)
- `components/ui/*` - Button, Card, Badge, Input, Carousel
- `components/layout/DashboardLayout.tsx`
- `components/sections/HeroSection.tsx`

See the full guide in the project for usage examples, spacing scale, typography, and best practices.

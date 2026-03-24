// lib/designTokens.ts
// AI Project Intelligence - Design System Tokens

export const designTokens = {
  // ============================================
  // SPACING SCALE (8px grid)
  // ============================================
  spacing: {
    0: '0',
    1: '4px',    // 0.5 rem
    2: '8px',    // 1 rem
    3: '16px',   // 2 rem
    4: '24px',   // 3 rem
    5: '32px',   // 4 rem
    6: '48px',   // 6 rem
    7: '64px',   // 8 rem
    8: '96px',   // 12 rem
    9: '128px',  // 16 rem
  },

  // ============================================
  // COLOR SYSTEM - Dark SaaS Palette
  // ============================================
  colors: {
    // Base backgrounds
    background: {
      primary: '#0B0F19',
      card: '#111827',
      hover: '#1f2937',
      elevated: '#1a2236',
      glass: 'rgba(17, 24, 39, 0.7)',
    },

    // Borders
    border: {
      default: 'rgba(255, 255, 255, 0.08)',
      hover: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(99, 102, 241, 0.5)',
    },

    // Text colors
    text: {
      primary: '#f9fafb',
      secondary: '#9ca3af',
      muted: '#6b7280',
      inverse: '#0B0F19',
    },

    // Accent colors
    accent: {
      indigo: '#6366F1',
      cyan: '#22D3EE',
      purple: '#A78BFA',
    },

    // Semantic colors
    semantic: {
      success: '#22C55E',
      warning: '#F59E0B',
      danger: '#EF4444',
      info: '#3B82F6',
    },

    // Gradient overlays
    gradient: {
      radial: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15), transparent 50%)',
      mesh: 'radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.2), transparent 50%), radial-gradient(at 80% 60%, rgba(34, 211, 238, 0.15), transparent 50%)',
    },
  },

  // ============================================
  // GLASS DEPTH SYSTEM
  // ============================================
  glass: {
    depth0: {
      background: 'transparent',
      border: 'none',
      blur: 'none',
    },
    depth1: {
      background: 'rgba(17, 24, 39, 0.7)',
      border: 'rgba(255, 255, 255, 0.08)',
      blur: '12px',
      shadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
    },
    depth2: {
      background: 'rgba(31, 41, 55, 0.8)',
      border: 'rgba(255, 255, 255, 0.12)',
      blur: '16px',
      shadow: '0 8px 32px rgba(0, 0, 0, 0.18)',
    },
    depth3: {
      background: 'rgba(31, 41, 55, 0.95)',
      border: 'rgba(255, 255, 255, 0.16)',
      blur: '24px',
      shadow: '0 24px 64px rgba(0, 0, 0, 0.3)',
    },
  },

  // ============================================
  // TYPOGRAPHY SYSTEM
  // ============================================
  typography: {
    hero: {
      fontSize: '72px',
      lineHeight: '1.1',
      fontWeight: '600',
      letterSpacing: '-0.02em',
    },
    h1: {
      fontSize: '48px',
      lineHeight: '1.2',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h2: {
      fontSize: '36px',
      lineHeight: '1.3',
      fontWeight: '600',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '24px',
      lineHeight: '1.4',
      fontWeight: '600',
      letterSpacing: '0',
    },
    body: {
      fontSize: '18px',
      lineHeight: '1.6',
      fontWeight: '400',
      letterSpacing: '0',
    },
    small: {
      fontSize: '14px',
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0',
    },
    tiny: {
      fontSize: '12px',
      lineHeight: '1.4',
      fontWeight: '500',
      letterSpacing: '0.01em',
    },
  },

  // ============================================
  // BORDER RADIUS
  // ============================================
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    full: '9999px',
  },

  // ============================================
  // ANIMATION TIMINGS
  // ============================================
  animation: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.6s',
      slower: '0.8s',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      power3: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    },
  },

  // ============================================
  // Z-INDEX SCALE
  // ============================================
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    toast: 1500,
  },
} as const;

// ============================================
// TYPE EXPORTS
// ============================================
export type DesignTokens = typeof designTokens;
export type Spacing = keyof typeof designTokens.spacing;
export type ColorKey = keyof typeof designTokens.colors;

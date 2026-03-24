import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // New production UI palette (Linear-like)
        bg: {
          primary: '#0B0B0C',
          secondary: '#0F0F11',
          tertiary: '#151518',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          strong: 'rgba(255,255,255,0.12)',
          // legacy tokens kept for compatibility
          DEFAULT: 'rgba(255,255,255,0.08)',
          hover: 'rgba(255,255,255,0.12)',
          focus: 'rgba(99, 102, 241, 0.5)',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
        accent: {
          success: '#22C55E',
          danger: '#EF4444',
          warning: '#EAB308',
          info: '#3B82F6',
          // legacy accent tokens
          primary: '#6366f1',
          secondary: '#22d3ee',
          indigo: '#6366F1',
          cyan: '#22D3EE',
          purple: '#A78BFA',
        },
        surface: {
          DEFAULT: '#0F0F11',
          card: '#151518',
          elevated: '#151518',
        },
        background: {
          primary: '#0B0B0C',
          card: '#0F0F11',
          hover: '#151518',
          elevated: '#151518',
        },
        semantic: {
          success: '#22C55E',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 5vw + 2rem, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        display: ['48px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        section: ['clamp(2rem, 4vw + 1rem, 2.75rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h1: ['24px', { lineHeight: '1.35', letterSpacing: '0' }],
        h2: ['18px', { lineHeight: '1.4', letterSpacing: '0' }],
        h3: ['16px', { lineHeight: '1.4', letterSpacing: '0' }],
        body: ['14px', { lineHeight: '1.5', letterSpacing: '0' }],
        small: ['13px', { lineHeight: '1.5', letterSpacing: '0' }],
        tiny: ['12px', { lineHeight: '1.4', letterSpacing: '0' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      maxWidth: {
        'content': '1200px',
      },
      spacing: {
        section: '120px',
        'card-gap': '24px',
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
      },
      borderRadius: {
        'card': '16px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        'full': '9999px',
      },
      boxShadow: {
        subtle: '0 10px 40px rgba(0,0,0,0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-indigo-cyan': 'linear-gradient(135deg, #6366f1 0%, #22d3ee 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
        'gradient-mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.15), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(34, 211, 238, 0.08), transparent)',
      },
    },
  },
  plugins: [],
};

export default config;

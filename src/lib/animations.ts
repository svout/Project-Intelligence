// lib/animations.ts
// AI Project Intelligence - GSAP Animation Utilities

import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ============================================
// ANIMATION PRESETS
// ============================================

export const animationPresets = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
  },
  easing: {
    smooth: 'power3.out',
    bounce: 'elastic.out(1, 0.5)',
    snap: 'power4.out',
  },
};

// ============================================
// FADE UP ANIMATION
// ============================================

export const fadeUp = (
  elements: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    distance?: number;
  }
) => {
  return gsap.from(elements, {
    y: options?.distance ?? 60,
    opacity: 0,
    duration: options?.duration ?? animationPresets.duration.normal,
    delay: options?.delay ?? 0,
    ease: animationPresets.easing.smooth,
  });
};

// ============================================
// STAGGER REVEAL ANIMATION
// ============================================

export const staggerReveal = (
  elements: gsap.TweenTarget,
  options?: {
    stagger?: number;
    duration?: number;
    distance?: number;
    delay?: number;
  }
) => {
  return gsap.from(elements, {
    y: options?.distance ?? 60,
    opacity: 0,
    duration: options?.duration ?? animationPresets.duration.normal,
    stagger: options?.stagger ?? 0.1,
    delay: options?.delay ?? 0,
    ease: animationPresets.easing.smooth,
  });
};

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================

export const parallaxScroll = (
  element: gsap.TweenTarget,
  options?: {
    speed?: number;
    direction?: 'up' | 'down';
  }
) => {
  const speed = options?.speed ?? 0.5;
  const direction = options?.direction ?? 'up';
  const yValue = direction === 'up' ? -100 : 100;

  return gsap.to(element, {
    y: yValue * speed,
    ease: 'none',
    scrollTrigger: {
      trigger: element as gsap.DOMTarget,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
};

// ============================================
// CARD HOVER LIFT EFFECT
// ============================================

export const cardHoverLift = (element: HTMLElement) => {
  const handleMouseEnter = () => {
    gsap.to(element, {
      y: -8,
      scale: 1.02,
      duration: 0.3,
      ease: animationPresets.easing.smooth,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: animationPresets.easing.smooth,
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// ============================================
// SCROLL-TRIGGERED ANIMATION
// ============================================

export const scrollReveal = (
  elements: gsap.TweenTarget,
  options?: {
    trigger?: gsap.DOMTarget;
    start?: string;
    stagger?: number;
  }
) => {
  return gsap.from(elements, {
    y: 60,
    opacity: 0,
    duration: animationPresets.duration.normal,
    stagger: options?.stagger ?? 0,
    ease: animationPresets.easing.smooth,
    scrollTrigger: {
      trigger: (options?.trigger ?? elements) as gsap.DOMTarget,
      start: options?.start ?? 'top 80%',
    },
  });
};

// ============================================
// FLOATING ANIMATION (Hero cards)
// ============================================

export const floatingAnimation = (
  element: gsap.TweenTarget,
  options?: {
    distance?: number;
    duration?: number;
    delay?: number;
  }
) => {
  return gsap.to(element, {
    y: options?.distance ?? -20,
    duration: options?.duration ?? 6,
    delay: options?.delay ?? 0,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

// ============================================
// SCALE IN ANIMATION
// ============================================

export const scaleIn = (
  elements: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    stagger?: number;
  }
) => {
  return gsap.from(elements, {
    scale: 0.9,
    opacity: 0,
    duration: options?.duration ?? animationPresets.duration.fast,
    delay: options?.delay ?? 0,
    stagger: options?.stagger ?? 0,
    ease: animationPresets.easing.smooth,
  });
};

// ============================================
// CAROUSEL SMOOTH SCROLL
// ============================================

export const carouselScroll = (
  container: HTMLElement,
  options?: {
    speed?: number;
    direction?: 'left' | 'right';
  }
) => {
  const speed = options?.speed ?? 1;
  const direction = options?.direction ?? 'left';

  const items = container.children;
  const totalWidth = Array.from(items).reduce(
    (sum, item) => sum + (item as HTMLElement).offsetWidth,
    0
  );

  const animation = gsap.to(container, {
    x: direction === 'left' ? -totalWidth : totalWidth,
    duration: totalWidth / (speed * 50),
    ease: 'none',
    repeat: -1,
  });

  container.addEventListener('mouseenter', () => animation.pause());
  container.addEventListener('mouseleave', () => animation.play());

  return animation;
};

// Legacy API for existing code: fadeUp(element, { y, duration, delay, scrollTrigger })
export function fadeUpLegacy(
  element: HTMLElement | HTMLElement[],
  options?: { y?: number; duration?: number; delay?: number; scrollTrigger?: object }
) {
  const { y = 40, duration = 0.8, delay = 0, scrollTrigger: st } = options ?? {};
  return gsap.from(element, {
    y,
    opacity: 0,
    duration,
    delay,
    ease: 'power3.out',
    scrollTrigger: st,
  });
}

// Legacy: staggerReveal(container, childSelector, options)
export function staggerRevealLegacy(
  container: HTMLElement,
  childSelector: string,
  options?: { y?: number; stagger?: number; scrollTrigger?: object }
) {
  const { y = 32, stagger = 0.1, scrollTrigger: st } = options ?? {};
  const children = container.querySelectorAll(childSelector);
  return gsap.from(children, {
    y,
    opacity: 0,
    duration: 0.7,
    stagger,
    ease: 'power3.out',
    scrollTrigger: st
      ? { trigger: container, start: 'top 85%', ...st }
      : undefined,
  });
}

export const parallaxScrollLegacy = (
  element: HTMLElement,
  options?: { speed?: number; start?: string; end?: string }
) => {
  const { speed = 0.5, start = 'top bottom', end = 'bottom top' } = options ?? {};
  return gsap.to(element, {
    y: () => -100 * speed,
    ease: 'none',
    scrollTrigger: { trigger: element, start, end, scrub: true },
  });
};

export function floatCards(
  elements: HTMLElement[],
  options?: { y?: number; duration?: number; stagger?: number }
) {
  const { y = 8, duration = 2.5, stagger = 0.2 } = options ?? {};
  return gsap.to(elements, {
    y: -y,
    duration,
    stagger: { each: stagger, from: 'random' },
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

export function hoverLift(element: HTMLElement) {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      y: -4,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
    });
  });
  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
    });
  });
}

export function gradientMotion(element: HTMLElement) {
  return gsap.to(element, {
    backgroundPosition: '200% 50%',
    duration: 8,
    repeat: -1,
    ease: 'none',
  });
}

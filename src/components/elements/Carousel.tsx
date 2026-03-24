// components/ui/Carousel.tsx
// AI Project Intelligence - Fixed GSAP Carousel

'use client';

import { useEffect, useRef } from 'react';
import { carouselScroll } from '@/lib/animations';

export interface CarouselProps {
  items: React.ReactNode[];
  speed?: number;
  direction?: 'left' | 'right';
  gap?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  speed = 1,
  direction = 'left',
  gap = 24,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    const originalItems = Array.from(track.children);

    originalItems.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      track.appendChild(clone);
    });

    const animation = carouselScroll(track, { speed, direction });

    return () => {
      animation.kill();
      while (track.children.length > originalItems.length) {
        track.removeChild(track.lastChild!);
      }
    };
  }, [speed, direction]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: `${gap}px` }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: 'auto' }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export interface LogoCarouselProps {
  logos: { name: string; logo: React.ReactNode }[];
}

export const LogoCarousel: React.FC<LogoCarouselProps> = ({ logos }) => {
  return (
    <Carousel
      items={logos.map((logo) => (
        <div key={logo.name} className="w-48 h-24 flex items-center justify-center glass-card opacity-70 hover:opacity-100 transition-opacity">
          {logo.logo}
        </div>
      ))}
      speed={0.5}
      direction="left"
      gap={32}
    />
  );
};

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  return (
    <Carousel
      items={testimonials.map((testimonial) => (
        <div key={testimonial.author} className="w-96 glass-card p-6">
          <p className="text-body text-text-secondary mb-6 leading-relaxed">
            &quot;{testimonial.quote}&quot;
          </p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-indigo to-accent-cyan" />
            <div>
              <p className="text-small font-medium text-text-primary">
                {testimonial.author}
              </p>
              <p className="text-tiny text-text-muted">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      ))}
      speed={0.3}
      direction="left"
      gap={24}
    />
  );
};

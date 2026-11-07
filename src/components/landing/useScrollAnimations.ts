import React, { useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = (rootRef: React.RefObject<HTMLDivElement | null>) => {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Initial Page Load Animation
      const mountTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      mountTl
        .from('.navbar-container', { y: -30, opacity: 0, duration: 0.6 })
        .from('.hero-badge', { y: -20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-title-line', { y: 30, opacity: 0, duration: 0.7, stagger: 0.12 }, '-=0.2')
        .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3')
        .from('.hero-ctas', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3');

      // 2. PINNED EXPANDING IMAGE SHOWCASE (Exact dozfx.com Behavior)
      // The section is pinned while scrolling. As the user scrolls, the card expands to fill the screen.
      // Once expansion is complete, it unpins and smoothly transitions into the next section.
      const expandTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.showcase-section-wrapper',
          start: 'top top',
          end: '+=1400',
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      expandTl
        // Scale and broaden width to full screen like dozfx car
        .fromTo(
          '.showcase-container',
          {
            width: '80vw',
            maxWidth: '960px',
            height: '460px',
            scale: 0.85,
            borderRadius: '36px',
          },
          {
            width: '98vw',
            maxWidth: '1440px',
            height: '82vh',
            scale: 1,
            borderRadius: '16px',
            duration: 1.5,
            ease: 'power2.inOut',
          }
        )
        // Subtle image zoom/parallax
        .fromTo(
          '.showcase-image',
          {
            scale: 1.15,
            y: 30,
          },
          {
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: 'power2.inOut',
          },
          0
        )
        // Overlay and buttons fade up as it expands
        .fromTo(
          '.showcase-overlay-content',
          {
            opacity: 0.7,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power1.out',
          },
          0.4
        );

      // 3. Feature Cards Animation (Appears right after unpinning)
      gsap.fromTo(
        '.feature-card',
        {
          y: 45,
          opacity: 0.2,
        },
        {
          scrollTrigger: {
            trigger: '.feature-cards-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        }
      );

      // 4. Statistics Banner Animation
      gsap.fromTo(
        '.stats-container',
        {
          y: 35,
          opacity: 0.3,
        },
        {
          scrollTrigger: {
            trigger: '.stats-banner-wrapper',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }
      );

    }, root);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [rootRef]);
};

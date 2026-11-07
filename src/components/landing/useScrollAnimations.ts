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

      // GSAP matchMedia to separate desktop cinematic scroll from lightweight mobile execution
      const mm = gsap.matchMedia();

      // DESKTOP: >= 768px (Cinematic pinned showcase, scrub, 3D pop-out)
      mm.add("(min-width: 768px)", () => {
        const expandTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.showcase-section-wrapper',
            start: 'top top',
            end: '+=1400',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        expandTl
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
              duration: 1.6,
              ease: 'power2.inOut',
            }
          )
          .fromTo(
            '.showcase-image',
            { scale: 1.15, y: 35 },
            { scale: 1, y: 0, duration: 1.6, ease: 'power2.inOut' },
            0
          )
          .fromTo(
            '.showcase-overlay-content',
            { opacity: 0.6, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power1.out' },
            0.5
          );

        // Desktop 3D Feature Cards
        const featuresTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        featuresTl
          .fromTo(
            '.features-header-block',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          )
          .fromTo(
            '.feature-card-0',
            { opacity: 0, y: 60, scale: 0.88, z: -120, rotateX: 10 },
            { opacity: 1, y: 0, scale: 1, z: 0, rotateX: 0, duration: 0.75, ease: 'back.out(1.5)' },
            '-=0.3'
          )
          .fromTo(
            '.feature-card-1',
            { opacity: 0, y: 60, scale: 0.88, z: -120, rotateX: 10 },
            { opacity: 1, y: 0, scale: 1, z: 0, rotateX: 0, duration: 0.75, ease: 'back.out(1.5)' },
            '-=0.5'
          )
          .fromTo(
            '.feature-card-2',
            { opacity: 0, y: 60, scale: 0.88, z: -120, rotateX: 10 },
            { opacity: 1, y: 0, scale: 1, z: 0, rotateX: 0, duration: 0.75, ease: 'back.out(1.5)' },
            '-=0.5'
          );

        // Desktop 3D Statistics Cards
        const statsTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        statsTl
          .fromTo(
            '.stat-card-0',
            { opacity: 0, y: 50, scale: 0.85, z: -100 },
            { opacity: 1, y: 0, scale: 1, z: 0, duration: 0.7, ease: 'back.out(1.4)' }
          )
          .fromTo(
            '.stat-card-1',
            { opacity: 0, y: 50, scale: 0.85, z: -100 },
            { opacity: 1, y: 0, scale: 1, z: 0, duration: 0.7, ease: 'back.out(1.4)' },
            '-=0.45'
          )
          .fromTo(
            '.stat-card-2',
            { opacity: 0, y: 50, scale: 0.85, z: -100 },
            { opacity: 1, y: 0, scale: 1, z: 0, duration: 0.7, ease: 'back.out(1.4)' },
            '-=0.45'
          )
          .fromTo(
            '.stat-card-3',
            { opacity: 0, y: 50, scale: 0.85, z: -100 },
            { opacity: 1, y: 0, scale: 1, z: 0, duration: 0.7, ease: 'back.out(1.4)' },
            '-=0.45'
          );

        // Final CTA Banner Entrance
        gsap.fromTo(
          '.final-cta-section',
          { opacity: 0, y: 50, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: '.final-cta-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
          }
        );
      });

      // MOBILE: < 768px (Lightweight, unpinned, zero layout jump)
      mm.add("(max-width: 767px)", () => {
        // Mobile showcase card: natural smooth fade and scale without scroll pinning
        gsap.fromTo(
          '.showcase-container',
          { opacity: 0.7, scale: 0.94 },
          {
            scrollTrigger: {
              trigger: '.showcase-section-wrapper',
              start: 'top 80%',
            },
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.features-header-block',
          { y: 25, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.features-section',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.feature-card',
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.feature-cards-grid',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.stat-card',
          { y: 25, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.stats-cards-grid',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.final-cta-section',
          { opacity: 0, y: 25 },
          {
            scrollTrigger: {
              trigger: '.final-cta-section',
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          }
        );
      });

      // Footer natural entry for all viewports
      gsap.fromTo(
        '.footer-section',
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: '.footer-section',
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
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

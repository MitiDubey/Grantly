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

      // 2. PINNED EXPANDING IMAGE SHOWCASE (Exact Sequence: expands smoothly before unpinning)
      const expandTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.showcase-section-wrapper',
          start: 'top top',
          end: '+=1500',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
        },
      });

      expandTl
        // Phase 1 & 2: Scale and broaden width to full screen before next section
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
        // Subtle image parallax
        .fromTo(
          '.showcase-image',
          {
            scale: 1.15,
            y: 35,
          },
          {
            scale: 1,
            y: 0,
            duration: 1.6,
            ease: 'power2.inOut',
          },
          0
        )
        // Overlay and buttons fade up as it expands
        .fromTo(
          '.showcase-overlay-content',
          {
            opacity: 0.6,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power1.out',
          },
          0.5
        );

      // 3. CONTINUOUS SCROLL CHOREOGRAPHY FOR FEATURES SECTION (Phases 3 to 7)
      const isMobile = window.innerWidth < 768;

      if (!isMobile) {
        // Desktop 3D Pop-Out Choreography
        const featuresTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });

        // Phase 3 & 4: Heading "Designed for Clarity and Success" & Description reveal
        featuresTl
          .fromTo(
            '.features-header-block',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
          )
          // Phase 5, 6, 7: 3D Pop-out cards emerging with translateZ and scale
          .fromTo(
            '.feature-card-0',
            {
              opacity: 0,
              y: 60,
              scale: 0.88,
              z: -120,
              rotateX: 10,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              z: 0,
              rotateX: 0,
              duration: 0.75,
              ease: 'back.out(1.5)',
            },
            '-=0.3'
          )
          .fromTo(
            '.feature-card-1',
            {
              opacity: 0,
              y: 60,
              scale: 0.88,
              z: -120,
              rotateX: 10,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              z: 0,
              rotateX: 0,
              duration: 0.75,
              ease: 'back.out(1.5)',
            },
            '-=0.5'
          )
          .fromTo(
            '.feature-card-2',
            {
              opacity: 0,
              y: 60,
              scale: 0.88,
              z: -120,
              rotateX: 10,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              z: 0,
              rotateX: 0,
              duration: 0.75,
              ease: 'back.out(1.5)',
            },
            '-=0.5'
          );

        // 4. Statistics Banner 3D Pop-out (Matching Feature Cards)
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

        // 5. Final CTA Banner Entrance
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
      } else {
        // Mobile Smooth Progressive Animations
        gsap.fromTo(
          '.features-header-block',
          { y: 30, opacity: 0 },
          {
            scrollTrigger: {
              trigger: '.features-section',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.feature-card',
          { y: 40, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: '.feature-cards-grid',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.18,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.stat-card',
          { y: 30, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: '.stats-cards-grid',
              start: 'top 85%',
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.12,
            ease: 'power2.out',
          }
        );

        gsap.fromTo(
          '.final-cta-section',
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: '.final-cta-section',
              start: 'top 85%',
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          }
        );
      }

      // 6. Footer natural entry
      gsap.fromTo(
        '.footer-section',
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: '.footer-section',
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
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

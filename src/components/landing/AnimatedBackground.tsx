import React, { useState, useEffect } from 'react';
import waveLight from '../../assets/wave-light.png';
import waveDark from '../../assets/wave-dark.png';

interface AnimatedBackgroundProps {
  isDark: boolean;
}

// 1. Logo-Inspired Ambient Glowing Orbs (12-18 strategically placed around hero & borders)
interface AmbientOrb {
  id: string;
  top: string;
  left?: string;
  right?: string;
  size: string;
  color: string;
  blur: string;
  opacityLight: number;
  opacityDark: number;
  animClass: string;
  delay: string;
  duration: string;
}

const AMBIENT_ORBS: AmbientOrb[] = [
  // Upper-left soft Electric Blue glow
  {
    id: 'orb-ul-blue',
    top: '-8%',
    left: '8%',
    size: '520px',
    color: 'radial-gradient(circle, #3985FF 0%, rgba(57,133,255,0.4) 35%, transparent 70%)',
    blur: '140px',
    opacityLight: 0.28,
    opacityDark: 0.38,
    animClass: 'animate-float-1',
    delay: '0s',
    duration: '18s',
  },
  // Upper-right warm Gold glow (#F4B740)
  {
    id: 'orb-ur-gold',
    top: '-5%',
    right: '10%',
    size: '480px',
    color: 'radial-gradient(circle, #F4B740 0%, rgba(244,183,64,0.35) 40%, transparent 70%)',
    blur: '150px',
    opacityLight: 0.24,
    opacityDark: 0.34,
    animClass: 'animate-float-2',
    delay: '2s',
    duration: '22s',
  },
  // Mid-left Electric Blue ambient
  {
    id: 'orb-ml-blue',
    top: '35%',
    left: '-6%',
    size: '440px',
    color: 'radial-gradient(circle, #3985FF 0%, rgba(57,133,255,0.3) 45%, transparent 70%)',
    blur: '135px',
    opacityLight: 0.2,
    opacityDark: 0.3,
    animClass: 'animate-float-3',
    delay: '4s',
    duration: '19s',
  },
  // Mid-right Warm Gold ambient (#F4B740)
  {
    id: 'orb-mr-gold',
    top: '40%',
    right: '-5%',
    size: '460px',
    color: 'radial-gradient(circle, #F4B740 0%, rgba(244,183,64,0.3) 40%, transparent 70%)',
    blur: '140px',
    opacityLight: 0.22,
    opacityDark: 0.32,
    animClass: 'animate-float-1',
    delay: '1s',
    duration: '21s',
  },
  // Top Center Subtle Deep Navy accent orb (#101B2D)
  {
    id: 'orb-tc-navy',
    top: '5%',
    left: '38%',
    size: '380px',
    color: 'radial-gradient(circle, #101B2D 0%, rgba(16,27,45,0.5) 45%, transparent 70%)',
    blur: '120px',
    opacityLight: 0.1,
    opacityDark: 0.25,
    animClass: 'animate-float-2',
    delay: '3s',
    duration: '20s',
  },
  // Lower-left Electric Blue glow
  {
    id: 'orb-ll-blue',
    top: '68%',
    left: '4%',
    size: '480px',
    color: 'radial-gradient(circle, #3985FF 0%, rgba(57,133,255,0.35) 40%, transparent 70%)',
    blur: '145px',
    opacityLight: 0.22,
    opacityDark: 0.32,
    animClass: 'animate-float-2',
    delay: '5s',
    duration: '17s',
  },
  // Lower-right Warm Gold glow
  {
    id: 'orb-lr-gold',
    top: '72%',
    right: '6%',
    size: '500px',
    color: 'radial-gradient(circle, #F4B740 0%, rgba(244,183,64,0.35) 45%, transparent 70%)',
    blur: '150px',
    opacityLight: 0.24,
    opacityDark: 0.34,
    animClass: 'animate-float-3',
    delay: '3s',
    duration: '22s',
  },
  // Floating orb near hero title perimeter (Blue)
  {
    id: 'orb-ht-blue',
    top: '18%',
    left: '18%',
    size: '260px',
    color: 'radial-gradient(circle, #3985FF 0%, rgba(57,133,255,0.4) 40%, transparent 70%)',
    blur: '80px',
    opacityLight: 0.22,
    opacityDark: 0.32,
    animClass: 'animate-float-1',
    delay: '6s',
    duration: '16s',
  },
  // Floating orb near hero title perimeter (Gold)
  {
    id: 'orb-ht-gold',
    top: '22%',
    right: '20%',
    size: '280px',
    color: 'radial-gradient(circle, #F4B740 0%, rgba(244,183,64,0.4) 40%, transparent 70%)',
    blur: '85px',
    opacityLight: 0.2,
    opacityDark: 0.3,
    animClass: 'animate-float-2',
    delay: '2s',
    duration: '19s',
  },
  // Floating soft highlight orb (White #FFFFFF)
  {
    id: 'orb-ht-white',
    top: '28%',
    left: '26%',
    size: '180px',
    color: 'radial-gradient(circle, #FFFFFF 0%, rgba(255,255,255,0.4) 40%, transparent 70%)',
    blur: '60px',
    opacityLight: 0.18,
    opacityDark: 0.22,
    animClass: 'animate-float-3',
    delay: '4s',
    duration: '15s',
  },
  // Subtle lower-center blend orb
  {
    id: 'orb-lc-blue',
    top: '85%',
    left: '42%',
    size: '420px',
    color: 'radial-gradient(circle, #3985FF 0%, rgba(57,133,255,0.3) 40%, transparent 70%)',
    blur: '130px',
    opacityLight: 0.18,
    opacityDark: 0.28,
    animClass: 'animate-float-1',
    delay: '5s',
    duration: '21s',
  },
  // Bottom-right subtle navy orb
  {
    id: 'orb-br-navy',
    top: '90%',
    right: '18%',
    size: '340px',
    color: 'radial-gradient(circle, #101B2D 0%, rgba(16,27,45,0.4) 45%, transparent 70%)',
    blur: '110px',
    opacityLight: 0.08,
    opacityDark: 0.22,
    animClass: 'animate-float-2',
    delay: '7s',
    duration: '18s',
  },
];

// 2. Exact Color-Distribution Floating Dots:
// 55% Electric Blue (#3985FF), 30% Gold (#F4B740), 10% Midnight Navy (#101B2D), 5% Soft White (#FFFFFF)
interface FloatingDot {
  id: string;
  top: string;
  left: string;
  size: number;
  color: string;
  blur: string;
  duration: string;
  delay: string;
}

const LOGO_DOTS: FloatingDot[] = [
  // Electric Blue Dots (55%)
  { id: 'b1', top: '14%', left: '16%', size: 5, color: '#3985FF', blur: '1px', duration: '14s', delay: '0s' },
  { id: 'b2', top: '22%', left: '28%', size: 4, color: '#3985FF', blur: '0.5px', duration: '17s', delay: '2s' },
  { id: 'b3', top: '26%', left: '80%', size: 6, color: '#3985FF', blur: '1.5px', duration: '15s', delay: '4s' },
  { id: 'b4', top: '34%', left: '12%', size: 4, color: '#3985FF', blur: '0.5px', duration: '19s', delay: '1s' },
  { id: 'b5', top: '48%', left: '22%', size: 5, color: '#3985FF', blur: '1px', duration: '16s', delay: '3s' },
  { id: 'b6', top: '56%', left: '84%', size: 6, color: '#3985FF', blur: '1.5px', duration: '18s', delay: '5s' },
  { id: 'b7', top: '64%', left: '14%', size: 5, color: '#3985FF', blur: '1px', duration: '13s', delay: '2s' },
  { id: 'b8', top: '74%', left: '76%', size: 4, color: '#3985FF', blur: '0.5px', duration: '20s', delay: '6s' },
  { id: 'b9', top: '82%', left: '25%', size: 6, color: '#3985FF', blur: '1.5px', duration: '15s', delay: '1s' },
  { id: 'b10', top: '88%', left: '68%', size: 4, color: '#3985FF', blur: '0.5px', duration: '18s', delay: '4s' },
  { id: 'b11', top: '38%', left: '88%', size: 5, color: '#3985FF', blur: '1px', duration: '16s', delay: '2s' },

  // Warm Gold/Orange Dots (30%)
  { id: 'g1', top: '16%', left: '78%', size: 6, color: '#F4B740', blur: '1.5px', duration: '16s', delay: '1s' },
  { id: 'g2', top: '24%', left: '20%', size: 4, color: '#F4B740', blur: '0.5px', duration: '18s', delay: '3s' },
  { id: 'g3', top: '38%', left: '74%', size: 5, color: '#F4B740', blur: '1px', duration: '15s', delay: '5s' },
  { id: 'g4', top: '52%', left: '18%', size: 6, color: '#F4B740', blur: '1.5px', duration: '20s', delay: '2s' },
  { id: 'g5', top: '68%', left: '82%', size: 5, color: '#F4B740', blur: '1px', duration: '14s', delay: '4s' },
  { id: 'g6', top: '86%', left: '34%', size: 4, color: '#F4B740', blur: '0.5px', duration: '17s', delay: '6s' },

  // Midnight Navy Dots (10%)
  { id: 'n1', top: '19%', left: '86%', size: 5, color: '#101B2D', blur: '1px', duration: '19s', delay: '3s' },
  { id: 'n2', top: '62%', left: '26%', size: 4, color: '#101B2D', blur: '0.5px', duration: '21s', delay: '5s' },

  // Soft White Highlights (5%)
  { id: 'w1', top: '21%', left: '72%', size: 3.5, color: '#FFFFFF', blur: '0.5px', duration: '13s', delay: '2s' },
];

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDark }) => {
  // Desktop-only subtle cursor parallax (max 12px shift, 0 re-render lag)
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only bind on desktop to conserve mobile battery & performance
    if (typeof window === 'undefined' || window.innerWidth < 1024) return;

    let frameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 16;
        const y = (e.clientY / window.innerHeight - 0.5) * 16;
        setOffset({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: 'transform 0.4s cubic-bezier(0.2, 0, 0.2, 1)',
        willChange: 'transform',
      }}
    >
      
      {/* 1. Base Wave Layer with Smooth Crossfade */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat transition-opacity duration-300 ease-out"
        style={{
          backgroundImage: `url(${waveLight})`,
          opacity: isDark ? 0 : 0.42,
          willChange: 'opacity',
        }}
      />
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat transition-opacity duration-300 ease-out"
        style={{
          backgroundImage: `url(${waveDark})`,
          opacity: isDark ? 0.85 : 0,
          willChange: 'opacity',
        }}
      />

      {/* 2. 12-18 Logo-Inspired Ambient Glowing Orbs */}
      <div className="absolute inset-0">
        {AMBIENT_ORBS.map(orb => (
          <div
            key={orb.id}
            className={`absolute rounded-full pointer-events-none ${orb.animClass}`}
            style={{
              top: orb.top,
              left: orb.left,
              right: orb.right,
              width: orb.size,
              height: orb.size,
              background: orb.color,
              filter: `blur(${orb.blur})`,
              opacity: isDark ? orb.opacityDark : orb.opacityLight,
              animationDuration: orb.duration,
              animationDelay: orb.delay,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* 3. Floating, Softly Glowing Logo Dots (55% Blue, 30% Gold, 10% Navy, 5% White) */}
      <div className="absolute inset-0 overflow-hidden">
        {LOGO_DOTS.map(dot => (
          <div
            key={dot.id}
            className="absolute rounded-full pointer-events-none animate-float-dot"
            style={{
              top: dot.top,
              left: dot.left,
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              backgroundColor: dot.color,
              filter: `blur(${dot.blur}) drop-shadow(0 0 6px ${dot.color})`,
              animationDuration: dot.duration,
              animationDelay: dot.delay,
              opacity: isDark ? 0.75 : 0.55,
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* 4. Fine Geometric Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05] bg-[radial-gradient(#3985FF_1.5px,transparent_1.5px)] [background-size:28px_28px]" 
      />

    </div>
  );
};


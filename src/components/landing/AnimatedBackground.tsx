import React, { useState, useEffect } from 'react';
import waveLight from '../../assets/wave-light.png';
import waveDark from '../../assets/wave-dark.png';

interface AnimatedBackgroundProps {
  isDark: boolean;
}

// Exactly 9 lightweight ambient dots/orbs on desktop, auto-filtered down to 4 on mobile
// Strict brand palette: Electric Blue (#3985FF), Warm Gold (#F4B740), Navy (#101B2D), White (#FFFFFF)
// Radial gradients used directly to eliminate GPU blur-filter costs
const AMBIENT_DOTS = [
  // 1. Upper-left soft Electric Blue ambient orb
  {
    id: 'dot-1',
    top: '4%',
    left: '8%',
    size: '180px',
    bg: 'radial-gradient(circle, rgba(57,133,255,0.35) 0%, rgba(57,133,255,0.08) 50%, transparent 70%)',
    anim: 'animate-float-1',
    duration: '18s',
    mobile: true,
  },
  // 2. Upper-right warm Gold ambient orb
  {
    id: 'dot-2',
    top: '6%',
    right: '10%',
    size: '160px',
    bg: 'radial-gradient(circle, rgba(244,183,64,0.32) 0%, rgba(244,183,64,0.08) 50%, transparent 70%)',
    anim: 'animate-float-2',
    duration: '22s',
    mobile: true,
  },
  // 3. Floating Electric Blue dot near hero title perimeter
  {
    id: 'dot-3',
    top: '20%',
    left: '20%',
    size: '10px',
    bg: '#3985FF',
    anim: 'animate-float-dot',
    duration: '15s',
    mobile: true,
  },
  // 4. Floating Warm Gold dot near hero subtitle
  {
    id: 'dot-4',
    top: '24%',
    right: '22%',
    size: '8px',
    bg: '#F4B740',
    anim: 'animate-float-2',
    duration: '19s',
    mobile: true,
  },
  // 5. Soft white subtle glimmer
  {
    id: 'dot-5',
    top: '18%',
    right: '34%',
    size: '6px',
    bg: '#FFFFFF',
    anim: 'animate-float-1',
    duration: '16s',
    mobile: false,
  },
  // 6. Mid-left Electric Blue ambient dot
  {
    id: 'dot-6',
    top: '45%',
    left: '5%',
    size: '140px',
    bg: 'radial-gradient(circle, rgba(57,133,255,0.25) 0%, transparent 70%)',
    anim: 'animate-float-2',
    duration: '20s',
    mobile: false,
  },
  // 7. Mid-right Warm Gold dot
  {
    id: 'dot-7',
    top: '52%',
    right: '6%',
    size: '12px',
    bg: '#F4B740',
    anim: 'animate-float-1',
    duration: '17s',
    mobile: false,
  },
  // 8. Lower-left Electric Blue dot
  {
    id: 'dot-8',
    top: '72%',
    left: '12%',
    size: '8px',
    bg: '#3985FF',
    anim: 'animate-float-dot',
    duration: '21s',
    mobile: false,
  },
  // 9. Lower-right Midnight Navy & Gold ambient glow
  {
    id: 'dot-9',
    top: '78%',
    right: '14%',
    size: '150px',
    bg: 'radial-gradient(circle, rgba(244,183,64,0.25) 0%, rgba(16,27,45,0.15) 50%, transparent 70%)',
    anim: 'animate-float-2',
    duration: '24s',
    mobile: false,
  },
];

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDark }) => {
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Pause animations when browser tab is inactive (Page Visibility API)
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div 
      className={`fixed inset-0 pointer-events-none overflow-hidden select-none z-0 ${!isTabVisible ? 'paused-animations' : ''}`}
    >
      {/* 1. Base Wave Layer with hardware-accelerated crossfade */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat transition-opacity duration-300 ease-out"
        style={{
          backgroundImage: `url(${waveLight})`,
          opacity: isDark ? 0 : 0.4,
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

      {/* 2. Exactly 8-10 lightweight ambient dots & orbs (zero blur filter, pure radial gradients & GPU translate3d) */}
      <div className="absolute inset-0">
        {AMBIENT_DOTS.map(dot => (
          <div
            key={dot.id}
            className={`absolute rounded-full pointer-events-none ${dot.anim} ${!dot.mobile ? 'hidden sm:block' : ''}`}
            style={{
              top: dot.top,
              left: dot.left,
              right: dot.right,
              width: dot.size,
              height: dot.size,
              background: dot.bg,
              animationDuration: dot.duration,
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* 3. Static Fine Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#3985FF_1.5px,transparent_1.5px)] [background-size:32px_32px]" 
      />

    </div>
  );
};


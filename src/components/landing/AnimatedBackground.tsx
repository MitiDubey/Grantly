import React from 'react';
import waveLight from '../../assets/wave-light.png';
import waveDark from '../../assets/wave-dark.png';

interface AnimatedBackgroundProps {
  isDark: boolean;
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDark }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      
      {/* 1. Base Wave Layer with Smooth Crossfade (both images pre-mounted, zero repaint lag) */}
      <div 
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat transition-opacity duration-300 ease-out"
        style={{
          backgroundImage: `url(${waveLight})`,
          opacity: isDark ? 0 : 0.45,
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

      {/* 2. Floating Ambient Glow Orbs with Logo Colors:
          - Electric Blue: #3985FF
          - Logo Golden Star Yellow: #F6A81C / #FFC107
          - Deep Midnight Navy: #101B2D
      */}
      {/* Top Center-Left Ambient Glow (Electric Blue) */}
      <div 
        className="absolute -top-32 left-[15%] w-[550px] h-[550px] rounded-full blur-[130px] opacity-25 dark:opacity-30 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, #3985FF 0%, transparent 70%)',
          willChange: 'opacity',
        }}
      />

      {/* Top Center-Right Logo Star Warm Ambient Tint (#F6A81C) */}
      <div 
        className="absolute -top-20 right-[20%] w-[480px] h-[480px] rounded-full blur-[140px] opacity-20 dark:opacity-25 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, #F6A81C 0%, #FFB300 25%, transparent 70%)',
          willChange: 'opacity',
        }}
      />

      {/* Mid Left Subtle Golden Amber Ambient */}
      <div 
        className="absolute top-[45%] -left-32 w-[500px] h-[500px] rounded-full blur-[150px] opacity-15 dark:opacity-20 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, #FFC107 0%, transparent 70%)',
          willChange: 'opacity',
        }}
      />

      {/* Mid Right Deep Electric Blue Glow */}
      <div 
        className="absolute top-[50%] -right-28 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 dark:opacity-25 pointer-events-none transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, #3985FF 0%, transparent 70%)',
          willChange: 'opacity',
        }}
      />

      {/* 3. Subtle Animated Floating Golden Sparkles/Stars inspired by the Logo Stars */}
      <div className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-40">
        <div 
          className="absolute top-[18%] left-[22%] w-2 h-2 rounded-full bg-[#F6A81C] blur-[1px] animate-ping"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute top-[28%] right-[25%] w-2.5 h-2.5 rounded-full bg-[#FFB300] blur-[1px] animate-pulse"
          style={{ animationDuration: '5s' }}
        />
        <div 
          className="absolute top-[65%] left-[12%] w-2 h-2 rounded-full bg-[#3985FF] blur-[1px] animate-pulse"
          style={{ animationDuration: '6s' }}
        />
        <div 
          className="absolute top-[75%] right-[15%] w-3 h-3 rounded-full bg-[#F6A81C] blur-[2px] animate-ping"
          style={{ animationDuration: '7s' }}
        />
      </div>

      {/* 4. Fine Grid/Radial Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(#3985FF_1.5px,transparent_1.5px)] [background-size:28px_28px]" 
      />

    </div>
  );
};


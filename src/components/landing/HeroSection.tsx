import React from 'react';
import grantlyLogo from '../../assets/grantly-logo.png';
import { ChevronRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onLogoClick: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLogoClick,
  onOpenAuth,
}) => {
  return (
    <div className="hero-section relative w-full flex flex-col items-center justify-center text-center px-6 pt-28 pb-10 max-w-5xl mx-auto z-10">
      
      {/* Surrounding Hero Content */}
      <div className="hero-text-content space-y-4">
        {/* Hero Badge with Logo Gold Star Accent */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/40 dark:border-amber-400/40 bg-amber-50/80 dark:bg-[#19263A]/90 text-[#101B2D] dark:text-white text-xs font-semibold uppercase tracking-wider mb-2 shadow-sm backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#F6A81C] animate-pulse" />
          <span className="text-[#3985FF] font-bold">GRANTLY</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-700 dark:text-slate-200">Next-Gen Scholarship Intelligence</span>
        </div>

        {/* Headline:
            In Light Mode: Electric Blue gradient
            In Dark Mode: Highly visible Golden-Yellow text with warm glowing shadow
        */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-[#101B2D] dark:text-white leading-[1.08] max-w-4xl mx-auto">
          <span className="hero-title-line block">Your Future,</span>
          <span 
            className="hero-title-line block font-black text-[#3985FF] dark:text-[#F4B740] drop-shadow-sm dark:drop-shadow-[0_4px_24px_rgba(244,183,64,0.45)] transition-colors duration-200"
          >
            Funded.
          </span>
        </h1>

        {/* Supporting Paragraph */}
        <p className="hero-subtitle text-base sm:text-lg md:text-xl text-[#667085] dark:text-[#A8B4C7] max-w-2xl mx-auto font-normal leading-relaxed pt-2">
          Discover curated grants, calculate transparent rule-based eligibility scores, and track all your applications seamlessly in one elegant workspace.
        </p>
      </div>

      {/* SECTION 1 LOGO PORTAL: PROPORTIONATE EMBEDDED CIRCULAR LOGO FIT */}
      <div className="my-8 flex flex-col items-center justify-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#3985FF] dark:text-[#F6A81C] mb-4 flex items-center gap-1.5 select-none animate-pulse">
          <span className="text-[#F6A81C]">★</span>
          <span>CLICK THE LOGO PORTAL TO ENTER</span>
          <span className="text-[#F6A81C]">★</span>
        </p>

        <div 
          onClick={onLogoClick}
          className="logo-portal-card relative group cursor-pointer w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-white dark:bg-[#19263A] p-2.5 shadow-2xl border-4 border-[#3985FF] dark:border-[#F6A81C] flex items-center justify-center overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ willChange: 'transform' }}
          title="Click to enter GRANTLY"
        >
          {/* Rotating dashed orbital accent */}
          <div className="absolute inset-2 rounded-full border border-dashed border-[#3985FF]/40 dark:border-[#F6A81C]/50 pointer-events-none animate-[spin_25s_linear_infinite]" />
          
          {/* Dual Glow: Electric Blue in light, warm gold in dark */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-[#3985FF]/30 via-[#F6A81C]/25 to-transparent blur-xl pointer-events-none" />

          {/* Inner Circular Logo Container */}
          <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-3 z-10 shadow-inner">
            <img
              src={grantlyLogo}
              alt="GRANTLY Official Portal Emblem"
              className="w-full h-full object-contain select-none p-1 group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Golden / Blue Hover Ring Glow */}
          <div className="absolute inset-0 rounded-full ring-4 ring-[#3985FF]/40 dark:ring-[#F6A81C]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20" />
        </div>
      </div>

      {/* Hero CTA Buttons */}
      <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
        <button
          onClick={() => onOpenAuth('signup')}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#3985FF] to-[#2575f0] hover:to-[#1e6ae4] active:scale-95 text-white font-semibold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Get Started</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onOpenAuth('signin')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#E4E9F1] dark:border-[#304058] bg-white dark:bg-[#19263A] hover:bg-slate-50 dark:hover:bg-[#223149] text-[#172033] dark:text-[#F4F7FC] font-semibold text-sm shadow-sm hover:shadow flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
            <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

    </div>
  );
};

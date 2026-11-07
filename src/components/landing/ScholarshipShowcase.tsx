import React from 'react';
import studentsHero from '../../assets/students-hero.jpg';
import { GraduationCap } from 'lucide-react';

interface ScholarshipShowcaseProps {
  onCheckEligibility: () => void;
}

export const ScholarshipShowcase: React.FC<ScholarshipShowcaseProps> = ({
  onCheckEligibility,
}) => {
  return (
    <div className="scholarship-showcase-section relative w-full h-full flex flex-col items-center justify-center px-4 sm:px-6">
      
      {/* Headings */}
      <div className="text-center mb-5 shrink-0">
        <span className="inline-block text-[11px] uppercase font-bold tracking-widest text-[#3985FF] bg-blue-50 dark:bg-[#19263A] px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/60 mb-2 shadow-sm">
          SCROLL DOWN TO EXPAND
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#101B2D] dark:text-white tracking-tight">
          Empowering India's Next Generation
        </h2>
      </div>

      {/* Main Expandable Landscape Image Card */}
      <div 
        className="showcase-container relative w-full overflow-hidden shadow-2xl border-2 border-slate-200 dark:border-[#304058] bg-[#101B2D] transition-shadow duration-300 mx-auto"
        style={{ willChange: 'transform, width, height, border-radius' }}
      >
        {/* High quality Indian students photograph */}
        <img
          src={studentsHero}
          alt="Indian college students studying with digital scholarship platform at Gateway of India"
          width={1280}
          height={720}
          loading="lazy"
          decoding="async"
          className="showcase-image w-full h-full object-cover object-center select-none"
        />

        {/* Dark gradient overlay for crystal clear contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101B2D]/95 via-[#101B2D]/35 to-transparent pointer-events-none" />

        {/* Text Overlay & Floating Action Buttons */}
        <div className="showcase-overlay-content absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 flex flex-col md:flex-row md:items-end justify-between gap-6 text-white z-20">
          <div className="max-w-xl text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3985FF] text-white text-[11px] font-bold uppercase tracking-wider mb-2 shadow-sm">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>NATIONWIDE SCHOLARSHIP PORTAL</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white drop-shadow-md">
              Real Students. Transparent Funding.
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1.5 leading-relaxed drop-shadow max-w-lg">
              Curated grants from verified education opportunities with transparent eligibility criteria.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-center shadow-lg">
              <p className="text-xl sm:text-2xl font-black font-display text-white">₹15.8L+</p>
              <p className="text-[10px] uppercase font-bold tracking-wider text-blue-200">Active Aid Pool</p>
            </div>

            {/* Blue CTA */}
            <button
              type="button"
              onClick={onCheckEligibility}
              className="px-6 py-3.5 rounded-2xl bg-[#3985FF] hover:bg-[#2b74ed] active:scale-95 text-white text-xs sm:text-sm font-bold shadow-xl shadow-blue-500/50 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Check Eligibility →</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

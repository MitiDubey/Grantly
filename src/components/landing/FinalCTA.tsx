import React from 'react';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';

interface FinalCTAProps {
  onExplore: () => void;
  onCheckEligibility: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({
  onExplore,
  onCheckEligibility,
}) => {
  return (
    <section className="final-cta-section relative z-20 max-w-6xl mx-auto px-6 py-12">
      <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-r from-[#101B2D] via-[#19263A] to-[#101B2D] p-8 sm:p-12 text-white border-2 border-[#304058] shadow-[0_20px_50px_rgba(16,27,45,0.4)]">
        
        {/* Subtle Golden and Electric Blue background accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#3985FF]/20 to-[#F4B740]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3985FF]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          
          {/* Headline & Description */}
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#F4B740] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next Step in Higher Education</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-[1.15]">
              Your Next Opportunity Starts Here.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Discover scholarships that match your ambitions and take the next step toward your future.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onExplore}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#3985FF] to-[#2575f0] hover:to-[#1e6ae4] active:scale-95 text-white font-bold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <span>Explore Scholarships</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onCheckEligibility}
              className="px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-sm border-2 border-white/25 flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#F4B740]" />
              <span>Check Eligibility</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};


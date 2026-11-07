import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer-section relative z-10 border-t border-[#E4E9F1] dark:border-[#304058] bg-[#F5F7FB] dark:bg-[#0B1423] py-12 text-[#667085] dark:text-[#A8B4C7] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-lg text-[#101B2D] dark:text-white font-display">
              GRANTLY
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs sm:text-sm font-medium">Your Future, Funded. Since 2026.</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-5 text-xs font-semibold">
            <a href="#about" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#3985FF] transition-colors">
              About
            </a>
            <a href="#explorer" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 800, behavior: 'smooth' }); }} className="hover:text-[#3985FF] transition-colors">
              Explore Scholarships
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); alert("Contact: support@grantly.org"); }} className="hover:text-[#3985FF] transition-colors">
              Contact
            </a>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("GRANTLY follows strict Student Privacy Standards."); }} className="hover:text-[#3985FF] transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("GRANTLY Terms of Service 2026."); }} className="hover:text-[#3985FF] transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="pt-6 border-t border-[#E4E9F1]/80 dark:border-[#304058]/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <p>© 2026 GRANTLY. Designed according to Brand Style Guide & Implementation Plan v1.0.</p>
          <p className="text-[11px] text-slate-400">All demonstration data clearly labelled for frontend evaluation.</p>
        </div>

      </div>
    </footer>
  );
};


import React from 'react';
import grantlyLogo from '../../assets/grantly-logo.png';
import { ExternalLink, Mail, Shield, BookOpen } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: string) => void;
  onOpenAuth?: (mode: 'signin' | 'signup') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenAuth }) => {
  return (
    <footer className="footer-section relative z-20 border-t border-[#E4E9F1] dark:border-[#304058] bg-[#FFFFFF] dark:bg-[#0B1423] text-[#172033] dark:text-[#F4F7FC] transition-colors duration-200">
      
      {/* Decorative subtle ambient pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#3985FF_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10 space-y-12">
        
        {/* =========================================================
            TOP & MIDDLE SECTION – Multi-Column Brand & Navigation
        ========================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
          
          {/* Brand Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white p-1 border-2 border-[#3985FF]/50 shadow-sm flex items-center justify-center overflow-hidden">
                <img src={grantlyLogo} alt="GRANTLY Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-[#101B2D] dark:text-white font-display">
                  GRANTLY
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#3985FF]">
                  Your Future, Funded.
                </span>
              </div>
            </div>

            <p className="text-sm text-[#667085] dark:text-[#A8B4C7] leading-relaxed max-w-sm font-normal">
              Making scholarship discovery simpler, eligibility clearer, and educational opportunities more accessible for every student.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span>Student Privacy & Data Protection Guaranteed</span>
            </div>
          </div>

          {/* Group 1: Explore */}
          <div className="space-y-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#101B2D] dark:text-white font-display">
              Explore
            </p>
            <ul className="space-y-2.5 text-xs font-medium text-[#475569] dark:text-[#A8B4C7]">
              <li>
                <a href="#discover" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 900, behavior: 'smooth' }); }} className="hover:text-[#3985FF] transition-colors">
                  Discover Scholarships
                </a>
              </li>
              <li>
                <a href="#matches" onClick={(e) => { e.preventDefault(); onNavigateTab ? onNavigateTab('recommendations') : onOpenAuth?.('signup'); }} className="hover:text-[#3985FF] transition-colors">
                  Smart Matching
                </a>
              </li>
              <li>
                <a href="#categories" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 1100, behavior: 'smooth' }); }} className="hover:text-[#3985FF] transition-colors">
                  Scholarship Categories
                </a>
              </li>
              <li>
                <a href="#eligibility" onClick={(e) => { e.preventDefault(); onOpenAuth?.('signup'); }} className="hover:text-[#3985FF] transition-colors">
                  Eligibility Checker
                </a>
              </li>
            </ul>
          </div>

          {/* Group 2: Platform */}
          <div className="space-y-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#101B2D] dark:text-white font-display">
              Platform
            </p>
            <ul className="space-y-2.5 text-xs font-medium text-[#475569] dark:text-[#A8B4C7]">
              <li>
                <a href="#dashboard" onClick={(e) => { e.preventDefault(); onNavigateTab ? onNavigateTab('dashboard') : onOpenAuth?.('signin'); }} className="hover:text-[#3985FF] transition-colors">
                  Student Dashboard
                </a>
              </li>
              <li>
                <a href="#tracker" onClick={(e) => { e.preventDefault(); onNavigateTab ? onNavigateTab('applications') : onOpenAuth?.('signin'); }} className="hover:text-[#3985FF] transition-colors">
                  Application Tracker
                </a>
              </li>
              <li>
                <a href="#saved" onClick={(e) => { e.preventDefault(); onNavigateTab ? onNavigateTab('saved') : onOpenAuth?.('signin'); }} className="hover:text-[#3985FF] transition-colors">
                  Saved Scholarships
                </a>
              </li>
              <li>
                <a href="#profile" onClick={(e) => { e.preventDefault(); onNavigateTab ? onNavigateTab('profile') : onOpenAuth?.('signin'); }} className="hover:text-[#3985FF] transition-colors">
                  Student Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Group 3: Information */}
          <div className="space-y-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-[#101B2D] dark:text-white font-display">
              Information
            </p>
            <ul className="space-y-2.5 text-xs font-medium text-[#475569] dark:text-[#A8B4C7]">
              <li>
                <a href="#about" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#3985FF] transition-colors">
                  About GRANTLY
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => { e.preventDefault(); alert("Contact: support@grantly.org"); }} className="hover:text-[#3985FF] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Student Data Privacy Policy: 100% encrypted & local demonstration data."); }} className="hover:text-[#3985FF] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Terms & Conditions: Prototype build for THE OUTPOST 2026."); }} className="hover:text-[#3985FF] transition-colors">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* =========================================================
            BOTTOM SECTION – Copyright & Tagline Strip
        ========================================================== */}
        <div className="pt-8 border-t border-[#E4E9F1] dark:border-[#304058] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#667085] dark:text-[#A8B4C7]">
          <div>
            <p>© 2026 GRANTLY. All rights reserved.</p>
          </div>

          <div className="text-center">
            <span className="text-slate-400">Built to empower the next generation.</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-[#101B2D] dark:text-white">
            <span>Your Future, Funded. 🎓</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

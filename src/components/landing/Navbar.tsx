import React, { useState } from 'react';
import grantlyLogo from '../../assets/grantly-logo.png';
import { Sun, Moon, ArrowRight, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
  isAuthenticated: boolean;
  userName?: string;
  onEnterApp: () => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isDark,
  toggleTheme,
  isAuthenticated,
  userName,
  onEnterApp,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-container fixed top-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#101B2D]/95 backdrop-blur-md border-b border-[#E4E9F1] dark:border-[#304058]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
        
        {/* Logo and Brand */}
        <div 
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white dark:bg-[#19263A] p-1.5 shadow-md shadow-blue-500/10 border-2 border-[#3985FF]/40 flex items-center justify-center overflow-hidden flex-shrink-0">
            <img 
              src={grantlyLogo} 
              alt="GRANTLY Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#101B2D] dark:text-white font-display block leading-tight">
              GRANTLY
            </span>
            <span className="block text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#3985FF] leading-tight">
              Since 2026
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          {/* Light / Dark Mode Switch */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl border border-[#E4E9F1] dark:border-[#304058] bg-white dark:bg-[#19263A] text-slate-600 dark:text-slate-300 hover:text-[#3985FF] transition-all shadow-xs cursor-pointer"
            title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#101B2D]" />
            )}
          </button>

          {isAuthenticated ? (
            <button
              onClick={onEnterApp}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
            >
              <span className="hidden sm:inline">Dashboard ({userName?.split(' ')[0] || 'Scholar'})</span>
              <span className="sm:hidden">Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          ) : (
            <>
              {/* Desktop Auth Buttons */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="px-3.5 py-2 text-sm font-semibold text-[#172033] dark:text-[#F4F7FC] hover:text-[#3985FF] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="px-4 py-2 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] text-white font-semibold text-sm shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
                >
                  Sign Up Free
                </button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden p-2 rounded-xl border border-[#E4E9F1] dark:border-[#304058] text-[#172033] dark:text-slate-200"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {!isAuthenticated && mobileMenuOpen && (
        <div className="sm:hidden px-4 py-3 bg-white dark:bg-[#101B2D] border-t border-[#E4E9F1] dark:border-[#304058] flex flex-col gap-2 shadow-lg animate-in slide-in-from-top-2">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAuth('signin');
            }}
            className="w-full py-2.5 text-center text-sm font-semibold rounded-xl border border-[#E4E9F1] dark:border-[#304058] text-[#172033] dark:text-white"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAuth('signup');
            }}
            className="w-full py-2.5 text-center text-sm font-semibold rounded-xl bg-[#3985FF] text-white shadow-md shadow-blue-500/25"
          >
            Sign Up Free
          </button>
        </div>
      )}
    </header>
  );
};

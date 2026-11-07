import React from 'react';
import grantlyLogo from '../../assets/grantly-logo.png';
import { Sun, Moon, ArrowRight } from 'lucide-react';

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
  return (
    <header className="navbar-container fixed top-0 left-0 right-0 z-40 bg-white/90 dark:bg-[#101B2D]/90 backdrop-blur-md border-b border-[#E4E9F1] dark:border-[#304058] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
        
        {/* Logo and Brand - Requirement #1: Circular Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-11 h-11 rounded-full bg-white dark:bg-[#19263A] p-1.5 shadow-md shadow-blue-500/10 border-2 border-[#3985FF]/40 flex items-center justify-center overflow-hidden">
            <img 
              src={grantlyLogo} 
              alt="GRANTLY Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-[#101B2D] dark:text-white font-display">
              GRANTLY
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#3985FF]">
              Since 2026
            </span>
          </div>
        </div>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Light / Dark Mode Switch */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-[#E4E9F1] dark:border-[#304058] bg-white dark:bg-[#19263A] text-slate-600 dark:text-slate-300 hover:text-[#3985FF] transition-all shadow-sm hover:shadow cursor-pointer"
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Dashboard ({userName?.split(' ')[0] || 'Scholar'})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-4 py-2 text-sm font-semibold text-[#172033] dark:text-[#F4F7FC] hover:text-[#3985FF] transition-colors cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="px-5 py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Sign Up Free
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

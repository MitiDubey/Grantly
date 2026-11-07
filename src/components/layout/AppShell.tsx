import React, { useState } from 'react';
import grantlyLogo from '../../assets/grantly-logo.png';
import { 
  LayoutDashboard, 
  Search, 
  Sparkles, 
  Bookmark, 
  ClipboardList, 
  UserRound, 
  Sun, 
  Moon, 
  LogOut, 
  Menu, 
  X,
  Home
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AppShellProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onGoHome: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onSelectTab,
  onGoHome,
  children,
}) => {
  const { isDark, toggleTheme, user, logout, savedScholarshipIds, applications } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const appliedCount = applications.filter(a => a.status === 'Applied' || a.status === 'Under Review').length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explorer', label: 'Scholarships', icon: Search },
    { id: 'recommendations', label: 'Smart Matches', icon: Sparkles, badge: 'AI' },
    { id: 'saved', label: 'Saved Grants', icon: Bookmark, count: savedScholarshipIds.length },
    { id: 'applications', label: 'Tracker', icon: ClipboardList, count: appliedCount },
    { id: 'profile', label: 'Student Profile', icon: UserRound },
  ];

  return (
    <div className="min-h-screen flex bg-[#F5F7FB] dark:bg-[#0B1423] text-[#172033] dark:text-[#F4F7FC] transition-colors duration-200">
      
      {/* DESKTOP SIDEBAR - Width: 250px as per Brand Guide */}
      <aside className="hidden lg:flex flex-col w-[250px] bg-white dark:bg-[#19263A] border-r border-slate-200 dark:border-[#304058] flex-shrink-0 select-none z-20">
        
        {/* Brand Header */}
        <div 
          onClick={onGoHome}
          className="p-5 flex items-center gap-3 cursor-pointer border-b border-slate-100 dark:border-[#223149] hover:bg-slate-50 dark:hover:bg-[#223149]/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-white p-1 border-2 border-[#3985FF]/40 shadow-sm flex items-center justify-center overflow-hidden">
            <img src={grantlyLogo} alt="GRANTLY Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight text-[#101B2D] dark:text-white font-display">
              GRANTLY
            </span>
            <span className="block text-[10px] uppercase font-bold tracking-widest text-[#3985FF]">
              Your Future, Funded.
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 py-5 px-3 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Menu
          </div>
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  active
                    ? 'bg-[#EAF2FF] dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF] shadow-sm'
                    : 'text-[#667085] dark:text-[#A8B4C7] hover:bg-slate-100 dark:hover:bg-[#223149]/60 hover:text-[#172033] dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${active ? 'text-[#3985FF]' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-[#304058] text-slate-700 dark:text-slate-200 font-bold">
                    {item.count}
                  </span>
                )}
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3985FF] text-white font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Card & Controls at Bottom */}
        <div className="p-3 border-t border-slate-100 dark:border-[#223149] bg-slate-50/50 dark:bg-[#101B2D]/40">
          <div 
            onClick={() => onSelectTab('profile')}
            className="flex items-center gap-3 p-2 rounded-xl hover:bg-white dark:hover:bg-[#223149] transition-colors cursor-pointer"
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-[#3985FF]" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#3985FF] text-white flex items-center justify-center font-bold text-sm">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#101B2D] dark:text-white truncate">
                {user?.name || 'Student Scholar'}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {user?.course || 'Undergraduate'}
              </p>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-[#304058] flex items-center justify-between">
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-[#3985FF] hover:bg-slate-200 dark:hover:bg-[#223149] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#101B2D]" />}
              <span className="text-[11px]">{isDark ? 'Light' : 'Dark'}</span>
            </button>
            
            <button
              onClick={onGoHome}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#223149] transition-colors cursor-pointer"
              title="Landing Portal"
            >
              <Home className="w-4 h-4" />
            </button>

            <button
              onClick={logout}
              className="p-2 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header Bar with Prominent Theme Toggle */}
        <header className="h-16 px-6 bg-white dark:bg-[#19263A] border-b border-slate-200 dark:border-[#304058] flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-[#304058] text-slate-700 dark:text-slate-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold font-display text-[#101B2D] dark:text-white capitalize">
                {currentTab.replace('-', ' ')}
              </h1>
              <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                Active Cycle 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* PROMINENT TOP THEME TOGGLE BUTTON ON DASHBOARD */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#223149] hover:bg-slate-100 dark:hover:bg-[#2c3d5a] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer select-none"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#101B2D]" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>

            <button
              onClick={onGoHome}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#304058] text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-[#3985FF] hover:text-[#3985FF] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Landing</span>
            </button>

            <button 
              onClick={() => onSelectTab('explorer')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Find Scholarships</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-[#19263A] border-b border-slate-200 dark:border-[#304058] p-4 space-y-2 z-20 shadow-xl">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold cursor-pointer ${
                    active
                      ? 'bg-[#EAF2FF] dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF]'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Main Routed Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

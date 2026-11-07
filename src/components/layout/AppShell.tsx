import React, { useState, useEffect } from 'react';
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
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnimatedBackground } from '../landing/AnimatedBackground';

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
  
  // Sidebar collapsed state with localStorage persistence
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('grantly_sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('grantly_sidebar_collapsed', String(next));
      return next;
    });
  };

  // Close mobile drawer on route change or resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="relative min-h-screen flex bg-[#F5F7FB] dark:bg-[#0B1423] text-[#172033] dark:text-[#F4F7FC] transition-colors duration-200 overflow-x-hidden">
      
      {/* BACKGROUND WAVE EFFECT + AMBIENT GLOW (Matching Landing Page for both light & dark themes) */}
      <AnimatedBackground isDark={isDark} />

      {/* DESKTOP SIDEBAR WITH SMOOTH COLLAPSE / EXPAND TOGGLE */}
      <aside 
        className={`hidden lg:flex flex-col relative z-20 select-none bg-white/90 dark:bg-[#19263A]/90 backdrop-blur-md border-r border-slate-200/80 dark:border-[#304058]/80 transition-all duration-300 ease-in-out flex-shrink-0 ${
          isSidebarCollapsed ? 'w-[72px]' : 'w-[250px]'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-[#223149] min-h-[68px]">
          <div 
            onClick={onGoHome}
            className={`flex items-center gap-3 cursor-pointer group transition-all duration-200 ${
              isSidebarCollapsed ? 'justify-center w-full' : ''
            }`}
            title="Go to Landing Page"
          >
            <div className="w-10 h-10 rounded-full bg-white p-1 border-2 border-[#3985FF]/40 shadow-sm flex items-center justify-center overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
              <img src={grantlyLogo} alt="GRANTLY Logo" className="w-full h-full object-contain" />
            </div>
            {!isSidebarCollapsed && (
              <div className="overflow-hidden transition-opacity duration-200">
                <span className="font-extrabold text-lg tracking-tight text-[#101B2D] dark:text-white font-display block leading-tight">
                  GRANTLY
                </span>
                <span className="block text-[10px] uppercase font-bold tracking-widest text-[#3985FF] leading-tight">
                  Your Future, Funded.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto custom-scrollbar">
          {!isSidebarCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Platform Menu
            </div>
          )}
          {navItems.map(item => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                title={isSidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center rounded-xl text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  isSidebarCollapsed 
                    ? 'justify-center px-2 py-3' 
                    : 'justify-between px-3.5 py-2.5'
                } ${
                  active
                    ? 'bg-[#EAF2FF] dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF] shadow-sm font-bold'
                    : 'text-[#667085] dark:text-[#A8B4C7] hover:bg-slate-100/80 dark:hover:bg-[#223149]/60 hover:text-[#172033] dark:hover:text-white'
                }`}
              >
                <div className={`flex items-center gap-3 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                  <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-[#3985FF]' : 'text-slate-400'}`} />
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isSidebarCollapsed && (
                  <div className="flex items-center gap-1.5 flex-shrink-0">
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
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* User Card & Sidebar Controls at Bottom */}
        <div className="p-2 border-t border-slate-100 dark:border-[#223149] bg-slate-50/70 dark:bg-[#101B2D]/40">
          <div 
            onClick={() => onSelectTab('profile')}
            className={`flex items-center gap-2.5 p-2 rounded-xl hover:bg-white dark:hover:bg-[#223149] transition-colors cursor-pointer ${
              isSidebarCollapsed ? 'justify-center' : ''
            }`}
            title={user?.name || 'Student Profile'}
          >
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-[#3985FF] flex-shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#3985FF] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
            )}
            {!isSidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#101B2D] dark:text-white truncate">
                  {user?.name || 'Student Scholar'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {user?.course || 'Undergraduate'}
                </p>
              </div>
            )}
          </div>

          {/* Quick Action Strip (Theme, Home, Logout) */}
          <div className={`mt-2 pt-2 border-t border-slate-200/80 dark:border-[#304058]/80 flex items-center ${
            isSidebarCollapsed ? 'flex-col gap-1.5' : 'justify-between px-1'
          }`}>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-[#3985FF] hover:bg-slate-200 dark:hover:bg-[#223149] transition-colors cursor-pointer flex items-center gap-1.5"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#101B2D]" />}
              {!isSidebarCollapsed && <span className="text-[11px] font-semibold">{isDark ? 'Light' : 'Dark'}</span>}
            </button>
            
            <button
              onClick={onGoHome}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#223149] transition-colors cursor-pointer"
              title="Return to Landing Portal"
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
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        
        {/* Top Header Bar with Sidebar Collapse Toggle & Prominent Theme Toggle */}
        <header className="h-16 px-4 sm:px-6 bg-white/80 dark:bg-[#19263A]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-[#304058]/80 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-[#304058] bg-white/50 dark:bg-[#101B2D]/50 text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Sidebar Collapse Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="hidden lg:flex items-center justify-center p-2 rounded-xl border border-slate-200 dark:border-[#304058] bg-white/60 dark:bg-[#101B2D]/60 text-slate-600 dark:text-slate-300 hover:text-[#3985FF] hover:border-[#3985FF]/50 hover:bg-slate-100 dark:hover:bg-[#223149] transition-all cursor-pointer shadow-sm"
              title={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label={isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isSidebarCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-[#3985FF]" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold font-display text-[#101B2D] dark:text-white capitalize">
                {currentTab.replace('-', ' ')}
              </h1>
              <span className="hidden sm:inline text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                Active Cycle 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Top Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-white/80 dark:bg-[#223149] hover:bg-slate-100 dark:hover:bg-[#2c3d5a] text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm hover:shadow cursor-pointer select-none"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-[#101B2D]" />
                  <span className="hidden sm:inline">Dark Mode</span>
                </>
              )}
            </button>

            <button
              onClick={onGoHome}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-white/80 dark:bg-[#19263A] text-xs font-semibold text-slate-600 dark:text-slate-300 hover:border-[#3985FF] hover:text-[#3985FF] transition-colors cursor-pointer"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Back to Landing</span>
            </button>

            <button 
              onClick={() => onSelectTab('explorer')}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#3985FF] to-[#2575f0] hover:to-[#1e6ae4] text-white text-xs font-bold transition-all shadow-sm shadow-blue-500/20 active:scale-95 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Find Scholarships</span>
              <span className="sm:hidden">Explore</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer with Backdrop */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            />
            {/* Drawer */}
            <div className="relative w-72 max-w-[80vw] bg-white dark:bg-[#19263A] h-full shadow-2xl flex flex-col p-4 space-y-3 z-10 border-r border-slate-200 dark:border-[#304058]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#223149]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-white p-1 border border-[#3985FF]/40 shadow-sm flex items-center justify-center overflow-hidden">
                    <img src={grantlyLogo} alt="GRANTLY Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <span className="font-extrabold text-base tracking-tight text-[#101B2D] dark:text-white font-display block">
                      GRANTLY
                    </span>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#3985FF]">
                      Active 2026
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-[#223149]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 space-y-1.5 overflow-y-auto">
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
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                        active
                          ? 'bg-[#EAF2FF] dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF]'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#223149]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#223149] flex items-center justify-between">
                <button
                  onClick={() => {
                    onGoHome();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 py-2"
                >
                  <Home className="w-4 h-4" />
                  <span>Landing Portal</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs font-semibold text-rose-500 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Routed Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative z-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

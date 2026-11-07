import React from 'react';
import { Award, CheckCircle2, GitCommit, Zap } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  const stats = [
    {
      id: 'stat-1',
      icon: Award,
      value: '₹15.8L+',
      label: 'SCHOLARSHIP POOL LISTED',
      accentColor: '#3985FF',
      iconBg: 'bg-[#EAF2FF] dark:bg-[#223149] text-[#3985FF]',
      borderHover: 'hover:border-[#3985FF]',
      glowHover: 'group-hover:shadow-[0_12px_36px_rgba(57,133,255,0.22)]',
    },
    {
      id: 'stat-2',
      icon: CheckCircle2,
      value: '100%',
      label: 'VERIFIED DEMONSTRATION DATA',
      accentColor: '#168253',
      iconBg: 'bg-emerald-50 dark:bg-[#223149] text-[#168253]',
      borderHover: 'hover:border-[#168253]',
      glowHover: 'group-hover:shadow-[0_12px_36px_rgba(22,130,83,0.22)]',
    },
    {
      id: 'stat-3',
      icon: GitCommit,
      value: '4-Stage',
      label: 'APPLICATION LIFECYCLE',
      accentColor: '#F4B740',
      iconBg: 'bg-amber-50 dark:bg-[#223149] text-[#F4B740]',
      borderHover: 'hover:border-[#F4B740]',
      glowHover: 'group-hover:shadow-[0_12px_36px_rgba(244,183,64,0.25)]',
    },
    {
      id: 'stat-4',
      icon: Zap,
      value: 'Instant',
      label: 'RULE ENGINE MATCHING',
      accentColor: '#3985FF',
      iconBg: 'bg-blue-50 dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF]',
      borderHover: 'hover:border-[#3985FF]',
      glowHover: 'group-hover:shadow-[0_12px_36px_rgba(57,133,255,0.22)]',
    },
  ];

  return (
    <section className="stats-section relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* 4 Separate Individual Cards in one horizontal row on desktop, 2-col on tablet/phone with 3D Pop-Out Perspective */}
      <div 
        className="stats-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`stat-card stat-card-${idx} group relative p-5 sm:p-7 rounded-[22px] bg-white dark:bg-[#19263A] border border-[#E4E9F1] dark:border-[#304058] shadow-[0_8px_24px_rgba(16,27,45,0.06)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 flex flex-col justify-between cursor-default hover:-translate-y-1.5 ${item.borderHover} ${item.glowHover}`}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, box-shadow',
              }}
            >
              {/* Top Accent Icon & Category */}
              <div className="flex items-center justify-between mb-4 sm:mb-5">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${item.iconBg} flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div 
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.accentColor }}
                />
              </div>

              {/* Large Statistic Number */}
              <div>
                <p 
                  className="stat-value text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight mb-1.5 sm:mb-2 select-none"
                  style={{ color: item.accentColor }}
                >
                  {item.value}
                </p>
                <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#667085] dark:text-[#A8B4C7] leading-snug">
                  {item.label}
                </p>
              </div>

              {/* Subtle Bottom Accent Indicator */}
              <div className="mt-4 sm:mt-5 pt-3 border-t border-slate-100 dark:border-[#223149] flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span>Verified Metric</span>
                <span className="font-semibold" style={{ color: item.accentColor }}>Cycle 2026</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

import React from 'react';
import { Compass, CheckCircle2, FileCheck } from 'lucide-react';

export const FeatureCards: React.FC = () => {
  const primaryCards = [
    {
      id: 'card-1',
      icon: Compass,
      iconBg: 'bg-[#EAF2FF] dark:bg-[#223149] text-[#3985FF]',
      badge: 'DISCOVERY',
      title: 'Smart Explorer',
      description: 'Instantly filter regional and national scholarship opportunities by course, income criteria, deadlines, and degree levels.',
      features: ['Real-time criteria search', 'Degree & domain matching', 'Regional state filters'],
    },
    {
      id: 'card-2',
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 dark:bg-[#223149] text-[#168253]',
      badge: 'TRANSPARENCY',
      title: 'Explainable Matching',
      description: 'Transparent 100-point eligibility scoring so you immediately know whether you qualify before spending hours preparing applications.',
      features: ['Transparent 4-tier weighting', 'Instant criteria evaluation', 'Disqualification alerts'],
    },
    {
      id: 'card-3',
      icon: FileCheck,
      iconBg: 'bg-blue-50 dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF]',
      badge: 'LIFECYCLE',
      title: 'Unified Tracker',
      description: 'Keep bookmarks, deadlines, under-review updates, and document checklists organized in one student dashboard.',
      features: ['4-stage pipeline status', 'Document checklists', 'Approaching deadline alerts'],
    },
  ];

  return (
    <section className="features-section relative z-20 max-w-6xl mx-auto px-6 py-20">
      
      {/* Section Sub-heading with Requirement #2:
          - "Designed for Clarity and" in Midnight Navy (#101B2D / white in dark mode)
          - "Success" in Logo Golden Yellow (#F4B740) with subtle glow
      */}
      <div className="features-header-block text-center mb-16">
        <span className="features-badge text-xs uppercase font-bold tracking-widest text-[#3985FF] bg-blue-50 dark:bg-[#19263A] px-3.5 py-1.5 rounded-full border border-blue-200 dark:border-blue-900/60 inline-block mb-4 shadow-sm">
          INTELLIGENT STUDENT ECOSYSTEM
        </span>
        
        <h2 className="features-main-heading text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight leading-[1.15]">
          <span className="text-[#101B2D] dark:text-white">Designed for Clarity and </span>
          <span 
            className="text-[#F4B740] drop-shadow-[0_2px_12px_rgba(244,183,64,0.35)] relative inline-block"
            style={{ color: '#F4B740' }}
          >
            Success
          </span>
        </h2>

        <p className="features-description text-sm sm:text-base text-[#667085] dark:text-[#A8B4C7] max-w-2xl mx-auto mt-4 font-normal leading-relaxed">
          Everything a student needs to explore verified grants, assess eligibility, and track awards in one unified workspace.
        </p>
      </div>

      {/* 3D Pop-Out Perspective Container */}
      <div 
        className="features-cards-grid grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {primaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`feature-card feature-card-${idx} group relative p-7 sm:p-8 rounded-[22px] bg-white dark:bg-[#19263A] border-2 border-[#E4E9F1] dark:border-[#304058] shadow-[0_10px_32px_rgba(16,27,45,0.07)] hover:shadow-[0_20px_45px_rgba(57,133,255,0.16)] dark:hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)] transition-all duration-300 flex flex-col justify-between hover:-translate-y-2`}
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, box-shadow',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-[#223149] text-slate-600 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-display text-[#101B2D] dark:text-white mb-3">
                  {card.title}
                </h3>
                
                <p className="text-sm text-[#667085] dark:text-[#A8B4C7] leading-relaxed mb-6 font-normal">
                  {card.description}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100 dark:border-[#223149] space-y-2.5">
                {card.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3985FF] group-hover:bg-[#F4B740] transition-colors" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

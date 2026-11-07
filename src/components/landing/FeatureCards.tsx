import React from 'react';
import { Compass, CheckCircle2, FileCheck, Award, Zap, Bell } from 'lucide-react';

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
    <section className="features-section relative z-20 max-w-6xl mx-auto px-6 py-12">
      
      {/* Section Sub-heading */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase font-bold tracking-widest text-[#3985FF] bg-blue-50 dark:bg-[#19263A] px-3.5 py-1 rounded-full border border-blue-200 dark:border-blue-900/60 inline-block mb-3">
          INTELLIGENT STUDENT ECOSYSTEM
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-[#101B2D] dark:text-white tracking-tight">
          Designed for Clarity and Success
        </h2>
        <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A8B4C7] max-w-xl mx-auto mt-2">
          Everything a student needs to explore verified grants, assess eligibility, and track awards in one unified workspace.
        </p>
      </div>

      {/* The 3 Core Feature Cards (Always Visible with Crisp Shadows & Contrast) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {primaryCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`feature-card feature-card-${idx} p-7 rounded-[22px] bg-white dark:bg-[#19263A] border-2 border-[#E4E9F1] dark:border-[#304058] shadow-[0_8px_30px_rgba(16,27,45,0.08)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-sm`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-[#223149] text-slate-600 dark:text-slate-300">
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#101B2D] dark:text-white mb-2.5">
                  {card.title}
                </h3>
                
                <p className="text-sm text-[#667085] dark:text-[#A8B4C7] leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-[#223149] space-y-2">
                {card.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3985FF]" />
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

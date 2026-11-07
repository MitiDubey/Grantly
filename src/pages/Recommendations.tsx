import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateEligibility } from '../context/eligibility';
import { ScholarshipDetailsModal } from '../components/scholarships/ScholarshipDetailsModal';
import { Scholarship } from '../types';

export const Recommendations: React.FC = () => {
  const { 
    user, 
    scholarships, 
    savedScholarshipIds, 
    toggleSaveScholarship, 
    updateApplicationStatus, 
    getApplication 
  } = useApp();

  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Compute detailed matches for all scholarships
  const analyzedScholarships = scholarships.map(sch => {
    const elig = user ? calculateEligibility(user, sch) : {
      score: 70,
      isEligible: true,
      breakdown: {
        academic: { satisfied: true, text: '' },
        income: { satisfied: true, text: '' },
        course: { satisfied: true, text: '' },
        categoryOrLocation: { satisfied: true, text: '' },
      },
      disqualifications: [],
    };
    return {
      scholarship: sch,
      eligibility: elig,
    };
  }).sort((a, b) => b.eligibility.score - a.eligibility.score);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-[#223149] text-[#3985FF] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Rule-Based Intelligence</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#101B2D] dark:text-white">
          Smart Eligibility Matches
        </h2>
        <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A8B4C7] mt-1 max-w-2xl">
          Based on the 4 weighted criteria in Section 5.2 of the Implementation Plan: Academic Score (30%), Family Income (30%), Course Compatibility (20%), and Category/Location (20%).
        </p>
      </div>

      {/* Match Cards List with Breakdown */}
      <div className="space-y-4">
        {analyzedScholarships.map(({ scholarship, eligibility }) => {
          const app = getApplication(scholarship.id);

          return (
            <div
              key={scholarship.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-[0_2px_12px_rgba(16,27,45,0.04)] hover:shadow-md transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* Left Information */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF]">
                      {scholarship.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      Deadline: {scholarship.deadline}
                    </span>
                    {app && (
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                        Status: {app.status}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold font-display text-[#101B2D] dark:text-white">
                    {scholarship.name}
                  </h3>
                  <p className="text-xs text-[#667085] dark:text-[#A8B4C7]">
                    {scholarship.provider} • Award: <strong className="text-slate-900 dark:text-white">₹{scholarship.amount.toLocaleString('en-IN')}</strong>
                  </p>

                  {/* 4 Criteria Chips */}
                  <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      {eligibility.breakdown.academic.satisfied ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>Academic (30%)</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      {eligibility.breakdown.income.satisfied ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>Income (30%)</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      {eligibility.breakdown.course.satisfied ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>Course (20%)</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      {eligibility.breakdown.categoryOrLocation.satisfied ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                      <span>Category (20%)</span>
                    </div>
                  </div>
                </div>

                {/* Right: Score Gauge & Action */}
                <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-[#223149]">
                  <div className="text-center">
                    <span className="text-3xl font-extrabold font-display text-[#3985FF]">
                      {eligibility.score}%
                    </span>
                    <p className={`text-[11px] font-bold ${
                      eligibility.isEligible ? 'text-emerald-500' : 'text-amber-500'
                    }`}>
                      {eligibility.isEligible ? 'High Match' : 'Disqualified'}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedScholarship(scholarship)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>View Evaluation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {selectedScholarship && (
        <ScholarshipDetailsModal
          scholarship={selectedScholarship}
          eligibility={user ? calculateEligibility(user, selectedScholarship) : undefined}
          isSaved={savedScholarshipIds.includes(selectedScholarship.id)}
          currentStatus={getApplication(selectedScholarship.id)?.status}
          onClose={() => setSelectedScholarship(null)}
          onToggleSave={toggleSaveScholarship}
          onUpdateStatus={updateApplicationStatus}
        />
      )}

    </div>
  );
};


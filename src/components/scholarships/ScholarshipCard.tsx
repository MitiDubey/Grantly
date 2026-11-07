import React from 'react';
import { 
  Calendar, 
  Bookmark, 
  AlertCircle, 
  HelpCircle 
} from 'lucide-react';
import { Scholarship, EligibilityResult, ApplicationStatus } from '../../types';

interface ScholarshipCardProps {
  scholarship: Scholarship;
  eligibility?: EligibilityResult;
  isSaved?: boolean;
  applicationStatus?: ApplicationStatus;
  onToggleSave: (id: string) => void;
  onViewDetails: (scholarship: Scholarship) => void;
  onApplyOrUpdateStatus?: (id: string, status: ApplicationStatus) => void;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({
  scholarship,
  eligibility,
  isSaved = false,
  applicationStatus,
  onToggleSave,
  onViewDetails,
}) => {
  // Deadline calculation
  const deadlineDate = new Date(scholarship.deadline);
  const now = new Date('2026-11-07'); // Reference hackathon date
  const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isUrgent = diffDays >= 0 && diffDays <= 14;
  const isExpired = diffDays < 0;

  const score = eligibility?.score ?? 85;

  return (
    <div className="relative group bg-white dark:bg-[#19263A] rounded-[20px] border border-[#E4E9F1] dark:border-[#304058] p-5 sm:p-6 shadow-[0_4px_16px_rgba(16,27,45,0.04)] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
      
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#EAF2FF] dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF] border border-[#D5E5FF] dark:border-transparent">
              {scholarship.category}
            </span>
            {scholarship.featured && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#A76B13] dark:text-[#F4B740] border border-amber-200/80 dark:border-amber-800">
                ★ Featured
              </span>
            )}
            {applicationStatus && (
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                applicationStatus === 'Approved' ? 'bg-emerald-50 text-[#168253] border border-emerald-200' :
                applicationStatus === 'Under Review' ? 'bg-amber-50 text-[#A76B13] border border-amber-200' :
                applicationStatus === 'Applied' ? 'bg-blue-50 text-[#246BDB] border border-blue-200' :
                'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {applicationStatus}
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleSave(scholarship.id)}
            className={`p-2 rounded-xl transition-all active:scale-90 cursor-pointer ${
              isSaved
                ? 'bg-[#EAF2FF] dark:bg-[#223149] text-[#3985FF]'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#223149]'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Scholarship'}
            aria-label="Save scholarship"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Provider */}
        <h3 
          onClick={() => onViewDetails(scholarship)}
          className="text-base sm:text-lg font-bold font-display text-[#101B2D] dark:text-white group-hover:text-[#3985FF] transition-colors cursor-pointer line-clamp-1"
          title={scholarship.name}
        >
          {scholarship.name}
        </h3>
        <p className="text-xs text-[#667085] dark:text-[#A8B4C7] mt-1 line-clamp-1 font-medium">
          {scholarship.provider}
        </p>

        {/* Award Amount with Strong Visual Hierarchy */}
        <div className="mt-4 flex items-baseline gap-1.5">
          <span className="text-2xl sm:text-3xl font-black font-display text-[#101B2D] dark:text-white tracking-tight">
            {scholarship.currency}{scholarship.amount.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-[#98A2B3] dark:text-slate-400 font-semibold">/ academic year</span>
        </div>

        {/* Match Score with Transparent Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#223149]">
          <div 
            onClick={() => onViewDetails(scholarship)}
            className="flex items-center justify-between text-xs mb-1.5 cursor-pointer group/score"
            title="Click to view match criteria explanation"
          >
            <span className="text-[#667085] dark:text-[#A8B4C7] font-semibold flex items-center gap-1">
              <span>Match Score</span>
              <HelpCircle className="w-3 h-3 text-slate-400 group-hover/score:text-[#3985FF]" />
            </span>
            <span className={`font-bold ${
              score >= 85 ? 'text-[#168253] dark:text-emerald-400' : 
              score >= 70 ? 'text-[#246BDB] dark:text-[#3985FF]' : 
              'text-[#A76B13] dark:text-amber-400'
            }`}>
              {score}% Match
            </span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 dark:bg-[#101B2D] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                score >= 85 ? 'bg-[#168253] dark:bg-emerald-400' : 
                score >= 70 ? 'bg-[#3985FF]' : 
                'bg-[#F4B740]'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Deadline Information */}
        <div className="mt-3.5 flex items-center justify-between text-xs text-[#667085] dark:text-slate-400">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>Deadline: {scholarship.deadline}</span>
          </div>
          {isExpired ? (
            <span className="text-slate-400 font-semibold text-[11px]">Expired</span>
          ) : isUrgent ? (
            <span className="text-rose-500 font-bold flex items-center gap-1 text-[11px] bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
              <AlertCircle className="w-3 h-3" />
              {diffDays} days left
            </span>
          ) : (
            <span className="text-slate-400 text-[11px]">{diffDays} days</span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-[#223149] flex items-center gap-2">
        <button
          onClick={() => onViewDetails(scholarship)}
          className="w-full py-2.5 px-3.5 rounded-xl border border-[#E4E9F1] dark:border-[#304058] bg-[#F5F7FB] dark:bg-[#223149] hover:bg-[#EAF2FF] dark:hover:bg-[#2b3c58] hover:text-[#3985FF] hover:border-[#3985FF]/40 text-xs font-bold text-[#172033] dark:text-[#F4F7FC] transition-all text-center cursor-pointer shadow-2xs"
        >
          View Details & Criteria
        </button>
      </div>

    </div>
  );
};


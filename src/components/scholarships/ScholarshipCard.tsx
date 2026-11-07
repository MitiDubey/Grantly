import React from 'react';
import { 
  Award, 
  Calendar, 
  TrendingUp, 
  CheckCircle2, 
  Bookmark, 
  ExternalLink, 
  AlertCircle 
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

  const score = eligibility?.score ?? 85;
  const isEligible = eligibility ? eligibility.isEligible : true;

  return (
    <div className="relative group bg-white dark:bg-[#19263A] rounded-2xl border border-slate-200 dark:border-[#304058] p-5 sm:p-6 shadow-[0_2px_12px_rgba(16,27,45,0.04)] hover:-translate-y-1 hover:shadow-xl transition-all duration-200 flex flex-col justify-between">
      
      <div>
        {/* Top Badges & Actions */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF]">
              {scholarship.category}
            </span>
            {scholarship.featured && (
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                ★ Featured
              </span>
            )}
            {applicationStatus && (
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                applicationStatus === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                applicationStatus === 'Under Review' ? 'bg-amber-100 text-amber-700' :
                applicationStatus === 'Applied' ? 'bg-blue-100 text-blue-700' :
                'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {applicationStatus}
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleSave(scholarship.id)}
            className={`p-2 rounded-xl transition-colors ${
              isSaved
                ? 'bg-[#EAF2FF] dark:bg-[#223149] text-[#3985FF]'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#223149]'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save Scholarship'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Provider */}
        <h3 
          onClick={() => onViewDetails(scholarship)}
          className="text-base sm:text-lg font-bold font-display text-[#101B2D] dark:text-white group-hover:text-[#3985FF] transition-colors cursor-pointer line-clamp-1"
        >
          {scholarship.name}
        </h3>
        <p className="text-xs text-[#667085] dark:text-[#A8B4C7] mt-1 line-clamp-1">
          {scholarship.provider}
        </p>

        {/* Award Amount */}
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-2xl font-black font-display text-[#101B2D] dark:text-white">
            {scholarship.currency}{scholarship.amount.toLocaleString('en-IN')}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ funding cycle</span>
        </div>

        {/* Eligibility Indicator & Score Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#223149]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Indicative Match:</span>
            <span className={`font-bold ${isEligible ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
              {score}% {isEligible ? 'Eligible' : 'Needs Review'}
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-[#101B2D] rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                score >= 80 ? 'bg-[#3985FF]' : score >= 50 ? 'bg-amber-400' : 'bg-rose-400'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {/* Deadline Information */}
        <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Deadline: {scholarship.deadline}</span>
          </div>
          {isUrgent && (
            <span className="text-rose-500 font-bold flex items-center gap-1 text-[11px]">
              <AlertCircle className="w-3 h-3" />
              {diffDays} days left
            </span>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-[#223149] flex items-center gap-2">
        <button
          onClick={() => onViewDetails(scholarship)}
          className="flex-1 py-2 px-3 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#223149] hover:bg-slate-100 dark:hover:bg-[#2b3c58] text-xs font-semibold text-[#172033] dark:text-[#F4F7FC] transition-colors text-center"
        >
          View Details & Criteria
        </button>
      </div>

    </div>
  );
};


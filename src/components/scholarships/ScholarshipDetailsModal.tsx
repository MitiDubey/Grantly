import React, { useState } from 'react';
import { 
  X, 
  Award, 
  Calendar, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Bookmark, 
  ExternalLink,
  ShieldCheck,
  Send
} from 'lucide-react';
import { Scholarship, EligibilityResult, ApplicationStatus } from '../../types';

interface ScholarshipDetailsModalProps {
  scholarship: Scholarship | null;
  eligibility?: EligibilityResult;
  isSaved?: boolean;
  currentStatus?: ApplicationStatus;
  onClose: () => void;
  onToggleSave: (id: string) => void;
  onUpdateStatus: (id: string, status: ApplicationStatus, notes?: string) => void;
}

export const ScholarshipDetailsModal: React.FC<ScholarshipDetailsModalProps> = ({
  scholarship,
  eligibility,
  isSaved = false,
  currentStatus,
  onClose,
  onToggleSave,
  onUpdateStatus,
}) => {
  if (!scholarship) return null;

  const [notes, setNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(currentStatus || 'Applied');
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  const handleApplyNow = () => {
    onUpdateStatus(scholarship.id, selectedStatus, notes);
    setAppliedFeedback(true);
    setTimeout(() => {
      setAppliedFeedback(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0B1423]/80 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#19263A] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#304058] max-h-[90vh] overflow-y-auto z-10">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-[#19263A]/95 backdrop-blur-md p-6 border-b border-slate-200 dark:border-[#304058] flex items-start justify-between gap-4 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-[#223149] text-[#3985FF]">
                {scholarship.category}
              </span>
              <span className="text-xs text-slate-400">
                Deadline: {scholarship.deadline}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-[#101B2D] dark:text-white">
              {scholarship.name}
            </h2>
            <p className="text-xs text-[#667085] dark:text-[#A8B4C7] mt-1 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>{scholarship.provider}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#223149] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          
          {/* Grant Value Banner */}
          <div className="p-5 rounded-2xl bg-[#EAF2FF] dark:bg-[#223149] border border-blue-200 dark:border-[#304058] flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-[#246BDB] dark:text-[#3985FF]">
                Total Award Value
              </p>
              <p className="text-3xl font-extrabold font-display text-[#101B2D] dark:text-white mt-0.5">
                {scholarship.currency}{scholarship.amount.toLocaleString('en-IN')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-300">Grant Type</p>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-100">Direct Student Aid</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2 font-display">
              Program Overview
            </h4>
            <p className="text-sm text-[#172033] dark:text-[#F4F7FC] leading-relaxed">
              {scholarship.description}
            </p>
          </div>

          {/* Rule-Based Eligibility Assessment */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#101B2D] border border-slate-200 dark:border-[#304058]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#3985FF]" />
                <h4 className="text-sm font-bold text-[#101B2D] dark:text-white font-display">
                  Profile Compatibility Score
                </h4>
              </div>
              <span className="text-sm font-extrabold text-[#3985FF]">
                {eligibility?.score ?? 85}% Match
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] flex items-center gap-2.5">
                {eligibility?.breakdown.academic.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">Academic Score</p>
                  <p className="text-slate-400">{eligibility?.breakdown.academic.text}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] flex items-center gap-2.5">
                {eligibility?.breakdown.income.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">Family Income</p>
                  <p className="text-slate-400">{eligibility?.breakdown.income.text}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] flex items-center gap-2.5">
                {eligibility?.breakdown.course.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">Field of Study</p>
                  <p className="text-slate-400">{eligibility?.breakdown.course.text}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] flex items-center gap-2.5">
                {eligibility?.breakdown.categoryOrLocation.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                )}
                <div>
                  <p className="font-semibold text-slate-700 dark:text-slate-200">Category & Region</p>
                  <p className="text-slate-400">{eligibility?.breakdown.categoryOrLocation.text}</p>
                </div>
              </div>
            </div>

            {eligibility && eligibility.disqualifications.length > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 text-xs">
                <p className="font-bold mb-1">Attention Required:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  {eligibility.disqualifications.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Required Documents */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3 font-display">
              Required Documentation Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scholarship.requiredDocuments.map((doc, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#223149] border border-slate-200 dark:border-[#304058] text-xs font-medium text-slate-700 dark:text-slate-200"
                >
                  <FileText className="w-4 h-4 text-[#3985FF]" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Tracker Control */}
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-[#304058] bg-slate-50/50 dark:bg-[#101B2D]/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Update Application Status
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {(['Saved', 'Applied', 'Under Review', 'Approved'] as ApplicationStatus[]).map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    selectedStatus === status
                      ? 'bg-[#3985FF] border-[#3985FF] text-white shadow-sm'
                      : 'border-slate-200 dark:border-[#304058] bg-white dark:bg-[#19263A] text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Application reference number or notes..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-white dark:bg-[#19263A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-200 dark:border-[#304058] flex items-center justify-between gap-3 bg-slate-50 dark:bg-[#19263A]">
          <button
            onClick={() => onToggleSave(scholarship.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors ${
              isSaved
                ? 'bg-blue-50 dark:bg-[#223149] border-blue-200 dark:border-[#304058] text-[#3985FF]'
                : 'border-slate-300 dark:border-[#304058] text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Bookmarked' : 'Save for Later'}</span>
          </button>

          <button
            onClick={handleApplyNow}
            disabled={appliedFeedback}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all"
          >
            {appliedFeedback ? (
              <span>✓ Status Recorded!</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Save & Mark as {selectedStatus}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Bookmark, 
  ShieldCheck, 
  Send, 
  Clock 
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
  const [notes, setNotes] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(currentStatus || 'Applied');
  const [appliedFeedback, setAppliedFeedback] = useState(false);

  // Lock background body scroll & support Escape key
  useEffect(() => {
    if (!scholarship) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scholarship, onClose]);

  if (!scholarship) return null;

  // Deadline calculation
  const deadlineDate = new Date(scholarship.deadline);
  const now = new Date('2026-11-07');
  const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isUrgent = diffDays >= 0 && diffDays <= 14;

  const handleApplyNow = () => {
    onUpdateStatus(scholarship.id, selectedStatus, notes);
    setAppliedFeedback(true);
    setTimeout(() => {
      setAppliedFeedback(false);
      onClose();
    }, 1200);
  };

  const drawerContent = (
    <div className="fixed inset-0" style={{ zIndex: 1000 }}>
      {/* 1. Backdrop (z-index: 1000) */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-[#0B1423]/70 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        aria-hidden="true"
      />

      {/* 2. Right-side Drawer (z-index: 1001) */}
      <aside 
        className="fixed top-0 right-0 h-screen w-full sm:w-[680px] max-w-full bg-white dark:bg-[#19263A] shadow-2xl border-l border-[#E4E9F1] dark:border-[#304058] flex flex-col z-[1001] transition-transform duration-300 ease-out animate-in slide-in-from-right sm:rounded-l-[24px] overflow-hidden"
        style={{
          height: '100dvh',
          maxHeight: '100dvh',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-scholarship-title"
      >
        
        {/* A. FIXED HEADER */}
        <div className="flex-shrink-0 p-5 sm:p-6 bg-white dark:bg-[#19263A] border-b border-[#E4E9F1] dark:border-[#304058] flex items-start justify-between gap-4 z-20">
          <div className="min-w-0 pr-2">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#EAF2FF] dark:bg-[#223149] text-[#246BDB] dark:text-[#3985FF] border border-[#D5E5FF] dark:border-transparent">
                {scholarship.category}
              </span>
              {scholarship.featured && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#A76B13] dark:text-[#F4B740] border border-amber-200">
                  ★ Featured Program
                </span>
              )}
              <span className="text-xs text-[#667085] dark:text-[#A8B4C7] flex items-center gap-1 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Deadline: {scholarship.deadline}</span>
              </span>
            </div>
            
            <h2 
              id="drawer-scholarship-title"
              className="text-lg sm:text-2xl font-bold font-display text-[#101B2D] dark:text-white leading-snug break-words"
            >
              {scholarship.name}
            </h2>
            <p className="text-xs text-[#667085] dark:text-[#A8B4C7] mt-1 flex items-center gap-1.5 font-medium truncate">
              <Building2 className="w-3.5 h-3.5 text-[#3985FF] shrink-0" />
              <span>{scholarship.provider}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex-shrink-0 p-2 rounded-xl text-slate-400 hover:text-[#172033] dark:hover:text-white hover:bg-[#F5F7FB] dark:hover:bg-[#223149] transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-[#304058]"
            aria-label="Close details drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* B. INDEPENDENTLY SCROLLABLE CONTENT BODY */}
        <div 
          className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar"
          style={{ overscrollBehavior: 'contain' }}
        >
          
          {/* Grant Value Banner */}
          <div className="p-5 sm:p-6 rounded-[20px] bg-gradient-to-r from-[#EAF2FF] via-blue-50/70 to-white dark:from-[#223149] dark:to-[#19263A] border border-[#D5E5FF] dark:border-[#304058] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-[#246BDB] dark:text-[#3985FF]">
                Total Grant Value
              </p>
              <p className="text-2xl sm:text-4xl font-extrabold font-display text-[#101B2D] dark:text-white mt-0.5 tracking-tight">
                {scholarship.currency}{scholarship.amount.toLocaleString('en-IN')}
              </p>
              <p className="text-xs text-[#667085] dark:text-[#A8B4C7] font-medium mt-0.5">
                Disbursed per academic cycle via direct student transfer
              </p>
            </div>
            {isUrgent && (
              <div className="px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 dark:text-rose-400 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5 shrink-0">
                <Clock className="w-4 h-4" />
                <span>{diffDays} days left to apply</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#98A2B3] dark:text-slate-400 mb-2 font-display">
              Grant Overview & Purpose
            </h4>
            <p className="text-sm text-[#172033] dark:text-[#F4F7FC] leading-relaxed font-normal">
              {scholarship.description}
            </p>
          </div>

          {/* Transparent Match Score & Rule Breakdown */}
          <div className="p-5 rounded-[20px] bg-[#F5F7FB] dark:bg-[#101B2D] border border-[#E4E9F1] dark:border-[#304058]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#3985FF] shrink-0" />
                <h4 className="text-sm font-bold text-[#101B2D] dark:text-white font-display">
                  Profile Compatibility Score
                </h4>
              </div>
              <span className={`text-xs font-extrabold px-3 py-1 rounded-full self-start sm:self-auto ${
                (eligibility?.score ?? 85) >= 85 ? 'bg-emerald-50 text-[#168253] border border-emerald-200' :
                'bg-blue-50 text-[#246BDB] border border-blue-200'
              }`}>
                {eligibility?.score ?? 85}% Profile Match
              </span>
            </div>

            <p className="text-xs text-[#667085] dark:text-[#A8B4C7] mb-4 leading-relaxed">
              Calculated dynamically against your verified student profile parameters. Match scores reflect criteria alignment and do not guarantee an award.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#19263A] border border-[#E4E9F1] dark:border-[#304058] flex items-start gap-2.5">
                {eligibility?.breakdown.academic.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 text-[#168253] shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="font-bold text-[#172033] dark:text-white">Academic Criteria</p>
                  <p className="text-[#667085] dark:text-[#A8B4C7] mt-0.5 break-words">{eligibility?.breakdown.academic.text}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#19263A] border border-[#E4E9F1] dark:border-[#304058] flex items-start gap-2.5">
                {eligibility?.breakdown.income.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 text-[#168253] shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="font-bold text-[#172033] dark:text-white">Family Income Limit</p>
                  <p className="text-[#667085] dark:text-[#A8B4C7] mt-0.5 break-words">{eligibility?.breakdown.income.text}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#19263A] border border-[#E4E9F1] dark:border-[#304058] flex items-start gap-2.5">
                {eligibility?.breakdown.course.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 text-[#168253] shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="font-bold text-[#172033] dark:text-white">Prioritized Programs</p>
                  <p className="text-[#667085] dark:text-[#A8B4C7] mt-0.5 break-words">{eligibility?.breakdown.course.text}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#19263A] border border-[#E4E9F1] dark:border-[#304058] flex items-start gap-2.5">
                {eligibility?.breakdown.categoryOrLocation.satisfied ? (
                  <CheckCircle2 className="w-4 h-4 text-[#168253] shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div className="min-w-0">
                  <p className="font-bold text-[#172033] dark:text-white">Category & Domicile</p>
                  <p className="text-[#667085] dark:text-[#A8B4C7] mt-0.5 break-words">{eligibility?.breakdown.categoryOrLocation.text}</p>
                </div>
              </div>
            </div>

            {eligibility && eligibility.disqualifications.length > 0 && (
              <div className="mt-3.5 p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[#A76B13] dark:text-amber-400 text-xs">
                <p className="font-bold mb-1">Eligibility Notes:</p>
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#98A2B3] dark:text-slate-400 mb-2.5 font-display">
              Required Documentation Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scholarship.requiredDocuments.map((doc, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#F5F7FB] dark:bg-[#223149] border border-[#E4E9F1] dark:border-[#304058] text-xs font-semibold text-[#172033] dark:text-slate-200"
                >
                  <FileText className="w-4 h-4 text-[#3985FF] flex-shrink-0" />
                  <span className="truncate">{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Tracker Control */}
          <div className="p-5 rounded-[20px] border border-[#E4E9F1] dark:border-[#304058] bg-[#F5F7FB]/70 dark:bg-[#101B2D]/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#667085] dark:text-slate-400 mb-2">
              Sync with Student Application Tracker
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {(['Saved', 'Applied', 'Under Review', 'Approved'] as ApplicationStatus[]).map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    selectedStatus === status
                      ? 'bg-[#3985FF] border-[#3985FF] text-white shadow-xs'
                      : 'border-[#E4E9F1] dark:border-[#304058] bg-white dark:bg-[#19263A] text-[#667085] dark:text-slate-300 hover:border-[#3985FF]/40'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Application reference number or student notes (e.g. Transcript uploaded)..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#E4E9F1] dark:border-[#304058] bg-white dark:bg-[#19263A] text-xs text-[#172033] dark:text-white placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />
          </div>

        </div>

        {/* C. FIXED BOTTOM ACTION BAR */}
        <div className="flex-shrink-0 p-4 sm:p-5 border-t border-[#E4E9F1] dark:border-[#304058] flex items-center justify-between gap-3 bg-white dark:bg-[#19263A] shadow-md z-20">
          <button
            type="button"
            onClick={() => onToggleSave(scholarship.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isSaved
                ? 'bg-[#EAF2FF] dark:bg-[#223149] border-[#D5E5FF] dark:border-[#304058] text-[#3985FF]'
                : 'border-[#E4E9F1] dark:border-[#304058] bg-white dark:bg-[#101B2D] text-[#172033] dark:text-slate-300 hover:bg-[#F5F7FB]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-[#3985FF]' : ''}`} />
            <span>{isSaved ? 'Bookmarked' : 'Save for Later'}</span>
          </button>

          <button
            type="button"
            onClick={handleApplyNow}
            disabled={appliedFeedback}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2575f0] active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-500/25 transition-all cursor-pointer"
          >
            {appliedFeedback ? (
              <span>✓ Status Synced to Tracker!</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Mark as {selectedStatus}</span>
              </>
            )}
          </button>
        </div>

      </aside>
    </div>
  );

  // Render through a React Portal to root document body to escape any parent overflow / stacking context
  if (typeof document !== 'undefined') {
    return createPortal(drawerContent, document.body);
  }

  return drawerContent;
};


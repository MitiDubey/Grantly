import React, { useState } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Sparkles, 
  Bookmark, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Search,
  AlertTriangle,
  Award,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateEligibility } from '../context/eligibility';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { ScholarshipDetailsModal } from '../components/scholarships/ScholarshipDetailsModal';
import { Scholarship } from '../types';

interface DashboardProps {
  onNavigateTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigateTab }) => {
  const { 
    user, 
    scholarships, 
    applications, 
    savedScholarshipIds, 
    toggleSaveScholarship, 
    updateApplicationStatus,
    getApplication
  } = useApp();

  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Compute metrics as per Implementation Plan (Section 3.1 & 10.2)
  const appliedList = applications.filter(a => a.status === 'Applied' || a.status === 'Under Review');
  const approvedList = applications.filter(a => a.status === 'Approved');

  // Match and eligible scholarships
  const eligibleScholarships = user ? scholarships.filter(s => {
    const res = calculateEligibility(user, s);
    return res.isEligible;
  }) : scholarships;

  const totalPotentialFunding = eligibleScholarships.reduce((acc, curr) => acc + curr.amount, 0);

  // Upcoming deadlines sorted
  const sortedByDeadline = [...scholarships].sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  );

  return (
    <div className="space-y-8">
      
      {/* 1. Welcome Panel adhering to Brand Style Guide - Adaptive for Light and Dark themes */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#172b4d] via-[#101B2D] to-[#1e3a63] dark:from-[#101B2D] dark:via-[#19263A] dark:to-[#101B2D] light:bg-gradient-to-r light:from-[#1a365d] p-6 sm:p-8 text-white border border-blue-900/30 dark:border-[#304058] shadow-xl shadow-blue-950/10">
        
        {/* Subtle decorative mesh gradient accents */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[#3985FF]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-64 h-64 rounded-full bg-[#F6A81C]/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#60a5fa] border border-blue-400/30 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#F6A81C]" />
              <span>Fall 2026 Academic Grant Cycle</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white drop-shadow-sm">
              Welcome back, {user?.name.split(' ')[0] || 'Scholar'}! 👋
            </h2>
            <p className="text-sm text-blue-100/90 dark:text-slate-300 font-normal leading-relaxed">
              You are matched with <span className="text-[#60a5fa] dark:text-[#3985FF] font-bold">{eligibleScholarships.length} high-value opportunities</span> based on your {user?.course} profile. Keep track of approaching deadlines.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigateTab('recommendations')}
              className="px-5 py-3 rounded-xl bg-[#3985FF] hover:bg-[#2575f0] active:scale-95 text-white font-bold text-xs shadow-lg shadow-blue-500/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#F6A81C]" />
              <span>View Match Scores</span>
            </button>
            <button
              onClick={() => onNavigateTab('profile')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer backdrop-blur-sm"
            >
              Update Criteria
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-[0_2px_12px_rgba(16,27,45,0.04)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] dark:text-[#A8B4C7] uppercase tracking-wider">
              Eligible Grants
            </span>
            <div className="p-2 rounded-xl bg-blue-50 dark:bg-[#223149] text-[#3985FF]">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-display text-[#101B2D] dark:text-white mt-3">
            {eligibleScholarships.length}
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            100% profile criteria satisfied
          </p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-[0_2px_12px_rgba(16,27,45,0.04)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] dark:text-[#A8B4C7] uppercase tracking-wider">
              Potential Aid Pool
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-[#223149] text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-display text-[#101B2D] dark:text-white mt-3">
            ₹{(totalPotentialFunding / 100000).toFixed(1)}L
          </p>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Across open cycles
          </p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-[0_2px_12px_rgba(16,27,45,0.04)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] dark:text-[#A8B4C7] uppercase tracking-wider">
              In-Progress
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-[#223149] text-amber-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-display text-[#101B2D] dark:text-white mt-3">
            {appliedList.length}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1">
            Submitted / Reviewing
          </p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-[0_2px_12px_rgba(16,27,45,0.04)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#667085] dark:text-[#A8B4C7] uppercase tracking-wider">
              Saved Grants
            </span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-[#223149] text-purple-500">
              <Bookmark className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-extrabold font-display text-[#101B2D] dark:text-white mt-3">
            {savedScholarshipIds.length}
          </p>
          <p className="text-xs text-slate-400 font-medium mt-1">
            In student bookmarks
          </p>
        </div>

      </div>

      {/* 3. Main Dashboard Grid: Top Recommendations & Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (2 Cols): Recommended Opportunities */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-[#101B2D] dark:text-white">
                Top Recommended for You
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Sorted by indicative criteria match with your profile
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('explorer')}
              className="text-xs font-bold text-[#3985FF] hover:underline flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scholarships.slice(0, 4).map(sch => {
              const elig = user ? calculateEligibility(user, sch) : undefined;
              const app = getApplication(sch.id);
              return (
                <ScholarshipCard
                  key={sch.id}
                  scholarship={sch}
                  eligibility={elig}
                  isSaved={savedScholarshipIds.includes(sch.id)}
                  applicationStatus={app?.status}
                  onToggleSave={toggleSaveScholarship}
                  onViewDetails={s => setSelectedScholarship(s)}
                />
              );
            })}
          </div>
        </div>

        {/* Right Column (1 Col): Approaching Deadlines & Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-display text-[#101B2D] dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#3985FF]" />
              <span>Upcoming Deadlines</span>
            </h3>
            <span className="text-xs text-slate-400">Nov - Dec 2026</span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-sm space-y-4">
            {sortedByDeadline.slice(0, 5).map((sch, i) => {
              const deadlineDate = new Date(sch.deadline);
              const now = new Date('2026-11-07');
              const diffDays = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              const isUrgent = diffDays <= 14;

              return (
                <div 
                  key={sch.id}
                  onClick={() => setSelectedScholarship(sch)}
                  className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#223149] last:border-0 last:pb-0 cursor-pointer group"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-[#101B2D] dark:text-white group-hover:text-[#3985FF] transition-colors truncate">
                      {sch.name}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      ₹{sch.amount.toLocaleString('en-IN')} • {sch.provider}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isUrgent 
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                        : 'bg-slate-100 dark:bg-[#223149] text-slate-600 dark:text-slate-300'
                    }`}>
                      {diffDays} days
                    </span>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sch.deadline}</p>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => onNavigateTab('explorer')}
              className="w-full mt-2 py-2 rounded-xl bg-slate-50 dark:bg-[#223149] hover:bg-slate-100 dark:hover:bg-[#2b3c58] text-xs font-bold text-[#3985FF] transition-colors text-center"
            >
              Browse Full Catalog
            </button>
          </div>

          {/* Quick Profile Snapshot Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EAF2FF] to-blue-50 dark:from-[#19263A] dark:to-[#223149] border border-blue-200 dark:border-[#304058]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#246BDB] dark:text-[#3985FF] mb-2">
              Current Matching Profile
            </h4>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
              <p><span className="text-slate-400">Course:</span> <strong>{user?.course}</strong></p>
              <p><span className="text-slate-400">Academic Score:</span> <strong>{user?.academicScore}%</strong></p>
              <p><span className="text-slate-400">Family Income:</span> <strong>₹{user?.familyIncome.toLocaleString('en-IN')} / yr</strong></p>
              <p><span className="text-slate-400">Category:</span> <strong>{user?.category} ({user?.state})</strong></p>
            </div>
            <button
              onClick={() => onNavigateTab('profile')}
              className="mt-3 text-xs font-bold text-[#3985FF] hover:underline"
            >
              Edit parameters in profile →
            </button>
          </div>

        </div>

      </div>

      {/* Scholarship Details Modal */}
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


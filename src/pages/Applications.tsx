import React, { useState } from 'react';
import { 
  ClipboardList, 
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus, Scholarship } from '../types';
import { ScholarshipDetailsModal } from '../components/scholarships/ScholarshipDetailsModal';
import { calculateEligibility } from '../context/eligibility';

export const Applications: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const { 
    applications, 
    scholarships, 
    user, 
    updateApplicationStatus, 
    toggleSaveScholarship, 
    savedScholarshipIds 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Group applications by status
  const statuses: ApplicationStatus[] = ['Saved', 'Applied', 'Under Review', 'Approved', 'Rejected'];

  const filteredApps = applications.filter(app => {
    if (filterStatus === 'All') return true;
    return app.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#101B2D] dark:text-white flex items-center gap-2">
          <ClipboardList className="w-6 h-6 text-[#3985FF]" />
          <span>Application Tracker</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A8B4C7] mt-1">
          Monitor your scholarship submission pipeline from draft bookmarks to final grant approvals.
        </p>
      </div>

      {/* Status Pipeline Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-[#304058] pb-4">
        <button
          onClick={() => setFilterStatus('All')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterStatus === 'All'
              ? 'bg-[#3985FF] text-white shadow-sm'
              : 'bg-white dark:bg-[#19263A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#304058]'
          }`}
        >
          All Applications ({applications.length})
        </button>

        {statuses.map(st => {
          const count = applications.filter(a => a.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-[#3985FF] text-white shadow-sm'
                  : 'bg-white dark:bg-[#19263A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#304058]'
              }`}
            >
              {st} ({count})
            </button>
          );
        })}
      </div>

      {/* Applications Table / List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-3">
          {filteredApps.map(app => {
            const sch = scholarships.find(s => s.id === app.scholarshipId);
            if (!sch) return null;

            return (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-[0_2px_12px_rgba(16,27,45,0.04)] hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-[#223149] text-[#3985FF]">
                      {sch.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      Deadline: {sch.deadline}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setSelectedScholarship(sch)}
                    className="text-base font-bold font-display text-[#101B2D] dark:text-white hover:text-[#3985FF] cursor-pointer transition-colors"
                  >
                    {sch.name}
                  </h3>
                  
                  <p className="text-xs text-[#667085] dark:text-[#A8B4C7]">
                    {sch.provider} • Value: <strong className="text-slate-900 dark:text-white">₹{sch.amount.toLocaleString('en-IN')}</strong>
                  </p>

                  {app.notes && (
                    <p className="text-xs text-slate-500 italic mt-1 bg-slate-50 dark:bg-[#101B2D] p-2 rounded-lg inline-block border border-slate-200 dark:border-[#304058]">
                      Note: "{app.notes}"
                    </p>
                  )}
                </div>

                {/* Status Changer & Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <select
                    value={app.status}
                    onChange={e => updateApplicationStatus(sch.id, e.target.value as ApplicationStatus)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none focus:ring-2 focus:ring-[#3985FF] ${
                      app.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800' :
                      app.status === 'Under Review' ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800' :
                      app.status === 'Applied' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800' :
                      app.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800' :
                      'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                    }`}
                  >
                    {statuses.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => setSelectedScholarship(sch)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#223149] text-xs font-semibold hover:bg-slate-100"
                    title="View details"
                  >
                    <ArrowRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058]">
          <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-slate-700 dark:text-slate-200">
            No applications in "{filterStatus}"
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Mark any scholarship as "Applied" or "Saved" to track its progress here.
          </p>
          <button
            onClick={onExplore}
            className="mt-4 px-5 py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] text-white text-xs font-bold"
          >
            Find Grants to Apply
          </button>
        </div>
      )}

      {/* Modal Details */}
      {selectedScholarship && (
        <ScholarshipDetailsModal
          scholarship={selectedScholarship}
          eligibility={user ? calculateEligibility(user, selectedScholarship) : undefined}
          isSaved={savedScholarshipIds.includes(selectedScholarship.id)}
          currentStatus={applications.find(a => a.scholarshipId === selectedScholarship.id)?.status}
          onClose={() => setSelectedScholarship(null)}
          onToggleSave={toggleSaveScholarship}
          onUpdateStatus={updateApplicationStatus}
        />
      )}

    </div>
  );
};


import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateEligibility } from '../context/eligibility';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { ScholarshipDetailsModal } from '../components/scholarships/ScholarshipDetailsModal';
import { Scholarship } from '../types';

export const Saved: React.FC<{ onExplore: () => void }> = ({ onExplore }) => {
  const { 
    user, 
    scholarships, 
    savedScholarshipIds, 
    toggleSaveScholarship, 
    updateApplicationStatus, 
    getApplication 
  } = useApp();

  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const savedList = scholarships.filter(s => savedScholarshipIds.includes(s.id));
  const totalSavedValue = savedList.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#101B2D] dark:text-white flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-[#3985FF]" />
            <span>Saved Scholarships</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A8B4C7] mt-1">
            Bookmarked opportunities saved for upcoming application cycles.
          </p>
        </div>

        {savedList.length > 0 && (
          <div className="p-3 px-4 rounded-xl bg-blue-50 dark:bg-[#19263A] border border-blue-200 dark:border-[#304058] text-right">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
              Total Saved Pool
            </span>
            <span className="text-xl font-black font-display text-[#101B2D] dark:text-white">
              ₹{totalSavedValue.toLocaleString('en-IN')}
            </span>
          </div>
        )}
      </div>

      {/* Cards List or Empty State */}
      {savedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map(sch => {
            const elig = user ? calculateEligibility(user, sch) : undefined;
            const app = getApplication(sch.id);
            return (
              <ScholarshipCard
                key={sch.id}
                scholarship={sch}
                eligibility={elig}
                isSaved={true}
                applicationStatus={app?.status}
                onToggleSave={toggleSaveScholarship}
                onViewDetails={s => setSelectedScholarship(s)}
              />
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058]">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-slate-700 dark:text-slate-200">
            No saved scholarships yet
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Browse the Scholarship Explorer to bookmark opportunities you plan to apply for.
          </p>
          <button
            onClick={onExplore}
            className="mt-4 px-5 py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] text-white text-xs font-bold transition-all"
          >
            Explore Scholarships Now
          </button>
        </div>
      )}

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


import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  X, 
  Sparkles, 
  Award,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateEligibility } from '../context/eligibility';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { ScholarshipDetailsModal } from '../components/scholarships/ScholarshipDetailsModal';
import { Scholarship } from '../types';

export const Explorer: React.FC = () => {
  const { 
    user, 
    scholarships, 
    savedScholarshipIds, 
    toggleSaveScholarship, 
    updateApplicationStatus, 
    getApplication 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [onlyEligible, setOnlyEligible] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'amount-desc' | 'amount-asc' | 'deadline' | 'match'>('match');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(scholarships.map(s => s.category));
    return ['All', ...Array.from(set)];
  }, [scholarships]);

  // Filtering and sorting logic
  const filteredScholarships = useMemo(() => {
    return scholarships
      .filter(sch => {
        // Search
        const matchesQuery = 
          sch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sch.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sch.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sch.eligibleCourses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category filter
        const matchesCat = selectedCategory === 'All' || sch.category === selectedCategory;

        // Eligibility filter
        if (onlyEligible && user) {
          const elig = calculateEligibility(user, sch);
          if (!elig.isEligible) return false;
        }

        return matchesQuery && matchesCat;
      })
      .sort((a, b) => {
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        if (sortBy === 'deadline') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        if (sortBy === 'match' && user) {
          const scoreA = calculateEligibility(user, a).score;
          const scoreB = calculateEligibility(user, b).score;
          return scoreB - scoreA;
        }
        return 0;
      });
  }, [scholarships, searchQuery, selectedCategory, onlyEligible, sortBy, user]);

  return (
    <div className="space-y-6">
      
      {/* Top Title & Filters Bar */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#101B2D] dark:text-white">
          Scholarship Explorer
        </h2>
        <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A8B4C7] mt-1">
          Search across verified higher education funds, merit programs, and affirmative grants.
        </p>
      </div>

      {/* Control Panel: Search & Controls */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by scholarship title, provider, or major..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            >
              <option value="match">Sort by: Best Match</option>
              <option value="amount-desc">Sort by: Highest Award</option>
              <option value="amount-asc">Sort by: Lowest Award</option>
              <option value="deadline">Sort by: Approaching Deadline</option>
            </select>
          </div>
        </div>

        {/* Category Pills & Only Eligible Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-[#223149]">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#3985FF] text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-[#223149] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2c3d5a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Toggle Eligible Only */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyEligible}
              onChange={e => setOnlyEligible(e.target.checked)}
              className="w-4 h-4 rounded text-[#3985FF] focus:ring-[#3985FF] border-slate-300"
            />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Show 100% Eligible Only</span>
            </span>
          </label>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
        <span>Showing <strong>{filteredScholarships.length}</strong> available listings</span>
        {(searchQuery || selectedCategory !== 'All' || onlyEligible) && (
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setOnlyEligible(false);
            }}
            className="text-[#3985FF] font-semibold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Scholarship Cards Grid */}
      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholarships.map(sch => {
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
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058]">
          <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-slate-700 dark:text-slate-200">
            No scholarships found
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria, clearing category filters, or unchecking "Show Eligible Only".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setOnlyEligible(false);
            }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#3985FF] text-white text-xs font-semibold"
          >
            Reset Filters
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


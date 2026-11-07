import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Sparkles, 
  Layers, 
  ArrowUpDown, 
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { calculateEligibility } from '../context/eligibility';
import { ScholarshipCard } from '../components/scholarships/ScholarshipCard';
import { ScholarshipDetailsModal } from '../components/scholarships/ScholarshipDetailsModal';
import { Scholarship } from '../types';

type SortOption = 'match' | 'amount-desc' | 'amount-asc' | 'deadline-soon' | 'deadline-latest' | 'recent';

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
  const [onlyHighMatch, setOnlyHighMatch] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('match');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set(scholarships.map(s => s.category));
    return ['All', ...Array.from(set)];
  }, [scholarships]);

  const hasActiveFilters = searchQuery.trim() !== '' || selectedCategory !== 'All' || onlyHighMatch || sortBy !== 'match';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setOnlyHighMatch(false);
    setSortBy('match');
  };

  // Comprehensive Filtering and sorting logic
  const filteredScholarships = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return scholarships
      .filter(sch => {
        // Multi-field search
        const matchesQuery = !q || (
          sch.name.toLowerCase().includes(q) ||
          sch.provider.toLowerCase().includes(q) ||
          sch.description.toLowerCase().includes(q) ||
          sch.category.toLowerCase().includes(q) ||
          sch.eligibleCourses.some(c => c.toLowerCase().includes(q)) ||
          sch.eligibleStates.some(s => s.toLowerCase().includes(q))
        );

        // Category filter
        const matchesCat = selectedCategory === 'All' || sch.category === selectedCategory;

        // High Match (90%+) Filter
        if (onlyHighMatch && user) {
          const elig = calculateEligibility(user, sch);
          if (elig.score < 88) return false;
        }

        return matchesQuery && matchesCat;
      })
      .sort((a, b) => {
        if (sortBy === 'amount-desc') return b.amount - a.amount;
        if (sortBy === 'amount-asc') return a.amount - b.amount;
        if (sortBy === 'deadline-soon') return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        if (sortBy === 'deadline-latest') return new Date(b.deadline).getTime() - new Date(a.deadline).getTime();
        if (sortBy === 'recent') return b.id.localeCompare(a.id);
        
        // Default: Sort by Best Match
        if (user) {
          const scoreA = calculateEligibility(user, a).score;
          const scoreB = calculateEligibility(user, b).score;
          return scoreB - scoreA;
        }
        return 0;
      });
  }, [scholarships, searchQuery, selectedCategory, onlyHighMatch, sortBy, user]);

  return (
    <div className="space-y-6">
      
      {/* Top Title & Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#101B2D] dark:text-white tracking-tight">
            Scholarship Explorer
          </h2>
          <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A8B4C7] mt-1 font-medium">
            Search across verified higher education funds, merit awards, and affirmative grant programs.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E4E9F1] dark:border-[#304058] bg-white dark:bg-[#19263A] hover:bg-slate-50 dark:hover:bg-[#223149] text-xs font-semibold text-[#667085] dark:text-slate-300 transition-colors shadow-2xs cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#3985FF]" />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>

      {/* Control Panel: Search & Controls */}
      <div className="p-4 sm:p-5 rounded-[22px] bg-white dark:bg-[#19263A] border border-[#E4E9F1] dark:border-[#304058] shadow-[0_4px_16px_rgba(16,27,45,0.03)] space-y-4">
        
        {/* Search Input & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#98A2B3]" />
            <input
              type="text"
              placeholder="Search by scholarship title, provider, field of study, or state..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search scholarships"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#E4E9F1] dark:border-[#304058] bg-[#F5F7FB] dark:bg-[#101B2D] text-sm text-[#172033] dark:text-white placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#3985FF] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
                title="Clear query"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-[#98A2B3] shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              aria-label="Sort scholarships by"
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-[#E4E9F1] dark:border-[#304058] bg-[#F5F7FB] dark:bg-[#101B2D] text-xs font-semibold text-[#172033] dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#3985FF] cursor-pointer"
            >
              <option value="match">Best Match</option>
              <option value="amount-desc">Highest Funding</option>
              <option value="amount-asc">Lowest Funding</option>
              <option value="deadline-soon">Deadline: Soonest First</option>
              <option value="deadline-latest">Deadline: Latest First</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips & High Match Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-3.5 border-t border-slate-100 dark:border-[#223149]">
          
          {/* Scrollable Category Chips on Mobile */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 custom-scrollbar no-scrollbar">
            {categories.map(cat => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#3985FF] text-white shadow-xs font-bold'
                      : 'bg-[#F5F7FB] dark:bg-[#223149] text-[#667085] dark:text-slate-300 hover:bg-[#EAF2FF] hover:text-[#3985FF] dark:hover:bg-[#2c3d5a]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Toggle High Matches (90%+) Only */}
          <label className="flex items-center gap-2 cursor-pointer select-none shrink-0 self-start lg:self-center">
            <input
              type="checkbox"
              checked={onlyHighMatch}
              onChange={e => setOnlyHighMatch(e.target.checked)}
              className="w-4 h-4 rounded text-[#3985FF] focus:ring-[#3985FF] border-[#E4E9F1] accent-[#3985FF] cursor-pointer"
            />
            <span className="text-xs font-bold text-[#172033] dark:text-slate-200 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#168253]" />
              <span>Show High Matches (90%+)</span>
            </span>
          </label>
        </div>

      </div>

      {/* Results Header Strip */}
      <div className="flex items-center justify-between text-xs text-[#667085] dark:text-[#A8B4C7] px-1 font-medium">
        <span>
          Showing <strong className="text-[#172033] dark:text-white font-bold">{filteredScholarships.length}</strong> verified opportunities
          {selectedCategory !== 'All' && <span> in <strong className="text-[#3985FF]">{selectedCategory}</strong></span>}
        </span>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="text-[#3985FF] font-semibold hover:underline cursor-pointer"
          >
            Reset all
          </button>
        )}
      </div>

      {/* Scholarship Cards Grid: 1-col on mobile, 2-col on tablet, 3-col on desktop */}
      {filteredScholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
        /* Empty Filtered State */
        <div className="p-10 sm:p-14 text-center rounded-[24px] bg-white dark:bg-[#19263A] border border-[#E4E9F1] dark:border-[#304058] shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-[#EAF2FF] dark:bg-[#223149] text-[#3985FF] flex items-center justify-center mx-auto mb-4">
            <Layers className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold font-display text-[#101B2D] dark:text-white">
            No scholarships found
          </h3>
          <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A8B4C7] mt-1.5 max-w-md mx-auto leading-relaxed">
            We couldn't find matches for "{searchQuery}". Try clearing search keywords, selecting "All" categories, or unchecking "Show High Matches (90%+)".
          </p>
          <button
            onClick={handleResetFilters}
            className="mt-5 px-5 py-2.5 rounded-xl bg-[#3985FF] hover:bg-[#2575f0] text-white text-xs font-bold shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Details Modal / Drawer */}
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


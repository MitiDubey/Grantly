import React, { useState, useMemo } from 'react';
import { 
  UserRound, 
  Save, 
  Check, 
  Calendar, 
  Building2, 
  MapPin 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudentProfile } from '../types';

// All 28 States and 8 Union Territories of India
const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi NCR',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

// Helper to calculate exact age from birthdate
function calculateAge(birthdateStr?: string): number | undefined {
  if (!birthdateStr) return undefined;
  const birth = new Date(birthdateStr);
  const today = new Date('2026-11-07'); // Current system date
  if (isNaN(birth.getTime())) return undefined;

  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age >= 0 ? age : undefined;
}

export const Profile: React.FC = () => {
  const { user, updateProfile } = useApp();

  const [formData, setFormData] = useState<StudentProfile>(() => {
    const defaultData: StudentProfile = {
      id: user?.id || 'usr_default',
      name: user?.name || 'Miti Dubey',
      email: user?.email || 'mitidubey163@gmail.com',
      avatar: user?.avatar,
      birthdate: user?.birthdate || '2004-05-18',
      university: user?.university || 'Indian Institute of Technology, Bombay',
      course: user?.course || 'Computer Science / IT',
      year: user?.year || 3,
      state: user?.state || 'Maharashtra',
      familyIncome: user?.familyIncome || 550000,
      category: user?.category || 'General',
      academicScore: user?.academicScore || 86,
    };
    defaultData.age = calculateAge(defaultData.birthdate);
    return defaultData;
  });

  const [stateInput, setStateInput] = useState(formData.state || '');
  const [showStateSuggestions, setShowStateSuggestions] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Requirement #3: Filter recommendations by user's typed spelling
  const recommendedStates = useMemo(() => {
    if (!stateInput.trim()) return INDIAN_STATES.slice(0, 6);
    return INDIAN_STATES.filter(s =>
      s.toLowerCase().includes(stateInput.toLowerCase())
    );
  }, [stateInput]);

  // Requirement #1: Automatically calculate age when birthdate changes
  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const computedAge = calculateAge(val);
    setFormData(prev => ({
      ...prev,
      birthdate: val,
      age: computedAge,
    }));
  };

  const handleSelectState = (st: string) => {
    setStateInput(st);
    setFormData(prev => ({ ...prev, state: st }));
    setShowStateSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...formData,
      state: stateInput || formData.state,
      age: calculateAge(formData.birthdate),
    };
    updateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#101B2D] dark:text-white flex items-center gap-2">
          <UserRound className="w-6 h-6 text-[#3985FF]" />
          <span>Student Academic Profile</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#667085] dark:text-[#A8B4C7] mt-1">
          These attributes drive the transparent 4-stage eligibility engine across all scholarship grants.
        </p>
      </div>

      {/* Main Profile Form Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#19263A] border border-[#E4E9F1] dark:border-[#304058] shadow-[0_2px_12px_rgba(16,27,45,0.04)] space-y-6">
        
        {/* User Card Top */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-[#223149]">
          {formData.avatar ? (
            <img src={formData.avatar} alt={formData.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#3985FF]" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#3985FF] to-blue-400 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
              {formData.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold font-display text-[#101B2D] dark:text-white">
              {formData.name}
            </h3>
            <p className="text-xs text-slate-400">{formData.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                ✓ Active Scholarship Profile
              </span>
              {formData.age !== undefined && (
                <span className="text-[11px] font-bold text-[#3985FF] bg-blue-50 dark:bg-[#223149] px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-[#304058]">
                  Age: {formData.age} years
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Full Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Full Legal Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Registered Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />
          </div>

          {/* REQUIREMENT #1: Birthdate & Automatically Calculated Age */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#3985FF]" />
                <span>Date of Birth</span>
              </span>
              {formData.age !== undefined && (
                <span className="text-[#3985FF] font-extrabold capitalize text-xs">
                  Age: {formData.age} yrs
                </span>
              )}
            </label>
            <input
              type="date"
              required
              value={formData.birthdate || ''}
              onChange={handleBirthdateChange}
              max="2015-12-31"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />
          </div>

          {/* REQUIREMENT #2: University or College Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#3985FF]" />
              <span>University / College Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. IIT Bombay, Delhi University, BITS Pilani"
              value={formData.university || ''}
              onChange={e => setFormData({ ...formData, university: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />
          </div>

          {/* Course / Program */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Course / Major
            </label>
            <select
              value={formData.course}
              onChange={e => setFormData({ ...formData, course: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            >
              <option value="Computer Science / IT">Computer Science / IT</option>
              <option value="Data Science & AI">Data Science & AI</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Biotechnology">Biotechnology</option>
              <option value="Commerce / Finance">Commerce / Finance</option>
              <option value="Humanities / Arts">Humanities / Arts</option>
              <option value="Medical / Healthcare">Medical / Healthcare</option>
            </select>
          </div>

          {/* Year of Study */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Year of Study
            </label>
            <select
              value={formData.year}
              onChange={e => setFormData({ ...formData, year: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            >
              <option value={1}>1st Year (Freshman)</option>
              <option value={2}>2nd Year (Sophomore)</option>
              <option value={3}>3rd Year (Junior)</option>
              <option value={4}>4th Year (Senior)</option>
              <option value={5}>Postgraduate / Master's</option>
            </select>
          </div>

          {/* Academic Score (Percentage) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex justify-between">
              <span>Academic Score (%)</span>
              <span className="text-[#3985FF] font-extrabold">{formData.academicScore}%</span>
            </label>
            <input
              type="range"
              min="50"
              max="100"
              value={formData.academicScore}
              onChange={e => setFormData({ ...formData, academicScore: Number(e.target.value) })}
              className="w-full accent-[#3985FF] cursor-pointer"
            />
          </div>

          {/* Family Annual Income */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Annual Family Income (₹)
            </label>
            <input
              type="number"
              step="50000"
              value={formData.familyIncome}
              onChange={e => setFormData({ ...formData, familyIncome: Number(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />
            <p className="text-[11px] text-slate-400 mt-1">₹{Number(formData.familyIncome).toLocaleString('en-IN')}</p>
          </div>

          {/* REQUIREMENT #3: State Search with Auto-Complete Spelling Recommendations (No Dropdown) */}
          <div className="relative">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#3985FF]" />
                <span>Domicile State</span>
              </span>
              <span className="text-[10px] text-slate-400 lowercase">type to search</span>
            </label>
            
            <input
              type="text"
              required
              placeholder="Type state (e.g. Maha..., Karna..., Del...)"
              value={stateInput}
              onFocus={() => setShowStateSuggestions(true)}
              onChange={e => {
                setStateInput(e.target.value);
                setShowStateSuggestions(true);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            />

            {/* Live Autocomplete Spelling Recommendations Overlay */}
            {showStateSuggestions && recommendedStates.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 z-30 max-h-52 overflow-y-auto rounded-2xl bg-white dark:bg-[#19263A] border border-slate-200 dark:border-[#304058] shadow-2xl p-2 space-y-1">
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-400">
                  Matching Indian States & UTs
                </div>
                {recommendedStates.map(st => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => handleSelectState(st)}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-[#EAF2FF] dark:hover:bg-[#223149] hover:text-[#3985FF] transition-colors flex items-center justify-between"
                  >
                    <span>{st}</span>
                    {st.toLowerCase() === stateInput.toLowerCase() && (
                      <Check className="w-3.5 h-3.5 text-[#3985FF]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Social Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Affirmative / Social Category
            </label>
            <select
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#304058] bg-slate-50 dark:bg-[#101B2D] text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3985FF]"
            >
              <option value="General">General / Open</option>
              <option value="OBC">OBC (Other Backward Class)</option>
              <option value="SC/ST">SC / ST</option>
              <option value="EWS">Economically Weaker Section (EWS)</option>
              <option value="Minority">Minority Community</option>
              <option value="Women in STEM">Women in STEM</option>
              <option value="First-Generation">First-Generation College Student</option>
            </select>
          </div>

        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-slate-100 dark:border-[#223149] flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Changes recalculate match scores across all active grants.
          </p>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3985FF] hover:bg-[#2b74ed] active:scale-95 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Profile Saved & Matches Updated!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, Scholarship, ApplicationRecord, ApplicationStatus } from '../types';
import { SAMPLE_SCHOLARSHIPS } from '../data/scholarships';
import { BackendAuthService } from './backendAuth';

interface AppContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Auth & Profile
  user: StudentProfile | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  registerUser: (email: string, name?: string, password?: string) => Promise<void>;
  loginWithGoogleSuccess: (googleProfile: { name: string; email: string; picture?: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updated: Partial<StudentProfile>) => void;

  // Scholarships
  scholarships: Scholarship[];
  
  // Applications & Bookmarks
  applications: ApplicationRecord[];
  savedScholarshipIds: string[];
  toggleSaveScholarship: (scholarshipId: string) => void;
  updateApplicationStatus: (scholarshipId: string, status: ApplicationStatus, notes?: string) => void;
  getApplication: (scholarshipId: string) => ApplicationRecord | undefined;
}

const DEFAULT_PROFILE: StudentProfile = {
  id: 'usr_default',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@campus.edu',
  course: 'Computer Science',
  year: 3,
  state: 'Maharashtra',
  familyIncome: 550000,
  category: 'General',
  academicScore: 84,
};

const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-1',
    scholarshipId: 'sch-1',
    studentId: 'usr_default',
    status: 'Applied',
    appliedDate: '2026-11-01',
    lastUpdated: '2026-11-02',
    notes: 'Submitted transcript and statement of research.',
  },
  {
    id: 'app-2',
    scholarshipId: 'sch-3',
    studentId: 'usr_default',
    status: 'Under Review',
    appliedDate: '2026-10-25',
    lastUpdated: '2026-11-04',
    notes: 'Verification stage at state scholarship office.',
  },
  {
    id: 'app-3',
    scholarshipId: 'sch-5',
    studentId: 'usr_default',
    status: 'Saved',
    lastUpdated: '2026-11-05',
    notes: 'Gathering LORs from professors.',
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('grantly_theme');
    if (saved) return saved === 'dark';
    return false;
  });

  useEffect(() => {
    localStorage.setItem('grantly_theme', isDark ? 'dark' : 'light');
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // User state
  const [user, setUser] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('grantly_user');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('grantly_auth') === 'true';
  });

  // Backend connected Login
  const login = async (email: string) => {
    const backendUser = await BackendAuthService.login(email);
    setUser(backendUser);
    setIsAuthenticated(true);
    localStorage.setItem('grantly_user', JSON.stringify(backendUser));
    localStorage.setItem('grantly_auth', 'true');
  };

  // Backend connected Registration
  const registerUser = async (email: string, name?: string, password?: string) => {
    const newUser = await BackendAuthService.register({ email, name, password });
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('grantly_user', JSON.stringify(newUser));
    localStorage.setItem('grantly_auth', 'true');
  };

  // Backend connected Google Login
  const loginWithGoogleSuccess = async (googleProfile: { name: string; email: string; picture?: string }) => {
    const googleUser = await BackendAuthService.googleAuth(googleProfile);
    setUser(googleUser);
    setIsAuthenticated(true);
    localStorage.setItem('grantly_user', JSON.stringify(googleUser));
    localStorage.setItem('grantly_auth', 'true');
  };

  // Logout Functionality: clears state & redirects to clean landing
  const logout = () => {
    BackendAuthService.logout();
    setIsAuthenticated(false);
    setUser(null);
    localStorage.setItem('grantly_auth', 'false');
    localStorage.setItem('grantly_in_app', 'false');
    localStorage.removeItem('grantly_user');
    window.location.reload();
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      const next = { ...prev, ...updated };
      localStorage.setItem('grantly_user', JSON.stringify(next));
      return next;
    });
  };

  // Scholarships
  const [scholarships] = useState<Scholarship[]>(SAMPLE_SCHOLARSHIPS);

  // Applications
  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    const saved = localStorage.getItem('grantly_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('grantly_applications', JSON.stringify(applications));
  }, [applications]);

  const savedScholarshipIds = applications
    .filter(a => a.status === 'Saved' || a.status === 'Applied' || a.status === 'Under Review')
    .map(a => a.scholarshipId);

  const toggleSaveScholarship = (scholarshipId: string) => {
    setApplications(prev => {
      const existing = prev.find(a => a.scholarshipId === scholarshipId);
      if (existing) {
        if (existing.status === 'Saved') {
          return prev.filter(a => a.scholarshipId !== scholarshipId);
        } else {
          return prev;
        }
      } else {
        const newRecord: ApplicationRecord = {
          id: 'app-' + Date.now(),
          scholarshipId,
          studentId: user?.id || 'guest',
          status: 'Saved',
          lastUpdated: new Date().toISOString().split('T')[0],
        };
        return [...prev, newRecord];
      }
    });
  };

  const updateApplicationStatus = (scholarshipId: string, status: ApplicationStatus, notes?: string) => {
    setApplications(prev => {
      const idx = prev.findIndex(a => a.scholarshipId === scholarshipId);
      const today = new Date().toISOString().split('T')[0];
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          status,
          appliedDate: status === 'Applied' && !updated[idx].appliedDate ? today : updated[idx].appliedDate,
          lastUpdated: today,
          notes: notes !== undefined ? notes : updated[idx].notes,
        };
        return updated;
      } else {
        const newRec: ApplicationRecord = {
          id: 'app-' + Date.now(),
          scholarshipId,
          studentId: user?.id || 'guest',
          status,
          appliedDate: status === 'Applied' ? today : undefined,
          lastUpdated: today,
          notes,
        };
        return [...prev, newRec];
      }
    });
  };

  const getApplication = (scholarshipId: string) => {
    return applications.find(a => a.scholarshipId === scholarshipId);
  };

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        user,
        isAuthenticated,
        login,
        registerUser,
        loginWithGoogleSuccess,
        logout,
        updateProfile,
        scholarships,
        applications,
        savedScholarshipIds,
        toggleSaveScholarship,
        updateApplicationStatus,
        getApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

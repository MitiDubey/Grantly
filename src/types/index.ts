export type StudentProfile = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  birthdate?: string; // YYYY-MM-DD
  age?: number;
  university?: string; // University or College name
  course: string;
  year: number;
  state: string;
  familyIncome: number; // annual in INR / USD
  category: 'General' | 'OBC' | 'SC/ST' | 'Minority' | 'EWS' | 'Women in STEM' | 'First-Generation';
  academicScore: number; // percentage or GPA scale (0-100)
};

export type Scholarship = {
  id: string;
  name: string;
  provider: string;
  amount: number;
  currency: string;
  category: string;
  deadline: string; // YYYY-MM-DD
  description: string;
  eligibleCourses: string[];
  minAcademicScore: number;
  maxFamilyIncome: number;
  eligibleCategories: string[];
  eligibleStates: string[]; // empty means all
  requiredDocuments: string[];
  applicationUrl?: string;
  featured?: boolean;
};

export type ApplicationStatus = 'Saved' | 'Applied' | 'Under Review' | 'Approved' | 'Rejected';

export type ApplicationRecord = {
  id: string;
  scholarshipId: string;
  studentId: string;
  status: ApplicationStatus;
  appliedDate?: string;
  lastUpdated: string;
  notes?: string;
};

export type EligibilityResult = {
  score: number; // 0 to 100
  isEligible: boolean;
  breakdown: {
    academic: { satisfied: boolean; text: string };
    income: { satisfied: boolean; text: string };
    course: { satisfied: boolean; text: string };
    categoryOrLocation: { satisfied: boolean; text: string };
  };
  disqualifications: string[];
};

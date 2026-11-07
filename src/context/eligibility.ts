import { StudentProfile, Scholarship, EligibilityResult } from '../types';

export function calculateEligibility(profile: StudentProfile, scholarship: Scholarship): EligibilityResult {
  const disqualifications: string[] = [];

  // 1. Academic Eligibility (30% weight)
  const academicSatisfied = profile.academicScore >= scholarship.minAcademicScore;
  if (!academicSatisfied) {
    disqualifications.push(`Academic score (${profile.academicScore}%) is below minimum required (${scholarship.minAcademicScore}%).`);
  }

  // 2. Family Income (30% weight)
  const incomeSatisfied = profile.familyIncome <= scholarship.maxFamilyIncome;
  if (!incomeSatisfied) {
    disqualifications.push(`Annual family income (₹${profile.familyIncome.toLocaleString('en-IN')}) exceeds maximum limit (₹${scholarship.maxFamilyIncome.toLocaleString('en-IN')}).`);
  }

  // 3. Course Compatibility (20% weight)
  const isAnyCourse = scholarship.eligibleCourses.includes('Any');
  const courseSatisfied = isAnyCourse || scholarship.eligibleCourses.some(c => 
    profile.course.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(profile.course.toLowerCase())
  );
  if (!courseSatisfied) {
    disqualifications.push(`Course '${profile.course}' is not in the list of eligible programs (${scholarship.eligibleCourses.join(', ')}).`);
  }

  // 4. Category & Domicile Compatibility (20% weight)
  const categorySatisfied = scholarship.eligibleCategories.length === 0 || 
    scholarship.eligibleCategories.includes(profile.category) ||
    scholarship.eligibleCategories.includes('General');
    
  const stateSatisfied = scholarship.eligibleStates.includes('All India') ||
    scholarship.eligibleStates.includes(profile.state);

  const categoryOrLocationSatisfied = categorySatisfied && stateSatisfied;
  if (!categorySatisfied) {
    disqualifications.push(`Targeted category requirement not met (Requires: ${scholarship.eligibleCategories.join(', ')}).`);
  }
  if (!stateSatisfied) {
    disqualifications.push(`State domicile restriction: ${scholarship.eligibleStates.join(', ')}.`);
  }

  // Calculate weighted score
  let score = 0;
  if (academicSatisfied) score += 30;
  if (incomeSatisfied) score += 30;
  if (courseSatisfied) score += 20;
  if (categoryOrLocationSatisfied) score += 20;

  // If hard disqualifiers exist, match fails or score is scaled
  const isEligible = disqualifications.length === 0;

  return {
    score: isEligible ? score : Math.min(score, 50),
    isEligible,
    breakdown: {
      academic: {
        satisfied: academicSatisfied,
        text: `Min ${scholarship.minAcademicScore}% (Your score: ${profile.academicScore}%)`,
      },
      income: {
        satisfied: incomeSatisfied,
        text: `Max ₹${scholarship.maxFamilyIncome.toLocaleString('en-IN')} (Your income: ₹${profile.familyIncome.toLocaleString('en-IN')})`,
      },
      course: {
        satisfied: courseSatisfied,
        text: isAnyCourse ? 'Open to all academic disciplines' : `Eligible: ${scholarship.eligibleCourses.join(', ')}`,
      },
      categoryOrLocation: {
        satisfied: categoryOrLocationSatisfied,
        text: `${scholarship.eligibleCategories.join(', ')} • ${scholarship.eligibleStates.join(', ')}`,
      },
    },
    disqualifications,
  };
}


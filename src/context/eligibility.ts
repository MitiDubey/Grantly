import { StudentProfile, Scholarship, EligibilityResult } from '../types';

export function calculateEligibility(profile: StudentProfile, scholarship: Scholarship): EligibilityResult {
  const disqualifications: string[] = [];

  // 1. Academic Performance (30% max weight)
  // Calculate relative margin rather than hard binary:
  // e.g. student score vs required score
  const diffAcademic = profile.academicScore - scholarship.minAcademicScore;
  let academicScorePoints = 0;
  const academicSatisfied = diffAcademic >= 0;

  if (academicSatisfied) {
    // If student surpasses threshold by 5%+, award full 30, otherwise proportional (24 - 30)
    academicScorePoints = Math.min(30, 24 + (diffAcademic / 5) * 6);
  } else {
    // Grace scoring: if within 5% deficit, give partial points (10-18) with a note
    const deficit = Math.abs(diffAcademic);
    if (deficit <= 5) {
      academicScorePoints = Math.max(8, 20 - deficit * 2.5);
      disqualifications.push(`Academic score (${profile.academicScore}%) is slightly below minimum required (${scholarship.minAcademicScore}%).`);
    } else {
      academicScorePoints = 5;
      disqualifications.push(`Academic score (${profile.academicScore}%) is below minimum required (${scholarship.minAcademicScore}%).`);
    }
  }

  // 2. Family Income Need (30% max weight)
  let incomeScorePoints = 0;
  const incomeSatisfied = profile.familyIncome <= scholarship.maxFamilyIncome;

  if (incomeSatisfied) {
    // If student is well below the upper limit, they qualify for highest need tiers
    const headroomRatio = (scholarship.maxFamilyIncome - profile.familyIncome) / scholarship.maxFamilyIncome;
    incomeScorePoints = Math.min(30, 22 + headroomRatio * 8);
  } else {
    const overageRatio = (profile.familyIncome - scholarship.maxFamilyIncome) / scholarship.maxFamilyIncome;
    if (overageRatio <= 0.15) {
      incomeScorePoints = 12;
      disqualifications.push(`Annual family income (₹${profile.familyIncome.toLocaleString('en-IN')}) slightly exceeds target limit (₹${scholarship.maxFamilyIncome.toLocaleString('en-IN')}).`);
    } else {
      incomeScorePoints = 4;
      disqualifications.push(`Annual family income (₹${profile.familyIncome.toLocaleString('en-IN')}) exceeds maximum limit (₹${scholarship.maxFamilyIncome.toLocaleString('en-IN')}).`);
    }
  }

  // 3. Course / Degree Program Compatibility (20% max weight)
  let courseScorePoints = 0;
  const isAnyCourse = scholarship.eligibleCourses.includes('Any');
  const courseExactMatch = scholarship.eligibleCourses.some(c => 
    c.toLowerCase() === profile.course.toLowerCase()
  );
  const coursePartialMatch = scholarship.eligibleCourses.some(c => 
    profile.course.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(profile.course.toLowerCase())
  );
  const courseSatisfied = isAnyCourse || courseExactMatch || coursePartialMatch;

  if (isAnyCourse) {
    courseScorePoints = 18; // Open programs receive strong general weight
  } else if (courseExactMatch) {
    courseScorePoints = 20; // Direct major match receives full points
  } else if (coursePartialMatch) {
    courseScorePoints = 16;
  } else {
    courseScorePoints = 4;
    disqualifications.push(`Course '${profile.course}' is not in the list of prioritized programs (${scholarship.eligibleCourses.join(', ')}).`);
  }

  // 4. Category & Domicile Compatibility (20% max weight)
  let categoryLocationPoints = 0;
  const categorySatisfied = scholarship.eligibleCategories.length === 0 || 
    scholarship.eligibleCategories.includes(profile.category) ||
    scholarship.eligibleCategories.includes('General');
    
  const stateSatisfied = scholarship.eligibleStates.includes('All India') ||
    scholarship.eligibleStates.includes(profile.state);

  if (categorySatisfied && stateSatisfied) {
    categoryLocationPoints = 20;
  } else if (categorySatisfied && !stateSatisfied) {
    categoryLocationPoints = 10;
    disqualifications.push(`State domicile restriction: ${scholarship.eligibleStates.join(', ')}.`);
  } else if (!categorySatisfied && stateSatisfied) {
    categoryLocationPoints = 8;
    disqualifications.push(`Targeted affirmative category requirement (Requires: ${scholarship.eligibleCategories.join(', ')}).`);
  } else {
    categoryLocationPoints = 3;
    disqualifications.push(`Both category and state criteria require specific eligibility.`);
  }

  // Calculate realistic weighted score (between 40% and 98%)
  const rawScore = Math.round(academicScorePoints + incomeScorePoints + courseScorePoints + categoryLocationPoints);
  const isEligible = disqualifications.length === 0;

  // Normalized score
  const finalScore = isEligible ? Math.min(98, Math.max(76, rawScore)) : Math.min(68, Math.max(42, rawScore));

  return {
    score: finalScore,
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
        text: isAnyCourse ? 'Open to all academic disciplines' : `Prioritized: ${scholarship.eligibleCourses.join(', ')}`,
      },
      categoryOrLocation: {
        satisfied: categorySatisfied && stateSatisfied,
        text: `${scholarship.eligibleCategories.join(', ')} • ${scholarship.eligibleStates.join(', ')}`,
      },
    },
    disqualifications,
  };
}


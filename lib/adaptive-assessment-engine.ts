/**
 * EVZAIN Adaptive Assessment Engine
 * 
 * This is the heart of the product - an intelligent system that:
 * 1. Adapts question flow based on previous answers
 * 2. Personalizes based on athlete segment (beginner → elite)
 * 3. Simplifies or deepens based on reading habits and confusion levels
 * 4. Uses sport-specific logic and research
 * 5. Learns patterns to improve recommendations
 * 
 * Philosophy: Every question matters. Every answer shapes the journey.
 */

import { AssessmentData } from './types';

// Sport-specific research and success metrics
export const SPORT_PROFILES = {
  tennis: {
    name: 'Tennis',
    rankingSystems: ['UTR', 'ATP/WTA', 'ITF', 'USTA'],
    keyMetrics: ['First serve %', 'Break point conversion', 'Unforced errors', 'Rally tolerance'],
    eliteMarkers: {
      beginner: 'UTR 1-4',
      intermediate: 'UTR 5-8',
      advanced: 'UTR 9-12',
      elite: 'UTR 13+ / Professional'
    },
    focusAreas: {
      technical: ['Serve mechanics', 'Groundstroke consistency', 'Net play', 'Movement patterns'],
      tactical: ['Point construction', 'Pattern recognition', 'Match strategy', 'Opponent analysis'],
      physical: ['Court speed', 'Lateral movement', 'Explosive power', 'Endurance'],
      mental: ['Between-point routine', 'Pressure management', 'Momentum shifts', 'Match temperament']
    },
    researchBasis: [
      'Kovacs - Tennis physiology and biomechanics',
      'Fernandez-Fernandez - Training periodization in tennis',
      'Reid - Skill acquisition in tennis'
    ]
  },
  
  basketball: {
    name: 'Basketball',
    rankingSystems: ['NBA/WNBA', 'NCAA D1/D2/D3', 'FIBA', 'AAU'],
    keyMetrics: ['FG%', 'TS%', 'Assist/TO ratio', 'Defensive rating', 'PER'],
    eliteMarkers: {
      beginner: 'Recreational leagues',
      intermediate: 'High school varsity',
      advanced: 'College D2/D3',
      elite: 'D1 / Professional'
    },
    focusAreas: {
      technical: ['Shooting mechanics', 'Ball handling', 'Footwork', 'Finishing'],
      tactical: ['Pick and roll', 'Spacing', 'Help defense', 'Transition offense'],
      physical: ['Vertical jump', 'Lateral quickness', 'Conditioning', 'Contact absorption'],
      mental: ['Court vision', 'Decision making', 'Clutch performance', 'Team chemistry']
    },
    researchBasis: [
      'Ziv - Physical attributes in basketball',
      'Sampaio - Game-related statistics',
      'Scanlan - Training load in basketball'
    ]
  },
  
  soccer: {
    name: 'Soccer',
    rankingSystems: ['MLS', 'USL', 'NCAA', 'ECNL', 'DA'],
    keyMetrics: ['Pass completion %', 'Expected goals (xG)', 'Distance covered', 'Sprint count', 'Duels won'],
    eliteMarkers: {
      beginner: 'Recreational/Club',
      intermediate: 'Competitive club/High school',
      advanced: 'College/Academy',
      elite: 'Professional/National team'
    },
    focusAreas: {
      technical: ['First touch', 'Passing accuracy', 'Dribbling', 'Shooting technique'],
      tactical: ['Positioning', 'Off-ball movement', 'Pressing triggers', 'Build-up play'],
      physical: ['Aerobic capacity', 'Repeated sprint ability', 'Agility', 'Power'],
      mental: ['Game intelligence', 'Anticipation', 'Composure', 'Leadership']
    },
    researchBasis: [
      'Bangsbo - Physical and metabolic demands',
      'Reilly - Training load and recovery',
      'Williams - Skill acquisition and expertise'
    ]
  },
  
  fitness: {
    name: 'Fitness',
    rankingSystems: ['CrossFit Open', 'Powerlifting totals', 'Running PRs'],
    keyMetrics: ['VO2 max', 'Body composition', 'Strength ratios', 'Movement quality'],
    eliteMarkers: {
      beginner: 'Building foundation',
      intermediate: 'Consistent training',
      advanced: 'Competition level',
      elite: 'Top percentile'
    },
    focusAreas: {
      technical: ['Movement patterns', 'Form', 'Breathing', 'Pacing'],
      tactical: ['Program design', 'Periodization', 'Exercise selection', 'Progression'],
      physical: ['Strength', 'Endurance', 'Mobility', 'Power'],
      mental: ['Consistency', 'Discipline', 'Goal setting', 'Self-efficacy']
    },
    researchBasis: [
      'ACSM - Exercise prescription guidelines',
      'Bompa - Periodization theory',
      'Cook - Movement screening'
    ]
  },
  
  waterpolo: {
    name: 'Water Polo',
    rankingSystems: ['NCAA D1/D2/D3', 'Olympic/National team', 'European leagues', 'FINA rankings'],
    keyMetrics: ['Goals per game', 'Assists', 'Steals', 'Exclusions drawn', 'Shot accuracy %', 'Sprint speed', 'Treading efficiency'],
    eliteMarkers: {
      beginner: 'Club/recreational',
      intermediate: 'Competitive club/High school varsity',
      advanced: 'College D1-D3',
      elite: 'National team / Professional (Greece, Hungary, Serbia leagues)'
    },
    focusAreas: {
      technical: ['Shooting mechanics', 'Passing accuracy', 'Ball handling in water', 'Eggbeater kick', 'Swimming technique', 'One-handed catches'],
      tactical: ['2-meter offense', 'Press defense', 'Counter-attack timing', 'Set plays', 'Man-up/man-down situations', 'Position-specific roles'],
      physical: ['Aerobic capacity (brutal - 4km+ per game)', 'Leg strength (eggbeater endurance)', 'Upper body power', 'Core stability', 'Sprint speed', 'Vertical jump in water'],
      mental: ['Physicality tolerance', 'Spatial awareness', 'Quick decision-making', 'Team communication', 'Resilience (contact sport)', 'Game intelligence']
    },
    researchBasis: [
      'Platanou - Physiological demands of water polo',
      'Smith - Energy systems in water polo',
      'Tan - Anthropometric and physiological characteristics of elite water polo players'
    ],
    eliteInsight: 'Greek dominance in water polo (Olympic silver 2004, 2020 bronze) shows emphasis on technical skill + physical conditioning. Champions like Nikos exemplify the blend of power, precision, and game intelligence required at the highest level.'
  },
  
  football: {
    name: 'Football',
    rankingSystems: ['NFL', 'NCAA D1/D2/D3', 'CFL', 'High school rankings', '247Sports/Rivals'],
    keyMetrics: ['Position-specific stats', 'Combine metrics (40-yard, vertical, bench)', '3-cone drill', 'Film grade', 'Snap count', 'PFF rating'],
    eliteMarkers: {
      beginner: 'Youth/rec leagues',
      intermediate: 'High school varsity',
      advanced: 'College D2/D3 or FCS',
      elite: 'D1 FBS / NFL'
    },
    focusAreas: {
      technical: ['Position-specific technique', 'Footwork', 'Hand placement', 'Route running', 'Tackling form', 'Blocking technique'],
      tactical: ['Play recognition', 'Coverage schemes', 'Route concepts', 'Blitz pickup', 'Film study', 'Situational awareness'],
      physical: ['Explosive power', 'Position-specific strength', 'Speed/agility', 'Contact tolerance', 'Recovery between plays', 'Flexibility'],
      mental: ['Play memorization', 'Pre-snap reads', 'Pressure management', 'Leadership', 'Coachability', 'Mental toughness']
    },
    researchBasis: [
      'Mann - Sprint mechanics in football',
      'Kraemer - Strength and conditioning for football',
      'DeMartini - Physical demands by position'
    ],
    eliteInsight: 'Position specificity is critical. A lineman trains completely differently than a wide receiver. Elite level requires mastery of both physical attributes AND mental processing speed (0.5-1 second decision windows).'
  },
  
  weightlifting: {
    name: 'Weight Training',
    rankingSystems: ['Powerlifting totals', 'Olympic lifting totals', 'Wilks score'],
    keyMetrics: ['1RM lifts', 'Strength-to-bodyweight ratio', 'Bar velocity', 'Volume load'],
    eliteMarkers: {
      beginner: 'Learning movements',
      intermediate: 'Intermediate standards (Squat 1.5x BW)',
      advanced: 'Advanced standards (Squat 2x BW)',
      elite: 'Elite standards / Competition'
    },
    focusAreas: {
      technical: ['Lift mechanics', 'Bar path', 'Bracing', 'Positioning'],
      tactical: ['Program selection', 'Periodization', 'Deload timing', 'Exercise variation'],
      physical: ['Maximal strength', 'Rate of force development', 'Work capacity', 'Mobility'],
      mental: ['Focus', 'Confidence under load', 'Patience', 'Process orientation']
    },
    researchBasis: [
      'Zatsiorsky - Science and practice of strength training',
      'Haff - Periodization for strength',
      'Schoenfeld - Hypertrophy mechanisms'
    ]
  }
};

/**
 * Determines athlete segment with nuance
 * Not just level + hours, but context-aware
 */
export function determineAthleteSegment(data: Partial<AssessmentData>): {
  segment: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  confidence: number;
  reasoning: string[];
} {
  const reasoning: string[] = [];
  let score = 0;
  
  // Level scoring
  const levelScores: Record<string, number> = {
    'Just starting out': 0,
    'Recreational': 1,
    'Serious hobbyist': 2,
    'High School': 3,
    'College': 4,
    'Semi-Pro': 5,
    'Professional': 6
  };
  
  const levelScore = levelScores[data.level || ''] || 0;
  score += levelScore * 10;
  reasoning.push(`Level: ${data.level} (${levelScore}/6)`);
  
  // Training hours scoring
  const hoursScores: Record<string, number> = {
    '0-3 hours': 0,
    '4-7 hours': 1,
    '8-12 hours': 2,
    '13-18 hours': 3,
    '19-25 hours': 4,
    '25+ hours': 5
  };
  
  const hoursScore = hoursScores[data.trainingHours || ''] || 0;
  score += hoursScore * 8;
  reasoning.push(`Training volume: ${data.trainingHours} (${hoursScore}/5)`);
  
  // Goals indicate ambition level
  if (data.goals?.includes('pro')) {
    score += 10;
    reasoning.push('Aspiring professional (+10)');
  }
  if (data.goals?.includes('compete')) {
    score += 5;
    reasoning.push('Competition focused (+5)');
  }
  
  // Competition frequency
  if (data.compete === 'regularly') {
    score += 8;
    reasoning.push('Competes regularly (+8)');
  } else if (data.compete === 'occasionally') {
    score += 4;
    reasoning.push('Competes occasionally (+4)');
  }
  
  // Progress tracking sophistication
  if (data.progressTracking === 'clear') {
    score += 5;
    reasoning.push('Advanced tracking (+5)');
  }
  
  // Determine segment
  let segment: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  let confidence: number;
  
  if (score >= 70) {
    segment = 'elite';
    confidence = Math.min(100, score);
  } else if (score >= 45) {
    segment = 'advanced';
    confidence = Math.min(95, score);
  } else if (score >= 20) {
    segment = 'intermediate';
    confidence = Math.min(90, score);
  } else {
    segment = 'beginner';
    confidence = Math.min(85, 100 - score);
  }
  
  return { segment, confidence, reasoning };
}

/**
 * Adaptive question flow - determines which questions to ask next
 * based on previous answers
 */
export function getAdaptiveQuestionFlow(data: Partial<AssessmentData>): {
  skipQuestions: number[];
  emphasizeQuestions: number[];
  simplifyLanguage: boolean;
  addDepth: boolean;
} {
  const skipQuestions: number[] = [];
  const emphasizeQuestions: number[] = [];
  let simplifyLanguage = false;
  let addDepth = false;
  
  // If beginner, simplify language
  if (data.level === 'Just starting out' || data.trainingHours === '0-3 hours') {
    simplifyLanguage = true;
  }
  
  // If elite, add depth
  if (data.level === 'Professional' || data.level === 'Semi-Pro' || data.level === 'College') {
    addDepth = true;
  }
  
  // If reading habits are low, simplify
  if (data.readingHabits === 'none') {
    simplifyLanguage = true;
  }
  
  // If reading habits are high, add depth
  if (data.readingHabits === 'constantly') {
    addDepth = true;
  }
  
  // If confusion is high, emphasize education
  if (data.confusionFrequency === 'always' || data.confusionFrequency === 'often') {
    emphasizeQuestions.push(12); // Advice sources - we need to educate
  }
  
  // If no injury goal, skip injury questions (handled in conditional logic)
  if (!data.goals?.includes('comeback')) {
    // Already handled by conditional rendering
  }
  
  // If compete casually, de-emphasize competition questions
  if (data.compete === 'casual') {
    // Could simplify mental game questions
  }
  
  return { skipQuestions, emphasizeQuestions, simplifyLanguage, addDepth };
}

/**
 * Sport-specific question adaptations
 * Each sport has unique considerations
 */
export function getSportSpecificContext(sport: string, sportOther?: string): {
  isResearchMode: boolean;
  focusAreas: string[];
  keyMetrics: string[];
  researchGaps: string[];
} {
  // If "other" sport, we're in research mode
  if (sport === 'other') {
    return {
      isResearchMode: true,
      focusAreas: ['General athletic development', 'Sport-specific skills', 'Competition preparation'],
      keyMetrics: ['Performance indicators', 'Training load', 'Recovery markers'],
      researchGaps: [
        `Need to research: ${sportOther || 'this sport'}`,
        'Identify ranking systems',
        'Define success metrics',
        'Map skill progression'
      ]
    };
  }
  
  const profile = SPORT_PROFILES[sport as keyof typeof SPORT_PROFILES];
  if (!profile) {
    return {
      isResearchMode: true,
      focusAreas: [],
      keyMetrics: [],
      researchGaps: ['Sport profile not yet defined']
    };
  }
  
  return {
    isResearchMode: false,
    focusAreas: Object.values(profile.focusAreas).flat(),
    keyMetrics: profile.keyMetrics,
    researchGaps: []
  };
}

/**
 * Personalization engine - determines tone, depth, and style
 */
export function getPersonalizationProfile(data: Partial<AssessmentData>): {
  tone: 'motivational' | 'technical' | 'balanced' | 'educational';
  depth: 'simple' | 'moderate' | 'detailed' | 'expert';
  contentStyle: 'visual' | 'mixed' | 'text-heavy' | 'research-focused';
  urgency: 'low' | 'medium' | 'high';
} {
  let tone: 'motivational' | 'technical' | 'balanced' | 'educational' = 'balanced';
  let depth: 'simple' | 'moderate' | 'detailed' | 'expert' = 'moderate';
  let contentStyle: 'visual' | 'mixed' | 'text-heavy' | 'research-focused' = 'mixed';
  let urgency: 'low' | 'medium' | 'high' = 'medium';
  
  // Determine tone based on confusion and reading habits
  if (data.confusionFrequency === 'always' || data.confusionFrequency === 'often') {
    tone = 'educational';
  } else if (data.readingHabits === 'constantly') {
    tone = 'technical';
  } else if (data.level === 'Just starting out') {
    tone = 'motivational';
  }
  
  // Determine depth
  const segment = determineAthleteSegment(data);
  if (segment.segment === 'elite') {
    depth = 'expert';
  } else if (segment.segment === 'advanced') {
    depth = 'detailed';
  } else if (segment.segment === 'beginner') {
    depth = 'simple';
  }
  
  // Determine content style
  if (data.readingHabits === 'none') {
    contentStyle = 'visual';
  } else if (data.readingHabits === 'constantly') {
    contentStyle = 'research-focused';
  } else if (data.readingHabits === 'regularly') {
    contentStyle = 'text-heavy';
  }
  
  // Determine urgency
  if (data.goals?.includes('pro') || data.goals?.includes('compete')) {
    urgency = 'high';
  } else if (data.goals?.includes('comeback')) {
    urgency = 'medium'; // Important but must be patient
  } else if (data.goals?.includes('fun')) {
    urgency = 'low';
  }
  
  return { tone, depth, contentStyle, urgency };
}

/**
 * Question complexity adjuster
 * Simplifies or deepens questions based on athlete profile
 */
export function adjustQuestionComplexity(
  baseQuestion: string,
  simplify: boolean,
  addDepth: boolean
): string {
  // This would contain logic to rewrite questions
  // For now, return base question
  // In production, use AI to adapt language
  return baseQuestion;
}

/**
 * Real-time pattern learning
 * Tracks common response combinations to improve recommendations
 */
export interface ResponsePattern {
  pattern: string;
  frequency: number;
  outcomes: string[];
  recommendations: string[];
}

export function identifyResponsePatterns(allResponses: AssessmentData[]): ResponsePattern[] {
  const patterns: Map<string, ResponsePattern> = new Map();
  
  // Example: Identify common combinations
  allResponses.forEach(response => {
    const key = `${response.sport}_${response.level}_${response.goals.join(',')}`;
    
    if (!patterns.has(key)) {
      patterns.set(key, {
        pattern: key,
        frequency: 0,
        outcomes: [],
        recommendations: []
      });
    }
    
    const pattern = patterns.get(key)!;
    pattern.frequency++;
  });
  
  return Array.from(patterns.values()).sort((a, b) => b.frequency - a.frequency);
}

/**
 * Sentiment analysis for open-ended responses
 * Maps free text to structured categories
 */
export function analyzeSentiment(text: string, category: 'frustration' | 'mental' | 'other'): {
  primaryCategory: string;
  confidence: number;
  keywords: string[];
} {
  const text_lower = text.toLowerCase();
  
  if (category === 'frustration') {
    // Map to research-backed categories
    if (text_lower.includes('understand') || text_lower.includes('why') || text_lower.includes('purpose')) {
      return {
        primaryCategory: 'lack_of_understanding',
        confidence: 0.9,
        keywords: ['understand', 'why', 'purpose']
      };
    }
    if (text_lower.includes('progress') || text_lower.includes('improve') || text_lower.includes('better')) {
      return {
        primaryCategory: 'no_visible_progress',
        confidence: 0.85,
        keywords: ['progress', 'improve', 'better']
      };
    }
    if (text_lower.includes('boring') || text_lower.includes('repetitive') || text_lower.includes('same')) {
      return {
        primaryCategory: 'boredom_monotony',
        confidence: 0.8,
        keywords: ['boring', 'repetitive', 'same']
      };
    }
    if (text_lower.includes('recover') || text_lower.includes('rest') || text_lower.includes('tired')) {
      return {
        primaryCategory: 'unclear_recovery',
        confidence: 0.85,
        keywords: ['recover', 'rest', 'tired']
      };
    }
    if (text_lower.includes('injury') || text_lower.includes('hurt') || text_lower.includes('pain')) {
      return {
        primaryCategory: 'frequent_injuries',
        confidence: 0.9,
        keywords: ['injury', 'hurt', 'pain']
      };
    }
  }
  
  return {
    primaryCategory: 'other',
    confidence: 0.5,
    keywords: []
  };
}

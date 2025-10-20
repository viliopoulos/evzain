// Core types for EVZAIN assessment system

export interface AssessmentData {
  sport: string;
  sportOther: string;
  level: string;
  trainingHours: string;
  goals: string[];
  progressTracking: string;
  frustrations: string[];
  frustrationOther: string;
  confusionFrequency: string;
  trackingMethod: string[];
  trackingOther: string;
  compete: string;
  mentalChallenges: string[];
  mentalOther: string;
  mentalStrategies: string[];
  adviceSources: string[];
  readingHabits: string;
  willingnessToPay: string;
  injuryStatus?: string;
  injuryDetails?: string;
}

export interface AthleteProfile {
  segment: 'beginner' | 'intermediate' | 'advanced' | 'elite';
  confidence: number;
  sport: string;
  level: string;
  commitmentLevel: 'low' | 'medium' | 'high' | 'extreme';
  primaryFocus: string;
  secondaryFocuses: string[];
  needsInjurySupport: boolean;
  personalization: {
    tone: 'motivational' | 'technical' | 'balanced' | 'educational';
    depth: 'simple' | 'moderate' | 'detailed' | 'expert';
    contentStyle: 'visual' | 'mixed' | 'text-heavy' | 'research-focused';
    urgency: 'low' | 'medium' | 'high';
  };
}

export interface TrainingRecommendation {
  id: string;
  category: 'technical' | 'tactical' | 'physical' | 'mental' | 'recovery';
  title: string;
  description: string;
  why: string; // The research-backed reasoning
  exercises: Exercise[];
  metrics: string[];
  frequency: string;
  duration: string;
  progressionPath: string[];
  researchCitations: string[];
}

export interface Exercise {
  name: string;
  description: string;
  sets?: string;
  reps?: string;
  duration?: string;
  intensity?: string;
  visualUrl?: string; // For future: image/video of exercise
  keyPoints: string[];
}

export interface PerformanceMetric {
  name: string;
  current?: string;
  target: string;
  timeline: string;
  howToMeasure: string;
}

import { tennisDecisionTree } from './sports/tennis';
import { basketballDecisionTree } from './sports/basketball';
import { soccerDecisionTree } from './sports/soccer';
import { fitnessDecisionTree } from './sports/fitness';
import { weightTrainingDecisionTree } from './sports/weightTraining';

// Types
interface AssessmentData {
  sport: string;
  sportOther: string;
  level: string;
  trainingHours: string;
  goals: string;
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
  willingnessToPay: string;
}

interface TrainingRecommendation {
  focus: string[];
  drills: string[];
  frequency: string;
  notes?: string;
}

interface Blueprint {
  hero: {
    title: string;
    subtitle: string;
    goal: string;
    emoji: string;
  };
  currentState: {
    level: string;
    trainingHours: string;
    challenges: string[];
    mentalChallenges: string[];
    trackingStatus: string;
  };
  recommendations: {
    technical: TrainingRecommendation;
    tactical: TrainingRecommendation;
    mental: TrainingRecommendation;
    physical: TrainingRecommendation;
  };
  progressionPath: {
    current: string;
    nextMilestone: string;
    timeline: string;
    keyFocusAreas: string[];
  };
  dataInsights: {
    title: string;
    insights: string[];
  };
  resources: {
    books: string[];
    videos: string[];
    apps: string[];
    podcasts?: string[];
  };
}

// Sport decision tree mapping
const SPORT_TREES: Record<string, any> = {
  'tennis': tennisDecisionTree,
  'basketball': basketballDecisionTree,
  'soccer': soccerDecisionTree,
  'football': soccerDecisionTree, // Alias
  'fitness': fitnessDecisionTree,
  'general_fitness': fitnessDecisionTree,
  'weight_training': weightTrainingDecisionTree,
  'weights': weightTrainingDecisionTree,
  'strength_training': weightTrainingDecisionTree,
};

// Helper to get decision tree for sport
function getDecisionTree(sport: string) {
  const normalizedSport = sport.toLowerCase().replace(/\s+/g, '_');
  return SPORT_TREES[normalizedSport] || fitnessDecisionTree;
}

// Helper to normalize level names
function normalizeLevel(level: string): string {
  const levelMap: Record<string, string> = {
    'just starting out': 'just_starting',
    'recreational': 'recreational',
    'serious hobbyist': 'serious_hobbyist',
    'high school': 'high_school',
    'college': 'college',
    'professional': 'professional',
  };
  return levelMap[level.toLowerCase()] || 'recreational';
}

// Helper to normalize goals
function normalizeGoal(goal: string): string {
  const goalMap: Record<string, string> = {
    'compete at a higher level': 'compete',
    'improve specific skills': 'skills',
    'get/stay fit': 'fitness',
    'build consistency': 'consistency',
    'return from injury': 'comeback',
    'go pro': 'pro',
    'have fun': 'fun',
  };
  return goalMap[goal.toLowerCase()] || 'fitness';
}

// Main blueprint generation function
export function generateBlueprint(data: AssessmentData): Blueprint {
  const tree = getDecisionTree(data.sport);
  const normalizedLevel = normalizeLevel(data.level);
  const normalizedGoal = normalizeGoal(data.goals);
  
  const levelData = tree.levels[normalizedLevel] || tree.levels['recreational'];
  const goalData = tree.goals[normalizedGoal] || tree.goals['fitness'];
  
  const blueprint: Blueprint = {
    hero: generateHero(data, goalData),
    currentState: analyzeCurrentState(data, tree),
    recommendations: {
      technical: getTechnicalRecommendations(data, tree, levelData, goalData),
      tactical: getTacticalRecommendations(data, tree, levelData, goalData),
      mental: getMentalRecommendations(data, tree, levelData, goalData),
      physical: getPhysicalRecommendations(data, tree, levelData, goalData),
    },
    progressionPath: getProgressionPath(data, tree, levelData),
    dataInsights: getDataInsights(data, tree, levelData),
    resources: tree.resources || getDefaultResources(),
  };
  
  return blueprint;
}

function generateHero(data: AssessmentData, goalData: any) {
  const goalText: Record<string, string> = {
    'compete': 'compete at the next level',
    'skills': 'master your technique',
    'fitness': 'achieve peak fitness',
    'consistency': 'build unshakeable habits',
    'comeback': 'return stronger than ever',
    'pro': 'reach the professional level',
    'fun': 'fall in love with your sport again',
  };
  
  const goalEmoji: Record<string, string> = {
    'compete': '🏆',
    'skills': '🎯',
    'fitness': '💪',
    'consistency': '📈',
    'comeback': '🔥',
    'pro': '⭐',
    'fun': '😊',
  };
  
  const normalizedGoal = normalizeGoal(data.goals);
  
  return {
    title: `Here's your roadmap to ${goalText[normalizedGoal] || 'achieve your goals'}`,
    subtitle: `Personalized for ${data.sport} • ${data.level} • ${data.trainingHours}/week`,
    goal: data.goals,
    emoji: goalEmoji[normalizedGoal] || '🎯',
  };
}

function analyzeCurrentState(data: AssessmentData, tree: any) {
  const trackingStatus = data.trackingMethod.length > 0 
    ? `Tracking via: ${data.trackingMethod.join(', ')}`
    : 'Not currently tracking progress';
  
  return {
    level: data.level,
    trainingHours: data.trainingHours,
    challenges: data.frustrations,
    mentalChallenges: data.mentalChallenges,
    trackingStatus,
  };
}

function getTechnicalRecommendations(
  data: AssessmentData, 
  tree: any, 
  levelData: any, 
  goalData: any
): TrainingRecommendation {
  const focus = levelData.focus || [];
  const drills = levelData.drills || [];
  
  // Add goal-specific technical focus
  if (goalData.recommendations?.technical) {
    focus.push(goalData.recommendations.technical);
  }
  
  // Add frustration-specific recommendations
  data.frustrations.forEach(frustration => {
    const normalizedFrustration = frustration.toLowerCase().replace(/\s+/g, '_');
    if (tree.frustrations && tree.frustrations[normalizedFrustration]) {
      const solution = tree.frustrations[normalizedFrustration];
      if (solution.example) {
        drills.push(solution.example);
      }
    }
  });
  
  return {
    focus: focus.slice(0, 3), // Top 3
    drills: drills.slice(0, 4), // Top 4
    frequency: levelData.volume || '3-4x per week',
    notes: `Focus on ${focus[0]?.toLowerCase() || 'fundamentals'} to build a strong foundation`,
  };
}

function getTacticalRecommendations(
  data: AssessmentData,
  tree: any,
  levelData: any,
  goalData: any
): TrainingRecommendation {
  const focus = goalData.priorities || ['Strategy', 'Decision making', 'Game awareness'];
  const drills = ['Match simulation', 'Situational practice', 'Video analysis'];
  
  if (goalData.recommendations?.tactical) {
    focus.push(goalData.recommendations.tactical);
  }
  
  return {
    focus: focus.slice(0, 3),
    drills: drills,
    frequency: '2-3x per week',
    notes: 'Understanding the "why" behind each decision is key',
  };
}

function getMentalRecommendations(
  data: AssessmentData,
  tree: any,
  levelData: any,
  goalData: any
): TrainingRecommendation {
  const focus: string[] = [];
  const drills: string[] = [];
  
  // Add mental challenge-specific protocols
  data.mentalChallenges.forEach(challenge => {
    const normalizedChallenge = challenge.toLowerCase().replace(/\s+/g, '_');
    if (tree.mentalProtocols && tree.mentalProtocols[normalizedChallenge]) {
      const protocol = tree.mentalProtocols[normalizedChallenge];
      focus.push(challenge);
      if (protocol.exercises) {
        drills.push(...protocol.exercises);
      }
    }
  });
  
  // Default mental recommendations if none specified
  if (focus.length === 0) {
    focus.push('Focus and concentration', 'Emotional control', 'Confidence building');
    drills.push('Visualization', 'Breathing exercises', 'Pre-performance routines');
  }
  
  if (goalData.recommendations?.mental) {
    focus.push(goalData.recommendations.mental);
  }
  
  return {
    focus: focus.slice(0, 3),
    drills: drills.slice(0, 4),
    frequency: 'Daily (10-15 min)',
    notes: 'Mental training is as important as physical training',
  };
}

function getPhysicalRecommendations(
  data: AssessmentData,
  tree: any,
  levelData: any,
  goalData: any
): TrainingRecommendation {
  const focus = ['Conditioning', 'Strength', 'Mobility'];
  const drills = ['Sport-specific conditioning', 'Strength training', 'Flexibility work'];
  
  if (goalData.recommendations?.physical) {
    focus.push(goalData.recommendations.physical);
  }
  
  // Adjust based on training hours
  const hoursPerWeek = parseInt(data.trainingHours.split('-')[0]) || 4;
  let frequency = '2-3x per week';
  
  if (hoursPerWeek >= 13) {
    frequency = '4-5x per week';
  } else if (hoursPerWeek >= 8) {
    frequency = '3-4x per week';
  }
  
  return {
    focus: focus.slice(0, 3),
    drills: drills,
    frequency,
    notes: `With ${data.trainingHours}/week, ensure proper recovery between sessions`,
  };
}

function getProgressionPath(data: AssessmentData, tree: any, levelData: any) {
  const normalizedLevel = normalizeLevel(data.level);
  const levelOrder = ['just_starting', 'recreational', 'serious_hobbyist', 'high_school', 'college', 'professional'];
  const currentIndex = levelOrder.indexOf(normalizedLevel);
  const nextLevel = currentIndex < levelOrder.length - 1 ? levelOrder[currentIndex + 1] : normalizedLevel;
  
  const nextLevelData = tree.levels[nextLevel];
  const nextMilestone = nextLevelData ? `Progress to ${nextLevel.replace(/_/g, ' ')}` : 'Maintain current level';
  
  return {
    current: data.level,
    nextMilestone,
    timeline: levelData.timeline || '3-6 months',
    keyFocusAreas: levelData.focus || ['Technical', 'Tactical', 'Mental', 'Physical'],
  };
}

function getDataInsights(data: AssessmentData, tree: any, levelData: any) {
  const insights: string[] = [];
  
  // Add level-specific insights
  if (levelData.keyMetrics) {
    insights.push(`Key metrics to track: ${levelData.keyMetrics.join(', ')}`);
  }
  
  // Add training volume insights
  const hoursPerWeek = parseInt(data.trainingHours.split('-')[0]) || 4;
  const volumeData = tree.trainingHours?.[data.trainingHours];
  if (volumeData) {
    insights.push(volumeData.assessment);
    insights.push(volumeData.recommendation);
  }
  
  // Add confusion frequency insight
  if (data.confusionFrequency === 'often' || data.confusionFrequency === 'always') {
    insights.push('You indicated frequent confusion about training - we\'ll provide clear "why" explanations for every recommendation');
  }
  
  return {
    title: 'What the data tells us',
    insights: insights.slice(0, 4), // Top 4 insights
  };
}

function getDefaultResources() {
  return {
    books: ['The Champion\'s Mind - Jim Afremow', 'Atomic Habits - James Clear'],
    videos: ['Sport-specific YouTube channels', 'Technique breakdown videos'],
    apps: ['Training tracker app', 'Video analysis app'],
    podcasts: ['Sport-specific podcasts'],
  };
}

// Fitness Decision Tree - General fitness and conditioning

export const fitnessDecisionTree = {
  sport: 'fitness',
  
  levels: {
    'just_starting': {
      focus: ['Movement fundamentals', 'Habit building', 'Basic conditioning'],
      drills: ['Bodyweight exercises', 'Walking/light cardio', 'Mobility work', 'Form practice'],
      volume: '3-5 hours/week',
      progression: 'Build foundation → Consistent routine',
      keyMetrics: ['Consistency', 'Form quality', 'Basic strength'],
      timeline: '4-8 weeks'
    },
    
    'recreational': {
      focus: ['Strength building', 'Cardiovascular fitness', 'Flexibility'],
      drills: ['Compound movements', 'Cardio sessions', 'Stretching routine', 'Core work'],
      volume: '4-7 hours/week',
      progression: 'General fitness → Specific goals',
      keyMetrics: ['Strength gains', 'Cardio capacity', 'Body composition'],
      timeline: '8-12 weeks'
    },
    
    'serious_hobbyist': {
      focus: ['Progressive overload', 'Program adherence', 'Recovery optimization'],
      drills: ['Structured programs', 'Periodization', 'Advanced techniques', 'Mobility work'],
      volume: '6-10 hours/week',
      progression: 'General fitness → Athletic performance',
      keyMetrics: ['Strength PRs', 'Body composition', 'Performance metrics'],
      timeline: '12-16 weeks'
    },
    
    'high_school': {
      focus: ['Athletic development', 'Sport-specific training', 'Injury prevention'],
      drills: ['Strength training', 'Speed/agility', 'Plyometrics', 'Sport-specific work'],
      volume: '10-15 hours/week',
      progression: 'Athletic foundation → Competitive athlete',
      keyMetrics: ['Athletic testing', 'Performance stats', 'Injury history'],
      timeline: '16-24 weeks'
    },
    
    'college': {
      focus: ['Peak performance', 'Advanced programming', 'Recovery protocols'],
      drills: ['Advanced strength work', 'Olympic lifts', 'Sport-specific conditioning'],
      volume: '15-20 hours/week',
      progression: 'College athlete → Elite performance',
      keyMetrics: ['Performance testing', 'Competition results'],
      timeline: '24-36 weeks'
    },
    
    'professional': {
      focus: ['Elite optimization', 'Career longevity', 'Peak performance'],
      drills: ['Individualized programming', 'Recovery optimization', 'Performance tracking'],
      volume: '20+ hours/week',
      progression: 'Maintain elite status',
      keyMetrics: ['Performance metrics', 'Injury prevention', 'Longevity'],
      timeline: 'Ongoing'
    }
  },
  
  goals: {
    'compete': {
      priorities: ['Performance metrics', 'Sport-specific training', 'Mental preparation'],
      keyMetrics: ['Competition results', 'Performance testing', 'Recovery'],
      timeline: '12-16 weeks per phase',
      recommendations: {
        technical: 'Master movement patterns',
        tactical: 'Periodization and peaking',
        mental: 'Competition mindset',
        physical: 'Sport-specific conditioning'
      }
    },
    
    'skills': {
      priorities: ['Movement quality', 'Technique mastery', 'Progressive overload'],
      keyMetrics: ['Form quality', 'Strength gains', 'Mobility'],
      timeline: '8-12 weeks per skill',
      recommendations: {
        technical: 'Focus on form before load',
        tactical: 'Progressive programming',
        mental: 'Patience with progress',
        physical: 'Balanced development'
      }
    },
    
    'fitness': {
      priorities: ['Overall health', 'Body composition', 'Functional fitness'],
      keyMetrics: ['Body fat %', 'Cardiovascular fitness', 'Strength levels'],
      timeline: '12-16 weeks per phase',
      recommendations: {
        technical: 'Balanced training approach',
        tactical: 'Sustainable programming',
        mental: 'Lifestyle integration',
        physical: 'Progressive conditioning'
      }
    },
    
    'consistency': {
      priorities: ['Habit formation', 'Sustainable routine', 'Long-term adherence'],
      keyMetrics: ['Training frequency', 'Program adherence', 'Lifestyle integration'],
      timeline: '8-12 weeks',
      recommendations: {
        technical: 'Simple, repeatable workouts',
        tactical: 'Flexible programming',
        mental: 'Intrinsic motivation',
        physical: 'Manageable volume'
      }
    }
  },
  
  frustrations: {
    'unclear_purpose': {
      solution: 'Connect exercises to goals',
      example: 'Squats build leg strength for daily activities and sports',
      implementation: 'Explain purpose of each exercise'
    },
    
    'repetitive': {
      solution: 'Vary exercises while maintaining principles',
      example: 'Rotate squat variations: back squat, front squat, goblet squat',
      implementation: 'Exercise rotation every 4-6 weeks'
    },
    
    'no_progress': {
      solution: 'Track metrics and adjust programming',
      example: 'Log weights, reps, and body measurements weekly',
      implementation: 'Weekly progress reviews and adjustments'
    },
    
    'unclear_recovery': {
      solution: 'Structured recovery protocols',
      example: 'Active recovery days with light cardio and stretching',
      implementation: 'Recovery based on training intensity'
    },
    
    'conflicting_advice': {
      solution: 'Follow evidence-based programming',
      example: 'Stick with proven training principles',
      implementation: 'Document your training philosophy'
    }
  },
  
  mentalProtocols: {
    'nerves_under_pressure': {
      preMatch: 'Breathing exercises + mental preparation',
      duringMatch: 'Focus on process, not outcome',
      practice: 'Simulate competition conditions',
      timeline: '4-6 weeks',
      exercises: ['Visualization', 'Breathing techniques', 'Mental rehearsal']
    },
    
    'losing_focus': {
      technique: 'Set-by-set mindset',
      practice: 'Mindfulness training',
      drills: 'Focus on form and technique',
      timeline: '3-4 weeks',
      exercises: ['Meditation', 'Concentration practice', 'Routine development']
    },
    
    'confidence': {
      approach: 'Track progress and celebrate wins',
      practice: 'Start with achievable goals',
      mental: 'Positive self-talk',
      timeline: '2-3 weeks',
      exercises: ['Progress journal', 'Photo documentation', 'PR celebrations']
    },
    
    'motivation': {
      approach: 'Connect to deeper purpose',
      practice: 'Vary training to maintain interest',
      mental: 'Find your "why"',
      timeline: '2-4 weeks',
      exercises: ['Goal setting', 'Training variety', 'Community engagement']
    }
  },
  
  trainingHours: {
    '0-3': {
      assessment: 'Starting out - build consistency',
      recommendation: 'Focus on habit formation',
      structure: '3 sessions/week, 30-60 min each'
    },
    '4-7': {
      assessment: 'Good foundation for progress',
      recommendation: 'Balanced strength and cardio',
      structure: '4-5 sessions/week, structured program'
    },
    '8-12': {
      assessment: 'Serious commitment - significant progress possible',
      recommendation: 'Advanced programming with periodization',
      structure: '5-6 sessions/week with recovery protocols'
    },
    '13-20': {
      assessment: 'Elite commitment - athletic performance',
      recommendation: 'Ensure proper recovery and nutrition',
      structure: '6+ sessions/week, professional approach'
    },
    '20+': {
      assessment: 'Professional athlete level',
      recommendation: 'Work with coaches and specialists',
      structure: 'Daily training with comprehensive support'
    }
  },
  
  resources: {
    books: [
      'Starting Strength - Mark Rippetoe',
      'Bigger Leaner Stronger - Michael Matthews',
      'The 4-Hour Body - Tim Ferriss',
      'Atomic Habits - James Clear'
    ],
    videos: [
      'Jeff Nippard (YouTube)',
      'AthleanX',
      'Renaissance Periodization',
      'Squat University'
    ],
    apps: [
      'Strong - Workout tracker',
      'MyFitnessPal - Nutrition',
      'Strava - Cardio tracking',
      'Headspace - Mental training'
    ],
    podcasts: [
      'The Stronger By Science Podcast',
      'The Mind Pump Podcast',
      'The Fitness Industry Podcast',
      'The Model Health Show'
    ]
  }
};

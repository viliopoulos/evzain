// Weight Training Decision Tree - Strength and muscle building focus

export const weightTrainingDecisionTree = {
  sport: 'weight_training',
  
  levels: {
    'just_starting': {
      focus: ['Form and technique', 'Basic movements', 'Habit building'],
      drills: ['Bodyweight progressions', 'Light weight practice', 'Mobility work', 'Core stability'],
      volume: '3-5 hours/week',
      progression: 'Learn movements → Build base strength',
      keyMetrics: ['Form quality', 'Consistency', 'Basic strength'],
      timeline: '4-8 weeks'
    },
    
    'recreational': {
      focus: ['Progressive overload', 'Compound movements', 'Muscle building'],
      drills: ['Squat, bench, deadlift', 'Accessory work', 'Hypertrophy training'],
      volume: '4-7 hours/week',
      progression: 'Base strength → Intermediate lifter',
      keyMetrics: ['Strength PRs', 'Muscle mass', 'Body composition'],
      timeline: '12-16 weeks'
    },
    
    'serious_hobbyist': {
      focus: ['Advanced programming', 'Periodization', 'Specialization'],
      drills: ['Advanced techniques', 'Periodized training', 'Weak point work'],
      volume: '6-10 hours/week',
      progression: 'Intermediate → Advanced lifter',
      keyMetrics: ['Strength standards', 'Body composition', 'Training age'],
      timeline: '16-24 weeks'
    },
    
    'high_school': {
      focus: ['Athletic development', 'Power training', 'Injury prevention'],
      drills: ['Olympic lifts', 'Plyometrics', 'Sport-specific strength'],
      volume: '10-15 hours/week',
      progression: 'Athletic foundation → Competitive athlete',
      keyMetrics: ['Power output', 'Athletic testing', 'Performance'],
      timeline: '24-36 weeks'
    },
    
    'college': {
      focus: ['Peak strength', 'Advanced techniques', 'Competition prep'],
      drills: ['Competition lifts', 'Peak programming', 'Recovery protocols'],
      volume: '15-20 hours/week',
      progression: 'College level → Elite strength',
      keyMetrics: ['Competition results', 'Strength standards'],
      timeline: '36-48 weeks'
    },
    
    'professional': {
      focus: ['Elite performance', 'Career longevity', 'Optimization'],
      drills: ['Individualized programming', 'Advanced periodization', 'Recovery optimization'],
      volume: '20+ hours/week',
      progression: 'Maintain elite status',
      keyMetrics: ['Competition results', 'Records', 'Longevity'],
      timeline: 'Ongoing'
    }
  },
  
  goals: {
    'compete': {
      priorities: ['Competition preparation', 'Peaking', 'Meet performance'],
      keyMetrics: ['Competition totals', 'Wilks score', 'Meet performance'],
      timeline: '12-16 weeks per meet',
      recommendations: {
        technical: 'Perfect competition lifts',
        tactical: 'Peaking and periodization',
        mental: 'Competition mindset',
        physical: 'Strength and power development'
      }
    },
    
    'skills': {
      priorities: ['Technique mastery', 'Movement quality', 'Efficiency'],
      keyMetrics: ['Form quality', 'Bar speed', 'Movement efficiency'],
      timeline: '8-12 weeks per lift',
      recommendations: {
        technical: 'Video analysis and coaching',
        tactical: 'Skill-focused programming',
        mental: 'Patience with technique work',
        physical: 'Mobility and stability'
      }
    },
    
    'fitness': {
      priorities: ['Muscle building', 'Body composition', 'Overall strength'],
      keyMetrics: ['Muscle mass', 'Body fat %', 'Strength levels'],
      timeline: '12-16 weeks per phase',
      recommendations: {
        technical: 'Hypertrophy-focused training',
        tactical: 'Progressive overload',
        mental: 'Long-term consistency',
        physical: 'Balanced development'
      }
    },
    
    'consistency': {
      priorities: ['Sustainable training', 'Injury prevention', 'Long-term progress'],
      keyMetrics: ['Training frequency', 'Injury rate', 'Progress over time'],
      timeline: '8-12 weeks',
      recommendations: {
        technical: 'Autoregulation',
        tactical: 'Flexible programming',
        mental: 'Process over outcome',
        physical: 'Recovery management'
      }
    }
  },
  
  frustrations: {
    'unclear_purpose': {
      solution: 'Connect exercises to strength goals',
      example: 'Squats build leg strength and overall power',
      implementation: 'Explain purpose and progression of each lift'
    },
    
    'repetitive': {
      solution: 'Vary rep ranges and intensities',
      example: 'Rotate between strength, hypertrophy, and power phases',
      implementation: 'Periodized programming with variety'
    },
    
    'no_progress': {
      solution: 'Track all lifts and adjust programming',
      example: 'Log every set and analyze progress monthly',
      implementation: 'Data-driven programming adjustments'
    },
    
    'unclear_recovery': {
      solution: 'Structured deload and recovery weeks',
      example: 'Deload every 4th week with 60% volume',
      implementation: 'Planned recovery in programming'
    },
    
    'conflicting_advice': {
      solution: 'Follow evidence-based strength principles',
      example: 'Stick with proven progressive overload methods',
      implementation: 'Document your training methodology'
    }
  },
  
  mentalProtocols: {
    'nerves_under_pressure': {
      preMatch: 'Visualization of successful lifts',
      duringMatch: 'Breathing and focus cues',
      practice: 'Heavy singles practice',
      timeline: '4-6 weeks',
      exercises: ['Mental rehearsal', 'Breathing techniques', 'Competition simulation']
    },
    
    'losing_focus': {
      technique: 'Set-by-set mindset',
      practice: 'Mindfulness between sets',
      drills: 'Focus on technique cues',
      timeline: '3-4 weeks',
      exercises: ['Meditation', 'Concentration practice', 'Routine development']
    },
    
    'confidence': {
      approach: 'Track PRs and celebrate progress',
      practice: 'Build with submaximal success',
      mental: 'Positive self-talk and affirmations',
      timeline: '2-3 weeks',
      exercises: ['PR journal', 'Video review', 'Confidence builders']
    },
    
    'motivation': {
      approach: 'Set clear strength goals',
      practice: 'Vary training to maintain interest',
      mental: 'Connect to strength "why"',
      timeline: '2-4 weeks',
      exercises: ['Goal setting', 'Training variety', 'Community engagement']
    }
  },
  
  trainingHours: {
    '0-3': {
      assessment: 'Starting out - learn movements',
      recommendation: 'Focus on technique and consistency',
      structure: '3 sessions/week, full body or upper/lower split'
    },
    '4-7': {
      assessment: 'Good volume for progress',
      recommendation: 'Progressive overload with proper recovery',
      structure: '4-5 sessions/week, structured split'
    },
    '8-12': {
      assessment: 'Serious commitment - advanced progress',
      recommendation: 'Periodized programming with specialization',
      structure: '5-6 sessions/week with accessories'
    },
    '13-20': {
      assessment: 'Elite commitment - competitive level',
      recommendation: 'Advanced periodization and recovery',
      structure: '6+ sessions/week, professional approach'
    },
    '20+': {
      assessment: 'Professional athlete level',
      recommendation: 'Work with coaches and specialists',
      structure: 'Multiple daily sessions with full support'
    }
  },
  
  resources: {
    books: [
      'Starting Strength - Mark Rippetoe',
      '5/3/1 Forever - Jim Wendler',
      'The Science and Practice of Strength Training - Zatsiorsky',
      'Practical Programming - Rippetoe & Baker'
    ],
    videos: [
      'Calgary Barbell (YouTube)',
      'Juggernaut Training Systems',
      'Squat University',
      'Alan Thrall'
    ],
    apps: [
      'Strong - Workout tracker',
      'Gravitus - AI form analysis',
      'OpenPowerlifting - Competition data',
      'MyFitnessPal - Nutrition'
    ],
    podcasts: [
      'The Stronger By Science Podcast',
      'Barbell Medicine Podcast',
      'The Juggernaut Training Podcast',
      'Iron Culture'
    ]
  }
};

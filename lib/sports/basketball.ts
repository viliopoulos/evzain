// Basketball Decision Tree - Sport-specific training intelligence

export const basketballDecisionTree = {
  sport: 'basketball',
  
  levels: {
    'just_starting': {
      focus: ['Ball handling fundamentals', 'Shooting form', 'Basic rules and positioning'],
      drills: ['Dribbling stationary', 'Form shooting close range', 'Layup progression', 'Passing fundamentals'],
      volume: '3-5 hours/week',
      progression: 'Basic skills → Recreational play',
      keyMetrics: ['Free throw %', 'Ball control', 'Basic footwork'],
      timeline: '2-3 months'
    },
    
    'recreational': {
      focus: ['Skill development', 'Game understanding', 'Team play'],
      drills: ['Shooting drills', 'Pick and roll basics', '3-on-3 games', 'Defensive stance'],
      volume: '4-7 hours/week',
      progression: 'Pickup games → Organized leagues',
      keyMetrics: ['Shooting %', 'Assists', 'Defensive stops'],
      timeline: '3-6 months'
    },
    
    'serious_hobbyist': {
      focus: ['Advanced skills', 'Game IQ', 'Conditioning'],
      drills: ['Game speed shooting', 'Advanced ball handling', 'Defensive rotations', 'Transition offense'],
      volume: '6-10 hours/week',
      progression: 'League play → Competitive tournaments',
      keyMetrics: ['Points per game', 'Efficiency rating', 'Plus/minus'],
      timeline: '6-12 months'
    },
    
    'high_school': {
      focus: ['Position-specific skills', 'Team systems', 'Strength and conditioning'],
      drills: ['Position drills', 'Team offense/defense', 'Film study', 'Strength training'],
      volume: '10-15 hours/week',
      progression: 'Varsity level → College recruitment',
      keyMetrics: ['Stats', 'Recruiting interest', 'Physical testing'],
      timeline: '12-18 months'
    },
    
    'college': {
      focus: ['Elite skills', 'System mastery', 'Professional preparation'],
      drills: ['Pro-style workouts', 'Advanced film study', 'Position specialization'],
      volume: '15-20 hours/week',
      progression: 'College level → Professional consideration',
      keyMetrics: ['Performance stats', 'Draft projections', 'Combine results'],
      timeline: '18-24 months'
    },
    
    'professional': {
      focus: ['Elite performance', 'Career longevity', 'Continuous improvement'],
      drills: ['Pro training regimen', 'Recovery protocols', 'Skill refinement'],
      volume: '20-30 hours/week',
      progression: 'Maintain and improve professional status',
      keyMetrics: ['Performance stats', 'Contract value', 'Injury prevention'],
      timeline: 'Ongoing'
    }
  },
  
  goals: {
    'compete': {
      priorities: ['Game performance', 'Team play', 'Mental toughness'],
      keyMetrics: ['Win rate', 'Performance under pressure', 'Clutch plays'],
      timeline: '3-6 months per level',
      recommendations: {
        technical: 'Master fundamental skills first',
        tactical: 'Understand team systems and roles',
        mental: 'Develop competitive mindset',
        physical: 'Basketball-specific conditioning'
      }
    },
    
    'skills': {
      priorities: ['Skill development', 'Repetition', 'Technique refinement'],
      keyMetrics: ['Shooting %', 'Ball handling', 'Defensive ability'],
      timeline: '2-4 months per skill',
      recommendations: {
        technical: 'Focus on one skill at a time',
        tactical: 'Understand when to use each skill',
        mental: 'Patience with skill development',
        physical: 'Functional strength for basketball'
      }
    },
    
    'fitness': {
      priorities: ['Conditioning', 'Strength', 'Injury prevention'],
      keyMetrics: ['Vertical jump', 'Sprint speed', 'Endurance'],
      timeline: '8-12 weeks per phase',
      recommendations: {
        technical: 'Maintain skills during conditioning',
        tactical: 'Energy management in games',
        mental: 'Push through physical challenges',
        physical: 'Basketball-specific training program'
      }
    },
    
    'consistency': {
      priorities: ['Routine development', 'Reliable performance', 'Mental stability'],
      keyMetrics: ['Shooting consistency', 'Turnover rate', 'Defensive reliability'],
      timeline: '4-8 weeks',
      recommendations: {
        technical: 'Develop repeatable mechanics',
        tactical: 'Smart decision making',
        mental: 'Pre-game routines',
        physical: 'Consistent training schedule'
      }
    }
  },
  
  frustrations: {
    'unclear_purpose': {
      solution: 'Connect drills to game situations',
      example: 'Shooting drills simulate game spots and scenarios',
      implementation: 'Explain game context for every drill'
    },
    
    'repetitive': {
      solution: 'Add competition and variety to drills',
      example: 'Turn shooting drill into timed challenge or H-O-R-S-E',
      implementation: 'Gamify practice sessions'
    },
    
    'no_progress': {
      solution: 'Track specific metrics and set milestones',
      example: 'Track shooting % from different spots weekly',
      implementation: 'Weekly stat tracking and goal setting'
    },
    
    'unclear_recovery': {
      solution: 'Structured recovery based on intensity',
      example: 'Active recovery with light shooting after intense games',
      implementation: 'Recovery protocols for different training loads'
    },
    
    'conflicting_advice': {
      solution: 'Find one coaching philosophy to follow',
      example: 'Stick with one shooting form methodology',
      implementation: 'Document your training approach'
    }
  },
  
  mentalProtocols: {
    'nerves_under_pressure': {
      preMatch: 'Visualization + breathing exercises (10-15 min)',
      duringMatch: 'Deep breath between possessions',
      practice: 'Pressure free throw drills 3x/week',
      timeline: '4-6 weeks',
      exercises: ['Pressure situations', 'Free throws when tired', 'Game simulation']
    },
    
    'losing_focus': {
      technique: 'Possession-by-possession mindset',
      practice: 'Mindfulness training daily',
      drills: 'Focus drills with distractions',
      timeline: '3-4 weeks',
      exercises: ['Meditation', 'Concentration drills', 'Mental reset routines']
    },
    
    'confidence': {
      approach: 'Highlight reel + success tracking',
      practice: 'Work on strengths first each session',
      mental: 'Positive self-talk and affirmations',
      timeline: '2-3 weeks',
      exercises: ['Success journal', 'Video review of good plays', 'Confidence drills']
    },
    
    'motivation': {
      approach: 'Goal setting + training variety',
      practice: 'Mix individual and team workouts',
      mental: 'Connect to basketball "why"',
      timeline: '2-4 weeks',
      exercises: ['Goal workshops', 'Varied training', 'Purpose reflection']
    }
  },
  
  trainingHours: {
    '0-3': {
      assessment: 'Minimal - focus on skill fundamentals',
      recommendation: 'Increase to 4-6 hours for improvement',
      structure: '2-3 sessions/week focusing on basics'
    },
    '4-7': {
      assessment: 'Good for recreational improvement',
      recommendation: 'Balance skills and game play',
      structure: '3-4 sessions/week, mix drills and games'
    },
    '8-12': {
      assessment: 'Serious commitment - competitive possible',
      recommendation: 'Add strength and conditioning',
      structure: '4-5 sessions/week with structured program'
    },
    '13-20': {
      assessment: 'Elite commitment - high level play',
      recommendation: 'Ensure recovery and periodization',
      structure: '5-6 sessions/week, professional approach'
    },
    '20+': {
      assessment: 'Professional level commitment',
      recommendation: 'Work with trainers for optimization',
      structure: 'Daily training with recovery protocols'
    }
  },
  
  resources: {
    books: [
      'The Mamba Mentality - Kobe Bryant',
      'Eleven Rings - Phil Jackson',
      'Relentless - Tim Grover',
      'The Book of Basketball - Bill Simmons'
    ],
    videos: [
      'By Any Means Basketball (YouTube)',
      'ILoveBasketballTV',
      'Pro Training Basketball',
      'NBA Skills Training'
    ],
    apps: [
      'HomeCourt - AI basketball training',
      'Basketball Stats Tracker',
      'CoachNow - Video feedback',
      'Nike Training Club'
    ],
    podcasts: [
      'The Basketball Podcast',
      'Thinking Basketball',
      'The Lowe Post',
      'All The Smoke'
    ]
  }
};

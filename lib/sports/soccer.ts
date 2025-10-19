// Soccer Decision Tree - Sport-specific training intelligence

export const soccerDecisionTree = {
  sport: 'soccer',
  
  levels: {
    'just_starting': {
      focus: ['Ball control', 'Basic passing', 'Movement fundamentals'],
      drills: ['Dribbling cones', 'Wall passing', 'Basic shooting', 'Juggling practice'],
      volume: '3-5 hours/week',
      progression: 'Basic skills → Recreational play',
      keyMetrics: ['Touch quality', 'Passing accuracy', 'Basic fitness'],
      timeline: '2-3 months'
    },
    
    'recreational': {
      focus: ['Technical skills', 'Game understanding', 'Fitness'],
      drills: ['Passing combinations', 'Small-sided games', 'Shooting drills', 'Defensive positioning'],
      volume: '4-7 hours/week',
      progression: 'Pickup games → League play',
      keyMetrics: ['Pass completion %', 'Touches per game', 'Fitness level'],
      timeline: '3-6 months'
    },
    
    'serious_hobbyist': {
      focus: ['Advanced technique', 'Tactical awareness', 'Match fitness'],
      drills: ['Position-specific training', 'Tactical scenarios', 'Conditioning', 'Set pieces'],
      volume: '6-10 hours/week',
      progression: 'League play → Competitive tournaments',
      keyMetrics: ['Performance stats', 'Tactical understanding', 'Endurance'],
      timeline: '6-12 months'
    },
    
    'high_school': {
      focus: ['Position mastery', 'Team tactics', 'Physical development'],
      drills: ['Advanced position work', 'Team systems', 'Strength training', 'Video analysis'],
      volume: '10-15 hours/week',
      progression: 'Varsity level → College recruitment',
      keyMetrics: ['Stats', 'Recruiting interest', 'Physical testing'],
      timeline: '12-18 months'
    },
    
    'college': {
      focus: ['Elite technique', 'System mastery', 'Professional preparation'],
      drills: ['Pro-level training', 'Advanced tactics', 'Position specialization'],
      volume: '15-20 hours/week',
      progression: 'College level → Professional consideration',
      keyMetrics: ['Performance metrics', 'Draft/signing interest'],
      timeline: '18-24 months'
    },
    
    'professional': {
      focus: ['Elite performance', 'Career longevity', 'Continuous improvement'],
      drills: ['Professional training regimen', 'Recovery protocols', 'Tactical refinement'],
      volume: '20-30 hours/week',
      progression: 'Maintain and improve professional status',
      keyMetrics: ['Performance stats', 'Contract value', 'Injury prevention'],
      timeline: 'Ongoing'
    }
  },
  
  goals: {
    'compete': {
      priorities: ['Match performance', 'Team play', 'Mental toughness'],
      keyMetrics: ['Win rate', 'Individual performance', 'Clutch moments'],
      timeline: '3-6 months per level',
      recommendations: {
        technical: 'Master fundamentals under pressure',
        tactical: 'Understand team systems and roles',
        mental: 'Develop competitive mindset',
        physical: 'Soccer-specific conditioning'
      }
    },
    
    'skills': {
      priorities: ['Technical development', 'Repetition', 'Refinement'],
      keyMetrics: ['Touch quality', 'Passing accuracy', 'Shooting %'],
      timeline: '2-4 months per skill',
      recommendations: {
        technical: 'Focus on weak foot development',
        tactical: 'Understand when to use each skill',
        mental: 'Patience with development',
        physical: 'Functional strength for soccer'
      }
    },
    
    'fitness': {
      priorities: ['Endurance', 'Speed', 'Injury prevention'],
      keyMetrics: ['Distance covered', 'Sprint speed', 'Recovery time'],
      timeline: '8-12 weeks per phase',
      recommendations: {
        technical: 'Maintain skills when fatigued',
        tactical: 'Energy management in matches',
        mental: 'Mental toughness during physical stress',
        physical: 'Soccer-specific training program'
      }
    },
    
    'consistency': {
      priorities: ['Reliable performance', 'Decision making', 'Mental stability'],
      keyMetrics: ['Pass completion', 'Turnover rate', 'Defensive reliability'],
      timeline: '4-8 weeks',
      recommendations: {
        technical: 'Develop repeatable technique',
        tactical: 'Smart decision making',
        mental: 'Pre-match routines',
        physical: 'Consistent training schedule'
      }
    }
  },
  
  frustrations: {
    'unclear_purpose': {
      solution: 'Connect drills to game situations',
      example: 'Passing drills simulate match scenarios and positioning',
      implementation: 'Explain tactical context for every drill'
    },
    
    'repetitive': {
      solution: 'Add competition and game-like elements',
      example: 'Turn passing drill into timed challenge with defenders',
      implementation: 'Gamify training sessions'
    },
    
    'no_progress': {
      solution: 'Track metrics and set clear milestones',
      example: 'Track pass completion % and distance covered weekly',
      implementation: 'Weekly performance reviews'
    },
    
    'unclear_recovery': {
      solution: 'Structured recovery protocols',
      example: 'Active recovery with light technical work',
      implementation: 'Recovery based on match/training intensity'
    },
    
    'conflicting_advice': {
      solution: 'Follow one coaching methodology',
      example: 'Stick with one tactical system',
      implementation: 'Document your playing philosophy'
    }
  },
  
  mentalProtocols: {
    'nerves_under_pressure': {
      preMatch: 'Visualization + breathing routine (15 min)',
      duringMatch: 'Deep breath between plays',
      practice: 'Pressure penalty kicks 2x/week',
      timeline: '4-6 weeks',
      exercises: ['Pressure situations', 'Penalty practice', 'Match simulation']
    },
    
    'losing_focus': {
      technique: 'Play-by-play mindset',
      practice: 'Mindfulness training 10 min/day',
      drills: 'Focus drills with distractions',
      timeline: '3-4 weeks',
      exercises: ['Meditation', 'Concentration drills', 'Mental reset']
    },
    
    'confidence': {
      approach: 'Highlight reel + success tracking',
      practice: 'Work on strengths first',
      mental: 'Positive self-talk',
      timeline: '2-3 weeks',
      exercises: ['Success journal', 'Video review', 'Confidence building']
    },
    
    'motivation': {
      approach: 'Goal setting + training variety',
      practice: 'Mix individual and team work',
      mental: 'Connect to soccer "why"',
      timeline: '2-4 weeks',
      exercises: ['Goal setting', 'Varied training', 'Purpose reflection']
    }
  },
  
  trainingHours: {
    '0-3': {
      assessment: 'Minimal - focus on fundamentals',
      recommendation: 'Increase to 4-6 hours for progress',
      structure: '2-3 sessions/week, technical focus'
    },
    '4-7': {
      assessment: 'Good for recreational improvement',
      recommendation: 'Balance technical and tactical work',
      structure: '3-4 sessions/week, mix drills and games'
    },
    '8-12': {
      assessment: 'Serious commitment - competitive level',
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
      recommendation: 'Work with coaches for optimization',
      structure: 'Daily training with recovery protocols'
    }
  },
  
  resources: {
    books: [
      'Inverting the Pyramid - Jonathan Wilson',
      'The Mixer - Michael Cox',
      'Soccernomics - Simon Kuper',
      'The Champion\'s Mind - Jim Afremow'
    ],
    videos: [
      '7mlc (YouTube)',
      'Become Elite',
      'Progressive Soccer Training',
      'AllAttack'
    ],
    apps: [
      'PlayerTek - Performance tracking',
      'CoachNow - Video feedback',
      'SoccerFIT - Training programs',
      'Hudl - Video analysis'
    ],
    podcasts: [
      'The Coaching Manual Podcast',
      'The Football Coaching Podcast',
      'Total Soccer Show',
      'The Athletic Football Podcast'
    ]
  }
};

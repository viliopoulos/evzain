// Tennis Decision Tree - Sport-specific training intelligence

export const tennisDecisionTree = {
  sport: 'tennis',
  
  // Level-based recommendations
  levels: {
    'just_starting': {
      focus: ['Fundamentals', 'Consistency', 'Court awareness'],
      drills: ['Rally drills (20+ ball exchanges)', 'Footwork ladder', 'Shadow swings', 'Wall practice'],
      volume: '3-5 hours/week',
      progression: 'Master basic strokes → Move to recreational',
      keyMetrics: ['Rally consistency', 'Basic stroke form', 'Court positioning'],
      timeline: '2-3 months'
    },
    
    'recreational': {
      focus: ['Stroke refinement', 'Basic tactics', 'Match play introduction'],
      drills: ['Target practice (cones)', 'Serve progression', 'Point play scenarios', 'Doubles positioning'],
      volume: '4-7 hours/week',
      progression: 'Consistent rallies → Serious hobbyist',
      keyMetrics: ['First serve %', 'Unforced errors', 'Rally length'],
      timeline: '3-6 months'
    },
    
    'serious_hobbyist': {
      focus: ['Advanced tactics', 'Mental game', 'Consistency under pressure'],
      drills: ['Situational play', 'Pressure points', 'Pattern development', 'Match simulation'],
      volume: '6-10 hours/week',
      progression: 'Tournament ready → HS competitive',
      keyMetrics: ['Win rate', 'Break point conversion', 'Mental toughness score'],
      timeline: '6-12 months'
    },
    
    'high_school': {
      focus: ['Tournament strategy', 'Physical conditioning', 'Mental toughness'],
      drills: ['Match simulation', 'Explosive movement', 'Pressure training', 'Video analysis'],
      volume: '10-15 hours/week',
      progression: 'Varsity ready → College recruitment',
      keyMetrics: ['Tournament results', 'Ranking', 'Physical testing scores'],
      timeline: '12-18 months'
    },
    
    'college': {
      focus: ['Elite tactics', 'Peak performance', 'Consistency at high level'],
      drills: ['Pro-style practice', 'Advanced video analysis', 'Mental resilience training', 'Periodization'],
      volume: '15-20 hours/week',
      progression: 'D3/D2 → D1 or Pro consideration',
      keyMetrics: ['Match win %', 'Ranking', 'Performance under pressure'],
      timeline: '18-24 months'
    },
    
    'professional': {
      focus: ['Elite performance optimization', 'Tournament preparation', 'Career longevity'],
      drills: ['Match-specific preparation', 'Opponent analysis', 'Peak performance protocols'],
      volume: '20-25 hours/week',
      progression: 'Maintain and improve ranking',
      keyMetrics: ['ATP/WTA ranking', 'Tournament results', 'Injury prevention'],
      timeline: 'Ongoing'
    }
  },
  
  // Goal-based pathways
  goals: {
    'compete': {
      priorities: ['Match play frequency', 'Tactical training', 'Mental game'],
      keyMetrics: ['Win rate', 'Clutch point conversion', 'Serve %'],
      timeline: '3-6 months per level',
      recommendations: {
        technical: 'Focus on consistency over power',
        tactical: 'Develop 3-5 go-to patterns',
        mental: 'Pressure point training 2x/week',
        physical: 'Court movement and endurance'
      }
    },
    
    'skills': {
      priorities: ['Technical refinement', 'Drill consistency', 'Video analysis'],
      keyMetrics: ['Stroke accuracy', 'Consistency index', 'Error rate'],
      timeline: '2-4 months per skill',
      recommendations: {
        technical: 'Isolate and perfect one stroke at a time',
        tactical: 'Understand shot selection',
        mental: 'Focus and concentration drills',
        physical: 'Flexibility and injury prevention'
      }
    },
    
    'fitness': {
      priorities: ['Court movement', 'Endurance', 'Injury prevention'],
      keyMetrics: ['VO2 max', 'Court coverage', 'Recovery time'],
      timeline: '8-12 weeks per phase',
      recommendations: {
        technical: 'Maintain stroke quality during fatigue',
        tactical: 'Energy management strategies',
        mental: 'Mental toughness during physical stress',
        physical: 'Tennis-specific conditioning program'
      }
    },
    
    'consistency': {
      priorities: ['Routine development', 'Error reduction', 'Mental stability'],
      keyMetrics: ['Unforced errors', 'First serve %', 'Rally length'],
      timeline: '4-8 weeks',
      recommendations: {
        technical: 'Simplify technique for reliability',
        tactical: 'High-percentage shot selection',
        mental: 'Pre-point routines',
        physical: 'Consistent training schedule'
      }
    }
  },
  
  // Frustration-based interventions
  frustrations: {
    'unclear_purpose': {
      solution: 'Add "why" explanation to every drill',
      example: 'Crosscourt rallies develop consistency + court positioning for winning patterns',
      implementation: 'Start each practice with clear objectives'
    },
    
    'repetitive': {
      solution: 'Introduce drill variations + gamification',
      example: 'Turn consistency drill into "streak challenge" with targets',
      implementation: 'Rotate 3-4 drill variations per session'
    },
    
    'no_progress': {
      solution: 'Implement tracking framework + milestone system',
      example: 'Track serve % improvement weekly with clear benchmarks',
      implementation: 'Weekly progress reviews with specific metrics'
    },
    
    'unclear_recovery': {
      solution: 'Structured recovery protocol',
      example: 'Active recovery days with light hitting + stretching',
      implementation: 'Recovery schedule based on training intensity'
    },
    
    'conflicting_advice': {
      solution: 'Single source of truth + progressive learning',
      example: 'Follow one coaching methodology consistently',
      implementation: 'Document your training philosophy'
    }
  },
  
  // Mental challenge protocols
  mentalProtocols: {
    'nerves_under_pressure': {
      preMatch: 'Controlled breathing + visualization routine (15 min)',
      duringMatch: 'Between-point reset (3 breaths + positive cue)',
      practice: 'Pressure point training 2x/week',
      timeline: '4-6 weeks to see improvement',
      exercises: ['Pressure point drills', 'Match simulation', 'Breathing exercises']
    },
    
    'losing_focus': {
      technique: 'Point-by-point mindset + physical anchors',
      practice: 'Mindfulness training 10 min/day',
      drills: 'Distraction training during practice',
      timeline: '3-4 weeks',
      exercises: ['Meditation', 'Focus drills', 'Routine development']
    },
    
    'confidence': {
      approach: 'Small wins tracking + success journaling',
      practice: 'Dominant position drills',
      mental: 'Pre-match highlight reel review',
      timeline: '2-3 weeks',
      exercises: ['Success journal', 'Positive self-talk', 'Visualization']
    },
    
    'motivation': {
      approach: 'Goal setting + progress tracking',
      practice: 'Varied training to maintain interest',
      mental: 'Connect to deeper "why"',
      timeline: '2-4 weeks',
      exercises: ['Goal setting workshop', 'Training variety', 'Purpose reflection']
    }
  },
  
  // Training hour recommendations
  trainingHours: {
    '0-3': {
      assessment: 'Minimal commitment - focus on fundamentals',
      recommendation: 'Increase to 4-6 hours for meaningful progress',
      structure: '2-3 sessions/week, 1-1.5 hours each'
    },
    '4-7': {
      assessment: 'Good foundation for recreational improvement',
      recommendation: 'Optimal for serious hobbyist level',
      structure: '3-4 sessions/week, mix of drills and match play'
    },
    '8-12': {
      assessment: 'Serious commitment - competitive level possible',
      recommendation: 'Add strength training and mental work',
      structure: '4-5 sessions/week, include conditioning'
    },
    '13-20': {
      assessment: 'Elite commitment - high level competition',
      recommendation: 'Ensure proper periodization and recovery',
      structure: '5-6 sessions/week, structured program'
    },
    '20+': {
      assessment: 'Professional level commitment',
      recommendation: 'Work with coach for periodization',
      structure: 'Daily training with recovery protocols'
    }
  },
  
  // Resources by level
  resources: {
    books: [
      'The Inner Game of Tennis - Timothy Gallwey',
      'Winning Ugly - Brad Gilbert',
      'Open - Andre Agassi',
      'The Champion\'s Mind - Jim Afremow'
    ],
    videos: [
      'Essential Tennis (YouTube)',
      'Top Tennis Training',
      'Tennis Evolution',
      'Feel Tennis Instruction'
    ],
    apps: [
      'SwingVision - AI video analysis',
      'Tennis Tracker - Match statistics',
      'CoachNow - Video feedback',
      'Headspace - Mental training'
    ],
    podcasts: [
      'The Tennis Files',
      'Control the Controllables',
      'The Functional Tennis Podcast'
    ]
  }
};

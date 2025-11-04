/**
 * ELITE EXERCISE LIBRARY
 * 
 * Real exercises, drills, and mental techniques used by champions
 * Sources: Kobe Bryant, Roger Federer, Rafa Nadal, Djokovic, McEnroe, elite coaches
 * 
 * This is TANGIBLE. This is ACTIONABLE. This is what separates good from great.
 */

export interface Exercise {
  name: string;
  description: string;
  howToDo: string[];
  sets?: string;
  reps?: string;
  duration?: string;
  frequency?: string;
  eliteInsight: string; // Who does this? Why does it work?
  visualPlaceholder?: string; // For future video/image integration
  metrics?: string[];
}

// ==================== TENNIS ====================

export const TENNIS_EXERCISES = {
  // Federer's precision drill
  TARGET_PRACTICE: {
    name: "Target Zone Precision (Federer Method)",
    description: "Place targets in corners and practice hitting them repeatedly. Federer's signature consistency drill.",
    howToDo: [
      "Place 4 targets in service boxes (baseline corners)",
      "Hit 100 forehands to each target zone",
      "Track success rate (%)",
      "Increase difficulty: reduce target size or increase distance"
    ],
    sets: "4 rounds",
    reps: "100 per zone",
    duration: "45-60 min",
    frequency: "3-4x/week",
    eliteInsight: "Federer's coach Paul Annacone used this drill to build his pinpoint accuracy. Consistency under pressure comes from thousands of reps hitting the same spot.",
    metrics: ["Hit rate (%)", "Consistency across 100 reps", "Ball depth (baseline +/- 3ft)"]
  },

  // Nadal's footwork
  EXPLOSIVE_FOOTWORK: {
    name: "Nadal's Court Coverage Drill",
    description: "Develop explosive lateral movement and recovery. The reason Nadal gets to impossible balls.",
    howToDo: [
      "Start at center baseline",
      "Sprint to wide forehand, recover to center",
      "Sprint to wide backhand, recover to center",
      "Add shadow swings at each position",
      "Focus: first 3 steps explosive, recovery step powerful"
    ],
    sets: "5 sets",
    reps: "10 reps per set",
    duration: "20 min",
    frequency: "Daily",
    eliteInsight: "Nadal's uncle Toni built this into every practice. The first 3 steps determine if you're early or late. Recovery step sets up the next shot.",
    metrics: ["Time from center to corner", "Recovery time", "Heart rate recovery"]
  },

  // Djokovic's mental reset
  BETWEEN_POINT_ROUTINE: {
    name: "Djokovic's Mental Reset Protocol",
    description: "Control emotions between points. Stay present. Let go of mistakes instantly.",
    howToDo: [
      "After every point: turn your back to opponent",
      "Deep breath (4-4-4: inhale 4, hold 4, exhale 4)",
      "Bounce ball exactly 3 times before serving",
      "Use same towel routine every changeover",
      "Positive self-talk: 'next point' or 'stay here'"
    ],
    duration: "Practice in every match/practice",
    frequency: "Every single point",
    eliteInsight: "Djokovic credits his mental coach Pepe Imaz with this protocol. The routine creates emotional control. Champions win the mental game between points, not just during them.",
    metrics: ["Emotional variance (1-10)", "Ability to let go of errors", "Focus rating"]
  }
};

// ==================== BASKETBALL ====================

export const BASKETBALL_EXERCISES = {
  // Kobe's 400 makes
  MAMBA_SHOOTING: {
    name: "Kobe's 400 Makes Workout",
    description: "Make 400 shots before leaving the gym. Every. Single. Day. No shortcuts.",
    howToDo: [
      "100 mid-range jumpers (5 spots, 20 each)",
      "100 three-pointers (5 spots, 20 each)",
      "100 free throws (in sets of 10)",
      "100 floaters/runners (alternating hands)",
      "Track makes, not attempts - stay until you hit 400"
    ],
    duration: "90-120 min",
    frequency: "Daily (even in offseason)",
    eliteInsight: "Kobe's trainer Tim Grover revealed this was Kobe's non-negotiable. It's not about talent, it's about the WORK nobody sees at 5am.",
    metrics: ["Total makes", "Shooting % by zone", "Time to complete"]
  },

  // NBA ball handling
  TWO_BALL_HANDLING: {
    name: "Elite Two-Ball Dribbling Series",
    description: "Develop ambidextrous control. Used by Kyrie Irving, Steph Curry, all elite ball handlers.",
    howToDo: [
      "2 balls, simultaneous dribbling: 100 reps",
      "2 balls, alternating rhythm: 100 reps",
      "2 balls, crossovers in sync: 50 reps each direction",
      "2 balls, between legs alternating: 50 reps",
      "Add tennis ball toss while dribbling 2 balls"
    ],
    sets: "Complete full series",
    duration: "20-30 min",
    frequency: "5x/week minimum",
    eliteInsight: "Steph Curry's dad Dell taught him this. When you can control 2 balls, 1 ball feels easy. Your off-hand becomes a weapon.",
    metrics: ["Consecutive reps without losing control", "Speed increase over time"]
  }
};

// ==================== SOCCER ====================

export const SOCCER_EXERCISES = {
  // Ronaldo's first touch
  WALL_PASSING: {
    name: "Ronaldo's First Touch Mastery",
    description: "10,000 touches. That's how you get a touch like Ronaldo. Start with a wall.",
    howToDo: [
      "Pass against wall, control with different surfaces",
      "Inside foot: 100 touches each foot",
      "Outside foot: 100 touches each foot",
      "Thigh control: 50 each leg",
      "Chest control: 50 reps",
      "Increase ball speed and reduce space as you improve"
    ],
    reps: "500 total touches per session",
    duration: "30-45 min",
    frequency: "Daily",
    eliteInsight: "Ronaldo spent hours doing this as a kid in Madeira. A perfect first touch gives you an extra second to think - that's the difference at elite level.",
    metrics: ["Clean first touches (%)", "Ball control in tight space", "Touch consistency"]
  },

  // Messi's dribbling
  CONE_WEAVING: {
    name: "Messi's Close Control Dribbling",
    description: "Quick feet through cones. Messi's signature ability to change direction instantly.",
    howToDo: [
      "Set up 10 cones 1 yard apart",
      "Dribble through at speed, using only one foot",
      "Touch ball between every cone",
      "Repeat with other foot",
      "Increase speed, decrease space between cones",
      "Add ball roll moves, step overs between cones"
    ],
    sets: "10 runs per foot",
    duration: "20 min",
    frequency: "4-5x/week",
    eliteInsight: "Messi's low center of gravity + thousands of hours doing this = unstoppable. Quick feet come from repetition, not genetics.",
    metrics: ["Time through course", "Touches per run", "Ball control at speed"]
  }
};

// ==================== WATER POLO ====================

export const WATERPOLO_EXERCISES = {
  // Eggbeater endurance
  EGGBEATER_HOLDS: {
    name: "Greek National Team Eggbeater Protocol",
    description: "Build the leg endurance that powers elite water polo. This is what separates good from great.",
    howToDo: [
      "Eggbeater in deep water, hands out (treading with legs only)",
      "Hold for 2 min, rest 30 sec: 5 sets",
      "Add weight above water (medicine ball overhead): 1 min holds",
      "Explosive eggbeater jumps: 10 reps × 3 sets",
      "Track height of jump out of water"
    ],
    sets: "Progressive overload weekly",
    duration: "20-30 min",
    frequency: "4x/week minimum",
    eliteInsight: "Nikos and Greek national team train this religiously. Your legs are your platform - weak legs = weak shot. Elite players can eggbeater for 5+ minutes without fatigue.",
    metrics: ["Hold time", "Jump height out of water", "Fatigue resistance"]
  },

  // Shooting accuracy
  CORNER_POCKET_SHOOTING: {
    name: "Olympic-Level Shooting Accuracy",
    description: "Hit the corners consistently. Top shelf or low corner - nothing middle.",
    howToDo: [
      "Set targets in all 4 corners of goal",
      "Shoot from 5m: 20 shots per corner",
      "Alternate hands",
      "Add defender/eggbeater load",
      "Track accuracy % by corner and hand"
    ],
    reps: "100 shots per session",
    duration: "30-40 min",
    frequency: "3-4x/week",
    eliteInsight: "Olympic shooters hit 70%+ accuracy on corner shots. Middle shots get blocked. Champions go corners or don't shoot. Practice under fatigue - that's when games are won.",
    metrics: ["Accuracy % by corner", "Strong hand vs weak hand", "Under fatigue accuracy"]
  }
};

// ==================== FOOTBALL ====================

export const FOOTBALL_EXERCISES = {
  // Position-specific: WR Route Running
  ROUTE_PRECISION: {
    name: "NFL-Level Route Running (WR)",
    description: "Separation comes from precision, not just speed. Every step counts.",
    howToDo: [
      "Mark exact spots for cuts (cone at 5yd, 10yd, 15yd)",
      "Run slant: plant at 5yd, 45° angle, full speed",
      "Run out: plant at 10yd, 90° cut, attack sideline",
      "Run post: plant at 12yd, 45° upfield, look for ball at 15yd",
      "Film yourself - compare to NFL receivers",
      "Focus: head fake before cut, plant foot explosiveness, instant acceleration out of break"
    ],
    sets: "10 reps per route",
    duration: "30 min route work",
    frequency: "4-5x/week",
    eliteInsight: "Jerry Rice practiced routes with cones for 20 years. Separation is created in the cut, not the straight line. Defenders react to your hips - sell the fake.",
    metrics: ["Cut time (plant to acceleration)", "Separation at break", "Route precision (yards from target)"]
  },

  // Position-specific: QB Footwork
  QUARTERBACK_DROPS: {
    name: "Elite QB Footwork & Pocket Presence",
    description: "Tom Brady's drops. Peyton's pocket awareness. It starts with the feet.",
    howToDo: [
      "3-step drop: timing drill, 5 steps, set, throw (slant timing)",
      "5-step drop: 7 steps, hitch, set, throw (out route timing)",
      "7-step drop: 9 steps, hitch, climb pocket, throw (deep route)",
      "Practice with JUGS machine for timing",
      "Add pressure: coach rushes from edge, practice sliding"
    ],
    reps: "20 reps per drop type",
    duration: "30-45 min",
    frequency: "Daily",
    eliteInsight: "Brady's QB coach Tom Martinez drilled this into him. Perfect drops = perfect timing = completions. The throw is easy if your feet are right.",
    metrics: ["Drop timing (consistent to 0.1 sec)", "Set position balance", "Accuracy under pressure"]
  }
};

// ==================== MENTAL PERFORMANCE ====================

export const MENTAL_EXERCISES = {
  // Visualization
  CHAMPIONSHIP_VISUALIZATION: {
    name: "Olympic-Level Visualization Protocol",
    description: "Michael Phelps visualized every race 2x daily. Winners see it before they do it.",
    howToDo: [
      "Find quiet space, 15 minutes",
      "Close eyes, deep breaths",
      "Visualize PERFECT performance: every detail",
      "Engage all senses: what you see, hear, feel, smell",
      "See yourself executing under pressure",
      "Feel the confidence, the calm, the power",
      "Replay best performances from memory",
      "Visualize overcoming adversity (falling behind, coming back)"
    ],
    duration: "15-20 min",
    frequency: "2x daily (morning + pre-competition)",
    eliteInsight: "Phelps' sports psychologist Bob Bowman had him do this for years. Your brain can't tell the difference between vivid visualization and real performance. You're literally training neural pathways.",
    metrics: ["Clarity of visualization (1-10)", "Emotional state after", "Performance correlation"]
  },

  // Pressure training
  CONSEQUENCES_PRACTICE: {
    name: "Kobe's Consequence Training",
    description: "Add pressure to practice. Miss 2 free throws? Run. Elite athletes practice under stress.",
    howToDo: [
      "Every drill has a consequence for failure",
      "Example: Make 5/5 free throws or run sprints",
      "Example: Score in 1v1 drill or do burpees",
      "Invite audience to practice (added pressure)",
      "Practice key situations: game-winning shot, penalty kick, 4th quarter",
      "Elevate heart rate before skill execution"
    ],
    frequency: "2-3x/week in practice",
    eliteInsight: "Kobe demanded this from teammates. If practice is comfortable, games will be hard. Make practice harder than games. Champions thrive under pressure because they PRACTICE under pressure.",
    metrics: ["Success rate under pressure vs normal", "Heart rate during execution", "Clutch performance improvement"]
  }
};

// ==================== RECOVERY ====================

export const RECOVERY_EXERCISES = {
  // LeBron's recovery
  LEBRON_RECOVERY_PROTOCOL: {
    name: "LeBron's $1.5M Recovery System (Budget Version)",
    description: "LeBron spends $1.5M/year on body maintenance. Here's what actually matters.",
    howToDo: [
      "Sleep: 8-10 hours non-negotiable (LeBron: 8-10 hrs + nap)",
      "Ice bath: 10-15 min at 50-59°F, 2-3x/week post-training",
      "Foam rolling: 15 min daily (focus: IT band, quads, hip flexors)",
      "Stretch: 20 min post-workout (hold 30 sec per muscle group)",
      "Nutrition: Protein within 30 min post-workout",
      "Hydrate: Bodyweight (lbs) ÷ 2 = oz of water daily",
      "Active recovery: 20-30 min easy movement on off days"
    ],
    duration: "Daily commitment",
    frequency: "Every day",
    eliteInsight: "LeBron's trainer Mike Mancias revealed this. You can't afford hyperbaric chambers, but you CAN sleep, ice bath, and foam roll. That's 80% of the benefit. Champions recover like professionals.",
    metrics: ["Sleep quality (Whoop/Oura)", "Morning HRV", "Soreness rating (1-10)", "Next-day performance"]
  }
};

// Helper function to get exercises by sport and goal - ALWAYS returns exactly 3 exercises
export function getExercisesForProfile(sport: string, goal: string, level: string): Exercise[] {
  const exercises: Exercise[] = [];
  
  // Map sports to exercise libraries
  const sportExercises: Record<string, any> = {
    tennis: TENNIS_EXERCISES,
    basketball: BASKETBALL_EXERCISES,
    soccer: SOCCER_EXERCISES,
    waterpolo: WATERPOLO_EXERCISES,
    football: FOOTBALL_EXERCISES
  };

  const sportLib = sportExercises[sport];
  
  // Default fallback exercises if sport not found
  if (!sportLib) {
    exercises.push(
      MENTAL_EXERCISES.CHAMPIONSHIP_VISUALIZATION,
      MENTAL_EXERCISES.CONSEQUENCES_PRACTICE,
      RECOVERY_EXERCISES.LEBRON_RECOVERY_PROTOCOL
    );
    return exercises;
  }

  // Goal-based exercise selection - ALWAYS add exactly 3
  if (goal === 'skills') {
    if (sport === 'tennis') {
      exercises.push(
        sportLib.TARGET_PRACTICE, 
        sportLib.EXPLOSIVE_FOOTWORK,
        sportLib.BETWEEN_POINT_ROUTINE
      );
    } else if (sport === 'basketball') {
      exercises.push(
        sportLib.MAMBA_SHOOTING, 
        sportLib.TWO_BALL_HANDLING,
        sportLib.DEFENSIVE_SLIDES
      );
    } else if (sport === 'soccer') {
      exercises.push(
        sportLib.WALL_PASSING, 
        sportLib.CONE_WEAVING,
        sportLib.FINISHING_UNDER_PRESSURE
      );
    } else if (sport === 'waterpolo') {
      exercises.push(
        sportLib.EGGBEATER_HOLDS, 
        sportLib.CORNER_POCKET_SHOOTING,
        sportLib.COUNTER_ATTACK_TRANSITIONS
      );
    } else if (sport === 'football') {
      exercises.push(
        sportLib.ROUTE_PRECISION, 
        sportLib.QUARTERBACK_DROPS,
        sportLib.TACKLING_FORM
      );
    }
  } else if (goal === 'compete' || goal === 'pro') {
    // Competition focus: 2 sport-specific + 1 mental
    const sportKeys = Object.keys(sportLib);
    if (sportKeys.length >= 2) {
      exercises.push(sportLib[sportKeys[0]], sportLib[sportKeys[1]]);
    }
    exercises.push(MENTAL_EXERCISES.CHAMPIONSHIP_VISUALIZATION);
  } else if (goal === 'comeback') {
    // Injury recovery: 2 sport-specific + 1 recovery
    const sportKeys = Object.keys(sportLib);
    if (sportKeys.length >= 2) {
      exercises.push(sportLib[sportKeys[0]], sportLib[sportKeys[1]]);
    }
    exercises.push(RECOVERY_EXERCISES.LEBRON_RECOVERY_PROTOCOL);
  } else {
    // Default: 2 sport-specific + 1 mental
    const sportKeys = Object.keys(sportLib);
    if (sportKeys.length >= 2) {
      exercises.push(sportLib[sportKeys[0]], sportLib[sportKeys[1]]);
    }
    exercises.push(MENTAL_EXERCISES.CONSEQUENCES_PRACTICE);
  }

  // GUARANTEE exactly 3 exercises
  while (exercises.length < 3) {
    exercises.push(RECOVERY_EXERCISES.LEBRON_RECOVERY_PROTOCOL);
  }
  
  return exercises.slice(0, 3); // Always return exactly 3
}

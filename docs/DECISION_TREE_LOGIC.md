# EVZAIN Decision Tree & Recommendation Engine

## Purpose
Transform assessment responses into personalized, research-backed training recommendations that adapt based on athlete profile, goals, and constraints.

## Core Philosophy
1. **Evidence-Based**: Every recommendation rooted in sports science research
2. **Context-Aware**: Considers level, time availability, and specific goals
3. **Progressive**: Builds complexity based on athlete readiness
4. **Holistic**: Addresses physical, mental, and recovery aspects

---

## Athlete Segmentation

### Segments (Auto-computed)
1. **Beginner** - Just starting out OR low training volume (0-7 hrs/week)
2. **Intermediate** - Recreational/Serious hobbyist with moderate volume (8-12 hrs/week)
3. **Advanced** - High school/College with high volume (13-25 hrs/week)
4. **Elite** - Professional/Semi-Pro OR extreme volume (25+ hrs/week)

### Commitment Levels (Based on Training Hours)
- **Low**: 0-3 hours/week
- **Medium**: 4-12 hours/week
- **High**: 13-18 hours/week
- **Extreme**: 19+ hours/week

---

## Decision Tree Logic

### Branch 1: GOAL-DRIVEN PATHWAYS

#### If Goal = "Master Specific Techniques/Skills"
**Focus**: Technical mastery, deliberate practice, video analysis

**Recommendations by Segment**:
- **Beginner**: 
  - Fundamental movement patterns
  - 70% technique drills, 30% application
  - Weekly video self-review
  - Research: Motor learning principles (Schmidt & Lee)
  
- **Intermediate**:
  - Sport-specific skill refinement
  - 60% technique, 40% game-like situations
  - Bi-weekly coach/peer feedback
  - Research: Constraints-led approach (Davids et al.)
  
- **Advanced/Elite**:
  - High-level technical optimization
  - 50% technique, 50% competitive application
  - Daily video analysis + biomechanical feedback
  - Research: Expertise development (Ericsson's deliberate practice)

#### If Goal = "Return from Injury Stronger"
**Focus**: Safe progression, load management, psychological readiness

**CONDITIONAL BRANCH** (triggers injury-specific questions):
- Current status: Cleared / In rehab / Managing / Recent
- Injury type (optional text input)

**Recommendations**:
- **Cleared by professional**:
  - Gradual return-to-play protocol
  - 20% volume reduction from pre-injury
  - Emphasis on movement quality over intensity
  - Research: Return-to-sport criteria (Kyritsis et al.)
  
- **In rehab/PT**:
  - Follow PT protocol strictly
  - Supplement with mental training
  - Focus on unaffected areas
  - Research: Psychological readiness (ACL-RSI scale)
  
- **Managing on own** (RED FLAG):
  - Recommend professional evaluation
  - Provide conservative guidelines
  - Emphasize pain monitoring
  
- **Recent injury**:
  - RICE protocol education
  - Mental resilience strategies
  - Timeline expectations

#### If Goal = "Compete at Higher Level"
**Focus**: Competition-specific preparation, periodization, mental toughness

**Recommendations by Commitment**:
- **Low commitment** (0-7 hrs):
  - Maximize quality over quantity
  - Focus on 2-3 key performance indicators
  - Mental skills training (visualization, pre-performance routines)
  
- **Medium commitment** (8-12 hrs):
  - Structured periodization (base → build → peak)
  - Competition simulation training
  - Strategic rest and recovery
  - Research: Block periodization (Issurin)
  
- **High/Extreme commitment** (13+ hrs):
  - Advanced periodization models
  - Detailed performance analytics
  - Sport psychology integration
  - Research: Tapering strategies (Mujika & Padilla)

#### If Goal = "Improve Fitness & Health"
**Focus**: Sustainable habits, balanced training, lifestyle integration

**Recommendations**:
- Beginner: Establish consistency (3-4x/week minimum)
- All levels: 
  - 80/20 rule (80% moderate, 20% high intensity)
  - Recovery emphasis (sleep, nutrition)
  - Progress tracking (subjective + objective)
  - Research: Polarized training (Seiler)

---

### Branch 2: PROGRESS TRACKING AWARENESS

#### "I can clearly see my progress"
- **Action**: Provide advanced metrics and optimization strategies
- **Recommendation**: Refine tracking methods, add new KPIs
- **Mental approach**: Growth mindset reinforcement

#### "I have some sense of progress"
- **Action**: Introduce systematic tracking tools
- **Recommendation**: Weekly check-ins, simple metrics
- **Mental approach**: Build awareness through journaling

#### "I'm not sure if I'm improving"
- **Action**: Establish baseline measurements
- **Recommendation**: Simple, objective tests (timed drills, reps, etc.)
- **Mental approach**: Celebrate small wins, process over outcome

#### "I have no way to measure progress"
- **Action**: Start with subjective tracking (RPE, energy levels)
- **Recommendation**: Build tracking habit before adding complexity
- **Mental approach**: Focus on consistency, not perfection

---

### Branch 3: READING HABITS & LEARNING STYLE

#### "All the time (daily)"
- **Delivery**: In-depth articles, research summaries, advanced concepts
- **Tone**: Technical, evidence-heavy
- **Content**: Latest research, nuanced discussions
- **Risk**: Information overload → provide synthesis, not just data

#### "Regularly (weekly)"
- **Delivery**: Weekly insights, practical applications
- **Tone**: Balanced theory + practice
- **Content**: How-to guides with research backing

#### "Occasionally (few times/month)"
- **Delivery**: Bi-weekly tips, actionable takeaways
- **Tone**: Practical, minimal jargon
- **Content**: Quick wins, simple frameworks

#### "Never or rarely"
- **Delivery**: Visual guides, video content, simple checklists
- **Tone**: Action-first, explanation second
- **Content**: "Do this, here's why (briefly)"
- **Approach**: Early teaser content to build curiosity

---

### Branch 4: MENTAL CHALLENGES & STRATEGIES

#### High mental challenges + Limited strategies
- **Priority**: Mental skills training
- **Recommendations**:
  - Pre-performance routines
  - Breathing techniques
  - Cognitive reframing
  - Research: Mindfulness in sport (Gardner & Moore)

#### Specific challenge patterns:
- **Overthinking**: Simplify focus cues, external attention
- **Losing focus**: Attention control training, meditation
- **Nerves under pressure**: Exposure training, arousal regulation
- **Lack of confidence**: Mastery experiences, positive self-talk
- **Inconsistent motivation**: Goal-setting, intrinsic motivation
- **Negative self-talk**: Cognitive restructuring, self-compassion

---

### Branch 5: CONFUSION FREQUENCY ("Why am I doing this?")

#### "All the time" / "Often"
- **Root cause**: Lack of understanding → low adherence risk
- **Solution**: 
  - Every recommendation includes "The Why"
  - Educational content priority
  - Transparent progression pathways
  - Research citations for credibility

#### "Sometimes"
- **Root cause**: Occasional doubt (normal)
- **Solution**:
  - Periodic check-ins on purpose
  - Quarterly goal review
  - Connection to long-term vision

#### "Rarely" / "Never"
- **Root cause**: High trust OR low awareness
- **Solution**:
  - Maintain transparency
  - Offer deeper dives (optional)
  - Ensure not just following blindly

---

## Recommendation Engine Algorithm

```
FUNCTION generate_recommendations(assessment_data):
  
  // 1. Compute athlete profile
  segment = categorize_segment(level, training_hours)
  commitment = categorize_commitment(training_hours)
  
  // 2. Determine primary focus from goals (priority order)
  IF 'pro' IN goals:
    primary_focus = 'professional_development'
  ELIF 'comeback' IN goals:
    primary_focus = 'injury_recovery'
    TRIGGER injury_questions()
  ELIF 'compete' IN goals:
    primary_focus = 'competition'
  ELIF 'skills' IN goals:
    primary_focus = 'skill_mastery'
  ELSE:
    primary_focus = 'general_improvement'
  
  // 3. Build recommendation layers
  recommendations = []
  
  // Layer 1: Goal-specific training plan
  recommendations.add(
    get_training_plan(primary_focus, segment, commitment)
  )
  
  // Layer 2: Progress tracking system
  recommendations.add(
    get_tracking_system(progress_tracking_awareness, segment)
  )
  
  // Layer 3: Mental training (if needed)
  IF mental_challenges.length > 2 OR mental_strategies.includes('Nothing yet'):
    recommendations.add(
      get_mental_training(mental_challenges, segment)
    )
  
  // Layer 4: Recovery protocol
  IF training_hours > '13-18 hours' OR needs_injury_support:
    recommendations.add(
      get_recovery_protocol(segment, injury_status)
    )
  
  // Layer 5: Education & content delivery
  content_style = determine_content_style(
    reading_habits,
    confusion_frequency,
    advice_sources
  )
  recommendations.add(
    get_content_plan(content_style, primary_focus)
  )
  
  // 6. Prioritize and sequence
  RETURN prioritize_recommendations(recommendations, assessment_data)
```

---

## Research Foundation Categories

### 1. Sports Science
- Periodization models (Linear, Block, Undulating)
- Training load management
- Adaptation principles (SAID, Overload, Specificity)
- Detraining and reversibility

### 2. Biomechanics
- Movement efficiency
- Injury prevention mechanics
- Sport-specific movement patterns
- Force production and transfer

### 3. Recovery Science
- Sleep optimization (Walker, Mah)
- Nutrition timing and composition
- Active vs passive recovery
- Supercompensation

### 4. Sports Psychology
- Goal-setting theory (Locke & Latham)
- Self-determination theory (Deci & Ryan)
- Mindfulness and acceptance (Gardner & Moore)
- Mental toughness (Clough & Strycharczyk)
- Flow state (Csikszentmihalyi)

---

## Sentiment Analysis for Open-Ended Responses

### Frustration Categories (Map to research-backed solutions)
1. **Lack of understanding** → Education priority
2. **No visible progress** → Tracking systems
3. **Boredom/monotony** → Variety and gamification
4. **Unclear recovery** → Recovery protocols
5. **Frequent injuries** → Load management + biomechanics

### Mental Challenge Categories
1. **Cognitive** (overthinking, losing focus) → Attention training
2. **Emotional** (nerves, confidence) → Arousal regulation
3. **Motivational** (inconsistent motivation) → Goal-setting
4. **Self-perception** (negative self-talk) → Cognitive restructuring

---

## Next Steps for Implementation

1. **Build recommendation templates** for each pathway
2. **Create research database** linking studies to recommendations
3. **Develop content library** matching reading habits to delivery style
4. **Set up A/B testing** for recommendation effectiveness
5. **Manual validation** with first 10-30 users before automation
6. **Feedback loop** to refine decision tree based on outcomes

---

## Key Metrics to Track

1. **Adherence rate** - Do users follow recommendations?
2. **Satisfaction score** - How helpful were recommendations?
3. **Progress indicators** - Are users improving?
4. **Engagement** - How often do they return?
5. **Conversion** - Free → Paid transition rate

---

*This is a living document. Update as we learn from real user data.*

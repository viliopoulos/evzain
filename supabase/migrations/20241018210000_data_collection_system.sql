-- Data Collection System for EVZAIN
-- This schema captures: survey responses, waitlist emails, and web analytics

-- 1. Waitlist Signups Table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT, -- 'homepage', 'origins', 'assessment_complete', etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP WITH TIME ZONE
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist_signups(created_at DESC);

-- 2. Assessment Responses Table
CREATE TABLE IF NOT EXISTS assessment_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- User identification (optional email if they provide it)
  email TEXT,
  session_id TEXT, -- Browser session ID for anonymous tracking
  
  -- Q1: Sport & Level
  sport TEXT NOT NULL,
  sport_other TEXT,
  level TEXT NOT NULL,
  
  -- Q2: Training Volume
  training_hours TEXT NOT NULL,
  
  -- Q3: Goals (array - multiple selection)
  goals TEXT[] NOT NULL,
  
  -- Q4: Progress Tracking
  progress_tracking TEXT NOT NULL,
  
  -- Q5: Injury Status (conditional)
  injury_status TEXT,
  injury_details TEXT,
  
  -- Q6: Frustrations
  frustrations TEXT[],
  frustration_other TEXT,
  
  -- Q7: Confusion Frequency
  confusion_frequency TEXT NOT NULL,
  
  -- Q8: Tracking Methods
  tracking_methods TEXT[],
  tracking_other TEXT,
  
  -- Q9: Competition
  compete TEXT NOT NULL,
  
  -- Q10: Mental Challenges
  mental_challenges TEXT[],
  mental_other TEXT,
  
  -- Q11: Mental Strategies
  mental_strategies TEXT[] NOT NULL,
  
  -- Q12: Advice Sources & Reading Habits
  advice_sources TEXT[] NOT NULL,
  reading_habits TEXT NOT NULL,
  
  -- Q13: Willingness to Pay
  willingness_to_pay TEXT NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  time_spent_seconds INTEGER, -- Total time to complete assessment
  
  -- Derived insights (computed fields)
  athlete_segment TEXT, -- 'beginner', 'intermediate', 'advanced', 'elite'
  commitment_level TEXT, -- 'low', 'medium', 'high', 'extreme'
  primary_focus TEXT, -- Derived from goals
  needs_injury_support BOOLEAN DEFAULT FALSE
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_assessment_sport ON assessment_responses(sport);
CREATE INDEX IF NOT EXISTS idx_assessment_level ON assessment_responses(level);
CREATE INDEX IF NOT EXISTS idx_assessment_created ON assessment_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_assessment_segment ON assessment_responses(athlete_segment);

-- 3. Web Analytics Events Table
CREATE TABLE IF NOT EXISTS web_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'page_view', 'button_click', 'form_submit', 'scroll_depth', etc.
  event_data JSONB, -- Flexible JSON for event-specific data
  page_url TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for analytics
CREATE INDEX IF NOT EXISTS idx_analytics_session ON web_analytics(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event ON web_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON web_analytics(created_at DESC);

-- 4. Email Campaign Log
CREATE TABLE IF NOT EXISTS email_campaign_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email TEXT NOT NULL,
  campaign_type TEXT NOT NULL, -- 'waitlist_welcome', 'assessment_complete', 'weekly_update', etc.
  subject TEXT,
  body TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'sent' -- 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed'
);

CREATE INDEX IF NOT EXISTS idx_email_recipient ON email_campaign_log(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_campaign ON email_campaign_log(campaign_type);
CREATE INDEX IF NOT EXISTS idx_email_sent ON email_campaign_log(sent_at DESC);

-- 5. Insights Dashboard View (for quick analytics)
CREATE OR REPLACE VIEW assessment_insights AS
SELECT 
  sport,
  level,
  COUNT(*) as total_responses,
  AVG(time_spent_seconds) as avg_completion_time,
  COUNT(CASE WHEN willingness_to_pay != 'free' THEN 1 END) as willing_to_pay_count,
  ROUND(COUNT(CASE WHEN willingness_to_pay != 'free' THEN 1 END)::NUMERIC / COUNT(*)::NUMERIC * 100, 2) as conversion_rate,
  array_agg(DISTINCT unnest(goals)) as all_goals,
  array_agg(DISTINCT unnest(frustrations)) as all_frustrations
FROM assessment_responses
WHERE completed_at IS NOT NULL
GROUP BY sport, level
ORDER BY total_responses DESC;

-- 6. Function to categorize athlete segment based on level and training hours
CREATE OR REPLACE FUNCTION categorize_athlete_segment(
  p_level TEXT,
  p_training_hours TEXT
) RETURNS TEXT AS $$
BEGIN
  -- Elite: Professional or Semi-Pro with high volume
  IF p_level IN ('Professional', 'Semi-Pro') THEN
    RETURN 'elite';
  END IF;
  
  -- Advanced: College or High School with significant volume
  IF p_level IN ('College', 'High School') AND p_training_hours IN ('13-18 hours', '19-25 hours', '25+ hours') THEN
    RETURN 'advanced';
  END IF;
  
  -- Intermediate: Serious hobbyist or lower levels with moderate volume
  IF p_level IN ('Serious hobbyist', 'Recreational') AND p_training_hours IN ('8-12 hours', '13-18 hours') THEN
    RETURN 'intermediate';
  END IF;
  
  -- Beginner: Just starting out or low volume
  RETURN 'beginner';
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 7. Function to determine commitment level based on training hours
CREATE OR REPLACE FUNCTION categorize_commitment_level(
  p_training_hours TEXT
) RETURNS TEXT AS $$
BEGIN
  CASE p_training_hours
    WHEN '0-3 hours' THEN RETURN 'low';
    WHEN '4-7 hours' THEN RETURN 'medium';
    WHEN '8-12 hours' THEN RETURN 'medium';
    WHEN '13-18 hours' THEN RETURN 'high';
    WHEN '19-25 hours' THEN RETURN 'extreme';
    WHEN '25+ hours' THEN RETURN 'extreme';
    ELSE RETURN 'unknown';
  END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- 8. Trigger to auto-compute derived fields on insert/update
CREATE OR REPLACE FUNCTION compute_assessment_insights()
RETURNS TRIGGER AS $$
BEGIN
  NEW.athlete_segment := categorize_athlete_segment(NEW.level, NEW.training_hours);
  NEW.commitment_level := categorize_commitment_level(NEW.training_hours);
  NEW.needs_injury_support := 'comeback' = ANY(NEW.goals);
  
  -- Determine primary focus from goals
  IF 'pro' = ANY(NEW.goals) THEN
    NEW.primary_focus := 'professional_development';
  ELSIF 'compete' = ANY(NEW.goals) THEN
    NEW.primary_focus := 'competition';
  ELSIF 'skills' = ANY(NEW.goals) THEN
    NEW.primary_focus := 'skill_mastery';
  ELSIF 'comeback' = ANY(NEW.goals) THEN
    NEW.primary_focus := 'injury_recovery';
  ELSIF 'fitness' = ANY(NEW.goals) THEN
    NEW.primary_focus := 'fitness_health';
  ELSE
    NEW.primary_focus := 'general_improvement';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_compute_assessment_insights
  BEFORE INSERT OR UPDATE ON assessment_responses
  FOR EACH ROW
  EXECUTE FUNCTION compute_assessment_insights();

-- 9. Row Level Security (RLS) - Enable for production
-- ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE web_analytics ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE email_campaign_log ENABLE ROW LEVEL SECURITY;

-- Create policies as needed for your authentication setup

COMMENT ON TABLE waitlist_signups IS 'Stores email addresses from waitlist signups across the site';
COMMENT ON TABLE assessment_responses IS 'Complete assessment survey responses with derived insights';
COMMENT ON TABLE web_analytics IS 'Web analytics events for user behavior tracking';
COMMENT ON TABLE email_campaign_log IS 'Log of all emails sent through the platform';
COMMENT ON VIEW assessment_insights IS 'Aggregated insights from assessment responses for dashboard';

-- ATHLETE PERSONALIZED LINKS
-- Enables elite athletes to have custom URLs (evzain.com/athlete/nikos)
-- with their branding, pre-filled assessments, and revenue tracking

-- Main athlete links table
CREATE TABLE athlete_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- 'nikos', 'serena-williams', etc.
  sport TEXT NOT NULL,
  level TEXT NOT NULL,
  
  -- Profile info
  profile_image_url TEXT,
  bio TEXT,
  achievements TEXT[],
  quote TEXT, -- Inspirational quote from athlete
  
  -- Social links
  instagram_url TEXT,
  twitter_url TEXT,
  tiktok_url TEXT,
  youtube_url TEXT,
  website_url TEXT,
  
  -- Custom branding
  primary_color TEXT DEFAULT '#10b981', -- emerald-500
  secondary_color TEXT DEFAULT '#0891b2', -- cyan-600
  background_image_url TEXT,
  
  -- Pre-fill settings (auto-populate assessment)
  default_goals TEXT[], -- Auto-select goals
  default_training_hours TEXT,
  
  -- Business
  revenue_share_percentage INTEGER DEFAULT 20, -- 20% of referral revenue
  referral_code TEXT UNIQUE,
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  is_verified BOOLEAN DEFAULT FALSE, -- Verified elite athlete
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  created_by UUID -- Admin who created this
);

-- Analytics for athlete link performance
CREATE TABLE athlete_link_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_link_id UUID REFERENCES athlete_links(id) ON DELETE CASCADE,
  
  -- Session tracking
  visitor_id UUID, -- Anonymous visitor ID
  user_id UUID REFERENCES users(id), -- If they sign up
  
  -- Funnel tracking
  page_viewed BOOLEAN DEFAULT TRUE,
  assessment_started BOOLEAN DEFAULT FALSE,
  assessment_completed BOOLEAN DEFAULT FALSE,
  email_captured BOOLEAN DEFAULT FALSE,
  
  -- Conversion tracking
  converted_to_paid BOOLEAN DEFAULT FALSE,
  subscription_tier TEXT, -- 'athlete', 'elite', 'team'
  monthly_revenue_cents INTEGER, -- Revenue from this user
  
  -- Attribution
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  referrer_url TEXT,
  
  -- Timestamps
  visited_at TIMESTAMP DEFAULT NOW(),
  converted_at TIMESTAMP,
  
  -- Device/location (for analytics)
  device_type TEXT,
  country TEXT,
  city TEXT
);

-- Revenue payouts to athletes
CREATE TABLE athlete_revenue_payouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  athlete_link_id UUID REFERENCES athlete_links(id),
  
  -- Payout details
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_referrals INTEGER,
  total_conversions INTEGER,
  gross_revenue_cents INTEGER,
  athlete_share_cents INTEGER, -- Based on revenue_share_percentage
  
  -- Payout status
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'paid', 'failed'
  payout_method TEXT, -- 'stripe', 'paypal', 'venmo', 'wire'
  payout_completed_at TIMESTAMP,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  notes TEXT
);

-- Indexes for performance
CREATE INDEX idx_athlete_links_slug ON athlete_links(slug);
CREATE INDEX idx_athlete_links_active ON athlete_links(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_athlete_analytics_athlete_id ON athlete_link_analytics(athlete_link_id);
CREATE INDEX idx_athlete_analytics_user_id ON athlete_link_analytics(user_id);
CREATE INDEX idx_athlete_analytics_visited ON athlete_link_analytics(visited_at DESC);

-- Row Level Security (RLS)
ALTER TABLE athlete_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_link_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE athlete_revenue_payouts ENABLE ROW LEVEL SECURITY;

-- Policies: Anyone can view active athlete links
CREATE POLICY "Public can view active athlete links"
  ON athlete_links FOR SELECT
  USING (is_active = TRUE);

-- Policies: Only admins can create/update athlete links
CREATE POLICY "Admins can manage athlete links"
  ON athlete_links FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Policies: Athletes can view their own analytics
CREATE POLICY "Athletes can view their analytics"
  ON athlete_link_analytics FOR SELECT
  USING (
    athlete_link_id IN (
      SELECT id FROM athlete_links WHERE created_by = auth.uid()
    )
  );

-- Policies: System can insert analytics
CREATE POLICY "System can insert analytics"
  ON athlete_link_analytics FOR INSERT
  WITH CHECK (TRUE);

-- Function: Calculate athlete revenue for a period
CREATE OR REPLACE FUNCTION calculate_athlete_revenue(
  p_athlete_link_id UUID,
  p_start_date DATE,
  p_end_date DATE
)
RETURNS TABLE (
  total_referrals BIGINT,
  total_conversions BIGINT,
  gross_revenue_cents BIGINT,
  athlete_share_cents BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(*)::BIGINT AS total_referrals,
    COUNT(*) FILTER (WHERE converted_to_paid = TRUE)::BIGINT AS total_conversions,
    COALESCE(SUM(monthly_revenue_cents), 0)::BIGINT AS gross_revenue_cents,
    (
      COALESCE(SUM(monthly_revenue_cents), 0) *
      (SELECT revenue_share_percentage FROM athlete_links WHERE id = p_athlete_link_id) / 100
    )::BIGINT AS athlete_share_cents
  FROM athlete_link_analytics
  WHERE athlete_link_id = p_athlete_link_id
    AND visited_at >= p_start_date
    AND visited_at <= p_end_date;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_athlete_links_updated_at
  BEFORE UPDATE ON athlete_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Sample data: Create Nikos' athlete link
INSERT INTO athlete_links (
  athlete_name,
  slug,
  sport,
  level,
  profile_image_url,
  bio,
  achievements,
  quote,
  instagram_url,
  default_goals,
  is_verified
) VALUES (
  'Nikos Iliop',
  'nikos',
  'waterpolo',
  'Professional',
  '/athletes/nikos.jpg',
  'Greek National Team player and 3x Cal National Champion. Training smarter has been my edge.',
  ARRAY['3x NCAA National Champion (Cal)', 'Greek National Team', 'Professional Water Polo Striker'],
  'Excellence isn''t given. It''s earned in the pool every single day.',
  'https://instagram.com/nikos',
  ARRAY['compete', 'pro'],
  TRUE
);

-- Views for easy analytics querying
CREATE VIEW athlete_dashboard_stats AS
SELECT
  al.id AS athlete_link_id,
  al.athlete_name,
  al.slug,
  COUNT(ala.*) AS total_visits,
  COUNT(*) FILTER (WHERE ala.assessment_started = TRUE) AS assessments_started,
  COUNT(*) FILTER (WHERE ala.assessment_completed = TRUE) AS assessments_completed,
  COUNT(*) FILTER (WHERE ala.email_captured = TRUE) AS emails_captured,
  COUNT(*) FILTER (WHERE ala.converted_to_paid = TRUE) AS paid_conversions,
  COALESCE(SUM(ala.monthly_revenue_cents), 0) AS total_revenue_cents,
  (COALESCE(SUM(ala.monthly_revenue_cents), 0) * al.revenue_share_percentage / 100) AS athlete_share_cents
FROM athlete_links al
LEFT JOIN athlete_link_analytics ala ON al.id = ala.athlete_link_id
WHERE al.is_active = TRUE
GROUP BY al.id, al.athlete_name, al.slug, al.revenue_share_percentage;

COMMENT ON TABLE athlete_links IS 'Personalized athlete landing pages with custom URLs and branding';
COMMENT ON TABLE athlete_link_analytics IS 'Track performance of athlete referral links';
COMMENT ON TABLE athlete_revenue_payouts IS 'Revenue sharing payouts to athletes';
COMMENT ON VIEW athlete_dashboard_stats IS 'Aggregated stats for athlete dashboard';

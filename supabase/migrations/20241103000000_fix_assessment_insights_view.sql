-- Fix assessment_insights view by replacing invalid array_agg(DISTINCT unnest(...))
-- with LATERAL joins to properly aggregate array fields

DROP VIEW IF EXISTS assessment_insights;

CREATE OR REPLACE VIEW assessment_insights AS
WITH base_stats AS (
  SELECT 
    sport,
    level,
    COUNT(*) as total_responses,
    AVG(time_spent_seconds) as avg_completion_time,
    COUNT(CASE WHEN willingness_to_pay != 'free' THEN 1 END) as willing_to_pay_count,
    ROUND(COUNT(CASE WHEN willingness_to_pay != 'free' THEN 1 END)::NUMERIC / NULLIF(COUNT(*), 0)::NUMERIC * 100, 2) as conversion_rate
  FROM assessment_responses
  WHERE completed_at IS NOT NULL
  GROUP BY sport, level
),
goals_agg AS (
  SELECT 
    sport,
    level,
    ARRAY_AGG(DISTINCT goal ORDER BY goal) as all_goals
  FROM assessment_responses, LATERAL unnest(goals) AS goal
  WHERE completed_at IS NOT NULL
  GROUP BY sport, level
),
frustrations_agg AS (
  SELECT 
    sport,
    level,
    ARRAY_AGG(DISTINCT frustration ORDER BY frustration) as all_frustrations
  FROM assessment_responses, LATERAL unnest(frustrations) AS frustration
  WHERE completed_at IS NOT NULL
  GROUP BY sport, level
)
SELECT 
  b.sport,
  b.level,
  b.total_responses,
  b.avg_completion_time,
  b.willing_to_pay_count,
  b.conversion_rate,
  COALESCE(g.all_goals, ARRAY[]::TEXT[]) as all_goals,
  COALESCE(f.all_frustrations, ARRAY[]::TEXT[]) as all_frustrations
FROM base_stats b
LEFT JOIN goals_agg g USING (sport, level)
LEFT JOIN frustrations_agg f USING (sport, level)
ORDER BY b.total_responses DESC;

# Data Collection & Email Forwarding Setup Guide

## Overview
This document outlines the complete data collection infrastructure for EVZAIN, including database schema, API endpoints, validation guardrails, and email forwarding configuration.

## Architecture

### Data Flow
```
User Input → Frontend Validation → API Endpoint → Data Validation → Supabase → Auto-computed Insights
```

### Database Tables (Supabase)

1. **waitlist_signups** - Email captures from all entry points
   - `id`, `email`, `source`, `created_at`, `email_sent`, `email_sent_at`
   
2. **assessment_responses** - Complete assessment data
   - User data: `email`, `session_id`, `sport`, `level`, `training_hours`
   - Goals & Progress: `goals[]`, `progress_tracking`
   - Mental: `mental_challenges[]`, `mental_strategies[]`
   - Auto-computed: `athlete_segment`, `commitment_level`, `primary_focus`, `needs_injury_support`

3. **web_analytics** - User behavior tracking (ready for future use)
   - `session_id`, `event_type`, `event_data`, `page_url`, `referrer`

4. **email_campaign_log** - Email send tracking
   - `recipient_email`, `campaign_type`, `subject`, `body`, `status`

## API Endpoints

### `/api/waitlist` (POST)
**Purpose:** Capture email signups from homepage and other pages

**Request:**
```json
{
  "email": "user@example.com",
  "source": "homepage" // or "assessment", "origins", etc.
}
```

**Validation:**
- Email format validation
- Disposable email blocking (temp

mail, guerrillamail, etc.)
- Duplicate prevention
- Length limits

**Response:**
```json
{
  "success": true,
  "message": "You're part of the movement! Welcome to EVZAIN.",
  "alreadyExists": false
}
```

### `/api/assessments` (POST)
**Purpose:** Save complete assessment responses with auto-segmentation

**Request:**
```json
{
  "sport": "basketball",
  "level": "College",
  "trainingHours": "13-18 hours",
  "goals": ["compete", "skills"],
  "progressTracking": "clear",
  "frustrations": [...],
  "confusionFrequency": "sometimes",
  "trackingMethod": [...],
  "compete": "regularly",
  "mentalChallenges": [...],
  "mentalStrategies": [...],
  "adviceSources": [...],
  "readingHabits": "regularly",
  "willingnessToPay": "10-25",
  "email": "optional@example.com",
  "timeSpent": 180 // seconds
}
```

**Validation Guardrails:**
- Required field validation
- Array length limits (max 10 items per multi-select)
- Text field length limits (100-500 chars depending on field)
- Email format validation if provided
- Type checking for all fields

**Auto-Computed Fields:**
Database triggers automatically compute:
- `athlete_segment`: "beginner", "intermediate", "advanced", "elite"
- `commitment_level`: "low", "medium", "high", "extreme"
- `primary_focus`: Derived from goals hierarchy
- `needs_injury_support`: Boolean based on "comeback" goal

**Response:**
```json
{
  "success": true,
  "assessment": {
    "id": "uuid",
    "athlete_segment": "advanced",
    "commitment_level": "high",
    "primary_focus": "competition",
    ...
  }
}
```

## Data Validation & Guardrails

### Anti-Spam Measures
1. **Email Validation**
   - Regex pattern matching
   - Disposable email domain blocking
   - Length validation (max 254 chars)

2. **Array Limits**
   - Max 10 selections per multi-select question
   - Prevents form manipulation/spam

3. **Text Field Limits**
   - Sport description: 100 chars
   - Frustration details: 200 chars
   - Injury details: 500 chars
   - Prevents abuse and ensures quality data

4. **Type Checking**
   - Strict type validation for all fields
   - Array vs string vs boolean enforcement

### Outlier Detection
- Suspiciously fast completion times flagged (< 30 seconds)
- Contradictory answers tracked for review
- Session ID tracking for duplicate submissions

## Email Forwarding Setup

### performance@evzain.com → viliopoulo@gmail.com

**Configuration Location:** Domain DNS/Email settings (Vercel or email provider)

**Steps:**
1. Log in to your domain provider (where evzain.com is registered)
2. Navigate to Email Forwarding or Email Routing settings
3. Add forwarding rule:
   - From: `performance@evzain.com`
   - To: `viliopoulo@gmail.com`
4. Verify forwarding is active (send test email)

**Common Providers:**
- **Vercel Domains**: Dashboard → Domains → evzain.com → Email Forwarding
- **Cloudflare**: Dashboard → Email → Email Routing → Create Address
- **Google Workspace**: Admin Console → Email → Routing → Add Rule
- **Namecheap**: Dashboard → Domain List → Manage → Redirect Email

**Testing:**
```bash
# Send test email
curl -X POST https://evzain.com/api/send-email \
  -H "Content-Type: application/json" \
  -d '{"to":"performance@evzain.com","type":"test","data":{}}'
```

## Feedback Loop for Model Training

### Data Export for Training
```sql
-- Export assessment data for analysis
SELECT 
  sport,
  level,
  athlete_segment,
  commitment_level,
  primary_focus,
  goals,
  frustrations,
  mental_challenges,
  willingness_to_pay,
  reading_habits
FROM assessment_responses
WHERE completed_at IS NOT NULL
ORDER BY created_at DESC;
```

### Key Metrics Dashboard
```sql
-- View aggregated insights
SELECT * FROM assessment_insights;

-- Conversion funnel
SELECT 
  source,
  COUNT(*) as signups,
  COUNT(DISTINCT email) as unique_emails
FROM waitlist_signups
GROUP BY source;

-- Assessment completion rate
SELECT 
  COUNT(*) as started,
  COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END) as completed,
  ROUND(100.0 * COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END) / COUNT(*), 2) as completion_rate
FROM assessment_responses;
```

### Training Data Quality
- **Clean Data**: All validation ensures structured, consistent data
- **Rich Context**: 13+ data points per user including psychographics
- **Segmentation**: Auto-computed segments enable cohort analysis
- **Feedback Signals**: Willingness to pay, reading habits indicate engagement quality

### Continuous Improvement Loop
1. **Collect**: APIs capture all user interactions
2. **Validate**: Guardrails filter noise and spam
3. **Analyze**: Supabase views aggregate patterns
4. **Insights**: Identify common pain points, successful segments
5. **Iterate**: Update decision trees, blueprint templates, LLM prompts
6. **Deploy**: Push improvements to production

## Integration with LLM/Decision Trees

### Context Enhancement
Assessment data enriches LLM prompts:
```javascript
const context = {
  athleteSegment: assessment.athlete_segment,
  primaryFocus: assessment.primary_focus,
  commitmentLevel: assessment.commitment_level,
  topFrustrations: assessment.frustrations.slice(0, 3),
  mentalChallenges: assessment.mental_challenges
};

// Use in prompt
const prompt = `
Generate training blueprint for ${context.athleteSegment} athlete
Focus: ${context.primaryFocus}
Top challenges: ${context.topFrustrations.join(', ')}
...
`;
```

### Decision Tree Routing
```javascript
// Route to appropriate blueprint template
if (athleteSegment === 'elite' && primaryFocus === 'competition') {
  template = 'elite_competition_blueprint';
} else if (needsInjurySupport) {
  template = 'comeback_blueprint';
} else {
  template = 'standard_blueprint';
}
```

## Next Steps

### Phase 1: Data Collection (Current)
- ✅ Waitlist API endpoint
- ✅ Assessment API with validation
- ✅ Frontend integration
- ✅ Email forwarding documentation
- ⏳ Test end-to-end flow

### Phase 2: Email Automation
- Add real email service (Resend, SendGrid, AWS SES)
- Trigger welcome emails on waitlist signup
- Send assessment complete emails with insights
- Track email open/click rates

### Phase 3: Analytics & Insights
- Build admin dashboard for data viewing
- Implement web_analytics event tracking
- A/B test different question variations
- Export data for model training

### Phase 4: Model Training Integration
- Export assessment data weekly
- Train on pain point clustering
- Refine decision tree logic based on patterns
- Update blueprint templates with proven strategies

## Security & Privacy

- **HTTPS Only**: All data transmitted securely
- **No PII by Default**: Email is optional for assessments
- **Row Level Security**: Supabase RLS policies restrict access
- **Data Retention**: Define policy for old data cleanup
- **GDPR Compliance**: Add data export/deletion endpoints if needed

## Monitoring

### Health Checks
- `/api/waitlist` (GET) - Returns service status
- `/api/send-email` (GET) - Returns email service status
- `/api/assessments` (GET) - Add health check endpoint

### Key Metrics to Track
- Waitlist signup rate by source
- Assessment start vs completion rate
- Average time to complete assessment
- Distribution of athlete segments
- Willingness to pay by segment

## Support

For issues or questions:
- Email: performance@evzain.com (forwards to viliopoulo@gmail.com)
- Check Supabase logs for database errors
- Check Vercel logs for API errors

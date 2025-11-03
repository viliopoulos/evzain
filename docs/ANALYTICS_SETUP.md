# Analytics Setup Guide

## Overview

EVZAIN analytics can be accessed in two ways:
1. **Local Scripts** (Recommended for MVP) - Private, secure, runs on your machine
2. **Web Dashboard** (Optional) - Password-protected web interface at `/analytics`

---

## Option 1: Local Analytics (Recommended)

### Why Local?
- ✅ **Private**: Data never exposed on the web
- ✅ **Secure**: Requires service role key in `.env.local` (never committed)
- ✅ **Fast**: Direct Supabase queries without API overhead
- ✅ **Exportable**: Generate JSON/CSV for Excel, Google Sheets, or ML training

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Ensure `.env.local` has Supabase credentials**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-key
   ```

3. **Run analytics dashboard**:
   ```bash
   npm run analytics
   ```

   Output:
   ```
   📊 EVZAIN Analytics Dashboard
   ════════════════════════════════════════════════════════════
   
   👥 WAITLIST SIGNUPS
   ────────────────────────────────────────────────────────────
   Total: 15
   Emails Sent: 12
   
   Recent Signups:
     1. athlete1@example.com        | homepage     | 11/2/2025
     2. athlete2@example.com        | assessment   | 11/2/2025
   
   🎯 ASSESSMENTS
   ────────────────────────────────────────────────────────────
   Total Completed: 8
   Avg Completion Time: 6 minutes
   
   By Athlete Segment:
     advanced        ████████████ 5
     intermediate    ████████ 3
   
   📧 EMAIL CAMPAIGNS
   ────────────────────────────────────────────────────────────
   Total Sent: 20
   Opened: 14 (70%)
   Clicked: 5 (25%)
   ```

4. **Export data for analysis**:
   ```bash
   npm run export-data
   ```

   Creates:
   - `data-exports/waitlist-2025-11-02.json`
   - `data-exports/waitlist-2025-11-02.csv`
   - `data-exports/assessments-2025-11-02.json`
   - `data-exports/emails-2025-11-02.json`

   Import CSVs into Excel/Sheets for pivot tables, charts, etc.

---

## Option 2: Web Dashboard (Optional)

### Why Web?
- ✅ **Visual**: Charts and graphs
- ✅ **Real-time**: Auto-refreshes
- ✅ **Shareable**: Can grant access to team members

### Setup

1. **Add Supabase service key to Vercel**:
   - Vercel → Settings → Environment Variables
   - Add: `SUPABASE_SERVICE_ROLE_KEY` = `eyJ...` (from Supabase → Settings → API)
   - Apply to: Production + Preview

2. **Redeploy** (Vercel auto-deploys on push)

3. **Access dashboard**:
   - Go to `https://evzain.com/analytics`
   - Enter password: `evzain2025admin` (change in `/app/analytics/auth-guard.tsx`)

4. **Change password**:
   ```typescript
   // app/analytics/auth-guard.tsx
   const ADMIN_PASSWORD = 'your-secure-password-here';
   ```

---

## Comparison

| Feature | Local Scripts | Web Dashboard |
|---------|--------------|---------------|
| **Privacy** | ✅ Fully private | ⚠️ Password-protected |
| **Speed** | ✅ Instant | ⚠️ Requires page load |
| **Export** | ✅ JSON/CSV | ❌ Manual copy |
| **Visualization** | ❌ Terminal only | ✅ Charts/graphs |
| **Team Access** | ❌ Requires local setup | ✅ Share password |
| **Cost** | ✅ Free | ✅ Free (uses Vercel) |

---

## Data Tables

### `waitlist_signups`
- `id`: UUID
- `email`: User email
- `source`: Where they signed up (homepage, assessment, etc.)
- `created_at`: Timestamp
- `email_sent`: Boolean (was welcome email sent?)
- `email_sent_at`: Timestamp of email send

### `assessment_responses`
- `id`: UUID
- `email`: Optional user email
- `sport`, `level`, `training_hours`: Assessment answers
- `goals`, `frustrations`: Array fields
- `athlete_segment`: Computed (elite, advanced, intermediate, beginner)
- `primary_focus`: Computed (competition, skill_mastery, fitness, etc.)
- `time_spent_seconds`: Completion time
- `completed_at`: Timestamp

### `email_campaign_log`
- `id`: UUID
- `recipient_email`: Who received the email
- `campaign_type`: waitlist_welcome, assessment_complete, blueprint_delivery
- `subject`, `body`: Email content
- `sent_at`: Timestamp
- `opened_at`, `clicked_at`: Engagement timestamps
- `status`: sent, delivered, opened, clicked, bounced, failed

---

## Troubleshooting

### "Analytics service not configured"
- **Cause**: Missing `SUPABASE_SERVICE_ROLE_KEY` in Vercel env vars
- **Fix**: Add the key in Vercel → Settings → Environment Variables → Redeploy

### "Failed to load analytics"
- **Cause**: Supabase `assessment_insights` view is broken
- **Fix**: Run the migration in Supabase SQL Editor:
  ```sql
  -- Copy from: supabase/migrations/20241103000000_fix_assessment_insights_view.sql
  ```

### Local scripts error: "Missing Supabase credentials"
- **Cause**: `.env.local` missing or incomplete
- **Fix**: Create `.env.local` with:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=eyJ...
  ```

---

## Security Best Practices

1. **Never commit** `.env.local` (already in `.gitignore`)
2. **Never share** service role key publicly
3. **Change** web dashboard password from default
4. **Rotate** Supabase keys if compromised (Supabase → Settings → API → Revoke)
5. **Use local scripts** for sensitive data analysis

---

## Future Enhancements

### Authentication System
- Replace password gate with proper auth (NextAuth.js, Supabase Auth)
- Role-based access (admin, analyst, viewer)
- Audit logs for who accessed analytics

### Advanced Visualizations
- Time-series charts (signups over time)
- Funnel analysis (homepage → waitlist → assessment → results)
- Cohort analysis (First 50 vs. general users)
- Heatmaps (drop-off points in assessment)

### Data Export Automation
- Scheduled exports (daily CSV to Google Drive)
- Webhook notifications (Slack alerts for new signups)
- Integration with analytics tools (Mixpanel, Amplitude)

---

## Contact

For analytics questions or data requests:
- Email: performance@evzain.com
- Run local scripts for immediate insights
- Check Supabase directly for raw data queries

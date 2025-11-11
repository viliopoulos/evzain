# EVZAIN Data Capture & Storage Flow

## Overview
All user data flows through **Supabase** (`web_analytics` table) and is captured at key interaction points.

---

## 1. Data Collection Points

### A. Waitlist Signups (Home Page)
**Location:** `/app/page.tsx` → Email form at bottom  
**Event Type:** `waitlist_signup`  
**Data Captured:**
- Email address
- Timestamp
- Session ID (if available)

**Storage:**
```javascript
POST /api/waitlist
→ Supabase: web_analytics table
  {
    event_type: 'waitlist_signup',
    session_id: sessionId,
    data: { email, timestamp }
  }
```

### B. Assessment Submissions
**Location:** `/app/assessment/page.tsx` → Full survey completion  
**Event Type:** `assessment_submitted`  
**Data Captured:**
- All survey responses (sport, level, goals, hours, frustrations, etc.)
- Timestamp
- Session ID
- Assessment ID (auto-generated)

**Storage:**
```javascript
POST /api/assessments/route.ts
→ Supabase: assessments table
  {
    sport, level, goals, training_hours, 
    frustrations, progress_tracking, motivation,
    injury_history, recovery_focus, mental_training,
    created_at, session_id
  }
→ localStorage: 'assessmentData', 'assessmentId'
```

### C. Profile Requests (Post-Assessment)
**Location:** `/app/complete/page.tsx` → Name/email capture  
**Event Type:** `profile_request`  
**Data Captured:**
- Name
- Email
- Full assessment data (from localStorage)
- Session ID
- Completion timestamp

**Storage:**
```javascript
POST /api/send-profile/route.ts
→ Supabase: web_analytics table
  {
    event_type: 'profile_request',
    session_id: sessionId,
    data: {
      email,
      name,
      assessment_summary: {...},
      completed_at: timestamp
    }
  }
```

---

## 2. Supabase Tables

### `web_analytics`
**Purpose:** Track all user interactions and events  
**Schema:**
- `id` (uuid, primary key)
- `event_type` (text) — e.g., 'waitlist_signup', 'profile_request'
- `session_id` (text) — browser session identifier
- `data` (jsonb) — flexible event-specific data
- `created_at` (timestamp)

**Query Examples:**
```sql
-- All waitlist signups
SELECT * FROM web_analytics WHERE event_type = 'waitlist_signup';

-- Profile requests with emails
SELECT 
  data->>'email' as email,
  data->>'name' as name,
  created_at
FROM web_analytics 
WHERE event_type = 'profile_request'
ORDER BY created_at DESC;
```

### `assessments`
**Purpose:** Store full assessment survey responses  
**Schema:**
- `id` (uuid, primary key)
- `session_id` (text)
- `sport` (text)
- `level` (text) — beginner, intermediate, advanced, elite
- `goals` (text[]) — array of selected goals
- `training_hours` (text) — e.g., "5-10", "10-15", "20+"
- `frustrations` (text[])
- `progress_tracking` (text)
- `motivation` (text)
- `injury_history` (text)
- `recovery_focus` (text)
- `mental_training` (text)
- `sport_other` (text) — if sport === 'other'
- `created_at` (timestamp)

**Query Examples:**
```sql
-- Recent assessments
SELECT * FROM assessments ORDER BY created_at DESC LIMIT 50;

-- Sport distribution
SELECT sport, COUNT(*) 
FROM assessments 
GROUP BY sport 
ORDER BY COUNT(*) DESC;

-- Athletes training 20+ hours/week
SELECT * FROM assessments WHERE training_hours = '20+';
```

---

## 3. Data Flow Diagram

```
User Journey:
┌─────────────────────────────────────────────────────────────┐
│ 1. HOME PAGE                                                 │
│    - Email signup → /api/waitlist → web_analytics           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. ASSESSMENT                                                │
│    - 15 questions → Submit → /api/assessments → assessments │
│    - Store in localStorage for next page                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. COMPLETE PAGE (/complete)                                │
│    - Name + Email form                                      │
│    - Submit → /api/send-profile → web_analytics            │
│    - Includes full assessment data from localStorage        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. THANK YOU                                                 │
│    - Confirmation message                                   │
│    - (Future: Email with profile snapshot)                  │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Accessing Your Data

### Via Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click "Table Editor" in sidebar
4. View tables: `web_analytics`, `assessments`
5. Use SQL Editor for custom queries

### Via API (Admin Dashboard - Future)
- Create `/app/admin/dashboard/page.tsx`
- Password-protected admin view
- Query Supabase for:
  - Total submissions
  - Sport breakdown
  - Goals distribution
  - Export to CSV

### Via Export Script
```bash
npm run export-data
# Creates CSV files in /exports/ folder
```

---

## 5. Environment Variables Required

```env
# Supabase (public + service role)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

# Resend (for future email features)
RESEND_API_KEY=re_...
```

---

## 6. Data Privacy & Security

### Current Implementation:
- ✅ No passwords stored
- ✅ Email/name only collected with consent
- ✅ Session IDs are anonymized browser identifiers
- ✅ Assessment data stored separately from contact info
- ✅ Supabase Row Level Security (RLS) enabled

### Future Enhancements:
- [ ] GDPR compliance page
- [ ] Data deletion requests
- [ ] Email unsubscribe flow
- [ ] Explicit opt-in for marketing

---

## 7. Testing Data Flow

### Test the full flow:
```bash
# Start dev server
npm run dev

# 1. Visit http://localhost:3000
# 2. Submit waitlist email → Check Supabase web_analytics

# 3. Click "Start Assessment" → Complete all questions
# 4. Submit → Check Supabase assessments table

# 5. Enter name/email on /complete
# 6. Submit → Check Supabase web_analytics (profile_request)
```

### Verify data in Supabase:
```sql
-- Latest 10 events
SELECT * FROM web_analytics ORDER BY created_at DESC LIMIT 10;

-- Latest 10 assessments
SELECT id, sport, level, goals, created_at 
FROM assessments 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 8. Common Issues

### Assessment not appearing in Supabase
- Check browser console for errors
- Verify `.env.local` has correct Supabase credentials
- Check Supabase RLS policies allow INSERT

### /complete page error
- ✅ **FIXED:** Removed server-side import in client component
- API route now handles data storage
- Check `/api/send-profile/route.ts` logs

### Session ID missing
- Generated on first page load via `crypto.randomUUID()`
- Stored in localStorage as 'sessionId'
- Persists across pages in same browser session

---

## 9. Next Steps

### Short-term:
- [ ] Add email sending via Resend API in `/api/send-profile`
- [ ] Create 3 athlete profile types (Competitor, Developer, Balanced)
- [ ] Build admin dashboard for viewing data

### Long-term:
- [ ] Real-time analytics dashboard
- [ ] Email automation (welcome, reminders)
- [ ] A/B testing on survey questions
- [ ] Export to Google Sheets/Airtable integration

---

**Status:** ✅ Data capture fully operational  
**Storage:** Supabase (`web_analytics`, `assessments` tables)  
**Access:** Via Supabase dashboard or SQL queries  
**Privacy:** Compliant with basic best practices

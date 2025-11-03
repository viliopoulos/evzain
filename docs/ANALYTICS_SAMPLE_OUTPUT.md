# Analytics Dashboard Sample Output

## Local Terminal Output (`npm run analytics`)

```
📊 EVZAIN Analytics Dashboard

════════════════════════════════════════════════════════════

👥 WAITLIST SIGNUPS
────────────────────────────────────────────────────────────
Total: 12
Emails Sent: 10

Recent Signups:
  1. athlete1@example.com          | homepage     | 11/2/2025
  2. athlete2@example.com          | assessment   | 11/2/2025
  3. viliopoulo@gmail.com          | final-test   | 11/2/2025
  4. athlete4@example.com          | homepage     | 11/1/2025
  5. athlete5@example.com          | homepage     | 11/1/2025
  6. athlete6@example.com          | assessment   | 11/1/2025
  7. athlete7@example.com          | homepage     | 10/31/2025
  8. athlete8@example.com          | homepage     | 10/31/2025
  9. athlete9@example.com          | assessment   | 10/30/2025
  10. athlete10@example.com         | homepage     | 10/30/2025


🎯 ASSESSMENTS
────────────────────────────────────────────────────────────
Total Completed: 8
Avg Completion Time: 6 minutes

By Athlete Segment:
  advanced        ████████████████ 4
  intermediate    ████████████ 3
  beginner        ████ 1

By Primary Focus:
  competition              ████████████████ 3
  skill mastery            ████████████ 2
  general improvement      ████████ 2
  injury recovery          ████ 1


📧 EMAIL CAMPAIGNS
────────────────────────────────────────────────────────────
Total Sent: 18
Opened: 13 (72%)
Clicked: 5 (28%)

By Campaign Type:
  waitlist_welcome         10
  assessment_complete      6
  blueprint_delivery       2

════════════════════════════════════════════════════════════
✅ Analytics fetched successfully
```

---

## Web Dashboard (`https://evzain.com/analytics`)

### Top Metrics (Cards)

```
┌─────────────────────────┐  ┌─────────────────────────┐
│ 👥 Waitlist Signups     │  │ 🎯 Assessments          │
│                         │  │                         │
│       12                │  │        8                │
│ 10 emails sent          │  │ 8 completed             │
└─────────────────────────┘  └─────────────────────────┘

┌─────────────────────────┐  ┌─────────────────────────┐
│ 📧 Emails Sent          │  │ ⏱️ Avg. Completion Time │
│                         │  │                         │
│       18                │  │       6m                │
│ 72% open rate           │  │ Per assessment          │
└─────────────────────────┘  └─────────────────────────┘
```

### Athlete Segments Chart

```
Advanced       ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 4
Intermediate   ▓▓▓▓▓▓▓▓▓▓▓▓ 3
Beginner       ▓▓▓▓ 1
```

### Primary Focus Areas Chart

```
Competition            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 3
Skill Mastery          ▓▓▓▓▓▓▓▓▓▓▓▓ 2
General Improvement    ▓▓▓▓▓▓▓▓ 2
Injury Recovery        ▓▓▓▓ 1
```

### Recent Waitlist Signups Table

```
EMAIL                      SOURCE        DATE
────────────────────────────────────────────────────
athlete1@example.com       homepage      11/2/2025
athlete2@example.com       assessment    11/2/2025
viliopoulo@gmail.com       final-test    11/2/2025
athlete4@example.com       homepage      11/1/2025
athlete5@example.com       homepage      11/1/2025
athlete6@example.com       assessment    11/1/2025
athlete7@example.com       homepage      10/31/2025
athlete8@example.com       homepage      10/30/2025
```

---

## Data Export Output (`npm run export-data`)

```
📦 Exporting EVZAIN data...

✅ Exported 12 waitlist signups
✅ Exported 8 assessments
✅ Exported 18 email logs
✅ Exported waitlist CSV

📁 All data exported to: /Users/bill_iliop/Desktop/athlos-mvp/data-exports
   You can now analyze locally or import into Excel/Google Sheets
```

### Generated Files:
- `data-exports/waitlist-2025-11-02.json` - Full waitlist data
- `data-exports/waitlist-2025-11-02.csv` - Spreadsheet-ready
- `data-exports/assessments-2025-11-02.json` - All assessment responses
- `data-exports/emails-2025-11-02.json` - Email campaign logs

### Sample CSV (waitlist-2025-11-02.csv):
```csv
email,source,created_at,email_sent
athlete1@example.com,homepage,2025-11-02T10:23:45Z,true
athlete2@example.com,assessment,2025-11-02T09:15:32Z,true
viliopoulo@gmail.com,final-test,2025-11-02T08:45:21Z,true
```

---

## Key Insights for First 50 Cohort

### Conversion Funnel
- **Homepage → Waitlist**: 12 signups
- **Waitlist → Assessment**: 8 completions (67% conversion)
- **Assessment → Roadmap Save**: 2 emails (25% conversion)

### Engagement Metrics
- **Email Open Rate**: 72% (industry avg: 20-25%)
- **Email Click Rate**: 28% (industry avg: 2-5%)
- **Avg Assessment Time**: 6 minutes (target: 5-8 minutes)

### Athlete Demographics
- **Most Common Segment**: Advanced (50%)
- **Most Common Focus**: Competition (38%)
- **Most Common Source**: Homepage (67%)

### Action Items
1. ✅ Email engagement is excellent (72% open rate)
2. 🎯 Improve assessment → roadmap save conversion (currently 25%)
3. 📊 Track drop-off points in assessment flow
4. 🔄 Follow up with advanced athletes for testimonials

---

## How to Access

### Local Analytics (Recommended)
```bash
# 1. Ensure .env.local has credentials
# 2. Run analytics
npm run analytics

# 3. Export data for spreadsheet analysis
npm run export-data
```

### Web Dashboard (Optional)
1. Go to `https://evzain.com/analytics`
2. Enter password: `evzain2025admin`
3. View real-time metrics

---

## Next Steps

1. **Fix Supabase Key**: Replace anon key with service role key in Vercel
2. **Run Migration**: Fix `assessment_insights` view in Supabase SQL Editor
3. **Test Analytics**: Run `npm run analytics` to see live data
4. **Monitor Daily**: Track first 50 cohort progress
5. **Export Weekly**: Use `npm run export-data` for analysis

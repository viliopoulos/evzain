# EVZAIN MVP - Quick Start Guide

## 🚀 What's Working Now

✅ **Email Automation** (Resend)
- Waitlist welcome emails
- Assessment completion emails  
- Roadmap delivery emails
- All emails send from `performance@evzain.com`
- Forwarding to `viliopoulo@gmail.com` configured

✅ **Beta Access**
- Assessment requires beta code entry
- Codes: `EVZAIN2025`, `ATHLETE`, `EARLY`, `ZETA`

✅ **Analytics**
- Local scripts for private data analysis
- Password-protected web dashboard (optional)

✅ **Data Capture**
- Waitlist signups → `waitlist_signups` table
- Assessment responses → `assessment_responses` table
- Email logs → `email_campaign_log` table

---

## 🔧 Remaining Setup (5 minutes)

### 1. Fix Supabase Analytics View
**Why**: The old view has broken SQL syntax  
**Impact**: Analytics dashboard won't load until fixed

**Steps**:
1. Open Supabase → SQL Editor
2. Copy the migration from clipboard (already copied) or from:
   `/supabase/migrations/20241103000000_fix_assessment_insights_view.sql`
3. Paste and click **Run**
4. Confirm "Success"

### 2. Add Supabase Service Key to Vercel (for web analytics)
**Why**: Web dashboard needs service key to query data  
**Impact**: `/analytics` page will show "service not configured" error

**Steps**:
1. Supabase → Settings → API → Copy `service_role` key (starts with `eyJ...`)
2. Vercel → Settings → Environment Variables → Add:
   - **Name**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: `eyJ...` (paste the key)
   - **Environments**: Production + Preview
3. Redeploy (auto-triggers on push)

### 3. Test Local Analytics (Recommended)
**Why**: Private, secure way to view data without exposing on web

**Steps**:
```bash
npm run analytics
```

You'll see:
```
📊 EVZAIN Analytics Dashboard
════════════════════════════════════════════════════════════

👥 WAITLIST SIGNUPS
Total: X
Emails Sent: Y
...
```

---

## 📊 Analytics Options

### Option A: Local Scripts (Recommended for MVP)
**Pros**: Private, secure, exportable  
**Cons**: Terminal-only, no charts

```bash
# View analytics
npm run analytics

# Export data to JSON/CSV
npm run export-data
```

### Option B: Web Dashboard (Optional)
**Pros**: Visual charts, real-time  
**Cons**: Requires password, exposed on web

1. Go to `https://evzain.com/analytics`
2. Enter password: `evzain2025admin`
3. View metrics

**Change password**:
Edit `/app/analytics/auth-guard.tsx`:
```typescript
const ADMIN_PASSWORD = 'your-secure-password';
```

---

## 📧 Email Setup Summary

### Sending (Resend)
- ✅ Configured and working
- ✅ Sends from `performance@evzain.com`
- ✅ 100 emails/day free tier

### Receiving (Namecheap)
- ✅ Forwarding configured: `performance@evzain.com` → `viliopoulo@gmail.com`
- ✅ All incoming emails land in your Gmail

### Replying as performance@evzain.com (Optional)
**Option 1**: Add Resend SMTP to Gmail
1. Gmail → Settings → Accounts → "Send mail as"
2. Add: `EVZAIN <performance@evzain.com>`
3. SMTP: `smtp.resend.com`, Port: `587`
4. Username: `resend`
5. Password: `re_ZBonKard_5KqFGHNeSe4X2BMP3DdMx8Tu`

**Option 2**: Just reply from `viliopoulo@gmail.com` (simpler for MVP)

---

## 🧪 Testing Checklist

- [ ] Submit waitlist form → receive welcome email
- [ ] Complete assessment → receive completion email
- [ ] Save roadmap on results page → receive delivery email
- [ ] Check Supabase tables for new entries
- [ ] Run `npm run analytics` to view metrics
- [ ] Visit `/analytics` (after adding service key)

---

## 🔐 Beta Codes

Share with first 50 users:
- `EVZAIN2025`
- `ATHLETE`
- `EARLY`
- `ZETA`

Users without a code see a gate screen with link to request access.

---

## 📁 Key Files

### Email Templates
`/lib/email/templates.ts` - All 3 email templates (waitlist, assessment, roadmap)

### Analytics
- `/scripts/analytics.ts` - Local analytics script
- `/scripts/export-data.ts` - Data export script
- `/app/analytics/page.tsx` - Web dashboard
- `/app/api/analytics/route.ts` - Analytics API

### Beta Access
- `/app/assessment/beta-guard.tsx` - Beta code gate
- `/app/analytics/auth-guard.tsx` - Analytics password gate

### Documentation
- `/docs/EMAIL_CLARIFICATION.md` - Email setup explained
- `/docs/ANALYTICS_SETUP.md` - Analytics guide
- `/docs/PHASE_2_IMPLEMENTATION.md` - Full implementation docs

---

## 🐛 Troubleshooting

### "Failed to load analytics" on web dashboard
- **Cause**: Missing `SUPABASE_SERVICE_ROLE_KEY` in Vercel
- **Fix**: Add the key (see step 2 above)

### Local analytics script errors
- **Cause**: Missing `.env.local` file
- **Fix**: Create `.env.local` with:
  ```
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=eyJ...
  ```

### Emails not sending
- **Cause**: Resend API key not in Vercel env vars
- **Fix**: Verify `RESEND_API_KEY` is set in Vercel → Settings → Environment Variables

### Old Supabase view error
- **Cause**: Migration not run yet
- **Fix**: Run the SQL migration in Supabase SQL Editor (see step 1)

---

## 🎯 Next Steps

1. ✅ Run Supabase migration (5 min)
2. ✅ Add service key to Vercel (2 min)
3. ✅ Test local analytics: `npm run analytics`
4. ✅ Test email flow: Submit waitlist form
5. ✅ Share beta codes with first users
6. 📊 Monitor analytics daily during MVP phase
7. 📧 Reply to user emails as they come in

---

## 📞 Support

- **Email Issues**: Check Resend dashboard → Logs
- **Analytics Issues**: Run local scripts first to isolate problem
- **Data Questions**: Use `npm run export-data` for CSV analysis

---

**Status**: Phase 2 Complete ✅  
**Ready for**: First 50 cohort testing  
**Next Phase**: Authentication system (post-MVP)

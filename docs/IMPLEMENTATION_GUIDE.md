# EVZAIN Implementation Guide

## What We Built

### 1. UI/UX Improvements ✅

#### Homepage (`/app/page.tsx`)
- **Zeta watermark**: Subtle Greek ζ background in "Join the Revolution" section
- **Enhanced CTA**: "Unlock Your Potential Now" button with improved styling and hover effects
- **Clickable "Built by" link**: Footer text now links to `/origins` page
- **Subtle zeta icon**: Top-right header with link to origins

#### Origins Page (`/app/origins/page.tsx`)
- **Removed back button**: Logo now clickable to return home
- **Repositioned zeta**: Moved after "Origins" text in header
- **Streamlined content**: Removed footer/email signup, ends with founder note
- **Clean narrative**: Hero → Story → Research → Founder Note

#### Assessment Page (`/app/assessment/page.tsx`)
- **Filtered sports**: Only 5 selected sports (Tennis, Basketball, Soccer, Fitness, Weight Training)
- **Multiple goal selection**: Q3 now allows selecting multiple goals
- **New progress tracking question**: Q4 captures awareness without workout component
- **Conditional injury questions**: Q5 appears only if "comeback" goal selected
- **Reading habits question**: Added to Q12 to tailor content delivery
- **Updated to 13 questions**: Dynamic question count based on responses

---

### 2. Data Collection System ✅

#### Database Schema (`/supabase/migrations/20241018210000_data_collection_system.sql`)

**Tables Created**:
1. **`waitlist_signups`**
   - Captures email, source, timestamp
   - Tracks if welcome email sent
   - Unique constraint on email

2. **`assessment_responses`**
   - Complete survey data with all 13 questions
   - Derived fields: `athlete_segment`, `commitment_level`, `primary_focus`
   - Tracks completion time
   - Supports anonymous (session_id) or identified (email) responses

3. **`web_analytics`**
   - Event tracking (page views, clicks, form submits)
   - Session-based tracking
   - Flexible JSONB for event data

4. **`email_campaign_log`**
   - All emails sent through platform
   - Tracks opens, clicks, bounces
   - Campaign type categorization

**Views & Functions**:
- `assessment_insights` view for dashboard analytics
- `categorize_athlete_segment()` function
- `categorize_commitment_level()` function
- Auto-trigger to compute derived fields on insert

---

### 3. Data Collection Library (`/lib/data-collection.ts`)

**Key Functions**:
```typescript
// Waitlist management
addToWaitlist(email, source) // Adds to DB + triggers welcome email

// Assessment submission
submitAssessment(data, email) // Saves response + triggers completion email

// Analytics tracking
trackEvent(eventType, eventData) // Logs web analytics
trackPageView(pageName)
trackButtonClick(buttonName, location)

// Session management
getSessionId() // Anonymous user tracking
initAssessmentTracking() // Start time tracking
```

---

### 4. Email Automation (`/app/api/send-email/route.ts`)

**Email Templates**:
1. **Waitlist Welcome**
   - Subject: "Welcome to the EVZAIN Movement ζ"
   - Branded HTML template
   - CTA to take assessment
   - Personal tone from founder

2. **Assessment Complete**
   - Subject: "Your EVZAIN Training Blueprint is Ready"
   - Includes athlete profile summary
   - Next steps outlined
   - CTA to view results

**Integration Points**:
- Currently logs to database
- Ready for email service integration (Resend, SendGrid, etc.)
- Tracks email status in `email_campaign_log`

---

### 5. Decision Tree Logic (`/docs/DECISION_TREE_LOGIC.md`)

**Core Components**:
1. **Athlete Segmentation**: Beginner → Intermediate → Advanced → Elite
2. **Goal-Driven Pathways**: Different recommendations based on primary goal
3. **Progress Tracking Awareness**: Tailored tracking systems
4. **Reading Habits**: Content delivery style adaptation
5. **Mental Training**: Conditional based on challenges identified
6. **Research Foundation**: Links to sports science, biomechanics, recovery, psychology

**Recommendation Algorithm**:
- Multi-layered approach (training + tracking + mental + recovery + content)
- Prioritization based on athlete profile
- Research-backed for every recommendation

---

## Next Steps for You

### Immediate (This Week)

1. **Set up Supabase**
   ```bash
   # If not already done
   npx supabase init
   npx supabase start
   
   # Run migrations
   npx supabase db push
   ```

2. **Add environment variables** (`.env.local`)
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key
   NEXT_PUBLIC_SITE_URL=https://evzain.com
   ```

3. **Integrate data collection into pages**
   
   **Homepage** (`/app/page.tsx`):
   ```typescript
   import { addToWaitlist, trackPageView } from '@/lib/data-collection';
   
   useEffect(() => {
     trackPageView('homepage');
   }, []);
   
   const handleEmailSubmit = async (e) => {
     e.preventDefault();
     const result = await addToWaitlist(email, 'homepage');
     if (result.success) {
       alert("You're part of the movement! Check your email.");
       setEmail('');
     }
   };
   ```
   
   **Assessment** (`/app/assessment/page.tsx`):
   ```typescript
   import { submitAssessment, initAssessmentTracking } from '@/lib/data-collection';
   
   useEffect(() => {
     initAssessmentTracking();
   }, []);
   
   const handleSubmit = async () => {
     const result = await submitAssessment(data, email);
     if (result.success) {
       localStorage.setItem('assessmentData', JSON.stringify(result.data));
       window.location.href = '/results';
     }
   };
   ```

4. **Set up email service** (Choose one)
   
   **Option A: Resend** (Recommended - simple, modern)
   ```bash
   npm install resend
   ```
   Update `/app/api/send-email/route.ts`:
   ```typescript
   import { Resend } from 'resend';
   const resend = new Resend(process.env.RESEND_API_KEY);
   
   await resend.emails.send({
     from: 'EVZAIN <hello@evzain.com>',
     to: [to],
     subject: template.subject,
     html: emailBody
   });
   ```
   
   **Option B: SendGrid**
   ```bash
   npm install @sendgrid/mail
   ```

### Short-term (Next 2 Weeks)

5. **Build Results Page** (`/app/results/page.tsx`)
   - Read assessment data from localStorage
   - Display personalized recommendations
   - Use decision tree logic to generate insights
   - CTA to join waitlist if not already

6. **Create Admin Dashboard** (`/app/admin/page.tsx`)
   - View all assessment responses
   - Analyze trends by sport/level
   - Export data for manual review
   - Monitor waitlist growth
   
   **Quick queries to use**:
   ```sql
   -- View all responses
   SELECT * FROM assessment_responses ORDER BY created_at DESC;
   
   -- Insights by sport
   SELECT * FROM assessment_insights;
   
   -- Waitlist growth
   SELECT DATE(created_at), COUNT(*) 
   FROM waitlist_signups 
   GROUP BY DATE(created_at) 
   ORDER BY DATE(created_at) DESC;
   
   -- Most common goals
   SELECT unnest(goals) as goal, COUNT(*) 
   FROM assessment_responses 
   GROUP BY goal 
   ORDER BY COUNT(*) DESC;
   ```

7. **Implement Recommendation Engine**
   - Create `/lib/recommendation-engine.ts`
   - Implement decision tree logic from docs
   - Build recommendation templates
   - Test with first 10 users manually

### Medium-term (Next Month)

8. **A/B Testing Setup**
   - Test different CTAs
   - Test question ordering
   - Test email subject lines
   - Track conversion rates

9. **Content Creation**
   - Write recommendation templates for each pathway
   - Create research database
   - Build content library (articles, videos, guides)
   - Match content to reading habits

10. **User Feedback Loop**
    - Add feedback form to results page
    - Track recommendation adherence
    - Measure satisfaction scores
    - Iterate on decision tree

---

## How to Use the System

### For Manual MVP (First 10-30 Users)

1. **User completes assessment** → Data saved to `assessment_responses`
2. **You review in Supabase dashboard** → Analyze their profile
3. **You manually create recommendations** → Based on decision tree logic
4. **You send personalized email** → Using insights from assessment
5. **You track their progress** → Follow-up emails, check-ins
6. **You refine the algorithm** → Based on what works

### For Semi-Automated (Next Phase)

1. **User completes assessment** → Auto-saved
2. **System generates recommendations** → Using recommendation engine
3. **You review and approve** → Quality check before sending
4. **System sends email** → Automated with your approval
5. **System tracks engagement** → Opens, clicks, replies
6. **You analyze patterns** → Refine templates

### For Fully Automated (12-18 Months)

1. **User completes assessment** → Auto-saved
2. **AI generates recommendations** → Based on validated patterns
3. **System sends immediately** → No manual review
4. **AI adapts based on feedback** → Continuous improvement
5. **You monitor dashboard** → High-level oversight

---

## Key Metrics Dashboard (Build This)

### Acquisition
- Waitlist signups per day/week
- Source breakdown (homepage, origins, assessment)
- Conversion rate (visitor → waitlist)

### Engagement
- Assessment completion rate
- Average time to complete
- Drop-off points (which questions lose people)

### Insights
- Most common sport/level combinations
- Top goals selected
- Common frustrations
- Mental challenges frequency
- Willingness to pay distribution

### Quality
- Email open rates
- Email click rates
- User satisfaction scores
- Recommendation adherence

---

## Research Integration

Create a research database with this structure:

```typescript
interface ResearchPaper {
  id: string;
  title: string;
  authors: string[];
  year: number;
  category: 'sports_science' | 'biomechanics' | 'recovery' | 'psychology';
  key_findings: string[];
  application: string; // How it applies to EVZAIN
  recommendation_ids: string[]; // Which recommendations use this
  citation: string;
  link?: string;
}
```

**Priority papers to add**:
1. Ericsson - Deliberate Practice
2. Seiler - Polarized Training
3. Mujika & Padilla - Tapering
4. Gardner & Moore - Mindfulness in Sport
5. Issurin - Block Periodization
6. Kyritsis et al. - Return to Sport
7. Locke & Latham - Goal Setting
8. Deci & Ryan - Self-Determination Theory

---

## Testing Checklist

- [ ] Waitlist signup works (homepage, origins, assessment)
- [ ] Welcome email sends and looks good
- [ ] Assessment saves all data correctly
- [ ] Derived fields compute properly (segment, commitment, focus)
- [ ] Conditional questions appear/hide correctly
- [ ] Assessment complete email sends
- [ ] Web analytics tracks events
- [ ] Session ID persists across pages
- [ ] Data appears in Supabase dashboard
- [ ] Email campaign log updates

---

## Common Issues & Solutions

**Issue**: Supabase connection fails
- **Solution**: Check environment variables, ensure Supabase project is running

**Issue**: Emails not sending
- **Solution**: Check API route logs, verify email service API key

**Issue**: Assessment data not saving
- **Solution**: Check browser console for errors, verify Supabase RLS policies

**Issue**: Derived fields not computing
- **Solution**: Check trigger function, ensure it's enabled on table

---

*Let's fucking do this! 🚀*

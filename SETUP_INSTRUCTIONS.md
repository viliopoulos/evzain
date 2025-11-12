# Setup Instructions - Fix Password & Email Issues

## 🔐 1. Remove Vercel Password/Deployment Protection

### The Issue:
You're seeing a password page even though "Password Protection" is disabled. This is because **Deployment Protection** is a separate feature.

### Fix Steps:
1. Go to https://vercel.com/dashboard
2. Select your **evzain** project
3. Click **Settings** → **Deployment Protection**
4. You'll see one of these options:
   - **Standard Protection** (requires login)
   - **Only Vercel and Supabase**
   - **Off**

5. **Change it to "Off"** or **"Only Vercel and Supabase"**
6. Click **Save**
7. **Redeploy** your site (Settings → Deployments → Redeploy latest)

### Result:
✅ No more password page  
✅ Site is publicly accessible  
✅ Ready to share with customers  

---

## 📧 2. Set Up Resend for Email Sending

### Current Issue:
Emails aren't sending because:
- Resend API key may not be configured
- Domain `evzain.com` needs to be verified in Resend

### Setup Steps:

#### Step 1: Create/Login to Resend Account
1. Go to https://resend.com
2. Sign up or log in
3. Go to **API Keys** section

#### Step 2: Add Domain
1. Click **Domains** in sidebar
2. Click **Add Domain**
3. Enter: `evzain.com`
4. Copy the DNS records shown

#### Step 3: Add DNS Records
1. Go to your domain registrar (where you bought evzain.com)
2. Find DNS settings
3. Add the TXT, MX, and CNAME records that Resend gave you
4. Wait 5-15 minutes for DNS propagation
5. Return to Resend and click **Verify Domain**

#### Step 4: Create API Key
1. In Resend, go to **API Keys**
2. Click **Create API Key**
3. Name it: `EVZAIN Production`
4. Select **Full Access**
5. **Copy the key** (starts with `re_`)

#### Step 5: Add to Vercel
1. Go to Vercel Dashboard
2. Select **evzain** project
3. Go to **Settings** → **Environment Variables**
4. Add new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** `re_your_actual_key_here`
   - **Environments:** Production, Preview, Development
5. Click **Save**
6. **Redeploy** your site

### Verify Email Sender
Make sure your "from" address uses your verified domain:
- ✅ `hello@evzain.com`
- ✅ `noreply@evzain.com`
- ❌ `hello@gmail.com` (won't work)

---

## 🧪 3. Test Everything

### Test Waitlist Flow:
1. Visit evzain.com (should load without password)
2. Scroll to bottom "Join the Waitlist" section
3. Enter your email
4. Submit
5. Check your email inbox for welcome message
6. Check Vercel logs for console output (🎯, 📧, ✅)

### Test Assessment Flow:
1. Click "Start Your Assessment"
2. Complete all 15 questions
3. Submit → Redirected to `/complete`
4. Enter name + email
5. Submit
6. **Open browser console** (F12 or Cmd+Option+I)
7. Look for emoji logs: 🚀, 📧, ✅
8. Check your email for profile
9. Check Supabase `web_analytics` table

### Check Logs in Vercel:
1. Vercel Dashboard → Your Project
2. Click **Logs** tab
3. Filter by "Error" or search for "📧"
4. Look for:
   - ✅ "Email sent successfully"
   - ❌ "RESEND_API_KEY not configured"
   - ❌ "Email send error"

---

## 📊 4. Check Supabase Data

### Query Recent Submissions:
```sql
-- Profile requests with emails
SELECT 
  data->>'email' as email,
  data->>'name' as name,
  data->>'assessment_summary' as data,
  created_at
FROM web_analytics 
WHERE event_type = 'profile_request'
ORDER BY created_at DESC
LIMIT 10;

-- Waitlist signups
SELECT 
  email,
  source,
  created_at
FROM waitlist_signups 
ORDER BY created_at DESC
LIMIT 10;
```

---

## 🎨 5. Creative Updates Applied

✅ **"Join the Revolution"** - Now 3xl/4xl, bold  
✅ **"Your Journey Starts Here:"** - Now 2xl/3xl, bold  
✅ **Private & Secure, 5 Minutes, Instant Insights** - Larger text, bold, bigger dots  
✅ **"Start Your Assessment" button** - Bigger (text-xl, py-5), bold, larger icons  

---

## 🐛 6. Debugging Email Issues

### If emails still don't send:

**Check browser console for logs:**
```
🚀 Starting submission...
📧 Email: user@example.com
👤 Name: John
📊 Assessment data: {...}
📤 Sending payload: {...}
📥 Response status: 200
📥 Response data: {emailSent: true/false, emailError: "..."}
```

**Check Vercel Function Logs:**
```
🎯 API: send-profile called
📧 Received email: user@example.com
👤 Received name: John
✅ Data saved to Supabase
📧 Preparing to send email...
📧 Generating email HTML...
📧 Sending email via Resend...
✅ Email sent successfully! {id: "..."}
```

**Common Errors:**

1. **"RESEND_API_KEY not configured"**
   - Solution: Add `RESEND_API_KEY` to Vercel environment variables

2. **"Domain not verified"**
   - Solution: Complete DNS verification in Resend dashboard

3. **"Invalid 'from' address"**
   - Solution: Use `hello@evzain.com` (your verified domain)

4. **"Rate limit exceeded"**
   - Solution: Wait a few minutes, Resend has rate limits for new accounts

---

## ✅ Final Checklist

- [ ] Deployment Protection set to "Off" in Vercel
- [ ] Domain `evzain.com` added and verified in Resend
- [ ] DNS records added to domain registrar
- [ ] `RESEND_API_KEY` added to Vercel environment variables
- [ ] Site redeployed after adding env variable
- [ ] Tested waitlist signup → received email
- [ ] Tested assessment → received profile email
- [ ] Checked Supabase for data capture
- [ ] Reviewed Vercel logs for errors

---

## 🚀 Ready to Launch

Once all checklist items are ✅:
1. Site loads without password
2. Waitlist sends welcome emails
3. Assessment sends profile emails
4. Data captured in Supabase
5. Console logs show successful operations

**You're ready to send to customers!**

---

## 💬 Still Having Issues?

**Check these common mistakes:**
1. Forgot to redeploy after adding environment variable
2. Used wrong email domain (not evzain.com)
3. DNS records not propagated yet (wait 15+ minutes)
4. Resend account in sandbox mode (verify production access)
5. Environment variable typo (`RESEND_API_KEY` exactly)

**Debug command:**
```bash
# Check if Resend key is set (in Vercel Function Logs)
console.log('Has Resend key:', !!process.env.RESEND_API_KEY);
```

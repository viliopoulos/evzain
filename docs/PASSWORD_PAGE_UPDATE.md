# Update Password Protection Page Branding

## Current Issue
The password gate on `evzain.com` uses old branding (colors, fonts, logo sizing).

---

## Solution Options

### Option A: Vercel Password Protection (Current Setup)
If you're using Vercel's built-in password protection, the styling is controlled by Vercel and **cannot be fully customized** with your branding.

**Limitations:**
- No control over fonts, colors, or logo size
- Default Vercel UI only
- Basic password prompt

**To Update Logo Size (Limited):**
1. Go to Vercel Dashboard → Your Project
2. Settings → General → Project Avatar
3. Upload a larger version of your EVZAIN logo
4. Vercel will display it at their default size (no 3x control)

**Recommendation:** If you need full branding control, use **Option B** (custom middleware).

---

### Option B: Custom Middleware Password Page (Recommended)
Create a custom password page with your exact branding and control.

#### Step 1: Create Custom Password Page

Create `/app/password/page.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      // Set cookie and redirect
      document.cookie = 'site-password=verified; path=/; max-age=86400';
      router.push('/');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061A35] via-[#0a2347] to-[#061A35] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-[#659832]/30">
        {/* Large Logo - 3x Size */}
        <div className="text-center mb-12">
          <Image 
            src="/EVZAIN white letters green zeta.png" 
            alt="EVZAIN" 
            width={1080} 
            height={270} 
            priority
            className="h-60 md:h-72 w-auto mx-auto mb-6"
          />
          <h1 
            className="text-4xl md:text-5xl font-light text-white mb-4" 
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Private Preview
          </h1>
          <p className="text-slate-300 text-lg">
            Enter password to access EVZAIN
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-6 py-4 bg-white/5 border border-slate-600 rounded-xl text-white text-lg placeholder-slate-500 focus:outline-none focus:border-[#659832] focus:ring-2 focus:ring-[#659832] transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-[#ea9aac] text-sm mt-2">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#659832] to-[#7ab03d] text-white px-8 py-4 rounded-xl hover:from-[#7ab03d] hover:to-[#659832] transition-all font-semibold text-lg shadow-lg shadow-[#659832]/30"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Enter Site
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-8">
          Contact us if you need access
        </p>
      </div>
    </div>
  );
}
```

#### Step 2: Create Password Verification API

Create `/app/api/verify-password/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { password } = await request.json();
  
  // Replace with your actual password
  const correctPassword = process.env.SITE_PASSWORD || 'your-password-here';

  if (password === correctPassword) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
```

#### Step 3: Create Middleware to Check Password

Create `/middleware.ts` in root:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow password page and API routes
  if (
    pathname === '/password' ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/EVZAIN') ||
    pathname.startsWith('/Greek') ||
    pathname.startsWith('/athlete')
  ) {
    return NextResponse.next();
  }

  // Check for password cookie
  const passwordCookie = request.cookies.get('site-password');

  if (passwordCookie?.value === 'verified') {
    return NextResponse.next();
  }

  // Redirect to password page
  return NextResponse.redirect(new URL('/password', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

#### Step 4: Add Environment Variable

Add to `.env.local`:
```env
SITE_PASSWORD=your-actual-password
```

---

### Option C: Cloudflare Access (Enterprise)
If you're using Cloudflare for DNS/CDN, you can use Cloudflare Access:
- Fully customizable login page
- Support for SSO, Google OAuth
- More secure than simple password

**Setup:**
1. Cloudflare Dashboard → Zero Trust → Access
2. Create Access Application
3. Add your domain
4. Configure login page with custom branding CSS

---

## Recommended Approach

**For quick branding control:** Use **Option B** (Custom Middleware)
- ✅ Full control over design, colors, fonts
- ✅ 3x logo size as requested
- ✅ Matches site branding perfectly
- ✅ Still simple password protection

**Steps to implement:**
1. Turn OFF Vercel password protection (Settings → Security)
2. Add the 3 files above to your codebase
3. Set `SITE_PASSWORD` in `.env.local`
4. Deploy
5. Test at `evzain.com` → should redirect to custom password page

---

## Design Specifications (Custom Page)

Based on your branding requirements:
- **Logo:** 1080×270px displayed at h-60 md:h-72 (3x original)
- **Background:** Navy gradient (#061A35 → #0a2347)
- **Button:** Green gradient (#659832 → #7ab03d)
- **Font:** Cormorant Garamond for headings
- **Error color:** Pink (#ea9aac)
- **Border accent:** Green (#659832) with 30% opacity

---

## Testing Custom Password Page

```bash
# 1. Clear cookies
document.cookie = 'site-password=; Max-Age=0; path=/;'

# 2. Visit site → should redirect to /password
# 3. Enter wrong password → see pink error
# 4. Enter correct password → cookie set, redirect to home
# 5. Refresh → should stay logged in (cookie persists)
```

---

## Current Status

- **Issue:** Vercel password page uses old branding
- **Solution:** Custom middleware + password page (Option B recommended)
- **Files needed:** 
  - `/app/password/page.tsx`
  - `/app/api/verify-password/route.ts`
  - `/middleware.ts`
- **Result:** Fully branded password gate with 3x logo and your colors

---

**Next Action:** Choose Option A (limited) or Option B (full control) and let me know—I'll implement it immediately.

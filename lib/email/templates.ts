export const EMAIL_TEMPLATES = {
  waitlist_welcome: {
    subject: 'Welcome to the EVZAIN Movement ζ',
    getBody: (data?: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 32px; font-weight: 300; color: #0f172a; }
    .logo-accent { font-family: 'Georgia', serif; font-style: italic; color: #10b981; }
    .zeta { font-size: 48px; color: #0891b2; opacity: 0.3; }
    .content { background: #ffffff; padding: 30px; border-radius: 12px; border-left: 4px solid #10b981; }
    .button { display: inline-block; background: linear-gradient(to right, #10b981, #059669); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .footer { text-align: center; margin-top: 40px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">EVZA<span class="logo-accent">IN</span></div>
      <div class="zeta">ζ</div>
    </div>
    
    <div class="content">
      <h2 style="color: #0f172a; margin-top: 0;">You're Part of Something Special</h2>
      
      <p>Thank you for joining the EVZAIN waitlist. You're now part of a movement to democratize elite-level training intelligence.</p>
      
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>We're building EVZAIN with real athletes, for real athletes</li>
        <li>You'll get early access before anyone else</li>
        <li>Your feedback will shape the platform</li>
      </ul>
      
      <p>In the meantime, take our 5-minute assessment to help us understand your training journey better:</p>
      
      <a href="https://evzain.com/assessment" class="button">
        Take the Assessment ζ
      </a>
      
      <p style="margin-top: 30px;">Built by athletes who competed at the highest level, EVZAIN blends ancient wisdom (εὖ ζήν - "living well") with modern AI to help you train smarter and live better.</p>
      
      <p style="margin-top: 30px; color: #64748b; font-style: italic;">
        - The EVZAIN Team
      </p>
    </div>
    
    <div class="footer">
      <p>Questions? Reply to this email or reach out to performance@evzain.com</p>
      <p style="margin-top: 10px;">© ${new Date().getFullYear()} EVZAIN. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  },
  
  assessment_complete: {
    subject: 'Your EVZAIN Training Roadmap is Ready ζ',
    getBody: (data?: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 32px; font-weight: 300; color: #0f172a; }
    .logo-accent { font-family: 'Georgia', serif; font-style: italic; color: #10b981; }
    .content { background: #ffffff; padding: 30px; border-radius: 12px; border-left: 4px solid #0891b2; }
    .insight-box { background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 3px solid #0891b2; }
    .button { display: inline-block; background: linear-gradient(to right, #0891b2, #0e7490); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .footer { text-align: center; margin-top: 40px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">EVZA<span class="logo-accent">IN</span></div>
    </div>
    
    <div class="content">
      <h2 style="color: #0f172a; margin-top: 0;">Your Training Roadmap is Ready ζ</h2>
      
      <p>We've analyzed your responses and mapped out your next steps. Here's what we learned:</p>
      
      <div class="insight-box">
        <h3 style="margin-top: 0; color: #0891b2;">Your Profile</h3>
        <p><strong>Sport:</strong> ${data?.sport || 'Your sport'}</p>
        <p><strong>Level:</strong> ${data?.level || 'Your level'}</p>
        <p><strong>Athlete Segment:</strong> ${data?.athlete_segment || 'Determined'}</p>
        <p><strong>Primary Focus:</strong> ${(data?.primary_focus || 'Your goals').replace(/_/g, ' ')}</p>
      </div>
      
      <p><strong>What's next?</strong></p>
      <ul>
        <li>We're analyzing your responses to create personalized recommendations</li>
        <li>You'll receive early access to EVZAIN when we launch</li>
        <li>We may reach out for a brief conversation to better understand your needs</li>
      </ul>
      
      <p>Your insights are invaluable in helping us build the best training intelligence platform for athletes like you.</p>
      
      <a href="https://evzain.com/results" class="button">
        View Your Roadmap ζ
      </a>
      
      <p style="margin-top: 30px; color: #64748b; font-style: italic;">
        - The EVZAIN Team
      </p>
    </div>
    
    <div class="footer">
      <p>Questions? Reply to this email or reach out to performance@evzain.com</p>
      <p style="margin-top: 10px;">© ${new Date().getFullYear()} EVZAIN. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  },

  blueprint_delivery: {
    subject: 'Your EVZAIN Roadmap – Personalized for You ζ',
    getBody: (data?: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 640px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 32px; font-weight: 300; color: #0f172a; }
    .logo-accent { font-family: 'Georgia', serif; font-style: italic; color: #10b981; }
    .badge { display: inline-block; background: linear-gradient(to right, #10b981, #059669); color: white; padding: 6px 16px; border-radius: 9999px; font-size: 14px; font-weight: 600; }
    .card { background: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 20px 45px -20px rgba(15, 118, 110, 0.35); }
    .focus-box { background: #ecfeff; border-left: 4px solid #0891b2; padding: 18px 20px; border-radius: 12px; margin: 24px 0; }
    .cta { display: inline-block; background: linear-gradient(to right, #0891b2, #0e7490); color: white; padding: 14px 36px; text-decoration: none; border-radius: 9999px; font-weight: 600; margin: 24px 0; }
    .footer { text-align: center; margin-top: 40px; color: #64748b; font-size: 14px; }
    .list { margin: 0; padding-left: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">EVZA<span class="logo-accent">IN</span></div>
      <div class="badge">Personalized Roadmap ζ</div>
    </div>

    <div class="card">
      <h2 style="margin-top: 0; color: #0f172a;">Here’s Your Next Move</h2>
      <p>Based on your assessment, this roadmap is tuned for the way you train, think, and compete.</p>

      <div class="focus-box">
        <p style="margin: 0;"><strong>Sport:</strong> ${data?.sport || 'Your sport'}</p>
        <p style="margin: 8px 0 0 0;"><strong>Level:</strong> ${data?.level || 'Your level'}</p>
        <p style="margin: 8px 0 0 0;"><strong>Primary Focus:</strong> ${(data?.primary_focus || 'Your focus').replace(/_/g, ' ')}</p>
      </div>

      <p><strong>Inside:</strong></p>
      <ul class="list">
        <li>Your elite-influenced training priorities for the next 4-6 weeks</li>
        <li>Mindset recalibration drills to stay locked in under pressure</li>
        <li>Recovery checkpoints to keep you healthy and explosive</li>
      </ul>

      <p style="margin-top: 24px;">You can revisit your roadmap anytime:</p>
      <a href="https://evzain.com/results" class="cta">Open Your Roadmap ζ</a>

      <p style="margin-top: 24px;">We’re progressing the platform daily. Expect upgrades that connect wearables, coach-level tracking, and AI-guided adjustments that learn from every session.</p>

      <p style="margin-top: 32px; color: #64748b; font-style: italic;">Keep going — we’re right there with you.<br />- The EVZAIN Team</p>
    </div>

    <div class="footer">
      <p>Need anything? Reply to this email or reach out to performance@evzain.com</p>
      <p style="margin-top: 10px;">&copy; ${new Date().getFullYear()} EVZAIN. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  }
} as const;

export type EmailTemplateType = keyof typeof EMAIL_TEMPLATES;

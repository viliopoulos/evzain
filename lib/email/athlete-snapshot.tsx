/**
 * Athlete Profile Snapshot Email Template
 * Simple, actionable summary based on assessment inputs
 */

interface AthleteSnapshotProps {
  name: string;
  sport: string;
  level: string;
  primaryGoal: string;
  trainingHours: string;
  assessmentData: any;
}

export function generateAthleteSnapshot({
  name,
  sport,
  level,
  primaryGoal,
  trainingHours,
  assessmentData
}: AthleteSnapshotProps) {
  
  // Determine timeline based on level and goal
  const getTimeline = () => {
    if (level === 'beginner') return '3-6 months';
    if (level === 'intermediate') return '2-4 months';
    if (level === 'advanced') return '6-12 weeks';
    if (level === 'elite') return '4-8 weeks';
    return '2-4 months';
  };

  // Get practice frequency recommendation
  const getPracticeFrequency = () => {
    const hours = trainingHours.toLowerCase();
    if (hours.includes('20')) return '6-7 sessions/week';
    if (hours.includes('15')) return '5-6 sessions/week';
    if (hours.includes('10')) return '4-5 sessions/week';
    if (hours.includes('5')) return '3-4 sessions/week';
    return '3-5 sessions/week';
  };

  // Get key focus area based on goals
  const getKeyFocus = () => {
    const goals = assessmentData.goals || [];
    if (goals.includes('improve_technique')) return 'Technical Skills';
    if (goals.includes('increase_strength')) return 'Strength & Power';
    if (goals.includes('boost_endurance')) return 'Endurance & Stamina';
    if (goals.includes('mental_toughness')) return 'Mental Performance';
    if (goals.includes('injury_prevention')) return 'Injury Prevention & Mobility';
    return 'Overall Performance';
  };

  const timeline = getTimeline();
  const frequency = getPracticeFrequency();
  const keyFocus = getKeyFocus();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your EVZAIN Athlete Profile</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background: linear-gradient(135deg, #061A35 0%, #0a2347 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .logo {
      font-size: 36px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 2px;
      margin-bottom: 10px;
    }
    .tagline {
      color: #659832;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 24px;
      font-weight: 600;
      color: #061A35;
      margin-bottom: 20px;
    }
    .intro {
      font-size: 16px;
      line-height: 1.6;
      color: #4a5568;
      margin-bottom: 30px;
    }
    .profile-card {
      background: #f7fafc;
      border-left: 4px solid #659832;
      padding: 25px;
      margin-bottom: 30px;
      border-radius: 8px;
    }
    .profile-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .profile-item:last-child {
      border-bottom: none;
    }
    .profile-label {
      font-weight: 600;
      color: #2d3748;
      font-size: 14px;
    }
    .profile-value {
      color: #659832;
      font-weight: 600;
      font-size: 14px;
      text-align: right;
    }
    .section-title {
      font-size: 20px;
      font-weight: 700;
      color: #061A35;
      margin: 30px 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #659832;
    }
    .action-box {
      background: linear-gradient(135deg, #659832 0%, #7ab03d 100%);
      color: white;
      padding: 25px;
      border-radius: 12px;
      margin: 25px 0;
    }
    .action-title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 15px;
    }
    .action-text {
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 10px;
    }
    .timeline-box {
      background: #fff;
      border: 2px solid #659832;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: center;
    }
    .timeline-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #659832;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .timeline-value {
      font-size: 28px;
      font-weight: 700;
      color: #061A35;
    }
    .next-steps {
      background: #f7fafc;
      padding: 25px;
      border-radius: 8px;
      margin: 25px 0;
    }
    .step {
      padding: 15px 0;
      display: flex;
      align-items: start;
    }
    .step-number {
      background: #659832;
      color: white;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 16px;
      flex-shrink: 0;
      margin-right: 15px;
    }
    .step-text {
      font-size: 15px;
      color: #2d3748;
      line-height: 1.6;
      padding-top: 4px;
    }
    .cta-button {
      display: block;
      width: 100%;
      background: linear-gradient(135deg, #659832 0%, #7ab03d 100%);
      color: white;
      text-align: center;
      padding: 18px 30px;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 700;
      font-size: 16px;
      margin: 25px 0;
    }
    .footer {
      background: #f7fafc;
      padding: 30px;
      text-align: center;
      color: #718096;
      font-size: 14px;
    }
    .signature {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-style: italic;
      color: #4a5568;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">EVΖAIN</div>
      <div class="tagline">Your AI Performance Partner</div>
    </div>

    <!-- Main Content -->
    <div class="content">
      <div class="greeting">Hey ${name} 👋</div>
      
      <p class="intro">
        Thanks for completing your athlete assessment. Based on your responses, here's your personalized profile snapshot and what it will take to reach your goals.
      </p>

      <!-- Profile Card -->
      <div class="profile-card">
        <div class="profile-item">
          <span class="profile-label">Sport</span>
          <span class="profile-value">${sport}</span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Current Level</span>
          <span class="profile-value">${level}</span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Primary Goal</span>
          <span class="profile-value">${primaryGoal}</span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Training Hours/Week</span>
          <span class="profile-value">${trainingHours}</span>
        </div>
        <div class="profile-item">
          <span class="profile-label">Key Focus Area</span>
          <span class="profile-value">${keyFocus}</span>
        </div>
      </div>

      <!-- Timeline -->
      <div class="timeline-box">
        <div class="timeline-label">Estimated Timeline to Goal</div>
        <div class="timeline-value">${timeline}</div>
      </div>

      <!-- Action Plan -->
      <div class="section-title">Your Action Plan</div>
      
      <div class="action-box">
        <div class="action-title">Recommended Training Frequency</div>
        <div class="action-text">
          <strong>${frequency}</strong> with consistent quality practice focused on ${keyFocus.toLowerCase()}.
        </div>
        <div class="action-text" style="margin-top: 15px; font-size: 14px; opacity: 0.95;">
          Quality beats quantity. Each session should have a clear purpose aligned with your goal.
        </div>
      </div>

      <!-- Next Steps -->
      <div class="section-title">Next Steps</div>
      
      <div class="next-steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-text">
            <strong>I'll review your profile</strong> and create a custom training framework based on your specific ${sport} goals and ${level} level.
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-text">
            <strong>Expect a detailed roadmap</strong> within 2-3 business days with specific exercises, drills, and periodization strategy.
          </div>
        </div>
        
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-text">
            <strong>We'll iterate together.</strong> Your feedback shapes the plan. This is a partnership, not a one-size-fits-all program.
          </div>
        </div>
      </div>

      <!-- Signature -->
      <div class="signature">
        This is where the real work begins. I'll be in touch soon with your personalized roadmap.
        <br><br>
        <strong>— The EVZAIN Team</strong>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>This snapshot is based on your assessment responses.</p>
      <p style="margin-top: 10px;">Questions? Reply to this email—I read every message.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

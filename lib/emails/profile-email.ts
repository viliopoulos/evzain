/**
 * Athlete Profile Email Template
 * Branded HTML email with assessment data
 */

interface ProfileEmailData {
  name: string;
  sport: string;
  level: string;
  goals: string[];
  trainingHours: string;
  frustrations: string[];
  progressTracking: string;
}

export function generateProfileEmail(data: ProfileEmailData): string {
  const goalsHtml = data.goals.map(goal => `<li style="margin: 8px 0;">${goal}</li>`).join('');
  const frustrationsHtml = data.frustrations.map(f => `<li style="margin: 8px 0;">${f}</li>`).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your EVZAIN Athlete Profile</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #061A35 0%, #0a2347 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 36px; font-weight: 700; color: #ffffff; letter-spacing: 2px;">EVΖAIN</h1>
              <p style="margin: 10px 0 0 0; color: #659832; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Your AI Performance Partner</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #061A35;">Hey ${data.name} 👋</h2>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Thanks for completing your athlete assessment! Here's your personalized profile based on your responses.
              </p>

              <!-- Profile Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f7fafc; border-left: 4px solid #659832; padding: 20px; margin: 20px 0; border-radius: 8px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="font-weight: 600; color: #2d3748; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Sport</td>
                        <td style="color: #659832; font-weight: 600; font-size: 14px; text-align: right; border-bottom: 1px solid #e2e8f0;">${data.sport}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #2d3748; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Level</td>
                        <td style="color: #659832; font-weight: 600; font-size: 14px; text-align: right; border-bottom: 1px solid #e2e8f0;">${data.level}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #2d3748; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Training Hours/Week</td>
                        <td style="color: #659832; font-weight: 600; font-size: 14px; text-align: right; border-bottom: 1px solid #e2e8f0;">${data.trainingHours}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #2d3748; font-size: 14px;">Progress Tracking</td>
                        <td style="color: #659832; font-weight: 600; font-size: 14px; text-align: right;">${data.progressTracking}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Goals Section -->
              <h3 style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 700; color: #061A35; border-bottom: 2px solid #659832; padding-bottom: 10px;">Your Goals</h3>
              <ul style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 15px; line-height: 1.6;">
                ${goalsHtml}
              </ul>

              <!-- Frustrations Section -->
              <h3 style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 700; color: #061A35; border-bottom: 2px solid #659832; padding-bottom: 10px;">Current Challenges</h3>
              <ul style="margin: 0; padding-left: 20px; color: #4a5568; font-size: 15px; line-height: 1.6;">
                ${frustrationsHtml}
              </ul>

              <!-- Next Steps -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #659832 0%, #7ab03d 100%); border-radius: 12px; margin: 30px 0; padding: 25px;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; font-size: 18px; font-weight: 700; color: #ffffff;">What's Next?</h3>
                    <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.6; color: #ffffff;">
                      I'm reviewing your profile and will create a personalized training framework based on your ${data.sport} goals and ${data.level} level.
                    </p>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #ffffff;">
                      Expect a detailed roadmap within 2-3 business days. This is a partnership—your feedback shapes the plan.
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <p style="margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #e2e8f0; font-style: italic; color: #4a5568; font-size: 15px;">
                This is where the real work begins. I'll be in touch soon with your personalized roadmap.
                <br><br>
                <strong>— The EVZAIN Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f7fafc; padding: 30px; text-align: center; color: #718096; font-size: 14px;">
              <p style="margin: 0 0 10px 0;">This profile is based on your assessment responses.</p>
              <p style="margin: 0;">Questions? Reply to this email—we read every message.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

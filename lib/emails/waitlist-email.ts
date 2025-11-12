/**
 * Waitlist Welcome Email Template
 * Prompts users to take the assessment
 */

interface WaitlistEmailData {
  email: string;
}

export function generateWaitlistEmail(data: WaitlistEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to EVZAIN</title>
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
              <h2 style="margin: 0 0 20px 0; font-size: 28px; font-weight: 600; color: #061A35;">Welcome to the Revolution 🚀</h2>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                Thanks for joining the EVZAIN waitlist! You're now part of a community of athletes who are redefining what it means to train smarter and live better.
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #4a5568;">
                <strong style="color: #659832;">EVZAIN</strong> is inspired by the ancient Greek concept (εὖ ζῆν | eu zēn) which means "living well". We blend sports science, personalized guidance, and real-time data to optimize your training, recovery, and mindset.
              </p>

              <!-- CTA Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #659832 0%, #7ab03d 100%); border-radius: 12px; margin: 30px 0; padding: 30px;">
                <tr>
                  <td style="text-align: center;">
                    <h3 style="margin: 0 0 15px 0; font-size: 22px; font-weight: 700; color: #ffffff;">Take Your Athlete Assessment</h3>
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #ffffff;">
                      Help us understand your journey. Complete our 5-minute assessment and get a personalized athlete profile.
                    </p>
                    <a href="https://evzain.com/assessment" style="display: inline-block; background: #ffffff; color: #659832; padding: 16px 40px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; margin-top: 10px;">
                      Start Assessment →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- What You'll Get -->
              <h3 style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 700; color: #061A35; border-bottom: 2px solid #659832; padding-bottom: 10px;">What You'll Receive</h3>
              
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 12px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align: top;">
                          <div style="background: #659832; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: 700; font-size: 14px;">1</div>
                        </td>
                        <td style="padding-left: 15px; font-size: 15px; color: #2d3748; line-height: 1.6;">
                          <strong>Your Unique Athlete Profile</strong> based on your sport, level, and goals
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align: top;">
                          <div style="background: #659832; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: 700; font-size: 14px;">2</div>
                        </td>
                        <td style="padding-left: 15px; font-size: 15px; color: #2d3748; line-height: 1.6;">
                          <strong>Personalized Training Insights</strong> tailored to your current challenges
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="30" style="vertical-align: top;">
                          <div style="background: #659832; color: white; width: 24px; height: 24px; border-radius: 50%; text-align: center; line-height: 24px; font-weight: 700; font-size: 14px;">3</div>
                        </td>
                        <td style="padding-left: 15px; font-size: 15px; color: #2d3748; line-height: 1.6;">
                          <strong>Early Access Updates</strong> as we build the future of athletic performance
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Philosophy -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f7fafc; border-left: 4px solid #659832; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #4a5568; font-style: italic;">
                      "Whether you're just starting your journey or competing at the highest level, EVZAIN helps you discover the smarter way to train and live well."
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Signature -->
              <p style="margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #4a5568; font-size: 15px;">
                Ready to elevate your performance?
                <br><br>
                <strong>— The EVZAIN Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f7fafc; padding: 30px; text-align: center; color: #718096; font-size: 14px;">
              <p style="margin: 0 0 10px 0;">You're receiving this because you joined the EVZAIN waitlist.</p>
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

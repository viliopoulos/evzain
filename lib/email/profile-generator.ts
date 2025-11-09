/**
 * Athlete Profile Generator
 * Uses decision trees to categorize athletes into 3 profiles:
 * 1. The Competitor - Driven by performance and results
 * 2. The Developer - Focused on skill mastery and growth
 * 3. The Balanced Athlete - Seeking sustainable excellence
 */

interface AthleteProfile {
  type: 'competitor' | 'developer' | 'balanced';
  htmlContent: string;
}

export function generateAthleteProfile(assessmentData: any): AthleteProfile {
  // Decision Tree Logic
  const profileType = determineProfileType(assessmentData);

  // Generate HTML email based on profile
  const htmlContent = generateEmailHTML(profileType, assessmentData);

  return {
    type: profileType,
    htmlContent,
  };
}

function determineProfileType(data: any): 'competitor' | 'developer' | 'balanced' {
  const {
    level,
    goals,
    trainingHours,
    frustrations,
    progressTracking,
  } = data;

  // Decision Tree 1: The Competitor
  // High intensity + performance goals + competitive mindset
  const isCompetitor = 
    (goals?.includes('compete') || goals?.includes('pro')) &&
    (level === 'advanced' || level === 'elite') &&
    trainingHours === '20+';

  if (isCompetitor) return 'competitor';

  // Decision Tree 2: The Developer
  // Skill focus + learning mindset + consistent tracking
  const isDeveloper = 
    goals?.includes('skills') &&
    progressTracking === 'detailed' &&
    frustrations?.includes('lack_of_guidance');

  if (isDeveloper) return 'developer';

  // Decision Tree 3: The Balanced Athlete (default)
  // Sustainable approach + multiple goals + moderate intensity
  return 'balanced';
}

function generateEmailHTML(profileType: string, data: any): string {
  const { sport, level, goals, name } = data;

  const profiles = {
    competitor: {
      title: 'The Competitor',
      description: 'You thrive on performance and results. Your drive to excel pushes you to constantly test your limits.',
      insights: [
        'You have a strong competitive mindset and clear performance goals',
        'Your high training volume shows dedication to your craft',
        'You\'re willing to push boundaries to achieve elite status',
      ],
      recommendation: 'Your profile suggests you would benefit from periodization strategies, mental performance training, and recovery protocols used by elite athletes.',
    },
    developer: {
      title: 'The Developer',
      description: 'You\'re focused on continuous improvement and skill mastery. Learning and growth drive your athletic journey.',
      insights: [
        'You value structured guidance and detailed feedback',
        'Skill development is your primary motivator',
        'You track your progress meticulously to optimize learning',
      ],
      recommendation: 'Your profile suggests you would benefit from technical coaching, video analysis, and progressive skill-building frameworks.',
    },
    balanced: {
      title: 'The Balanced Athlete',
      description: 'You seek sustainable excellence. You\'re building athletic performance while maintaining life balance.',
      insights: [
        'You have a holistic approach to athletic development',
        'You balance multiple goals and priorities effectively',
        'You understand that consistency beats intensity over time',
      ],
      recommendation: 'Your profile suggests you would benefit from flexible training plans, mindfulness practices, and sustainable performance strategies.',
    },
  };

  const profile = profiles[profileType as keyof typeof profiles];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Athlete Profile - EVZAIN</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #061A35 0%, #0a2347 100%); padding: 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 32px; margin: 0 0 16px 0; font-weight: 600;">
                Your Athlete Profile
              </h1>
              <div style="width: 60px; height: 4px; background-color: #659832; margin: 0 auto;"></div>
            </td>
          </tr>

          <!-- Profile Type -->
          <tr>
            <td style="padding: 40px;">
              <div style="background: linear-gradient(135deg, #659832 0%, #7ab03d 100%); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 32px;">
                <h2 style="color: #ffffff; font-size: 28px; margin: 0; font-weight: 700;">
                  ${profile.title}
                </h2>
              </div>

              <p style="color: #334155; font-size: 18px; line-height: 1.6; margin: 0 0 24px 0;">
                ${profile.description}
              </p>

              <!-- Profile Details -->
              <div style="background-color: #f1f5f9; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                <h3 style="color: #061A35; font-size: 20px; margin: 0 0 16px 0; font-weight: 600;">
                  Your Profile Snapshot
                </h3>
                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Sport:</td>
                    <td style="color: #061A35; font-size: 14px; font-weight: 600; padding: 8px 0; text-align: right;">
                      ${sport || 'Not specified'}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Level:</td>
                    <td style="color: #061A35; font-size: 14px; font-weight: 600; padding: 8px 0; text-align: right;">
                      ${level ? level.charAt(0).toUpperCase() + level.slice(1) : 'Not specified'}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Primary Goals:</td>
                    <td style="color: #061A35; font-size: 14px; font-weight: 600; padding: 8px 0; text-align: right;">
                      ${goals?.join(', ') || 'Not specified'}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Key Insights -->
              <h3 style="color: #061A35; font-size: 20px; margin: 0 0 16px 0; font-weight: 600;">
                Key Insights About You
              </h3>
              ${profile.insights.map(insight => `
                <div style="display: flex; margin-bottom: 12px;">
                  <div style="color: #659832; font-size: 20px; margin-right: 12px;">✓</div>
                  <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0;">
                    ${insight}
                  </p>
                </div>
              `).join('')}

              <!-- Recommendation -->
              <div style="background-color: #ecfdf5; border-left: 4px solid #659832; border-radius: 8px; padding: 20px; margin-top: 32px;">
                <h4 style="color: #065f46; font-size: 16px; margin: 0 0 12px 0; font-weight: 600;">
                  What's Next
                </h4>
                <p style="color: #047857; font-size: 15px; line-height: 1.6; margin: 0;">
                  ${profile.recommendation}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 16px 0;">
                Thank you for contributing to our research on athletics and mental success.
              </p>
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                EVZAIN Research | Understanding Performance Science
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

import { Resend } from 'resend';
import { generateAthleteProfile } from './profile-generator';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ProfileEmailParams {
  email: string;
  name: string;
  assessmentData: any;
}

export async function sendProfileEmail({ email, name, assessmentData }: ProfileEmailParams) {
  try {
    // Generate personalized profile based on assessment data
    const profile = generateAthleteProfile(assessmentData);

    // Send email with profile snapshot
    const { data, error } = await resend.emails.send({
      from: 'EVZAIN Research <research@evzain.com>',
      to: [email],
      subject: `${name}, Your Athlete Profile Snapshot`,
      html: profile.htmlContent,
    });

    if (error) {
      console.error('Error sending profile email:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to send profile email:', error);
    throw error;
  }
}

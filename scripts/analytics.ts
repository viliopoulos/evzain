#!/usr/bin/env ts-node

/**
 * Local analytics script - Run with: npx ts-node scripts/analytics.ts
 * Queries Supabase directly without exposing data on the web
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fetchAnalytics() {
  console.log('📊 EVZAIN Analytics Dashboard\n');
  console.log('═'.repeat(60));

  try {
    // Waitlist
    const { data: waitlist, error: waitlistError } = await supabase
      .from('waitlist_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (waitlistError) throw waitlistError;

    console.log('\n👥 WAITLIST SIGNUPS');
    console.log('─'.repeat(60));
    console.log(`Total: ${waitlist?.length || 0}`);
    console.log(`Emails Sent: ${waitlist?.filter((w) => w.email_sent).length || 0}`);
    console.log('\nRecent Signups:');
    waitlist?.slice(0, 10).forEach((signup, idx) => {
      console.log(
        `  ${idx + 1}. ${signup.email.padEnd(30)} | ${signup.source?.padEnd(12)} | ${new Date(signup.created_at).toLocaleDateString()}`
      );
    });

    // Assessments
    const { data: assessments, error: assessmentError } = await supabase
      .from('assessment_responses')
      .select('*')
      .not('completed_at', 'is', null);

    if (assessmentError) throw assessmentError;

    const segmentCounts: Record<string, number> = {};
    const focusCounts: Record<string, number> = {};
    let totalTime = 0;

    assessments?.forEach((a) => {
      const segment = a.athlete_segment || 'unknown';
      const focus = a.primary_focus || 'general';
      segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
      focusCounts[focus] = (focusCounts[focus] || 0) + 1;
      if (a.time_spent_seconds) totalTime += a.time_spent_seconds;
    });

    console.log('\n\n🎯 ASSESSMENTS');
    console.log('─'.repeat(60));
    console.log(`Total Completed: ${assessments?.length || 0}`);
    console.log(
      `Avg Completion Time: ${assessments?.length ? Math.round(totalTime / assessments.length / 60) : 0} minutes`
    );

    console.log('\nBy Athlete Segment:');
    Object.entries(segmentCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([segment, count]) => {
        const bar = '█'.repeat(Math.round((count / (assessments?.length || 1)) * 20));
        console.log(`  ${segment.padEnd(15)} ${bar} ${count}`);
      });

    console.log('\nBy Primary Focus:');
    Object.entries(focusCounts)
      .sort(([, a], [, b]) => b - a)
      .forEach(([focus, count]) => {
        const bar = '█'.repeat(Math.round((count / (assessments?.length || 1)) * 20));
        console.log(`  ${focus.replace(/_/g, ' ').padEnd(20)} ${bar} ${count}`);
      });

    // Emails
    const { data: emails, error: emailError } = await supabase
      .from('email_campaign_log')
      .select('*');

    if (emailError) throw emailError;

    const emailsByType: Record<string, number> = {};
    let opened = 0;
    let clicked = 0;

    emails?.forEach((e) => {
      const type = e.campaign_type || 'unknown';
      emailsByType[type] = (emailsByType[type] || 0) + 1;
      if (e.opened_at) opened++;
      if (e.clicked_at) clicked++;
    });

    console.log('\n\n📧 EMAIL CAMPAIGNS');
    console.log('─'.repeat(60));
    console.log(`Total Sent: ${emails?.length || 0}`);
    console.log(`Opened: ${opened} (${emails?.length ? Math.round((opened / emails.length) * 100) : 0}%)`);
    console.log(`Clicked: ${clicked} (${emails?.length ? Math.round((clicked / emails.length) * 100) : 0}%)`);

    console.log('\nBy Campaign Type:');
    Object.entries(emailsByType).forEach(([type, count]) => {
      console.log(`  ${type.padEnd(25)} ${count}`);
    });

    console.log('\n' + '═'.repeat(60));
    console.log('✅ Analytics fetched successfully\n');
  } catch (error) {
    console.error('\n❌ Error fetching analytics:', error);
    process.exit(1);
  }
}

fetchAnalytics();

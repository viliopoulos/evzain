#!/usr/bin/env ts-node

/**
 * Export all data to JSON/CSV for local analysis
 * Run with: npx ts-node scripts/export-data.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function exportData() {
  console.log('📦 Exporting EVZAIN data...\n');

  const exportDir = path.join(process.cwd(), 'data-exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().split('T')[0];

  try {
    // Export waitlist
    const { data: waitlist, error: waitlistError } = await supabase
      .from('waitlist_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (waitlistError) throw waitlistError;

    fs.writeFileSync(
      path.join(exportDir, `waitlist-${timestamp}.json`),
      JSON.stringify(waitlist, null, 2)
    );
    console.log(`✅ Exported ${waitlist?.length || 0} waitlist signups`);

    // Export assessments
    const { data: assessments, error: assessmentError } = await supabase
      .from('assessment_responses')
      .select('*')
      .order('created_at', { ascending: false });

    if (assessmentError) throw assessmentError;

    fs.writeFileSync(
      path.join(exportDir, `assessments-${timestamp}.json`),
      JSON.stringify(assessments, null, 2)
    );
    console.log(`✅ Exported ${assessments?.length || 0} assessments`);

    // Export emails
    const { data: emails, error: emailError } = await supabase
      .from('email_campaign_log')
      .select('*')
      .order('sent_at', { ascending: false });

    if (emailError) throw emailError;

    fs.writeFileSync(
      path.join(exportDir, `emails-${timestamp}.json`),
      JSON.stringify(emails, null, 2)
    );
    console.log(`✅ Exported ${emails?.length || 0} email logs`);

    // Create CSV for waitlist (easier to import into spreadsheets)
    if (waitlist && waitlist.length > 0) {
      const csvHeader = 'email,source,created_at,email_sent\n';
      const csvRows = waitlist
        .map((w) => `${w.email},${w.source || ''},${w.created_at},${w.email_sent}`)
        .join('\n');
      fs.writeFileSync(
        path.join(exportDir, `waitlist-${timestamp}.csv`),
        csvHeader + csvRows
      );
      console.log(`✅ Exported waitlist CSV`);
    }

    console.log(`\n📁 All data exported to: ${exportDir}`);
    console.log('   You can now analyze locally or import into Excel/Google Sheets\n');
  } catch (error) {
    console.error('\n❌ Error exporting data:', error);
    process.exit(1);
  }
}

exportData();

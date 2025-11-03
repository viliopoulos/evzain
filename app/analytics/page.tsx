'use client';

import { useState, useEffect } from 'react';
import { BarChart3, Users, Mail, TrendingUp, Activity, Target } from 'lucide-react';
import AuthGuard from './auth-guard';

interface AnalyticsData {
  waitlist: {
    total: number;
    emailsSent: number;
    recent: Array<{
      email: string;
      source: string;
      created_at: string;
    }>;
  };
  assessments: {
    total: number;
    completed: number;
    avgTimeSpent: number;
    bySegment: Record<string, number>;
    byFocus: Record<string, number>;
  };
  emails: {
    total: number;
    opened: number;
    clicked: number;
    byType: Record<string, number>;
  };
}

export default function Analytics() {
  const [hasAccess, setHasAccess] = useState(false);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const access = localStorage.getItem('analyticsAccess');
    if (access === 'true') {
      setHasAccess(true);
    }
  }, []);

  useEffect(() => {
    if (hasAccess) {
      fetchAnalytics();
    }
  }, [hasAccess]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        setError('Failed to load analytics');
      }
    } catch (err) {
      setError('Error fetching analytics');
    } finally {
      setLoading(false);
    }
  };

  if (!hasAccess) {
    return <AuthGuard onAccessGranted={() => setHasAccess(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error || 'No data available'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-white mb-2">
            EVZA<span className="font-serif italic text-emerald-400">IN</span> Analytics
          </h1>
          <p className="text-slate-400">Research MVP Dashboard - First 50 Cohort</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            title="Waitlist Signups"
            value={data.waitlist.total}
            subtitle={`${data.waitlist.emailsSent} emails sent`}
            color="emerald"
          />
          <MetricCard
            icon={<Activity className="w-6 h-6" />}
            title="Assessments"
            value={data.assessments.total}
            subtitle={`${data.assessments.completed} completed`}
            color="cyan"
          />
          <MetricCard
            icon={<Mail className="w-6 h-6" />}
            title="Emails Sent"
            value={data.emails.total}
            subtitle={`${Math.round((data.emails.opened / data.emails.total) * 100)}% open rate`}
            color="blue"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Avg. Completion Time"
            value={`${Math.round(data.assessments.avgTimeSpent / 60)}m`}
            subtitle="Per assessment"
            color="purple"
          />
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Athlete Segments */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              Athlete Segments
            </h2>
            <div className="space-y-3">
              {Object.entries(data.assessments.bySegment).map(([segment, count]) => (
                <div key={segment} className="flex items-center justify-between">
                  <span className="text-slate-300 capitalize">{segment}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-2 rounded-full"
                        style={{ width: `${(count / data.assessments.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Focus */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Primary Focus Areas
            </h2>
            <div className="space-y-3">
              {Object.entries(data.assessments.byFocus).map(([focus, count]) => (
                <div key={focus} className="flex items-center justify-between">
                  <span className="text-slate-300 capitalize">{focus.replace(/_/g, ' ')}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
                        style={{ width: `${(count / data.assessments.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Waitlist Signups */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-4">Recent Waitlist Signups</h2>
            <div className="space-y-2">
              {data.waitlist.recent.slice(0, 10).map((signup, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-lg"
                >
                  <span className="text-slate-300">{signup.email}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400">{signup.source}</span>
                    <span className="text-xs text-slate-500">
                      {new Date(signup.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
  subtitle: string;
  color: 'emerald' | 'cyan' | 'blue' | 'purple';
}

function MetricCard({ icon, title, value, subtitle, color }: MetricCardProps) {
  const colorClasses = {
    emerald: 'text-emerald-400',
    cyan: 'text-cyan-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400',
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
      <div className={`${colorClasses[color]} mb-3`}>{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-slate-400">{title}</div>
      <div className="text-xs text-slate-500 mt-1">{subtitle}</div>
    </div>
  );
}

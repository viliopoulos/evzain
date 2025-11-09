'use client';

import { useEffect, useState } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { sendProfileEmail } from '@/lib/email/profile-sender';

export default function CompletePage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  useEffect(() => {
    // Retrieve assessment data from localStorage
    const storedData = localStorage.getItem('assessmentData');
    if (storedData) {
      setAssessmentData(JSON.parse(storedData));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !email || !name) return;

    setIsSubmitting(true);

    try {
      // Send profile email with athlete snapshot
      await sendProfileEmail({
        email,
        name,
        assessmentData,
      });

      // Store completion data in Supabase
      const sessionId = localStorage.getItem('sessionId');
      await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'research_completion',
          session_id: sessionId,
          data: {
            email,
            name,
            completed_at: new Date().toISOString(),
          },
        }),
      });

      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#061A35] via-[#0a2347] to-[#061A35] flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-[#659832]/30">
            <CheckCircle className="w-20 h-20 text-[#659832] mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Thank You, {name}!
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              Your athlete profile snapshot is on its way to <strong>{email}</strong>
            </p>
            <p className="text-slate-400 mb-8">
              You're helping shape the future of athletic performance science. 
              We'll be in touch with insights from our research.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-[#659832] text-white px-8 py-3 rounded-lg hover:bg-[#7ab03d] transition-colors font-semibold"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061A35] via-[#0a2347] to-[#061A35] py-12 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-12">
        <a href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
          <Image 
            src="/EVZAIN white letters green zeta.png" 
            alt="EVZAIN" 
            width={340} 
            height={85} 
            priority
            className="h-20 md:h-24 w-auto"
          />
        </a>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#659832]/30">
          <div className="text-center mb-8">
            <Sparkles className="w-16 h-16 text-[#659832] mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Thank You for Your Insights
            </h1>
            <p className="text-lg text-slate-300">
              You've completed the assessment. Get your personalized athlete profile snapshot delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#659832] focus:ring-1 focus:ring-[#659832] transition-colors"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/5 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#659832] focus:ring-1 focus:ring-[#659832] transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="bg-[#659832]/10 border border-[#659832]/30 rounded-lg p-4">
              <p className="text-sm text-slate-300">
                <strong className="text-[#659832]">What you'll receive:</strong>
                <br />
                • Your unique athlete profile based on your responses
                <br />
                • Personalized insights about your training journey
                <br />
                • Updates on our research findings
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email || !name}
              className="w-full bg-[#659832] text-white px-6 py-4 rounded-lg hover:bg-[#7ab03d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Send My Profile
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-500 text-center mt-6">
            Your data helps us understand the intersection of athletics and mental success. 
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [email, setEmail] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          source: 'homepage' 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "You're part of the movement! Welcome to EVZAIN.");
        setEmail('');
      } else {
        alert(result.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
        .logo-zeta {
          font-family: 'Times New Roman', serif;
          font-size: 56px;
          color: #14B8A6;
          font-weight: 400;
        }
        .zeta-watermark {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 28px;
          color: #10b981;
          line-height: 1;
          display: inline-block;
          font-weight: 400;
        }
        .zeta-bg {
          opacity: 0.08;
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          user-select: none;
          pointer-events: none;
          width: 180px;
          height: 250px;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-[#061A35] text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-6">
            <a href="/" className="hover:opacity-90 transition-opacity">
              <Image 
                src="/EVZAIN Logo.png" 
                alt="EVZAIN" 
                width={1080} 
                height={270} 
                priority
                className="h-60 md:h-72 w-auto"
              />
            </a>
            <div className="flex items-center gap-3">
              <Link 
                href="/origins"
                className="text-right text-base md:text-lg text-[#659832] hover:text-[#7ab03d] transition-colors"
              >
                Your AI Performance Partner
              </Link>
              <Link 
                href="/origins"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                title="Our Origins"
              >
                <Image 
                  src="/Greek zeta.png" 
                  alt="Origins" 
                  width={90} 
                  height={120} 
                  className="h-32 w-auto brightness-0 invert"
                />
              </Link>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-light max-w-3xl mt-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Train Smarter. Live Better. Achieve More.
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-4 pb-12">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column - Images */}
          <div className="relative space-y-6">
            {/* First Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#659832]/20 to-[#ea9aac]/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-[#659832]/20">
                <img
                  src="/athlete.jpg"
                  alt="Athlete in action during training"
                  className="w-full h-[400px] object-cover object-center"
                />
              </div>
            </div>
            
            {/* Second Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ea9aac]/20 to-[#659832]/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-[#ea9aac]/20">
                <img
                  src="/athlete2.jpg"
                  alt="Training session"
                  className="w-full h-[400px] object-cover object-[70%_center]"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-8">
            
            {/* Introduction */}
            <div className="relative bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#659832] overflow-hidden">
              <Image 
                src="/Greek zeta.png" 
                alt="" 
                width={180} 
                height={250} 
                className="zeta-bg"
                style={{ filter: 'opacity(0.08) grayscale(100%)' }}
              />
              <h3 className="relative text-2xl font-semibold text-slate-900 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Join the Revolution
              </h3>
              <p className="relative text-slate-700 leading-relaxed mb-4">
                <span className="font-semibold text-[#659832]">EVZAIN</span> is inspired by 
                the ancient Greek concept (εὖ ζῆν | eu zēn) which means "living well".
                It's where philosophy meets performance and where ancient wisdom meets modern AI.
              </p>
              <p className="relative text-slate-700 leading-relaxed">
                Built by athletes for athletes, EVZAIN is your 24/7 performance coach. We blend 
                sports science, personalized guidance, and real-time data from your wearables to optimize 
                your training, recovery, and mindset.
              </p>
              <p className="relative text-slate-700 leading-relaxed mt-4">
                Whether you're just starting your journey or 
                competing at the highest level, discover the smarter way to train and live well.
              </p>
            </div>

            {/* What We Cover */}
            <div className="bg-gradient-to-br from-[#659832] to-[#7ab03d] rounded-xl shadow-lg p-8 text-white">
              <h4 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Your Journey Starts Here:</h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Build your complete athlete profile',
                  'Identify and overcome your training barriers',
                  'Track meaningful progress',
                  'Clarify your "why" and sustain motivation',
                  'Get personalized strategies to reach your goals',
                ].map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#ea9aac] rounded-full mt-2 flex-shrink-0" />
                    <span className="text-emerald-50">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#659832]/20">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 bg-[#659832] rounded-full" />
                  <span>Private & Secure</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 bg-[#ea9aac] rounded-full" />
                  <span>5 Minutes to Start</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 bg-[#061A35] rounded-full" />
                  <span>Instant Insights</span>
                </div>
              </div>
              
              <Link
                href="/assessment"
                className="w-full bg-gradient-to-r from-[#659832] to-[#7ab03d] text-white px-8 py-4 rounded-lg hover:from-[#7ab03d] hover:to-[#659832] transition-all font-semibold text-lg shadow-lg shadow-[#659832]/30 flex items-center justify-center gap-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                <Sparkles className="w-5 h-5" />
                Start Your Assessment
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Additional Email Signup Section */}
      <div className="bg-gradient-to-br from-[#659832] to-[#7ab03d] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Ready to Transform Your Training?</h3>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join our exclusive waitlist and be the first to experience EVZAIN's AI-powered performance coaching.
          </p>
          <form onSubmit={handleEmailSubmit} className="max-w-lg mx-auto flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 rounded-lg border-0 text-white font-bold placeholder:text-cyan-200 focus:ring-2 focus:ring-white/50 bg-cyan-800/50"
              />
            </div>
            <button
              type="submit"
              className="bg-white text-cyan-700 hover:bg-cyan-50 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
            >
              Join Waitlist
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>
              <a href="/origins" className="hover:text-slate-900 transition-colors group">
                <span className="font-semibold text-slate-900">Built by:</span>{' '}
                <span className="group-hover:text-cyan-700 transition-colors">Athletes and coaches who competed at the highest level</span>
              </a>
            </p>
            <p className="text-slate-400">
              Questions? Reach out to{' '}
              <a 
                href="mailto:performance@evzain.com" 
                className="text-cyan-600 hover:text-cyan-700 hover:underline"
              >
                performance@evzain.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
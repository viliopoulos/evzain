'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
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
          font-family: 'Times New Roman', serif;
          font-size: 180px;
          color: #0891b2;
          opacity: 0.08;
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          user-select: none;
          pointer-events: none;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-[#061A35] text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <a href="/" className="hover:opacity-90 transition-opacity">
              <Image 
                src="/EVZAIN white letters green zeta.png" 
                alt="EVZAIN" 
                width={200} 
                height={50} 
                priority
                className="h-12 w-auto"
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
                  width={24} 
                  height={32} 
                  className="h-8 w-auto"
                />
              </Link>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-light max-w-3xl">
            Understanding the Science of Athletic Excellence
          </h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Images */}
          <div className="relative space-y-6">
            {/* First Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-emerald-100">
                <img
                  src="/athlete.jpg"
                  alt="Athlete in action during training"
                  className="w-full h-[400px] object-cover object-center"
                />
              </div>
            </div>
            
            {/* Second Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 rounded-2xl blur-2xl" />
              <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-cyan-100">
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
            <div className="relative bg-white rounded-xl shadow-lg p-8 border-l-4 border-emerald-500 overflow-hidden">
              <div className="zeta-bg">ζ</div>
              <h3 className="relative text-2xl font-semibold text-slate-900 mb-4">
                Help Shape Performance Science
              </h3>
              <p className="relative text-slate-700 leading-relaxed mb-4">
                <span className="font-semibold text-[#659832]">EVZAIN</span> is researching the intersection 
                of athletics and mental success. We're studying what separates good athletes from great ones—not 
                just physically, but mentally and emotionally.
              </p>
              <p className="relative text-slate-700 leading-relaxed">
                By sharing your athletic journey, you're contributing to groundbreaking research that will 
                help the next generation of athletes unlock their potential.
              </p>
              <p className="relative text-slate-700 leading-relaxed mt-4">
                Complete our assessment and receive your personalized athlete profile—a snapshot of your 
                training style, mindset, and unique strengths.
              </p>
            </div>

            {/* What We Cover */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl shadow-lg p-8 text-white">
              <h4 className="text-xl font-semibold mb-6">What You'll Discover:</h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Your unique athlete profile type',
                  'Key insights about your training mindset',
                  'How you compare to other athletes in your sport',
                  'Personalized recommendations based on research',
                  'Updates on our findings as we gather more data',
                ].map((topic, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-300 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-emerald-50">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-emerald-100">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span>Private & Secure</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                  <span>5 Minutes to Start</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-2 h-2 bg-amber-500 rounded-full" />
                  <span>Instant Insights</span>
                </div>
              </div>
              
              <Link
                href="/assessment"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-5 px-8 rounded-lg font-bold text-xl transition-all flex items-center justify-center gap-3 group shadow-xl shadow-emerald-300 hover:shadow-2xl hover:shadow-emerald-400 transform hover:scale-[1.02]"
              >
                <span>Unlock Your Potential Now</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Additional Email Signup Section */}
      <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Transform Your Training?</h3>
          <p className="text-cyan-50 text-lg mb-8 max-w-2xl mx-auto">
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
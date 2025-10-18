'use client';

import { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function Home() {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    alert("Thanks! We'll send you more information about EUZAIN.");
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
        .logo-in {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 700;
          color: #10b981;
        }
      `}</style>
      
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-light tracking-tight">
              EUZA<span className="logo-in">IN</span>
            </h1>
            <div className="text-right text-sm text-emerald-300">
              Your AI Performance Partner
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-light max-w-3xl">
            Train Smarter. Live Better. Achieve More.
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
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-emerald-500">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Welcome to the Good Life
              </h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <span className="font-semibold text-emerald-600">EUZAIN</span> (εὖ ζήν + AI) — 
                the ancient Greek philosophy of "living well" meets cutting-edge artificial intelligence.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Built by athletes for athletes, EUZAIN is your 24/7 performance partner. We combine 
                sports science, personalized coaching, and real-time data from your wearables to optimize 
                your training, recovery, and mindset. Whether you're starting your journey or chasing 
                championships, discover the smarter way to train and thrive.
              </p>
            </div>

            {/* What We Cover */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl shadow-lg p-8 text-white">
              <h4 className="text-xl font-semibold mb-6">Your Journey Starts Here:</h4>
              <div className="grid grid-cols-1 gap-3">
                {[
                  'Build your complete athlete profile',
                  'Identify and overcome training barriers',
                  'Master progress tracking that actually works',
                  'Clarify your "why" and fuel motivation',
                  'Get personalized strategies to reach your goals',
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
              
              <button
                onClick={() => window.location.href = '/assessment'}
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 group shadow-lg shadow-emerald-200"
              >
                Begin Your Assessment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Email Signup */}
            <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-xl shadow-lg p-8">
              <h4 className="text-white font-semibold mb-3">
                Get Exclusive Early Access
              </h4>
              <p className="text-cyan-50 text-sm mb-4">
                Join the waitlist for personalized training insights powered by AI
              </p>
              <form onSubmit={handleEmailSubmit} className="flex gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-lg border-0 text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-white/50"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-cyan-700 hover:bg-cyan-50 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Join Waitlist
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-100 border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Built by:</span> Athletes and coaches who understand the journey
            </p>
            <p className="text-slate-400">
              Questions? Reach out at hello@euzain.com
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
'use client';

import { ArrowLeft, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Origins() {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    alert("You're part of the movement! Welcome to EVZAIN.");
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-cyan-50">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
        .logo-zeta {
          font-family: 'Times New Roman', serif;
          font-size: 56px;
          color: #14B8A6;
          font-weight: 400;
          line-height: 1;
        }
        .zeta {
          font-family: 'Times New Roman', serif;
          font-size: 120px;
          font-weight: 300;
          color: #0891b2;
          opacity: 0.15;
          position: absolute;
          top: -20px;
          left: 20px;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight flex items-center gap-1">
                <span>EV</span><span className="logo-zeta">ζ</span><span>AIN</span>
              </h1>
            </a>
            <div className="flex items-center gap-3">
              <div className="text-right text-sm text-emerald-300">
                Origins
              </div>
              <div className="text-2xl text-cyan-400 opacity-50">
                ζ
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        
        {/* Hero Section with Zeta */}
        <div className="relative mb-16">
          <div className="zeta">ζ</div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6">
              Our Story
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Evzain blends ancient wisdom with modern science to help athletes train smarter and live better.
            </p>
            <p className="text-xl text-slate-600 leading-relaxed mt-4">
              Built by high level competitors and coaches, Evzain turns real research and real practice into simple, personalized plans that work.
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6">How We Started</h3>
          
          <div className="space-y-6 text-slate-700 leading-relaxed">
            <p>
              Evzain was born from a simple question: what if elite coaching could be available to everyone? I saw too many athletes doing the same generic workouts and getting the same generic results. I also knew from my own career that the difference between a good season and a breakthrough season is often one small change, done in the right order and at the right time.
            </p>
            
            <p>
              We started by collecting what actually matters. Pro training patterns. Peer reviewed studies in recovery, biomechanics and sports psychology. Honest feedback from real athletes. Those three sources combine into the core of our work. We do the research so you get recommendations that are precise, explain the why, and fit your life.
            </p>
            
            <p>
              At Evzain we focus on clarity and trust. The first version of everything is human delivered and coach reviewed. We work closely with athletes to refine the approach, then automate the patterns that prove themselves. That means you get practical, validated advice from day one and long term intelligence as the product learns from real progress.
            </p>
            
            <p>
              We want to democratize access to expert training. Not by replacing coaches, but by scaling the best practices they use. If you want to get better without the noise, Evzain is built for that.
            </p>
          </div>
        </div>

        {/* Research Panel */}
        <div className="bg-gradient-to-br from-cyan-50 to-slate-50 rounded-2xl border border-cyan-100 p-8 md:p-12 mb-12">
          <h3 className="text-2xl font-semibold text-slate-900 mb-6">Our Research Foundation</h3>
          <p className="text-slate-600 mb-6">
            Every recommendation is built on four pillars of evidence:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-cyan-700 mb-2">Sports Science</h4>
              <p className="text-sm text-slate-600">Peer reviewed research on training adaptation, periodization, and performance optimization.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-cyan-700 mb-2">Biomechanics</h4>
              <p className="text-sm text-slate-600">Movement patterns, injury prevention, and technique refinement based on elite athlete data.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-cyan-700 mb-2">Recovery Science</h4>
              <p className="text-sm text-slate-600">Evidence based approaches to sleep, nutrition, and recovery protocols that maximize adaptation.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h4 className="font-semibold text-cyan-700 mb-2">Sports Psychology</h4>
              <p className="text-sm text-slate-600">Mental training, focus techniques, and mindset strategies used by top performers.</p>
            </div>
          </div>
        </div>

        {/* Founder Note */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl p-8 md:p-12 text-white">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-6xl text-cyan-400 opacity-50">ζ</div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">From the Founder</h3>
              <p className="text-slate-400 text-sm">A personal note</p>
            </div>
          </div>
          
          <div className="space-y-4 text-slate-200 leading-relaxed">
            <p>
              I've been in locker rooms, late night flights, and pressure cooker moments where the next rep or decision mattered more than anything else. I learned how the mind moves the body and how tiny shifts stack into real gains. I also learned that most advice out there is loud and shallow.
            </p>
            
            <p>
              Evzain is my answer to that problem. We collect the best evidence and fold it into human judgment. For now I lead the work quietly, testing and refining with a few athletes at a time. When it is time, Evzain will be louder. For now we build carefully, measure everything, and deliver what actually moves the needle.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}

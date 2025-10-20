'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Award, TrendingUp, Users, ArrowRight, Instagram, Twitter, Youtube, Globe, CheckCircle } from 'lucide-react';

interface AthleteLink {
  id: string;
  athlete_name: string;
  slug: string;
  sport: string;
  level: string;
  profile_image_url?: string;
  bio?: string;
  achievements?: string[];
  quote?: string;
  instagram_url?: string;
  twitter_url?: string;
  youtube_url?: string;
  website_url?: string;
  primary_color?: string;
  secondary_color?: string;
  background_image_url?: string;
  default_goals?: string[];
  is_verified: boolean;
}

export default function AthleteProfilePage() {
  const params = useParams();
  const slug = params.slug as string;
  const [athlete, setAthlete] = useState<AthleteLink | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ visitors: 0, athletes: 0 });

  useEffect(() => {
    // TODO: Fetch from Supabase
    // For now, demo data
    if (slug === 'nikos') {
      setAthlete({
        id: '1',
        athlete_name: 'Nikos Iliop',
        slug: 'nikos',
        sport: 'waterpolo',
        level: 'Professional',
        profile_image_url: '/athlete.jpg', // Placeholder
        bio: 'Greek National Team player and 3x Cal National Champion. Training smarter has been my edge - not just working harder, but working right.',
        achievements: [
          '3x NCAA National Champion (UC Berkeley)',
          'Greek National Team Striker',
          'Professional Water Polo (European League)',
          'Olympic Training Program Graduate'
        ],
        quote: 'Excellence isn\'t given. It\'s earned in the pool every single day.',
        instagram_url: 'https://instagram.com/nikos',
        twitter_url: '',
        youtube_url: '',
        website_url: '',
        primary_color: '#0891b2', // Cyan for water polo
        secondary_color: '#10b981',
        default_goals: ['compete', 'pro'],
        is_verified: true
      });
      setStats({ visitors: 1247, athletes: 89 });
    }
    setLoading(false);

    // Track page view
    trackAthletePageView(slug);
  }, [slug]);

  const trackAthletePageView = async (athleteSlug: string) => {
    // TODO: Insert into athlete_link_analytics
    console.log('Tracking view for:', athleteSlug);
  };

  const handleStartAssessment = () => {
    // Save athlete context to localStorage for pre-filling
    if (athlete) {
      localStorage.setItem('athlete_referral', JSON.stringify({
        athlete_id: athlete.id,
        athlete_name: athlete.athlete_name,
        sport: athlete.sport,
        level: athlete.level,
        default_goals: athlete.default_goals
      }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading athlete profile...</div>
      </div>
    );
  }

  if (!athlete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Athlete Not Found</h1>
          <p className="text-slate-400 mb-6">This athlete profile doesn't exist or has been deactivated.</p>
          <Link href="/" className="text-cyan-400 hover:text-cyan-300">
            ← Back to EVZAIN
          </Link>
        </div>
      </div>
    );
  }

  const primaryColor = athlete.primary_color || '#0891b2';
  const secondaryColor = athlete.secondary_color || '#10b981';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
        .logo-in {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 700;
          color: ${secondaryColor};
        }
        .athlete-gradient {
          background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor});
        }
      `}</style>

      {/* Header */}
      <header className="bg-slate-900/50 backdrop-blur-sm border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-2xl font-light tracking-tight text-white">
              EVZA<span className="logo-in">IN</span>
            </h1>
          </Link>
          <div className="flex items-center gap-3">
            {athlete.is_verified && (
              <div className="flex items-center gap-2 bg-cyan-900/30 text-cyan-300 px-3 py-1.5 rounded-full text-sm font-semibold">
                <CheckCircle className="w-4 h-4" />
                Verified Athlete
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {athlete.background_image_url && (
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${athlete.background_image_url})` }}
          />
        )}
        
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Athlete Info */}
            <div>
              <div className="inline-block athlete-gradient text-white px-4 py-2 rounded-full font-bold text-sm mb-6">
                {athlete.sport.charAt(0).toUpperCase() + athlete.sport.slice(1)} • {athlete.level}
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                Train Like <span className="athlete-gradient bg-clip-text text-transparent">{athlete.athlete_name.split(' ')[0]}</span>
              </h1>
              
              {athlete.quote && (
                <blockquote className="text-2xl text-slate-300 font-light italic mb-8 border-l-4 pl-6" style={{ borderColor: primaryColor }}>
                  "{athlete.quote}"
                </blockquote>
              )}

              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {athlete.bio}
              </p>

              {/* Achievements */}
              {athlete.achievements && athlete.achievements.length > 0 && (
                <div className="space-y-3 mb-8">
                  {athlete.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Award className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: primaryColor }} />
                      <span className="text-slate-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Social Links */}
              <div className="flex items-center gap-4 mb-8">
                {athlete.instagram_url && (
                  <a href={athlete.instagram_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {athlete.twitter_url && (
                  <a href={athlete.twitter_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
                {athlete.youtube_url && (
                  <a href={athlete.youtube_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <Youtube className="w-6 h-6" />
                  </a>
                )}
                {athlete.website_url && (
                  <a href={athlete.website_url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <Globe className="w-6 h-6" />
                  </a>
                )}
              </div>

              {/* CTA Button */}
              <Link
                href="/assessment"
                onClick={handleStartAssessment}
                className="inline-flex items-center gap-3 athlete-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-2xl group"
              >
                <span>Get Your Personalized Training Plan</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>

            {/* Right: Athlete Image */}
            <div className="relative">
              <div className="absolute -inset-4 athlete-gradient opacity-20 blur-3xl rounded-full" />
              <div className="relative bg-slate-800 rounded-3xl overflow-hidden border-2 border-slate-700">
                <img
                  src={athlete.profile_image_url || '/athlete.jpg'}
                  alt={athlete.athlete_name}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof Stats */}
      <div className="bg-slate-900/50 backdrop-blur-sm border-y border-slate-700/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                {stats.visitors.toLocaleString()}
              </div>
              <div className="text-slate-400">Athletes Inspired</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                {stats.athletes}
              </div>
              <div className="text-slate-400">Training Like {athlete.athlete_name.split(' ')[0]}</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-4xl font-bold mb-2" style={{ color: primaryColor }}>
                5 Min
              </div>
              <div className="text-slate-400">To Your Custom Plan</div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          How {athlete.athlete_name.split(' ')[0]} Trains Smarter
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="w-12 h-12 rounded-xl athlete-gradient flex items-center justify-center text-white font-bold text-xl mb-4">
              1
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Take the Assessment</h3>
            <p className="text-slate-400">5-minute questionnaire about your sport, goals, and current training.</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="w-12 h-12 rounded-xl athlete-gradient flex items-center justify-center text-white font-bold text-xl mb-4">
              2
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Get Your Blueprint</h3>
            <p className="text-slate-400">Personalized exercises and training protocols used by elite athletes.</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="w-12 h-12 rounded-xl athlete-gradient flex items-center justify-center text-white font-bold text-xl mb-4">
              3
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Train & Improve</h3>
            <p className="text-slate-400">Follow the plan, track progress, and see results like the pros.</p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/assessment"
            onClick={handleStartAssessment}
            className="inline-flex items-center gap-3 athlete-gradient text-white px-8 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-all shadow-2xl"
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-slate-700/50 py-8 text-center text-slate-400 text-sm">
        <p>Powered by <Link href="/" className="text-cyan-400 hover:text-cyan-300">EVZAIN</Link> • Training Intelligence for Elite Athletes</p>
      </footer>
    </div>
  );
}

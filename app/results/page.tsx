'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Target, TrendingUp, Brain, Heart, Award, Clock, Mail, Dumbbell, Activity, BookOpen, Zap, Play, Watch, ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';
import { generateRecommendations } from '@/lib/recommendation-generator';
import { AssessmentData, AthleteProfile, TrainingRecommendation } from '@/lib/types';
import { getExercisesForProfile, Exercise } from '@/lib/elite-exercises';

interface ResultsState {
  profile: AthleteProfile;
  recommendations: TrainingRecommendation[];
  metrics: any[];
  nextSteps: string[];
  timeline: string;
  assessmentData: AssessmentData;
}

export default function ResultsPage() {
  const [results, setResults] = useState<ResultsState | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [showResearch, setShowResearch] = useState(false);
  const [tangibleExercises, setTangibleExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const savedData = localStorage.getItem('assessmentData');
        if (savedData) {
          const assessmentData: AssessmentData = JSON.parse(savedData);
          const generated = generateRecommendations(assessmentData);
          
          // Get tangible exercises
          const exercises = getExercisesForProfile(
            assessmentData.sport,
            generated.profile.primaryFocus,
            assessmentData.level
          );
          
          setResults({
            ...generated,
            assessmentData
          });
          setTangibleExercises(exercises);
        }
      } catch (error) {
        console.error('Error generating recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !results) return;

    try {
      // Send roadmap delivery email
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          type: 'blueprint_delivery',
          data: {
            sport: results.assessmentData.sport,
            level: results.assessmentData.level,
            primary_focus: results.profile.primaryFocus,
          },
        }),
      });

      if (response.ok) {
        setEmailSubmitted(true);
        // Save email to localStorage for future sessions
        localStorage.setItem('userEmail', email);
      } else {
        alert('Failed to send roadmap. Please try again.');
      }
    } catch (error) {
      console.error('Error sending roadmap email:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-500 mx-auto mb-6"></div>
            <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-cyan-400" />
          </div>
          <p className="text-white text-lg font-semibold">Analyzing your profile...</p>
          <p className="text-slate-400 mt-2">Building your personalized training roadmap</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-lg text-center bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
          <Target className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-4">No Assessment Found</h1>
          <p className="mb-6 text-slate-300">Complete your assessment to get your personalized roadmap.</p>
          <a 
            href="/assessment" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg"
          >
            Take Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>
    );
  }

  const { profile, recommendations, assessmentData } = results;

  const getSegmentColor = () => {
    switch(profile.segment) {
      case 'elite': return { gradient: 'from-purple-600 via-purple-700 to-indigo-800', badge: 'bg-purple-500', glow: 'shadow-purple-500/50' };
      case 'advanced': return { gradient: 'from-cyan-600 via-cyan-700 to-blue-800', badge: 'bg-cyan-500', glow: 'shadow-cyan-500/50' };
      case 'intermediate': return { gradient: 'from-emerald-600 via-emerald-700 to-teal-800', badge: 'bg-emerald-500', glow: 'shadow-emerald-500/50' };
      default: return { gradient: 'from-blue-600 via-blue-700 to-indigo-800', badge: 'bg-blue-500', glow: 'shadow-blue-500/50' };
    }
  };

  const segmentColor = getSegmentColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061A35] via-[#0a2347] to-[#061A35] py-12 px-4 sm:px-6 lg:px-8">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
        .logo-in {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 700;
          color: #059669;
        }
        .logo-zeta {
          font-family: 'Times New Roman', serif;
          font-size: 42px;
          color: #14B8A6;
          font-weight: 400;
          line-height: 1;
        }
        .zeta-mark {
          font-family: 'Times New Roman', serif;
          font-size: 160px;
          color: #0891b2;
          opacity: 0.06;
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%) rotate(15deg);
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <a href="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
          <Image 
            src="/EVZAIN white letters green zeta.png" 
            alt="EVZAIN" 
            width={160} 
            height={40} 
            priority
            className="h-10 w-auto"
          />
        </a>
      </div>

      {/* Hero - Athlete Profile Card */}
      <div className={`max-w-6xl mx-auto bg-gradient-to-br ${segmentColor.gradient} rounded-3xl shadow-2xl ${segmentColor.glow} overflow-hidden mb-12 relative`}>
        <div className="zeta-mark">ζ</div>
        <div className="relative z-10 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className={`inline-flex items-center gap-2 ${segmentColor.badge} text-white px-4 py-2 rounded-full font-bold text-sm mb-4`}>
                <Award className="w-4 h-4" />
                {profile.segment.charAt(0).toUpperCase() + profile.segment.slice(1)} Athlete
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Your Training Roadmap
              </h1>
              <p className="text-white/90 text-xl">
                {assessmentData.sport === 'other' ? assessmentData.sportOther : assessmentData.sport.charAt(0).toUpperCase() + assessmentData.sport.slice(1)} • {assessmentData.level}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[140px]">
                <Clock className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-bold text-2xl">{assessmentData.trainingHours}</div>
                <div className="text-white/80 text-sm">per week</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[140px]">
                <TrendingUp className="w-6 h-6 text-white mx-auto mb-2" />
                <div className="text-white font-bold text-lg">{profile.commitmentLevel}</div>
                <div className="text-white/80 text-sm">commitment</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <Target className="w-6 h-6 text-white mb-2" />
              <h3 className="text-white font-semibold mb-1">Primary Focus</h3>
              <p className="text-white/90 capitalize">{profile.primaryFocus.replace(/_/g, ' ')}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <Brain className="w-6 h-6 text-white mb-2" />
              <h3 className="text-white font-semibold mb-1">Training Style</h3>
              <p className="text-white/90 capitalize">{profile.personalization.tone}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <Zap className="w-6 h-6 text-white mb-2" />
              <h3 className="text-white font-semibold mb-1">Urgency Level</h3>
              <p className="text-white/90 capitalize">{profile.personalization.urgency}</p>
            </div>
          </div>
        </div>
      </div>

      {/* TOP 3 EXERCISES - Apple-like Clean Section */}
      {tangibleExercises.length > 0 && (
        <div className="max-w-6xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Your Top 3 Exercises</h2>
            <p className="text-slate-400 text-lg">What elite athletes actually do. Start here.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tangibleExercises.slice(0, 3).map((exercise, idx) => (
              <div key={idx} className="bg-slate-800/30 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-700/50 hover:border-emerald-500/50 transition-all group">
                {/* Visual Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                  <Play className="w-16 h-16 text-white/40 group-hover:text-emerald-400 transition-colors" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">
                      Exercise {idx + 1}
                    </div>
                    <div className="text-white font-bold text-lg line-clamp-2">{exercise.name}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">{exercise.description}</p>
                  
                  {/* Elite Insight Badge */}
                  <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-4 mb-4 border border-purple-500/20">
                    <div className="flex items-start gap-2">
                      <Award className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-purple-200 text-xs leading-relaxed">{exercise.eliteInsight}</p>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="space-y-2">
                    {exercise.frequency && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Frequency</span>
                        <span className="text-white font-semibold">{exercise.frequency}</span>
                      </div>
                    )}
                    {exercise.duration && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Duration</span>
                        <span className="text-white font-semibold">{exercise.duration}</span>
                      </div>
                    )}
                    {exercise.sets && exercise.reps && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Volume</span>
                        <span className="text-white font-semibold">{exercise.sets} × {exercise.reps}</span>
                      </div>
                    )}
                  </div>

                  {/* How To Do */}
                  <details className="mt-4">
                    <summary className="text-emerald-400 text-sm font-semibold cursor-pointer hover:text-emerald-300 flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      How to do it
                    </summary>
                    <div className="mt-3 space-y-2 pl-6">
                      {exercise.howToDo.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-400 text-sm">{step}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>

          {/* Wearables Teaser */}
          <div className="mt-8 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-sm rounded-2xl border border-cyan-500/30 p-6">
            <div className="flex items-center gap-4">
              <Watch className="w-10 h-10 text-cyan-400" />
              <div className="flex-1">
                <h3 className="text-white font-bold text-lg mb-1">Track Everything</h3>
                <p className="text-slate-400 text-sm">
                  Soon: Connect your Whoop, Oura, Apple Watch, or Garmin. We'll integrate your metrics and adapt your training in real-time.
                </p>
              </div>
              <div className="text-cyan-400 text-sm font-semibold whitespace-nowrap">Coming Soon</div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations Section */}
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Your Complete Roadmap</h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Your personalized training plan, built on proven methodologies and elite athlete insights.
          </p>
        </div>

        {recommendations.map((rec, idx) => (
          <div key={rec.id} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 overflow-hidden hover:border-emerald-500/50 transition-all">
            <div className="p-8">
              {/* Recommendation Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${segmentColor.gradient} flex items-center justify-center flex-shrink-0`}>
                  {rec.category === 'technical' && <Dumbbell className="w-6 h-6 text-white" />}
                  {rec.category === 'tactical' && <Target className="w-6 h-6 text-white" />}
                  {rec.category === 'mental' && <Brain className="w-6 h-6 text-white" />}
                  {rec.category === 'physical' && <Activity className="w-6 h-6 text-white" />}
                  {rec.category === 'recovery' && <Heart className="w-6 h-6 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="text-sm text-emerald-400 font-semibold uppercase tracking-wide mb-1">
                    {rec.category}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{rec.title}</h3>
                  <p className="text-slate-300 text-lg leading-relaxed">{rec.description}</p>
                </div>
              </div>

              {/* Simplified Why - Just the essential insight */}
              <div className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-xl p-4 mb-6 border-l-2 border-emerald-500">
                <p className="text-slate-300 text-sm leading-relaxed italic">"{rec.why.split('.')[0]}."</p>
              </div>

              {/* Key Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-slate-900/30 rounded-lg p-4">
                  <div className="text-emerald-400 text-sm font-semibold mb-1">Frequency</div>
                  <div className="text-white font-medium">{rec.frequency}</div>
                </div>
                <div className="bg-slate-900/30 rounded-lg p-4">
                  <div className="text-emerald-400 text-sm font-semibold mb-1">Duration</div>
                  <div className="text-white font-medium">{rec.duration}</div>
                </div>
                <div className="bg-slate-900/30 rounded-lg p-4">
                  <div className="text-emerald-400 text-sm font-semibold mb-1">Metrics to Track</div>
                  <div className="text-white font-medium">{rec.metrics.length} key indicators</div>
                </div>
              </div>

              {/* Progression Path */}
              {rec.progressionPath && rec.progressionPath.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Progression Pathway</h4>
                  <div className="space-y-2">
                    {rec.progressionPath.map((phase, phaseIdx) => (
                      <div key={phaseIdx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-bold mt-0.5">
                          {phaseIdx + 1}
                        </div>
                        <div className="text-slate-300">{phase}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="max-w-6xl mx-auto mt-12 bg-gradient-to-r from-emerald-900/30 to-cyan-900/30 backdrop-blur-sm rounded-2xl border border-emerald-500/30 p-8">
        <div className="text-center">
          <Clock className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Your Timeline</h3>
          <p className="text-slate-300 text-lg">{results.timeline}</p>
          <p className="text-slate-400 mt-4">
            Consistency and quality execution matter more than perfection. Track your progress, adjust as needed, and trust the process.
          </p>
        </div>
      </div>

      {/* Collapsible Research Report */}
      <div className="max-w-6xl mx-auto mt-8">
        <button
          onClick={() => setShowResearch(!showResearch)}
          className="w-full bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all p-6 text-left"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-slate-400" />
              <div>
                <h3 className="text-white font-semibold">View Research Foundation</h3>
                <p className="text-slate-500 text-sm">Scientific studies and methodologies behind your roadmap</p>
              </div>
            </div>
            <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${showResearch ? 'rotate-90' : ''}`} />
          </div>
        </button>
        
        {showResearch && (
          <div className="mt-4 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
            <h4 className="text-white font-bold text-xl mb-6">Research & Methodologies</h4>
            <div className="space-y-8">
              {recommendations.map((rec, idx) => (
                rec.researchCitations && rec.researchCitations.length > 0 && (
                  <div key={idx} className="border-l-2 border-emerald-500 pl-6">
                    <h5 className="text-emerald-400 font-semibold mb-2">{rec.title}</h5>
                    <div className="space-y-3">
                      <div className="text-slate-300 leading-relaxed text-sm">{rec.why}</div>
                      <div className="space-y-2 mt-4">
                        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Citations</div>
                        {rec.researchCitations.map((citation, citIdx) => (
                          <div key={citIdx} className="text-slate-500 text-sm flex items-start gap-2">
                            <span className="text-emerald-600 mt-1">•</span>
                            <span>{citation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700">
              <p className="text-slate-400 text-sm italic text-center">
                All recommendations are backed by peer-reviewed research and proven elite athlete methodologies. 
                We don't guess - we follow the science.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Email Capture */}
      {!emailSubmitted ? (
        <div className="max-w-2xl mx-auto mt-12 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 text-center">
          <Mail className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Save Your Roadmap</h3>
          <p className="text-slate-300 mb-6">Get this sent to your email + early access to EVZAIN when we launch</p>
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-600 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-lg"
            >
              Send My Roadmap
            </button>
          </form>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto mt-12 bg-emerald-900/20 backdrop-blur-sm rounded-2xl border border-emerald-500/50 p-8 text-center">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Check Your Inbox!</h3>
          <p className="text-slate-300">We've sent your complete roadmap to {email}</p>
        </div>
      )}

      {/* Footer CTA */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <a 
          href="/" 
          className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
        >
          ← Back to home
        </a>
      </div>
    </div>
  );
}

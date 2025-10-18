'use client';

import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Target } from 'lucide-react';
import Link from 'next/link';

interface AssessmentData {
  sport: string;
  sportOther: string;
  level: string;
  trainingHours: string;
  goals: string;
  frustrations: string[];
  frustrationOther: string;
  confusionFrequency: string;
  trackingMethod: string[];
  trackingOther: string;
  compete: string;
  mentalChallenges: string[];
  mentalOther: string;
  mentalStrategies: string[];
  adviceSources: string[];
  willingnessToPay: string;
}

export default function Assessment() {
  const [step, setStep] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [data, setData] = useState<AssessmentData>({
    sport: '',
    sportOther: '',
    level: '',
    trainingHours: '',
    goals: '',
    frustrations: [],
    frustrationOther: '',
    confusionFrequency: '',
    trackingMethod: [],
    trackingOther: '',
    compete: '',
    mentalChallenges: [],
    mentalOther: '',
    mentalStrategies: [],
    adviceSources: [],
    willingnessToPay: '',
  });

  const totalSteps = 11; // Added goals question
  const progress = ((step + 1) / totalSteps) * 100;

  // Simplified progress messaging: removed microcopy per request
  const getProgressMessage = () => {
    return '';
  };

  const updateData = (field: keyof AssessmentData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: keyof AssessmentData, value: string) => {
    const current = data[field] as string[];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];
    updateData(field, updated);
  };

  const nextStep = () => {
    if (step < totalSteps - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    console.log('Assessment data:', data);
    // Navigate to results page with data
    localStorage.setItem('assessmentData', JSON.stringify(data));
    window.location.href = '/results';
  };

  const questions = [
    // Q1: Sport & Level
    {
      title: "Let's start with the basics",
      subtitle: "What sport defines your journey?",
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">Your Sport</label>
            <select
              value={data.sport}
              onChange={(e) => updateData('sport', e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all text-lg font-medium text-slate-900 text-black"
            >
              <option value="">Select your sport</option>
              <option value="soccer">Soccer</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="football">Football</option>
              <option value="baseball">Baseball</option>
              <option value="track">Track & Field</option>
              <option value="swimming">Swimming</option>
              <option value="golf">Golf</option>
              <option value="volleyball">Volleyball</option>
              <option value="fitness">General Fitness</option>
              <option value="other">Other</option>
            </select>
            
            {data.sport === 'other' && (
              <input
                type="text"
                placeholder="Please specify your sport"
                value={data.sportOther}
                onChange={(e) => updateData('sportOther', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all text-lg mt-3 text-black"
              />
            )}
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-3">Your Level</label>
            <div className="grid grid-cols-2 gap-3">
              {['Just starting out', 'Recreational', 'Serious hobbyist', 'High School', 'College', 'Semi-Pro', 'Professional'].map(level => (
                <button
                  key={level}
                  onClick={() => updateData('level', level)}
                  className={`px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                    data.level === level
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-md'
                      : 'border-slate-300 hover:border-slate-400 text-slate-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
      ),
      canProceed: data.sport && data.level && (data.sport !== 'other' || data.sportOther),
    },

    // Q2: Training Volume
    {
      title: "Your training commitment",
      subtitle: "How many hours per week do you train?",
      content: (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {['0-3 hours', '4-7 hours', '8-12 hours', '13-18 hours', '19-25 hours', '25+ hours'].map(hours => (
            <button
              key={hours}
              onClick={() => updateData('trainingHours', hours)}
              className={`px-6 py-6 rounded-2xl border-2 transition-all text-center ${
                data.trainingHours === hours
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-lg scale-105'
                  : 'border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              <div className="text-2xl font-bold">{hours.split(' ')[0]}</div>
              <div className="text-sm mt-1 font-medium">per week</div>
            </button>
          ))}
        </div>
      ),
      canProceed: data.trainingHours,
    },

    // Q3: Goals (NEW!)
    {
      title: "What drives you?",
      subtitle: "What's your main goal right now?",
      content: (
        <div className="space-y-3">
          {[
            { value: 'compete', label: 'Compete at a higher level' },
            { value: 'fitness', label: 'Improve overall fitness & health' },
            { value: 'skills', label: 'Master specific techniques/skills' },
            { value: 'consistency', label: 'Build consistent training habits' },
            { value: 'comeback', label: 'Return from injury stronger' },
            { value: 'pro', label: 'Turn pro or go D1' },
            { value: 'fun', label: 'Just enjoy the sport more' },
          ].map(goal => (
            <button
              key={goal.value}
              onClick={() => updateData('goals', goal.value)}
              className={`w-full px-6 py-5 rounded-xl border-2 transition-all text-left ${
                data.goals === goal.value
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-lg'
                  : 'border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              <span className="text-lg font-medium">{goal.label}</span>
            </button>
          ))}
        </div>
      ),
      canProceed: data.goals,
    },

    // Q4: Frustrations
    {
      title: "What's holding you back?",
      subtitle: "Select all that apply",
      content: (
        <div className="space-y-3">
          {[
            "Don't understand why I'm doing specific exercises",
            "Can't tell if workouts are making me better",
            "Training feels repetitive/boring",
            "Recovery guidance is unclear",
            "I get injured frequently"
          ].map(frustration => (
            <button
              key={frustration}
              onClick={() => toggleArrayItem('frustrations', frustration)}
              className={`w-full px-6 py-4 rounded-xl border-2 transition-all text-left ${
                data.frustrations.includes(frustration)
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                  : 'border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                  data.frustrations.includes(frustration) ? 'bg-emerald-600 border-emerald-600' : 'border-slate-400'
                }`}>
                  {data.frustrations.includes(frustration) && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-medium">{frustration}</span>
              </div>
            </button>
          ))}
          
          <div className="mt-0">
            <input
              type="text"
              placeholder="Other (please specify)"
              value={data.frustrationOther}
              onChange={(e) => updateData('frustrationOther', e.target.value)}
              className="w-full px-6 py-3 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all text-left text-lg font-medium text-slate-900"
            />
          </div>
        </div>
      ),
      canProceed: data.frustrations.length > 0 || data.frustrationOther,
    },

    // Q5: Confusion Frequency
    {
      title: 'Ever wondered "why"?',
      subtitle: "How often do you question the purpose of your training?",
      content: (
        <div className="space-y-3">
          {[
            { value: 'never', label: 'Never' },
            { value: 'rarely', label: 'Rarely' },
            { value: 'sometimes', label: 'Sometimes' },
            { value: 'often', label: 'Often' },
            { value: 'always', label: 'All the time' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => updateData('confusionFrequency', option.value)}
              className={`w-full px-6 py-5 rounded-xl border-2 transition-all text-left ${
                data.confusionFrequency === option.value
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-lg'
                  : 'border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              <span className="text-lg font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      ),
      canProceed: data.confusionFrequency,
    },

    // Q6: Tracking Method
    {
      title: "How do you track progress?",
      subtitle: "Select all that apply",
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 items-start">
            {[
              'Coach feedback',
              'Competition results',
              'Apps/Wearables',
              'Personal feeling',
              'Video analysis',
              'Performance stats',
              "Don't track"
            ].map((method, idx) => (
              <button
                key={method}
                onClick={() => toggleArrayItem('trackingMethod', method)}
                className={`px-4 py-4 rounded-xl border-2 transition-all font-medium ${
                  data.trackingMethod.includes(method)
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-slate-300 hover:border-slate-400 text-slate-700'
                }`}
              >
                {method}
              </button>
            ))}

            {/* Place 'Other' input directly as the last grid cell so it sits in column 2 of the 4th row */}
            <input
              type="text"
              placeholder="Other method (please specify)"
              value={data.trackingOther}
              onChange={(e) => updateData('trackingOther', e.target.value)}
              className="px-4 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all text-lg font-medium text-slate-900"
              style={{ paddingTop: '14px', paddingBottom: '14px', minHeight: '60px' }}
            />
          </div>
        </div>
      ),
      canProceed: data.trackingMethod.length > 0 || data.trackingOther,
    },

    // Q7: Competition
    {
      title: "Do you compete?",
      subtitle: "Organized events, tournaments, or competitions",
      content: (
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: 'regularly', label: 'Yes, regularly' },
            { value: 'occasionally', label: 'Yes, occasionally' },
            { value: 'want-to', label: "No, but I'd like to" },
            { value: 'casual', label: 'No, just casual' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => updateData('compete', option.value)}
              className={`px-6 py-8 rounded-2xl border-2 transition-all font-medium ${
                data.compete === option.value
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-lg'
                  : 'border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ),
      canProceed: data.compete,
    },

    // Q8: Mental Challenges
    {
      title: "The mental game",
      subtitle: "What hurts your performance most?",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {[
              'Overthinking',
              'Losing focus',
              'Nerves under pressure',
              'Lack of confidence',
              'Inconsistent motivation',
              'Negative self-talk'
            ].map(challenge => (
              <button
                key={challenge}
                onClick={() => toggleArrayItem('mentalChallenges', challenge)}
                className={`w-full px-6 py-4 rounded-xl border-2 transition-all text-left ${
                  data.mentalChallenges.includes(challenge)
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                    : 'border-slate-300 hover:border-slate-400 text-slate-700'
                }`}
              >
                <span className="font-medium">{challenge}</span>
              </button>
            ))}
          </div>
          
          <textarea
            placeholder="Other thoughts or challenges..."
            value={data.mentalOther}
            onChange={(e) => updateData('mentalOther', e.target.value)}
            rows={1}
            className="w-full px-6 py-3 rounded-xl border-2 border-slate-300 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100 transition-all resize-none text-lg font-medium text-slate-900"
            style={{ minHeight: '48px', maxHeight: '120px' }}
          />
        </div>
      ),
      canProceed: data.mentalChallenges.length > 0 || data.mentalOther,
    },

    // Q9: Mental Strategies
    {
      title: "What do you do when struggling?",
      subtitle: "Your current mental toolkit",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            'Deep breathing',
            'Positive self-talk',
            'Focus on technique',
            'Take a break',
            'Talk to someone',
            'Visualization',
            'Push through',
            'Nothing yet'
          ].map(strategy => (
            <button
              key={strategy}
              onClick={() => toggleArrayItem('mentalStrategies', strategy)}
              className={`px-4 py-4 rounded-xl border-2 transition-all font-medium ${
                data.mentalStrategies.includes(strategy)
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                  : 'border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              {strategy}
            </button>
          ))}
        </div>
      ),
      canProceed: data.mentalStrategies.length > 0,
    },

    // Q10: Advice Sources
    {
      title: "Where do you get advice?",
      subtitle: "Select all that apply",
      content: (
        <div className="grid grid-cols-2 gap-3">
          {[
            'Coach/Trainer',
            'YouTube',
            'Social Media',
            'AI/Apps',
            'Google',
            'Books',
            'Friends',
            'Figure it out myself'
          ].map(source => (
            <button
              key={source}
              onClick={() => toggleArrayItem('adviceSources', source)}
              className={`px-4 py-4 rounded-xl border-2 transition-all font-medium ${
                data.adviceSources.includes(source)
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                  : 'border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              {source}
            </button>
          ))}
        </div>
      ),
      canProceed: data.adviceSources.length > 0,
    },

    // Q11: Willingness to Pay
    {
      title: "One last question",
      subtitle: "What would you invest monthly for expert AI coaching?",
      content: (
        <div className="space-y-3">
          {[
            { value: 'free', label: 'Free only', desc: 'Basic insights' },
            { value: '5-10', label: '$5-10/month', desc: 'Regular guidance' },
            { value: '10-25', label: '$10-25/month', desc: 'Premium coaching' },
            { value: '25+', label: '$25+/month', desc: 'Full platform access' },
          ].map(option => (
            <button
              key={option.value}
              onClick={() => updateData('willingnessToPay', option.value)}
              className={`w-full px-6 py-5 rounded-xl border-2 transition-all text-left ${
                data.willingnessToPay === option.value
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-lg'
                  : 'border-slate-300 hover:border-slate-400 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-lg">{option.label}</div>
                  <div className="text-sm opacity-75 font-medium">{option.desc}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      ),
      canProceed: data.willingnessToPay,
    },
  ];

  const currentQuestion = questions[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,700&display=swap');
        .logo-in {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 700;
          color: #059669;
        }
        .greek-accent {
          color: #047857;
          opacity: 0.3;
          font-size: 6rem;
          position: absolute;
it        }
      `}</style>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-slate-700 z-50">
        <div
          className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 transition-all duration-500 ease-out shadow-lg shadow-emerald-500/50"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress Message (disappears on scroll) */}
      <div
        className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 text-emerald-300 text-sm font-semibold animate-pulse transition-opacity duration-300"
        id="progress-message"
      >
        {getProgressMessage()}
      </div>
      <script dangerouslySetInnerHTML={{__html:`
        window.addEventListener('scroll', function() {
          var bar = document.querySelector('.fixed.top-0.left-0.right-0.h-1.5');
          var msg = document.getElementById('progress-message');
          if (!bar || !msg) return;
          var rect = bar.getBoundingClientRect();
          if (rect.bottom < 0) {
            msg.style.opacity = 0;
          } else {
            msg.style.opacity = 1;
          }
        });
      `}} />

      {/* Header with Clickable Logo */}
      <Link href="/" className="fixed top-4 left-6 z-40 cursor-pointer hover:opacity-80 transition-opacity">
        <h1 className="text-2xl text-white font-light tracking-tight">
          EUZA<span className="logo-in">IN</span>
        </h1>
      </Link>

      {/* Step Counter */}
      <div className="fixed top-4 right-6 z-40 text-slate-400 text-sm font-semibold">
        {step + 1} of {totalSteps}
      </div>

      {/* Greek Zeta Accent (subtle) */}
      <div className="greek-accent" style={{ top: '20%', right: '5%', transform: 'rotate(15deg)' }}>
        ζ
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-3xl">
          {/* Question Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            {/* Title */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-emerald-600 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wide">Question {step + 1}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                {currentQuestion.title}
              </h2>
              <p className="text-lg text-slate-600 font-medium">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Content */}
            <div className="mb-8">
              {currentQuestion.content}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={prevStep}
                onKeyDown={(e) => e.key === 'Enter' && prevStep()}
                disabled={step === 0}
                tabIndex={step === 0 ? -1 : 0}
                className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                  step === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 focus:ring-4 focus:ring-slate-300'
                }`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              {step < totalSteps - 1 ? (
                <button
                  onClick={nextStep}
                  onKeyDown={(e) => e.key === 'Enter' && currentQuestion.canProceed && nextStep()}
                  disabled={!currentQuestion.canProceed}
                  tabIndex={0}
                  className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    currentQuestion.canProceed
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-lg focus:ring-4 focus:ring-emerald-300'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Continue
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  onKeyDown={(e) => e.key === 'Enter' && currentQuestion.canProceed && handleSubmit()}
                  disabled={!currentQuestion.canProceed}
                  tabIndex={0}
                  className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
                    currentQuestion.canProceed
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white shadow-lg focus:ring-4 focus:ring-cyan-300'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Get My Blueprint
                  <Target className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
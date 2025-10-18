'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, BookOpen, Video, Smartphone } from 'lucide-react';
import { generateBlueprint } from '@/lib/decisionTree';

type TrainingRecommendation = {
  focus: string[];
  drills: string[];
  frequency: string;
  notes?: string;
};

type Blueprint = {
  hero: {
    title: string;
    subtitle: string;
    goal: string;
  };
  currentState: {
    level: string;
    trainingHours: string;
    challenges: string[];
    mentalChallenges: string[];
  };
  recommendations: {
    technical: TrainingRecommendation;
    tactical: TrainingRecommendation;
    mental: TrainingRecommendation;
    physical: TrainingRecommendation;
  };
  progressionPath: {
    current: string;
    nextMilestone: string;
    timeline: string;
    keyFocusAreas: string[];
  };
  resources: {
    books: string[];
    videos: string[];
    apps: string[];
  };
};

export default function ResultsPage() {
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        // In a real app, you would fetch from your API
        const savedData = localStorage.getItem('assessmentData');
        if (savedData) {
          const data = JSON.parse(savedData);
          const generatedBlueprint = generateBlueprint(data);
          setBlueprint(generatedBlueprint);
        }
      } catch (error) {
        console.error('Error generating blueprint:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the email to your database
    console.log('Email submitted:', email);
    setEmailSubmitted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-emerald-800">Generating your personalized blueprint...</p>
        </div>
      </div>
    );
  }

  if (!blueprint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-bold text-emerald-800 mb-4">No Assessment Found</h1>
          <p className="mb-6 text-gray-700">We couldn't find your assessment results. Please complete the assessment first.</p>
          <a 
            href="/assessment" 
            className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Take Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-emerald-800 mb-2">{blueprint.hero.title}</h1>
            <p className="text-gray-600">{blueprint.hero.subtitle}</p>
            <div className="mt-4 inline-block bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
              Goal: {blueprint.hero.goal}
            </div>
          </div>

          {/* Current State */}
          <Section title="Where You Are Now">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Current Level</h3>
                <p className="text-gray-700">{blueprint.currentState.level}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Training Hours</h3>
                <p className="text-gray-700">{blueprint.currentState.trainingHours} per week</p>
              </div>
              {blueprint.currentState.challenges.length > 0 && (
                <div className="md:col-span-2">
                  <h3 className="font-medium text-gray-900 mb-2">Challenges</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    {blueprint.currentState.challenges.map((challenge, i) => (
                      <li key={i}>{challenge}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>

          <SectionDivider />

          {/* Recommendations */}
          <Section title="Your Training Plan">
            <div className="space-y-8">
              <RecommendationCard 
                title="Technical Skills"
                recommendation={blueprint.recommendations.technical}
              />
              <RecommendationCard 
                title="Tactical Training"
                recommendation={blueprint.recommendations.tactical}
              />
              <RecommendationCard 
                title="Mental Game"
                recommendation={blueprint.recommendations.mental}
              />
              <RecommendationCard 
                title="Physical Conditioning"
                recommendation={blueprint.recommendations.physical}
              />
            </div>
          </Section>

          <SectionDivider />

          {/* Progression Path */}
          <Section title="Your Path to Improvement">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="text-sm text-gray-600">Current</div>
                  <div className="font-medium text-emerald-800">{blueprint.progressionPath.current}</div>
                </div>
                <div className="flex-1 px-4">
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full w-1/3"></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-gray-600">Next Milestone</div>
                  <div className="font-medium text-emerald-800">{blueprint.progressionPath.nextMilestone}</div>
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 mt-2">
                Estimated timeline: {blueprint.progressionPath.timeline}
              </div>
              
              {blueprint.progressionPath.keyFocusAreas.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Key Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {blueprint.progressionPath.keyFocusAreas.map((area, i) => (
                      <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>

          <SectionDivider />

          {/* Resources */}
          <Section title="Recommended Resources">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ResourceCard 
                icon={<BookOpen className="h-6 w-6 text-emerald-600" />}
                title="Books"
                items={blueprint.resources.books}
              />
              <ResourceCard 
                icon={<Video className="h-6 w-6 text-emerald-600" />}
                title="Videos"
                items={blueprint.resources.videos}
              />
              <ResourceCard 
                icon={<Smartphone className="h-6 w-6 text-emerald-600" />}
                title="Apps"
                items={blueprint.resources.apps}
              />
            </div>
          </Section>

          {/* Email Capture */}
          {!emailSubmitted ? (
            <div className="mt-12 bg-emerald-50 p-6 rounded-xl text-center">
              <h3 className="text-lg font-medium text-emerald-800 mb-2">Get Your Complete Blueprint</h3>
              <p className="text-gray-600 mb-4">Enter your email to save your blueprint and receive updates</p>
              <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Send Me My Blueprint
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-12 bg-emerald-100 p-6 rounded-xl text-center">
              <h3 className="text-lg font-medium text-emerald-800 mb-2">Check Your Inbox!</h3>
              <p className="text-gray-700">We've sent your complete blueprint to {email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Components
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-emerald-700 mb-6 pb-2 border-b border-emerald-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SectionDivider() {
  return <div className="border-t border-gray-200 my-10"></div>;
}

function RecommendationCard({ title, recommendation }: { title: string; recommendation: TrainingRecommendation }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-medium text-emerald-800 mb-4">{title}</h3>
      
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Focus Areas</h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {recommendation.focus.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      
      <div className="mb-4">
        <h4 className="font-medium text-gray-900 mb-2">Recommended Drills</h4>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          {recommendation.drills.map((drill, i) => (
            <li key={i}>{drill}</li>
          ))}
        </ul>
      </div>
      
      <div className="text-sm text-gray-600">
        <span className="font-medium">Frequency:</span> {recommendation.frequency}
      </div>
      
      {recommendation.notes && (
        <div className="mt-3 p-3 bg-amber-50 text-amber-800 text-sm rounded">
          {recommendation.notes}
        </div>
      )}
    </div>
  );
}

function ResourceCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
      <div className="w-12 h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-medium text-gray-900 mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-gray-600">
        {items.map((item, i) => (
          <li key={i} className="line-clamp-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

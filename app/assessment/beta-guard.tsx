'use client';

import { useState } from 'react';

interface BetaGuardProps {
  onAccessGranted: () => void;
}

export default function BetaGuard({ onAccessGranted }: BetaGuardProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const BETA_CODES = [
    'EVZAIN2025',
    'ATHLETE',
    'EARLY',
    'ZETA'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (BETA_CODES.includes(code.trim().toUpperCase())) {
      localStorage.setItem('betaAccess', 'true');
      onAccessGranted();
    } else {
      setError('Invalid beta code. Request access at performance@evzain.com');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-2">
            EVZA<span className="font-serif italic text-emerald-400">IN</span>
          </h1>
          <div className="text-6xl text-cyan-400 opacity-30 mb-4">ζ</div>
          <p className="text-slate-300">Assessment - Beta Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="betaCode" className="block text-sm font-medium text-slate-300 mb-2">
              Enter your beta code
            </label>
            <input
              id="betaCode"
              type="text"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError('');
              }}
              placeholder=""
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Access Assessment ζ
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-400">
            Don't have a code?{' '}
            <a
              href="mailto:performance@evzain.com?subject=Beta Access Request"
              className="text-cyan-400 hover:text-cyan-300 underline"
            >
              Request access
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

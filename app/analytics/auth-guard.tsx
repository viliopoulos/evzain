'use client';

import { useState } from 'react';

interface AuthGuardProps {
  onAccessGranted: () => void;
}

export default function AuthGuard({ onAccessGranted }: AuthGuardProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Simple password - change this to something secure
  const ADMIN_PASSWORD = 'evzain2025admin';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('analyticsAccess', 'true');
      onAccessGranted();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-2">
            EVZA<span className="font-serif italic text-emerald-400">IN</span>
          </h1>
          <p className="text-slate-300">Analytics Dashboard - Admin Access</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Admin Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
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
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

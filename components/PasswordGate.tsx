'use client';

import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';

const CORRECT_PASSWORD = 'evzain2025'; // Change this to your desired password

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Skip password on localhost for development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      setIsAuthenticated(true);
      return;
    }
    
    // Check if user is already authenticated (stored in sessionStorage)
    const auth = sessionStorage.getItem('evzain_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('evzain_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-emerald-100">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              EVZA<span className="text-emerald-600">IN</span>
            </h1>
            <p className="text-slate-600">Private Beta Access</p>
          </div>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access password"
                className="w-full px-4 py-3 rounded-lg border-2 border-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all text-slate-900"
                autoFocus
              />
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-3 px-6 rounded-lg font-semibold transition-all shadow-lg shadow-emerald-200"
            >
              Access EVZAIN
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-500 text-center">
              This is a private beta. If you need access, please contact us.
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">EVZAIN</span> - Hyper-specific, data-driven training intelligence
          </p>
        </div>
      </div>
    </div>
  );
}

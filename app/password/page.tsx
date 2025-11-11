'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function PasswordPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsVerifying(true);
    
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        // Set cookie and redirect to home
        document.cookie = 'site-password=verified; path=/; max-age=86400'; // 24 hours
        router.push('/');
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#061A35] via-[#0a2347] to-[#061A35] flex items-center justify-center px-4">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600;700&display=swap');
      `}</style>

      <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-[#659832]/30 shadow-2xl">
        {/* Large Logo - 3x Size */}
        <div className="text-center mb-12">
          <Image 
            src="/EVZAIN Logo.png" 
            alt="EVZAIN" 
            width={540} 
            height={135} 
            priority
            className="h-30 md:h-36 w-auto mx-auto mb-8"
          />
          <h1 
            className="text-4xl md:text-5xl font-light text-white mb-4" 
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            Private Preview
          </h1>
          <p className="text-slate-300 text-lg">
            Enter password to access EVZAIN
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              disabled={isVerifying}
              className="w-full px-6 py-4 bg-white/5 border border-slate-600 rounded-xl text-white text-lg placeholder-slate-500 focus:outline-none focus:border-[#659832] focus:ring-2 focus:ring-[#659832] transition-colors disabled:opacity-50"
              autoFocus
              required
            />
            {error && (
              <p className="text-[#ea9aac] text-sm mt-2 font-medium">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-gradient-to-r from-[#659832] to-[#7ab03d] text-white px-8 py-4 rounded-xl hover:from-[#7ab03d] hover:to-[#659832] transition-all font-semibold text-lg shadow-lg shadow-[#659832]/30 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            {isVerifying ? 'Verifying...' : 'Enter Site'}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-8">
          Need access? Contact us for an invitation
        </p>
      </div>
    </div>
  );
}

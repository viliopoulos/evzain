/**
 * EVZAIN Logo Component
 * Uses the actual brand logo image with proper styling
 */

import Image from 'next/image';

interface EvzainLogoProps {
  variant?: 'full' | 'compact'; // full = with tagline, compact = logo only
  height?: number;
  className?: string;
}

export function EvzainLogo({ variant = 'compact', height = 60, className = '' }: EvzainLogoProps) {
  if (variant === 'full') {
    // Full logo with tagline for hero sections
    return (
      <div className={`flex flex-col items-center ${className}`}>
        <Image 
          src="/evzain-logo.png" 
          alt="EVZAIN" 
          width={height * 5}
          height={height}
          priority
          style={{ objectFit: 'contain', objectPosition: 'top' }}
        />
      </div>
    );
  }

  // Compact version - just the logo wordmark (crops out tagline)
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height: `${height}px` }}>
      <Image 
        src="/evzain-logo.png" 
        alt="EVZAIN" 
        width={height * 5}
        height={height * 1.5}
        priority
        style={{ 
          objectFit: 'contain',
          objectPosition: 'top',
          marginTop: '-5%'
        }}
      />
    </div>
  );
}

export default EvzainLogo;

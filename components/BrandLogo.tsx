/**
 * EVZAIN Brand Logo Component
 * Uses evzain-logo2.png - clean wordmark only (no tagline)
 */

import Image from 'next/image';

interface BrandLogoProps {
  height?: number;
  className?: string;
}

export function BrandLogo({ height = 50, className = '' }: BrandLogoProps) {
  // Calculate width based on logo aspect ratio (approximately 5:1)
  const width = height * 5;
  
  return (
    <Image 
      src="/evzain-logo2.png" 
      alt="EVZAIN" 
      width={width}
      height={height}
      priority
      className={className}
      style={{ 
        width: 'auto',
        height: `${height}px`,
        objectFit: 'contain'
      }}
    />
  );
}

export default BrandLogo;

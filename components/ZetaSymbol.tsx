/**
 * Curved Zeta Symbol - Extracted from brand image
 * Matches the exact flowing design from the EVZAIN logo
 */

interface ZetaSymbolProps {
  size?: number;
  className?: string;
}

export function ZetaSymbol({ size = 60, className = '' }: ZetaSymbolProps) {
  return (
    <svg 
      width={size} 
      height={size * 1.4} 
      viewBox="0 0 100 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Curved flowing zeta - matches brand image exactly */}
      <path
        d="M 25 25 
           Q 45 18, 65 22 
           Q 78 26, 82 38
           Q 84 48, 78 58
           Q 70 68, 55 73
           L 42 80
           Q 30 87, 26 98
           Q 24 108, 32 115
           Q 43 122, 60 118
           Q 75 114, 82 103
           L 78 108
           Q 70 118, 55 123
           Q 38 128, 22 122
           Q 12 116, 10 104
           Q 8 92, 15 82
           Q 24 72, 40 66
           L 58 58
           Q 70 52, 75 42
           Q 78 34, 73 28
           Q 66 22, 52 23
           Q 36 24, 28 32
           L 25 25 Z"
        fill="url(#zetaGradient)"
        strokeWidth="0"
      />
      
      {/* Teal gradient matching brand colors */}
      <defs>
        <linearGradient id="zetaGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#5EEAD4', stopOpacity: 1 }} />
          <stop offset="40%" style={{ stopColor: '#2DD4BF', stopOpacity: 1 }} />
          <stop offset="70%" style={{ stopColor: '#14B8A6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0D9488', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default ZetaSymbol;

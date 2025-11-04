/**
 * Custom Zeta Logo Component
 * Matches the exact curved, flowing design from the brand image
 */

interface ZetaLogoProps {
  size?: number;
  className?: string;
}

export function ZetaLogo({ size = 60, className = '' }: ZetaLogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Curved flowing zeta matching the brand image */}
      <path
        d="M 20 20 
           Q 40 15, 60 20 
           Q 75 25, 80 40
           Q 82 50, 75 60
           Q 68 70, 55 75
           L 45 80
           Q 35 85, 30 95
           Q 28 105, 35 110
           Q 45 115, 60 110
           Q 75 105, 80 95
           L 75 100
           Q 68 110, 55 115
           Q 40 120, 25 115
           Q 15 110, 12 100
           Q 10 90, 15 80
           Q 22 70, 35 65
           L 50 58
           Q 62 53, 68 45
           Q 72 38, 68 32
           Q 62 25, 50 25
           Q 35 25, 25 30
           L 20 20 Z"
        fill="url(#zetaGradient)"
        stroke="#14B8A6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Gradient definition for teal color */}
      <defs>
        <linearGradient id="zetaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#5EEAD4', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#14B8A6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0D9488', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default ZetaLogo;

/**
 * EVZAIN Brand Logo - Built as SVG Code
 * Based on the design spec: white text + teal zeta symbol
 * Scales perfectly at any size
 */

interface EvzainBrandLogoProps {
  height?: number;
  className?: string;
}

export function EvzainBrandLogo({ height = 60, className = '' }: EvzainBrandLogoProps) {
  // Calculate width based on text (approximately 5:1 ratio)
  const width = height * 5.5;
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 550 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block' }}
    >
      {/* EV in white */}
      <text 
        x="0" 
        y="75" 
        fontFamily="Arial, Helvetica, sans-serif" 
        fontSize="90" 
        fontWeight="700" 
        fill="#FFFFFF"
        letterSpacing="-2"
      >
        EV
      </text>
      
      {/* Curved Zeta symbol in teal */}
      <path
        d="M 185 20 
           Q 205 15, 225 20 
           Q 240 25, 245 40
           Q 247 50, 240 60
           Q 233 70, 218 75
           L 205 82
           Q 195 89, 191 100
           Q 189 110, 197 117
           Q 208 124, 225 120
           Q 240 116, 247 105
           L 243 110
           Q 235 120, 220 125
           Q 203 130, 187 124
           Q 177 118, 175 106
           Q 173 94, 180 84
           Q 189 74, 205 68
           L 223 60
           Q 235 54, 240 44
           Q 243 36, 238 30
           Q 231 24, 217 25
           Q 201 26, 193 34
           L 185 20 Z"
        fill="#14B8A6"
        transform="translate(0, -5) scale(0.95)"
      />
      
      {/* AIN in white */}
      <text 
        x="265" 
        y="75" 
        fontFamily="Arial, Helvetica, sans-serif" 
        fontSize="90" 
        fontWeight="700" 
        fill="#FFFFFF"
        letterSpacing="-2"
      >
        AIN
      </text>
    </svg>
  );
}

export default EvzainBrandLogo;

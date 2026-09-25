import React from 'react'

interface GridPatternProps {
  size?: number
  strokeColor?: string
  opacity?: number
}

export const GridPattern: React.FC<GridPatternProps> = React.memo(
  ({ size = 48, strokeColor = 'var(--grid-stroke)', opacity = 0.7 }) => {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          opacity,
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 40%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 40%, #000 30%, transparent 80%)',
        }}
      >
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="hero-grid-pattern"
              width={size}
              height={size}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${size} 0 L 0 0 0 ${size}`}
                fill="none"
                stroke={strokeColor}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />
        </svg>
      </div>
    )
  }
)

GridPattern.displayName = 'GridPattern'

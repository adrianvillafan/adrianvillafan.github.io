import React, { useRef, useState, useCallback } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  maxTilt?: number
  className?: string
  style?: React.CSSProperties
  glowColor?: string
}

export const TiltCard: React.FC<TiltCardProps> = React.memo(
  ({ children, maxTilt = 8, className = '', style, glowColor = 'rgba(99, 102, 241, 0.15)' }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState('')
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = ((y - centerY) / centerY) * -maxTilt
        const rotateY = ((x - centerX) / centerX) * maxTilt

        setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`)
        setMousePos({ x, y })
      },
      [maxTilt]
    )

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false)
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    }, [])

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          boxShadow: isHovered
            ? '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 30px var(--accent-glow)'
            : 'var(--shadow-card)',
          ...style,
        }}
        className={className}
      >
        {/* Spotlight dynamic hover glow */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              inset: 0,
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 80%)`,
              zIndex: 0,
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </div>
    )
  }
)

TiltCard.displayName = 'TiltCard'

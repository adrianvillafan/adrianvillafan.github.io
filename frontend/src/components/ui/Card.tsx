import React, { useRef, useState, useCallback } from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  glowOnHover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = React.memo(
  ({ children, className = '', style, glowOnHover = true, onClick }) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }, [])

    const handleMouseEnter = useCallback(() => setIsHovered(true), [])
    const handleMouseLeave = useCallback(() => setIsHovered(false), [])

    return (
      <div
        ref={cardRef}
        onMouseMove={glowOnHover ? handleMouseMove : undefined}
        onMouseEnter={glowOnHover ? handleMouseEnter : undefined}
        onMouseLeave={glowOnHover ? handleMouseLeave : undefined}
        onClick={onClick}
        style={{
          position: 'relative',
          borderRadius: '16px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-subtle)',
          padding: '1.75rem',
          backdropFilter: 'blur(16px)',
          overflow: 'hidden',
          transition: 'border-color 0.3s ease, transform 0.25s ease, box-shadow 0.3s ease',
          boxShadow: 'var(--shadow-card)',
          ...style,
        }}
        className={className}
      >
        {/* Spotlight hover effect */}
        {glowOnHover && isHovered && (
          <div
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              inset: 0,
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.12), transparent 80%)`,
              transition: 'opacity 0.2s ease',
            }}
          />
        )}
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </div>
    )
  }
)

Card.displayName = 'Card'

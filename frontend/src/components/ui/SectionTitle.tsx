import React from 'react'

export interface SectionTitleProps {
  badge?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export const SectionTitle: React.FC<SectionTitleProps> = React.memo(
  ({ badge, title, subtitle, align = 'center' }) => {
    return (
      <div
        style={{
          textAlign: align,
          marginBottom: '3.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: align === 'center' ? 'center' : 'flex-start',
          gap: '0.75rem',
        }}
      >
        {badge && (
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent-light)',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '0.35rem 0.9rem',
              borderRadius: '9999px',
              border: '1px solid rgba(99, 102, 241, 0.2)',
            }}
          >
            {badge}
          </span>
        )}
        <h2
          style={{
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            lineHeight: 1.15,
            background: 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              maxWidth: '650px',
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    )
  }
)

SectionTitle.displayName = 'SectionTitle'

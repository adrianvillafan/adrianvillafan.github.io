import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'outline'
  size?: 'sm' | 'md'
  icon?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = React.memo(
  ({ children, variant = 'default', size = 'sm', icon }) => {
    const baseStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem',
      borderRadius: '9999px',
      fontWeight: 500,
      letterSpacing: '0.01em',
      width: 'fit-content',
    }

    const sizeStyles: Record<string, React.CSSProperties> = {
      sm: { padding: '0.2rem 0.65rem', fontSize: '0.75rem' },
      md: { padding: '0.3rem 0.85rem', fontSize: '0.82rem' },
    }

    const variantStyles: Record<string, React.CSSProperties> = {
      default: {
        background: 'var(--badge-bg)',
        color: 'var(--badge-text)',
        border: '1px solid var(--border-subtle)',
      },
      accent: {
        background: 'rgba(99, 102, 241, 0.12)',
        color: 'var(--accent-light)',
        border: '1px solid rgba(99, 102, 241, 0.25)',
      },
      success: {
        background: 'rgba(16, 185, 129, 0.12)',
        color: '#34d399',
        border: '1px solid rgba(16, 185, 129, 0.25)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--text-muted)',
        border: '1px solid var(--border-subtle)',
      },
    }

    return (
      <span style={{ ...baseStyle, ...sizeStyles[size], ...variantStyles[variant] }}>
        {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
        {children}
      </span>
    )
  }
)

Badge.displayName = 'Badge'

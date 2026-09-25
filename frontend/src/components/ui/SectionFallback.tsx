import React from 'react'

interface SectionFallbackProps {
  height?: string
}

export const SectionFallback: React.FC<SectionFallbackProps> = React.memo(({ height = '50vh' }) => {
  return (
    <div
      style={{
        minHeight: height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          borderTopColor: 'var(--accent)',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
})

SectionFallback.displayName = 'SectionFallback'

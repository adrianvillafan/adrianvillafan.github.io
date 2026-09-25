import React from 'react'

export const AuroraBackground: React.FC = React.memo(() => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 'var(--aurora-opacity, 1)' as any,
        transition: 'opacity 0.4s ease',
      }}
    >
      {/* Aurora Blob 1 - Indigo Glow */}
      <div
        className="aurora-blob aurora-1"
        style={{
          position: 'absolute',
          top: '-15%',
          left: '15%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(79, 70, 229, 0.08) 60%, transparent 80%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Aurora Blob 2 - Cyan Glow */}
      <div
        className="aurora-blob aurora-2"
        style={{
          position: 'absolute',
          top: '10%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, rgba(99, 102, 241, 0.05) 55%, transparent 75%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Aurora Blob 3 - Violet Center Accent */}
      <div
        className="aurora-blob aurora-3"
        style={{
          position: 'absolute',
          top: '30%',
          left: '35%',
          width: '600px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <style>{`
        @keyframes auroraFloat1 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(40px, 30px, 0) scale(1.1);
          }
        }
        @keyframes auroraFloat2 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(-35px, 45px, 0) scale(0.95);
          }
        }
        @keyframes auroraFloat3 {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(25px, -30px, 0) scale(1.05);
          }
        }

        .aurora-1 {
          animation: auroraFloat1 18s ease-in-out infinite;
          will-change: transform;
        }
        .aurora-2 {
          animation: auroraFloat2 22s ease-in-out infinite;
          will-change: transform;
        }
        .aurora-3 {
          animation: auroraFloat3 16s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  )
})

AuroraBackground.displayName = 'AuroraBackground'

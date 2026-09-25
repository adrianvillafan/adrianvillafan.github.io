import React from 'react'
import {
  SiReact,
  SiTypescript,
  SiPython,
  SiNextdotjs,
  SiNodedotjs,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiFastapi,
  SiNestjs,
  SiOpencv,
  SiPandas,
  SiLinux,
  SiGit,
  SiTailwindcss,
  SiGraphql,
  SiMariadb,
  SiMinio,
  SiPhp,
  SiLaravel,
  SiSwagger,
} from 'react-icons/si'

interface TechItem {
  name: string
  icon: React.ReactNode
  color: string
}

// Fila 1: Full-Stack & Frontend / Backend Core
const ROW_1_TECHS: TechItem[] = [
  { name: 'React 19', icon: <SiReact size={20} />, color: '#61DAFB' },
  { name: 'TypeScript', icon: <SiTypescript size={20} />, color: '#3178C6' },
  { name: 'Next.js 15', icon: <SiNextdotjs size={20} />, color: 'var(--text-primary)' },
  { name: 'Node.js', icon: <SiNodedotjs size={20} />, color: '#5FA04E' },
  { name: 'NestJS', icon: <SiNestjs size={20} />, color: '#E0234E' },
  { name: 'PHP / Laravel', icon: <SiLaravel size={20} />, color: '#FF2D20' },
  { name: 'Python 3', icon: <SiPython size={20} />, color: '#3776AB' },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={20} />, color: '#06B6D4' },
  { name: 'GraphQL', icon: <SiGraphql size={20} />, color: '#E10098' },
  { name: 'FastAPI', icon: <SiFastapi size={20} />, color: '#009688' },
]

// Fila 2: Data Engineering, Cloud, Bases de Datos & DevOps
const ROW_2_TECHS: TechItem[] = [
  { name: 'Docker', icon: <SiDocker size={20} />, color: '#2496ED' },
  { name: 'PostgreSQL', icon: <SiPostgresql size={20} />, color: '#4169E1' },
  { name: 'MariaDB / MySQL', icon: <SiMariadb size={20} />, color: '#C0765A' },
  { name: 'MongoDB', icon: <SiMongodb size={20} />, color: '#47A248' },
  { name: 'MinIO (S3)', icon: <SiMinio size={20} />, color: '#C72C48' },
  { name: 'Redis', icon: <SiRedis size={20} />, color: '#DC382D' },
  { name: 'OpenCV & OCR', icon: <SiOpencv size={20} />, color: '#5C3EE8' },
  { name: 'Pandas', icon: <SiPandas size={20} />, color: '#38bdf8' },
  { name: 'Linux (Debian)', icon: <SiLinux size={20} />, color: '#FCC624' },
  { name: 'Git & CI/CD', icon: <SiGit size={20} />, color: '#F05032' },
  { name: 'OpenAPI / Swagger', icon: <SiSwagger size={20} />, color: '#85EA2D' },
]

export const TechMarquee: React.FC = React.memo(() => {
  const row1Doubled = [...ROW_1_TECHS, ...ROW_1_TECHS]
  const row2Doubled = [...ROW_2_TECHS, ...ROW_2_TECHS]

  return (
    <section
      aria-label="Tecnologías y herramientas que domino"
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '1.75rem 0',
        background: 'var(--bg-glass)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        userSelect: 'none',
      }}
    >
      {/* Máscaras laterales degradadas para transición suave */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '120px',
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      {/* Track 1: Scroll hacia la izquierda */}
      <div className="marquee-track marquee-row-1">
        {row1Doubled.map((item, index) => (
          <div
            key={`r1-${index}`}
            className="marquee-item"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.55rem 1.15rem',
              borderRadius: '9999px',
              background: 'var(--pill-bg)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'all 0.25s ease',
              flexShrink: 0,
            }}
          >
            <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Track 2: Scroll hacia la derecha */}
      <div className="marquee-track marquee-row-2">
        {row2Doubled.map((item, index) => (
          <div
            key={`r2-${index}`}
            className="marquee-item"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.55rem 1.15rem',
              borderRadius: '9999px',
              background: 'var(--pill-bg)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'all 0.25s ease',
              flexShrink: 0,
            }}
          >
            <span style={{ color: item.color, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </span>
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .marquee-track {
          display: flex;
          gap: 1rem;
          width: max-content;
        }

        .marquee-row-1 {
          animation: marqueeLeft 32s linear infinite;
        }

        .marquee-row-2 {
          animation: marqueeRight 35s linear infinite;
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        .marquee-item:hover {
          transform: translateY(-2px);
          border-color: var(--accent-light) !important;
          color: var(--text-primary) !important;
          background: var(--bg-elevated) !important;
          box-shadow: 0 4px 18px rgba(99, 102, 241, 0.25);
        }

        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  )
})

TechMarquee.displayName = 'TechMarquee'


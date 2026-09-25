import React from 'react'
import { motion } from 'motion/react'
import { experiences } from '@/data/portfolioData'
import { ExperienceItem } from '@/types'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { TiltCard } from '@/components/effects/TiltCard'
import { Badge } from '@/components/ui/Badge'
import { FiBriefcase, FiCalendar, FiMapPin, FiCheckCircle } from 'react-icons/fi'

// Sub-componente memoizado para cada tarjeta de experiencia
const TimelineCard: React.FC<{ item: ExperienceItem; index: number; isLatest: boolean }> = React.memo(
  ({ item, index, isLatest }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        style={{
          position: 'relative',
          paddingLeft: '2.75rem',
          paddingBottom: '2.5rem',
        }}
      >
        {/* Timeline Node Icon con pulso si es el más reciente */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '0.25rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: isLatest ? 'var(--accent)' : 'var(--bg-elevated)',
            border: isLatest ? '2px solid #ffffff' : '2px solid var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isLatest ? '#ffffff' : 'var(--accent-light)',
            boxShadow: isLatest ? '0 0 20px var(--accent)' : '0 0 12px var(--accent-glow)',
            zIndex: 2,
            transition: 'all 0.3s ease',
          }}
        >
          <FiBriefcase size={14} />
        </div>

        <TiltCard maxTilt={5} glowColor={isLatest ? 'rgba(99, 102, 241, 0.22)' : 'rgba(255, 255, 255, 0.08)'}>
          <div style={{ padding: '1.75rem' }}>
            {/* Header: Cargo & Empresa */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '0.75rem',
                marginBottom: '0.5rem',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                  <h3
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      lineHeight: 1.25,
                    }}
                  >
                    {item.role}
                  </h3>
                  {isLatest && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: '#34d399',
                        background: 'rgba(16, 185, 129, 0.12)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        padding: '0.15rem 0.6rem',
                        borderRadius: '9999px',
                      }}
                    >
                      Más Reciente
                    </span>
                  )}
                </div>

                <div
                  style={{
                    fontSize: '1.02rem',
                    fontWeight: 600,
                    color: 'var(--accent-light)',
                    marginTop: '0.2rem',
                  }}
                >
                  {item.company}
                </div>
              </div>

              {/* Periodo & Duración */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <FiCalendar size={13} />
                  {item.period}
                </span>
                <Badge variant={isLatest ? 'accent' : 'default'} size="sm">
                  {item.duration}
                </Badge>
              </div>
            </div>

            {/* Ubicación & Giro */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
                marginBottom: '1.25rem',
                flexWrap: 'wrap',
              }}
            >
              <FiMapPin size={13} />
              <span>{item.location}</span>
              <span>•</span>
              <span>{item.companyType}</span>
            </div>

            {/* Funciones & Logros */}
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
                marginBottom: '1.5rem',
              }}
            >
              {item.achievements.map((achievement, i) => (
                <li
                  key={i}
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem',
                  }}
                >
                  <FiCheckCircle
                    size={16}
                    color="var(--accent-light)"
                    style={{ flexShrink: 0, marginTop: '3px' }}
                  />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>

            {/* Chips de Tecnologías */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {item.technologies.map((tech, i) => (
                <Badge key={i} variant="default" size="sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </TiltCard>
      </motion.div>
    )
  }
)

TimelineCard.displayName = 'TimelineCard'

const Experience: React.FC = () => {
  const sectionRef = useSectionObserver('experience')

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="experience"
      className="section"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container">
        <SectionTitle
          badge="Trayectoria Laboral"
          title="Experiencia Profesional & Proyectos Clave"
          subtitle="Diseño, arquitectura e implementación de soluciones end-to-end, microservicios resilientes, ingeniería de datos y liderazgo técnico."
        />

        {/* Timeline Container con Guía de Gradiente */}
        <div
          style={{
            position: 'relative',
            maxWidth: '920px',
            margin: '0 auto',
          }}
        >
          {/* Vertical Connecting Line */}
          <div
            style={{
              position: 'absolute',
              left: '15px',
              top: '16px',
              bottom: '28px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--accent) 0%, rgba(99, 102, 241, 0.4) 70%, transparent 100%)',
              zIndex: 1,
            }}
          />

          {experiences.map((exp, idx) => (
            <TimelineCard
              key={exp.id}
              item={exp}
              index={idx}
              isLatest={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default React.memo(Experience)

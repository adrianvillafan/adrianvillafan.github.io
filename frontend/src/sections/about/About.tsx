import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { useLanguage } from '@/context/LanguageContext'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { AnimatedCounter } from '@/components/effects/AnimatedCounter'
import { TiltCard } from '@/components/effects/TiltCard'
import { TextScramble } from '@/components/effects/TextScramble'
import { EducationCertShowcase } from '@/components/effects/EducationCertShowcase'
import { CodeRunnerSimulation } from '@/components/effects/CodeRunnerSimulation'
import { FiAward, FiCheckCircle, FiCpu, FiTerminal, FiBookOpen, FiPlay } from 'react-icons/fi'

const About: React.FC = () => {
  const sectionRef = useSectionObserver('about')
  const { personalInfo, certifications } = usePortfolioData()
  const { isEnglish } = useLanguage()

  // Datos memoizados
  const certsList = useMemo(() => certifications, [certifications])
  const statsList = useMemo(() => personalInfo.about.stats, [personalInfo.about.stats])
  const highlightsList = useMemo(() => personalInfo.about.highlights, [personalInfo.about.highlights])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="about"
      className="section"
    >
      <div className="container">
        <SectionTitle
          badge={personalInfo.about.badge}
          title={personalInfo.about.title}
          subtitle={personalInfo.about.subtitle}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'start',
          }}
        >
          {/* Columna Izquierda: Narrativa & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {/* Tarjeta de Resumen con Gradiente Suave */}
            <Card style={{ background: 'var(--pill-bg)' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '0.85rem',
                  color: 'var(--accent-light)',
                }}
              >
                <FiTerminal size={18} />
                <span
                  style={{
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {personalInfo.about.academicBadge}
                </span>
              </div>
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  lineHeight: 1.55,
                }}
              >
                {personalInfo.about.lead}
              </p>
            </Card>

            {personalInfo.about.paragraphs.map((paragraph, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: '0.98rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                {paragraph}
              </p>
            ))}

            {/* Competencias Clave con Stagger Animation */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                marginTop: '0.5rem',
              }}
            >
              {highlightsList.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    background: 'var(--pill-bg)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <FiCheckCircle size={16} color="var(--accent-light)" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Columna Derecha: Contadores Animados 3D Tilt & Certificaciones */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
            }}
          >
            {/* 🔷 EFECTO: 3D Tilt Cards con Contadores Animados */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
              }}
            >
              {statsList.map((stat, idx) => {
                const colors = ['var(--accent-light)', '#38bdf8', '#34d399']
                const glowColors = [
                  'rgba(99, 102, 241, 0.15)',
                  'rgba(56, 189, 248, 0.18)',
                  'rgba(52, 211, 153, 0.18)',
                ]
                return (
                  <TiltCard key={idx} maxTilt={10} glowColor={glowColors[idx % 3]}>
                    <div style={{ padding: '1.25rem 0.8rem', textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                          fontWeight: 800,
                          color: colors[idx % 3],
                          lineHeight: 1.1,
                          marginBottom: '0.4rem',
                        }}
                      >
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          duration={1.2 + idx * 0.3}
                        />
                      </div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                          fontWeight: 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </TiltCard>
                )
              })}
            </div>

            {/* 🏛️ Formación Universitaria UNMSM & Certificaciones Interactivas */}
            <EducationCertShowcase isEnglish={isEnglish} />
          </motion.div>
        </div>

        {/* ⚡ Simulador Interactivo de Algoritmo & Pipeline ETL */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginTop: '3.5rem' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
            }}
          >
            <div>
              <span
                style={{
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--accent-light)',
                }}
              >
                {isEnglish ? 'Live Engineering Playground' : 'Laboratorio Computacional en Vivo'}
              </span>
              <h3
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  marginTop: '0.2rem',
                }}
              >
                {isEnglish
                  ? 'Interactive Scientific Computing & ETL Simulator'
                  : 'Simulador Interactivo de ETL & Computación Científica'}
              </h3>
            </div>
            <Badge variant="accent" size="sm">
              Python 3.12 • OpenCV • Pandas • PostgreSQL
            </Badge>
          </div>

          <CodeRunnerSimulation isEnglish={isEnglish} />
        </motion.div>
      </div>
    </section>
  )
}

export default React.memo(About)

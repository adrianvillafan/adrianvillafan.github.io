import React, { useMemo } from 'react'
import { motion } from 'motion/react'
import { personalInfo, certifications } from '@/data/portfolioData'
import { useSectionObserver } from '@/hooks/useSectionObserver'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { AnimatedCounter } from '@/components/effects/AnimatedCounter'
import { TiltCard } from '@/components/effects/TiltCard'
import { FiAward, FiCheckCircle, FiCpu, FiTerminal, FiBookOpen } from 'react-icons/fi'

const About: React.FC = () => {
  const sectionRef = useSectionObserver('about')

  // Datos memoizados
  const certsList = useMemo(() => certifications, [])

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="about"
      className="section"
    >
      <div className="container">
        <SectionTitle
          badge="Perfil Profesional"
          title="Computación Científica & Desarrollo de Alto Rendimiento"
          subtitle="Formación matemática y algorítmica aplicada a la arquitectura de microservicios, ingeniería de datos y desarrollo web moderno."
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
            <Card style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
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
                  Perfil Académico & Enfoque
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
              {[
                'Desarrollo end-to-end con React, Next.js, Node.js y PHP/Laravel',
                'Pipelines ETL automatizados, Web Scraping con Playwright y Visión con OpenCV',
                'Modelado y optimización de SQL (MySQL/MariaDB) y almacenamiento MinIO',
                'Microservicios con Docker y despliegues en servidores Linux',
              ].map((item, idx) => (
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
                    background: 'rgba(255, 255, 255, 0.02)',
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
              {/* Stat 1: Años de Experiencia */}
              <TiltCard maxTilt={10}>
                <div style={{ padding: '1.25rem 0.8rem', textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      color: 'var(--accent-light)',
                      lineHeight: 1.1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    <AnimatedCounter value={3} prefix="+" duration={1.2} />
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    Años de Experiencia
                  </div>
                </div>
              </TiltCard>

              {/* Stat 2: Proyectos / Plataformas */}
              <TiltCard maxTilt={10} glowColor="rgba(56, 189, 248, 0.18)">
                <div style={{ padding: '1.25rem 0.8rem', textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      color: '#38bdf8',
                      lineHeight: 1.1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    <AnimatedCounter value={6} prefix="+" duration={1.5} />
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    Plataformas en Producción
                  </div>
                </div>
              </TiltCard>

              {/* Stat 3: Enfoque de Rendimiento */}
              <TiltCard maxTilt={10} glowColor="rgba(52, 211, 153, 0.18)">
                <div style={{ padding: '1.25rem 0.8rem', textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                      fontWeight: 800,
                      color: '#34d399',
                      lineHeight: 1.1,
                      marginBottom: '0.4rem',
                    }}
                  >
                    <AnimatedCounter value={100} suffix="%" duration={1.8} />
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    Rigor & Optimización
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* Tarjeta de Formación Universitaria UNMSM */}
            <TiltCard maxTilt={6}>
              <div style={{ padding: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    marginBottom: '0.85rem',
                  }}
                >
                  <FiBookOpen size={20} color="var(--accent-light)" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    Formación Universitaria
                  </h3>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--text-primary)' }}>
                      Universidad Nacional Mayor de San Marcos (UNMSM)
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--accent-light)', marginTop: '0.2rem' }}>
                      Bachiller en Computación Científica
                    </div>
                  </div>
                  <Badge variant="accent" size="sm">
                    2020 – 2025
                  </Badge>
                </div>
              </div>
            </TiltCard>

            {/* Certificaciones IBM & Especializaciones */}
            <TiltCard maxTilt={6}>
              <div style={{ padding: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  <FiAward size={20} color="var(--accent-light)" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                    Certificaciones & Especializaciones
                  </h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  {certsList.map((cert, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.88rem',
                        borderBottom:
                          idx !== certsList.length - 1
                            ? '1px solid var(--border-subtle)'
                            : 'none',
                        paddingBottom: idx !== certsList.length - 1 ? '0.75rem' : '0',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                          {cert.title}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          {cert.issuer}
                        </div>
                      </div>
                      <Badge variant="outline" size="sm">
                        {cert.year}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default React.memo(About)

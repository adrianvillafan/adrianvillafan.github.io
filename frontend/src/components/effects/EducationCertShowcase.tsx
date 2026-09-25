import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { TiltCard } from './TiltCard'
import { Badge } from '@/components/ui/Badge'
import { soundFX } from '@/utils/soundEffects'
import {
  FiBookOpen,
  FiAward,
  FiCheckCircle,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiShield,
  FiCheck,
} from 'react-icons/fi'
import { SiCoursera } from 'react-icons/si'

interface EducationCertShowcaseProps {
  isEnglish?: boolean
}

// 🏛️ Emblema estilizado SVG de la Universidad Nacional Mayor de San Marcos (Decana de América)
const UnmsmCrestSvg: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 2px 8px rgba(180, 83, 9, 0.35))' }}
  >
    {/* Escudo Exterior Dorado / Granate */}
    <path
      d="M50 4 C68 4, 88 12, 88 28 C88 62, 50 94, 50 94 C50 94, 12 62, 12 28 C12 12, 32 4, 50 4 Z"
      fill="url(#unmsmGrad)"
      stroke="#F59E0B"
      strokeWidth="2.5"
    />
    {/* Borde Interior Dorado */}
    <path
      d="M50 10 C64 10, 82 17, 82 30 C82 58, 50 86, 50 86 C50 86, 18 58, 18 30 C18 17, 36 10, 50 10 Z"
      fill="#1A132F"
      stroke="#D97706"
      strokeWidth="1.5"
    />
    {/* Corona / Laurel superior */}
    <circle cx="50" cy="22" r="5" fill="#FBBF24" />
    <path d="M42 22 Q50 16 58 22" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
    {/* Libro Abierto de la Ciencia */}
    <path
      d="M34 40 C40 37, 48 38, 50 41 C52 38, 60 37, 66 40 L66 56 C60 53, 52 54, 50 57 C48 54, 40 53, 34 56 Z"
      fill="#F8FAFC"
      stroke="#D97706"
      strokeWidth="1.2"
    />
    <line x1="50" y1="41" x2="50" y2="57" stroke="#92400E" strokeWidth="1.5" />
    {/* Símbolo matemático de la integral / computación */}
    <path
      d="M48 46 Q47 43 45 44 M53 50 Q55 53 52 54"
      stroke="#4F46E5"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Año de Fundación 1551 */}
    <text
      x="50"
      y="72"
      textAnchor="middle"
      fill="#FDE68A"
      fontSize="9.5"
      fontWeight="900"
      fontFamily="system-ui, sans-serif"
      letterSpacing="1px"
    >
      1551
    </text>
    {/* Decana de América */}
    <text
      x="50"
      y="80"
      textAnchor="middle"
      fill="#F59E0B"
      fontSize="5.5"
      fontWeight="700"
      fontFamily="system-ui, sans-serif"
      letterSpacing="0.5px"
    >
      UNMSM
    </text>

    <defs>
      <linearGradient id="unmsmGrad" x1="12" y1="4" x2="88" y2="94" gradientUnits="userSpaceOnUse">
        <stop stopColor="#7F1D1D" />
        <stop offset="0.5" stopColor="#991B1B" />
        <stop offset="1" stopColor="#450A0A" />
      </linearGradient>
    </defs>
  </svg>
)

// 🎓 Emblema Universidad del Pacífico
const UpCrestSvg: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 2px 8px rgba(30, 58, 138, 0.35))' }}
  >
    <rect x="12" y="12" width="76" height="76" rx="20" fill="#0F172A" stroke="#38BDF8" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="28" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="3 3" />
    <text
      x="50"
      y="47"
      textAnchor="middle"
      fill="#38BDF8"
      fontSize="16"
      fontWeight="900"
      fontFamily="system-ui, sans-serif"
      letterSpacing="1px"
    >
      UP
    </text>
    <text
      x="50"
      y="62"
      textAnchor="middle"
      fill="#94A3B8"
      fontSize="7"
      fontWeight="700"
      fontFamily="system-ui, sans-serif"
      letterSpacing="1px"
    >
      PACÍFICO
    </text>
  </svg>
)

// 🔷 Logo Oficial IBM estilizado en SVG
const IbmLogoSvg: React.FC<{ size?: number }> = ({ size = 38 }) => (
  <svg width={size} height={size * 0.4} viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Rayas icónicas azules de IBM */}
    <rect x="0" y="4" width="22" height="4" fill="#0F62FE" />
    <rect x="0" y="12" width="22" height="4" fill="#0F62FE" />
    <rect x="0" y="20" width="22" height="4" fill="#0F62FE" />
    <rect x="0" y="28" width="22" height="4" fill="#0F62FE" />
    <rect x="0" y="36" width="22" height="4" fill="#0F62FE" />
    <rect x="0" y="44" width="22" height="4" fill="#0F62FE" />

    <rect x="32" y="4" width="38" height="4" fill="#0F62FE" />
    <rect x="32" y="12" width="12" height="4" fill="#0F62FE" />
    <rect x="58" y="12" width="12" height="4" fill="#0F62FE" />
    <rect x="32" y="20" width="38" height="4" fill="#0F62FE" />
    <rect x="32" y="28" width="12" height="4" fill="#0F62FE" />
    <rect x="58" y="28" width="12" height="4" fill="#0F62FE" />
    <rect x="32" y="36" width="38" height="4" fill="#0F62FE" />

    <rect x="80" y="4" width="10" height="4" fill="#0F62FE" />
    <rect x="110" y="4" width="10" height="4" fill="#0F62FE" />
    <rect x="80" y="12" width="40" height="4" fill="#0F62FE" />
    <rect x="80" y="20" width="40" height="4" fill="#0F62FE" />
    <rect x="80" y="28" width="10" height="4" fill="#0F62FE" />
    <rect x="95" y="28" width="10" height="4" fill="#0F62FE" />
    <rect x="110" y="28" width="10" height="4" fill="#0F62FE" />
    <rect x="80" y="36" width="10" height="4" fill="#0F62FE" />
    <rect x="110" y="36" width="10" height="4" fill="#0F62FE" />
  </svg>
)

// 🔷 Logo CertiProf Internacional
const CertiprofLogoSvg: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="3" />
    <path d="M30 50 L44 64 L72 34" stroke="#10B981" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const EducationCertShowcase: React.FC<EducationCertShowcaseProps> = React.memo(
  ({ isEnglish = false }) => {
    const [activeTab, setActiveTab] = useState<'education' | 'certifications'>('education')
    const [certPage, setCertPage] = useState(0)

    const certificates = [
      {
        id: 'ibm-sql',
        title: isEnglish
          ? 'Databases and SQL for Data Science with Python'
          : 'Databases and SQL for Data Science with Python',
        issuer: 'IBM / Coursera',
        year: '2025',
        type: 'IBM Professional Certificate',
        icon: <IbmLogoSvg size={42} />,
        color: '#0F62FE',
        skills: ['Python', 'SQL Relational', 'PostgreSQL', 'Cloud DB2', 'ETL Joins'],
        credentialCode: 'Verified IBM Credential',
      },
      {
        id: 'ibm-python',
        title: isEnglish
          ? 'Python for Data Science, AI & Development'
          : 'Python for Data Science, AI & Development',
        issuer: 'IBM / Coursera',
        year: '2024',
        type: 'IBM Professional Certificate',
        icon: <IbmLogoSvg size={42} />,
        color: '#0F62FE',
        skills: ['Python 3', 'Pandas & NumPy', 'REST APIs', 'Web Scraping', 'AI Engineering'],
        credentialCode: 'Verified IBM Credential',
      },
      {
        id: 'up-english',
        title: isEnglish
          ? 'Advanced English (Communication Level)'
          : 'Inglés Avanzado (Communication Level)',
        issuer: 'Universidad del Pacífico',
        year: '2023 – 2024',
        type: isEnglish ? 'Executive Language Program' : 'Programa de Idiomas para Profesionales',
        icon: <UpCrestSvg size={38} />,
        color: '#38BDF8',
        skills: ['Technical English', 'Executive Communication', 'Agile Cross-Cultural'],
        credentialCode: 'Centro de Idiomas UP',
      },
      {
        id: 'certiprof-scrum',
        title: 'Scrum Foundation Professional Certificate (SFPC™)',
        issuer: 'CertiProf International',
        year: '2022',
        type: isEnglish ? 'Agile Scrum International' : 'Metodologías Ágiles Internacional',
        icon: <CertiprofLogoSvg size={34} />,
        color: '#10B981',
        skills: ['Scrum Framework', 'Sprint Backlog', 'Agile Delivery', 'Continuous Improvement'],
        credentialCode: 'Credential ID: SFPC-2022',
      },
      {
        id: 'certiprof-remote',
        title: 'Remote Worker Professional Certificate (RWPC™)',
        issuer: 'CertiProf International',
        year: '2022',
        type: isEnglish ? 'Remote Work Best Practices' : 'Cultura y Operaciones Remotas',
        icon: <CertiprofLogoSvg size={34} />,
        color: '#10B981',
        skills: ['Distributed Teams', 'Asynchronous Comms', 'Cloud Collaboration Tools'],
        credentialCode: 'Credential ID: RWPC-2022',
      },
    ]

    const nextCert = () => {
      soundFX.playClick()
      setCertPage((prev) => (prev + 1) % certificates.length)
    }

    const prevCert = () => {
      soundFX.playClick()
      setCertPage((prev) => (prev - 1 + certificates.length) % certificates.length)
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
        {/* Toggle Pills entre Educación y Certificaciones */}
        <div
          style={{
            display: 'inline-flex',
            alignSelf: 'flex-start',
            padding: '0.3rem',
            borderRadius: '9999px',
            background: 'var(--pill-bg)',
            border: '1px solid var(--border-subtle)',
            gap: '0.35rem',
          }}
        >
          <button
            onClick={() => {
              soundFX.playClick()
              setActiveTab('education')
            }}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: activeTab === 'education' ? '#ffffff' : 'var(--text-secondary)',
              background: activeTab === 'education' ? 'var(--accent-primary)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <FiBookOpen size={15} />
            <span>{isEnglish ? 'University Education (UNMSM)' : 'Formación Universitaria (UNMSM)'}</span>
          </button>

          <button
            onClick={() => {
              soundFX.playClick()
              setActiveTab('certifications')
            }}
            style={{
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: activeTab === 'certifications' ? '#ffffff' : 'var(--text-secondary)',
              background: activeTab === 'certifications' ? 'var(--accent-primary)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            <FiAward size={15} />
            <span>{isEnglish ? 'Certificates & Credentials' : 'Certificaciones & Credenciales'}</span>
          </button>
        </div>

        {/* Contenido Dinámico con Transición */}
        <AnimatePresence mode="wait">
          {activeTab === 'education' ? (
            <motion.div
              key="tab-edu"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* Tarjeta Principal: UNMSM - Computación Científica */}
              <TiltCard maxTilt={5} glowColor="rgba(217, 119, 6, 0.2)">
                <div style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
                  {/* Marca de agua de fondo */}
                  <div
                    style={{
                      position: 'absolute',
                      right: '-15px',
                      bottom: '-15px',
                      opacity: 0.04,
                      pointerEvents: 'none',
                      transform: 'scale(1.8)',
                    }}
                  >
                    <UnmsmCrestSvg size={140} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                    <div style={{ flexShrink: 0 }}>
                      <UnmsmCrestSvg size={58} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.35rem',
                          flexWrap: 'wrap',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.74rem',
                            fontWeight: 700,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: '#F59E0B',
                            background: 'rgba(245, 158, 11, 0.12)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            border: '1px solid rgba(245, 158, 11, 0.3)',
                          }}
                        >
                          Decana de América • Fundada en 1551
                        </span>
                        <Badge variant="accent" size="sm">
                          2020 – 2025
                        </Badge>
                      </div>

                      <h3
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          lineHeight: 1.3,
                        }}
                      >
                        Universidad Nacional Mayor de San Marcos (UNMSM)
                      </h3>

                      <div
                        style={{
                          fontSize: '0.94rem',
                          fontWeight: 600,
                          color: 'var(--accent-light)',
                          marginTop: '0.25rem',
                        }}
                      >
                        {isEnglish
                          ? 'Bachelor of Science in Scientific Computing'
                          : 'Bachiller en Computación Científica'}
                      </div>

                      <div
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.15rem',
                        }}
                      >
                        Facultad de Ciencias Matemáticas • Escuela Profesional de Computación Científica
                      </div>

                      <p
                        style={{
                          fontSize: '0.88rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          marginTop: '0.85rem',
                        }}
                      >
                        {isEnglish
                          ? 'Rigorous mathematical, algorithmic, and numerical analysis curriculum applied to high-throughput computing, data modeling, computer vision, and resilient software architectures.'
                          : 'Sólida formación matemático-algorítmica aplicada a la computación de alto rendimiento, análisis numérico, modelado matemático de datos, visión artificial y diseño de software resiliente.'}
                      </p>

                      {/* Pilares Académicos UNMSM */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.45rem',
                          marginTop: '1rem',
                        }}
                      >
                        {[
                          isEnglish ? 'Numerical Analysis' : 'Análisis Numérico',
                          isEnglish ? 'Algorithms & Complexity' : 'Algoritmos & Complejidad',
                          isEnglish ? 'Mathematical Modeling' : 'Modelado Matemático',
                          isEnglish ? 'Computer Vision (OpenCV)' : 'Visión por Computadora',
                          isEnglish ? 'Software Architecture' : 'Arquitectura de Software',
                        ].map((pillar, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              color: 'var(--text-secondary)',
                              background: 'var(--pill-bg)',
                              border: '1px solid var(--border-subtle)',
                              padding: '0.25rem 0.65rem',
                              borderRadius: '6px',
                            }}
                          >
                            ✓ {pillar}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Tarjeta Secundaria: Universidad del Pacífico (Idiomas) */}
              <TiltCard maxTilt={5} glowColor="rgba(56, 189, 248, 0.15)">
                <div style={{ padding: '1.35rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ flexShrink: 0 }}>
                    <UpCrestSvg size={46} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        Universidad del Pacífico (UP)
                      </h4>
                      <Badge variant="outline" size="sm">
                        2023 – 2024
                      </Badge>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: '#38BDF8', fontWeight: 600, marginTop: '0.2rem' }}>
                      {isEnglish
                        ? 'Advanced English (Executive Communication Level)'
                        : 'Inglés Avanzado — Communication Level (Centro de Idiomas UP)'}
                    </div>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
                      {isEnglish
                        ? 'Full professional working proficiency for global distributed engineering teams.'
                        : 'Dominio profesional fluido para colaboración en equipos de ingeniería globales y remotos.'}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ) : (
            /* TAB CERTIFICACIONES: Carrusel interactivo */
            <motion.div
              key="tab-certs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.25rem',
                }}
              >
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {isEnglish
                    ? `Showing ${certPage + 1} of ${certificates.length} credentials`
                    : `Mostrando credencial ${certPage + 1} de ${certificates.length}`}
                </span>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={prevCert}
                    aria-label="Credencial anterior"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--pill-bg)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                    }}
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextCert}
                    aria-label="Siguiente credencial"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--pill-bg)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                    }}
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Tarjeta de Certificado Destacado */}
              {(() => {
                const current = certificates[certPage]
                return (
                  <TiltCard maxTilt={6} glowColor="rgba(99, 102, 241, 0.2)">
                    <div
                      style={{
                        padding: '1.75rem',
                        borderLeft: `4px solid ${current.color}`,
                        background: 'var(--bg-elevated)',
                        borderRadius: '12px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '1rem',
                          marginBottom: '0.85rem',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <div
                            style={{
                              padding: '0.5rem',
                              borderRadius: '8px',
                              background: 'rgba(255, 255, 255, 0.05)',
                              border: '1px solid var(--border-subtle)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {current.icon}
                          </div>
                          <div>
                            <span
                              style={{
                                fontSize: '0.74rem',
                                color: current.color,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                              }}
                            >
                              {current.type}
                            </span>
                            <h4
                              style={{
                                fontSize: '1.1rem',
                                fontWeight: 700,
                                color: 'var(--text-primary)',
                                marginTop: '0.15rem',
                              }}
                            >
                              {current.title}
                            </h4>
                          </div>
                        </div>

                        <Badge variant="accent" size="sm">
                          {current.year}
                        </Badge>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontSize: '0.85rem',
                          color: 'var(--text-muted)',
                          marginBottom: '1rem',
                        }}
                      >
                        <FiShield size={14} color="#10B981" />
                        <span style={{ color: '#10B981', fontWeight: 600 }}>
                          {isEnglish ? 'Verified Credential' : 'Emisor Oficial'}
                        </span>
                        <span>•</span>
                        <span>{current.issuer}</span>
                      </div>

                      {/* Habilidades Validadas */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.5rem' }}>
                        {current.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '0.74rem',
                              fontWeight: 600,
                              color: 'var(--text-secondary)',
                              background: 'var(--pill-bg)',
                              border: '1px solid var(--border-subtle)',
                              padding: '0.25rem 0.6rem',
                              borderRadius: '6px',
                            }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '1.25rem',
                          paddingTop: '0.85rem',
                          borderTop: '1px solid var(--border-subtle)',
                          fontSize: '0.78rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        <span>{current.credentialCode}</span>
                        <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>
                          {isEnglish ? 'Verified by Adrian Villafan ✓' : 'Acreditado y Verificado ✓'}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                )
              })()}

              {/* Mini lista de accesos rápidos a las otras credenciales */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '0.5rem',
                }}
              >
                {certificates.map((cert, index) => (
                  <button
                    key={cert.id}
                    onClick={() => {
                      soundFX.playClick()
                      setCertPage(index)
                    }}
                    style={{
                      padding: '0.5rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      textAlign: 'left',
                      background: certPage === index ? 'var(--pill-bg)' : 'transparent',
                      border: certPage === index ? `1px solid ${cert.color}` : '1px solid var(--border-subtle)',
                      color: certPage === index ? 'var(--text-primary)' : 'var(--text-muted)',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {cert.issuer.split('/')[0].trim()} • {cert.year}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

EducationCertShowcase.displayName = 'EducationCertShowcase'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { TiltCard } from './TiltCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { soundFX } from '@/utils/soundEffects'
import { usePortfolioData } from '@/hooks/usePortfolioData'
import { DiplomaPreviewModal, DiplomaItem } from './DiplomaPreviewModal'
import { CertificationItem } from '@/types'
import {
  FiBookOpen,
  FiAward,
  FiCheckCircle,
  FiExternalLink,
  FiChevronLeft,
  FiChevronRight,
  FiShield,
  FiEye,
  FiCalendar,
} from 'react-icons/fi'
import { SiCoursera, SiAtlassian, SiAnthropic } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

interface EducationCertShowcaseProps {
  isEnglish?: boolean
}

// 🏛️ Emblema oficial de la Universidad Nacional Mayor de San Marcos (Decana de América)
const UnmsmCrestSvg: React.FC<{ size?: number; className?: string }> = ({ size = 48, className }) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <img
      src="./images/unmsm_seal.svg"
      alt="Universidad Nacional Mayor de San Marcos"
      width={size}
      height={size}
      loading="lazy"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        filter: 'drop-shadow(0 2px 8px rgba(180, 83, 9, 0.35))',
      }}
    />
  </div>
)

// 🎓 Emblema oficial de la Universidad del Pacífico
const UpCrestSvg: React.FC<{ size?: number; className?: string }> = ({ size = 48, className }) => (
  <div
    className={className}
    style={{
      width: size,
      height: size,
      borderRadius: Math.round(size * 0.25),
      background: '#ffffff',
      padding: Math.max(3, Math.round(size * 0.08)),
      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    <img
      src="./images/upacifico.png"
      alt="Universidad del Pacífico"
      width={size}
      height={size}
      loading="lazy"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
  </div>
)

// 🧠 Logo Oficial Anthropic
const AnthropicLogoOfficial: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <div
    style={{
      width: size,
      height: size,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '8px',
      background: 'rgba(217, 119, 6, 0.12)',
      color: '#D97706',
    }}
  >
    <SiAnthropic size={size * 0.75} />
  </div>
)

// 🛡️ Logo Oficial Rimac Seguros
const RimacLogoOfficial: React.FC<{ size?: number }> = () => (
  <div
    style={{
      height: '28px',
      minWidth: '58px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      background: '#ffffff',
      padding: '3px 8px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    }}
  >
    <img
      src="./images/rimac_logo.png"
      alt="Rimac Seguros"
      height={20}
      loading="lazy"
      style={{ maxHeight: '20px', width: 'auto', objectFit: 'contain' }}
    />
  </div>
)

// 🔷 Logo Oficial IBM (Paul Rand 8-bar)
const IbmLogoOfficial: React.FC<{ size?: number }> = ({ size = 44 }) => (
  <div
    style={{
      width: size,
      height: Math.round(size * 0.5),
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      background: 'rgba(15, 98, 254, 0.12)',
      padding: '4px 6px',
    }}
  >
    <img
      src="./images/ibm_logo.svg"
      alt="IBM"
      width={size}
      height={Math.round(size * 0.42)}
      loading="lazy"
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  </div>
)

// 🔷 Logo Oficial CertiProf Internacional
const CertiprofLogoOfficial: React.FC<{ size?: number }> = () => (
  <div
    style={{
      height: '28px',
      minWidth: '60px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '6px',
      background: '#ffffff',
      padding: '3px 6px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
    }}
  >
    <img
      src="./images/certiprof_logo.png"
      alt="CertiProf International"
      height={20}
      loading="lazy"
      style={{ maxHeight: '20px', width: 'auto', objectFit: 'contain' }}
    />
  </div>
)

export const EducationCertShowcase: React.FC<EducationCertShowcaseProps> = React.memo(
  ({ isEnglish = false }) => {
    const { certifications: allCerts } = usePortfolioData()
    const [activeTab, setActiveTab] = useState<'education' | 'certifications'>('education')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [certPage, setCertPage] = useState(0)
    const [selectedDiploma, setSelectedDiploma] = useState<DiplomaItem | null>(null)

    // Helper de branding de cada emisor
    const getCertBranding = (cert: CertificationItem) => {
      const issuer = cert.issuer.toLowerCase()
      if (issuer.includes('anthropic')) {
        return { icon: <AnthropicLogoOfficial size={34} />, color: '#D97706', badge: 'Anthropic AI' }
      }
      if (issuer.includes('atlassian')) {
        return { icon: <SiAtlassian size={30} color="#0052CC" />, color: '#0052CC', badge: 'Atlassian' }
      }
      if (issuer.includes('ibm')) {
        return { icon: <IbmLogoOfficial size={44} />, color: '#0F62FE', badge: 'IBM Professional' }
      }
      if (issuer.includes('rimac')) {
        return { icon: <RimacLogoOfficial size={38} />, color: '#E11D48', badge: 'Rimac Hackathon' }
      }
      if (issuer.includes('linkedin')) {
        return { icon: <FaLinkedin size={32} color="#0A66C2" />, color: '#0A66C2', badge: 'LinkedIn Learning' }
      }
      if (issuer.includes('cinfo') || issuer.includes('unmsm')) {
        return { icon: <UnmsmCrestSvg size={36} />, color: '#F59E0B', badge: 'UNMSM CINFO' }
      }
      if (issuer.includes('certiprof')) {
        return { icon: <CertiprofLogoOfficial size={38} />, color: '#10B981', badge: 'CertiProf International' }
      }
      return { icon: <SiCoursera size={32} color="#0056D2" />, color: '#0056D2', badge: 'Coursera' }
    }

    // Filtrar certificados según categoría seleccionada
    const filteredCerts = useMemo(() => {
      if (selectedCategory === 'all') return allCerts
      if (selectedCategory === 'ai') {
        return allCerts.filter(
          (c) =>
            c.issuer.toLowerCase().includes('anthropic') ||
            c.title.toLowerCase().includes('machine learning') ||
            c.title.toLowerCase().includes('ai')
        )
      }
      if (selectedCategory === 'data') {
        return allCerts.filter(
          (c) =>
            c.title.toLowerCase().includes('sql') ||
            c.title.toLowerCase().includes('python') ||
            c.title.toLowerCase().includes('databases')
        )
      }
      if (selectedCategory === 'web') {
        return allCerts.filter(
          (c) =>
            c.title.toLowerCase().includes('php') ||
            c.title.toLowerCase().includes('web') ||
            c.title.toLowerCase().includes('figma') ||
            c.title.toLowerCase().includes('programación')
        )
      }
      if (selectedCategory === 'agile') {
        return allCerts.filter((c) => c.issuer.toLowerCase().includes('certiprof'))
      }
      return allCerts
    }, [allCerts, selectedCategory])

    const safeCertPage = Math.min(certPage, Math.max(0, filteredCerts.length - 1))
    const current = filteredCerts[safeCertPage] || allCerts[0]
    const currentBrand = current ? getCertBranding(current) : null

    const nextCert = () => {
      soundFX.playClick()
      setCertPage((prev) => (prev + 1) % filteredCerts.length)
    }

    const prevCert = () => {
      soundFX.playClick()
      setCertPage((prev) => (prev - 1 + filteredCerts.length) % filteredCerts.length)
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
            flexWrap: 'wrap',
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
              cursor: 'pointer',
            }}
          >
            <FiBookOpen size={15} />
            <span>{isEnglish ? 'University Education' : 'Formación Universitaria'}</span>
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
              cursor: 'pointer',
            }}
          >
            <FiAward size={15} />
            <span>
              {isEnglish
                ? `Certificates & Licenses (${allCerts.length})`
                : `Certificaciones & Licencias (${allCerts.length})`}
            </span>
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

                      {/* Botón Ver Diploma en HD */}
                      <div style={{ marginTop: '1.25rem' }}>
                        <Button
                          size="sm"
                          variant="primary"
                          icon={<FiEye size={15} />}
                          onClick={() => {
                            soundFX.playClick()
                            setSelectedDiploma({
                              id: 'unmsm-degree',
                              title: isEnglish
                                ? 'Bachelor of Science in Scientific Computing'
                                : 'Bachiller en Computación Científica',
                              degreeLevel: 'Grado Académico Oficial Universitario',
                              issuer: 'Universidad Nacional Mayor de San Marcos',
                              recipient: 'Adrian Marcel Villafan Virhuez',
                              date: '2020 – 2025',
                              faculty:
                                'Facultad de Ciencias Matemáticas • Escuela Profesional de Computación Científica',
                              motto: 'Decana de América • Fundada en 1551',
                              credentialId: 'UNMSM-FCM-2025',
                              skills: [
                                isEnglish ? 'Numerical Analysis' : 'Análisis Numérico',
                                isEnglish ? 'Algorithms & Complexity' : 'Algoritmos & Complejidad',
                                isEnglish ? 'Mathematical Modeling' : 'Modelado Matemático',
                                isEnglish ? 'Computer Vision (OpenCV)' : 'Visión por Computadora',
                                isEnglish ? 'Software Architecture' : 'Arquitectura de Software',
                              ],
                              color: '#F59E0B',
                              type: 'unmsm',
                            })
                          }}
                        >
                          {isEnglish ? 'View Credential' : 'Ver Credencial'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>

              {/* Tarjeta Secundaria: Universidad del Pacífico (Idiomas) */}
              <TiltCard maxTilt={5} glowColor="rgba(56, 189, 248, 0.2)">
                <div style={{ padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
                  <div
                    style={{
                      position: 'absolute',
                      right: '-15px',
                      bottom: '-15px',
                      opacity: 0.05,
                      pointerEvents: 'none',
                      transform: 'scale(1.8)',
                    }}
                  >
                    <UpCrestSvg size={140} />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}>
                    <div style={{ flexShrink: 0 }}>
                      <UpCrestSvg size={58} />
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
                            color: '#38BDF8',
                            background: 'rgba(56, 189, 248, 0.12)',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            border: '1px solid rgba(56, 189, 248, 0.3)',
                          }}
                        >
                          Centro de Idiomas • Formación Ejecutiva
                        </span>
                        <Badge variant="outline" size="sm">
                          2023 – 2024
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
                        Universidad del Pacífico (UP)
                      </h3>

                      <div
                        style={{
                          fontSize: '0.94rem',
                          fontWeight: 600,
                          color: '#38BDF8',
                          marginTop: '0.25rem',
                        }}
                      >
                        {isEnglish
                          ? 'Advanced English (Executive Communication Level)'
                          : 'Inglés Avanzado — Communication Level'}
                      </div>

                      <div
                        style={{
                          fontSize: '0.82rem',
                          color: 'var(--text-muted)',
                          marginTop: '0.15rem',
                        }}
                      >
                        {isEnglish
                          ? 'Center for Executive Languages • Global Professional Fluency'
                          : 'Centro de Idiomas UP • Inglés Corporativo y Profesional'}
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
                          ? 'Full professional working proficiency for global distributed engineering teams, agile ceremonies, international technical negotiations, architectural debates, and English technical documentation.'
                          : 'Dominio profesional fluido para colaboración en equipos de ingeniería globales y remotos, ceremonias ágiles, negociación técnica internacional, debates de arquitectura y documentación técnica en inglés.'}
                      </p>

                      {/* Pilares UP */}
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0.45rem',
                          marginTop: '1rem',
                        }}
                      >
                        {[
                          isEnglish ? 'Technical English' : 'Inglés Técnico',
                          isEnglish ? 'Executive Communication' : 'Comunicación Ejecutiva',
                          isEnglish ? 'Cross-Cultural Agile Teams' : 'Equipos Ágiles Globales',
                          isEnglish ? 'Architecture Reviews' : 'Revisiones de Arquitectura',
                          isEnglish ? 'Technical Documentation' : 'Documentación Técnica',
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

                      {/* Botón Ver Credencial UP */}
                      <div style={{ marginTop: '1.25rem' }}>
                        <Button
                          size="sm"
                          variant="outline"
                          icon={<FiEye size={15} />}
                          onClick={() => {
                            soundFX.playClick()
                            setSelectedDiploma({
                              id: 'up-english-cert',
                              title: isEnglish
                                ? 'Advanced English (Executive Communication Level)'
                                : 'Inglés Avanzado — Communication Level',
                              degreeLevel: 'Programa de Idiomas para Ejecutivos',
                              issuer: 'Universidad del Pacífico',
                              recipient: 'Adrian Marcel Villafan Virhuez',
                              date: '2023 – 2024',
                              faculty: 'Centro de Idiomas UP',
                              skills: [
                                'Technical English',
                                'Executive Communication',
                                'Agile Cross-Cultural Communication',
                              ],
                              color: '#38BDF8',
                              type: 'up',
                            })
                          }}
                        >
                          {isEnglish ? 'View Credential' : 'Ver Credencial'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ) : (
            /* TAB CERTIFICACIONES: Carrusel interactivo enriquecido con todos los certificados */
            <motion.div
              key="tab-certs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {/* Filtros por Categoría */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.45rem',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                }}
              >
                {[
                  { id: 'all', label: isEnglish ? `All (${allCerts.length})` : `Todas (${allCerts.length})` },
                  { id: 'ai', label: 'IA & Claude' },
                  { id: 'data', label: 'Data & SQL' },
                  { id: 'web', label: 'Backend & Web' },
                  { id: 'agile', label: 'Ágil & Remoto' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundFX.playClick()
                      setSelectedCategory(cat.id)
                      setCertPage(0)
                    }}
                    style={{
                      padding: '0.35rem 0.8rem',
                      borderRadius: '9999px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      background: selectedCategory === cat.id ? 'var(--pill-bg)' : 'transparent',
                      border:
                        selectedCategory === cat.id
                          ? '1px solid var(--accent-light)'
                          : '1px solid var(--border-subtle)',
                      color: selectedCategory === cat.id ? 'var(--text-primary)' : 'var(--text-muted)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Controles de Paginación */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.2rem',
                }}
              >
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {isEnglish
                    ? `Showing ${safeCertPage + 1} of ${filteredCerts.length} certificates`
                    : `Mostrando credencial ${safeCertPage + 1} de ${filteredCerts.length}`}
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
              {current && currentBrand && (
                <TiltCard maxTilt={5} glowColor={`${currentBrand.color}30`}>
                  <div
                    style={{
                      padding: '1.75rem',
                      borderLeft: `4px solid ${currentBrand.color}`,
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
                        flexWrap: 'wrap',
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
                          {currentBrand.icon}
                        </div>
                        <div>
                          <span
                            style={{
                              fontSize: '0.74rem',
                              color: currentBrand.color,
                              fontWeight: 700,
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em',
                            }}
                          >
                            {currentBrand.badge}
                          </span>
                          <h4
                            style={{
                              fontSize: '1.15rem',
                              fontWeight: 700,
                              color: 'var(--text-primary)',
                              marginTop: '0.15rem',
                            }}
                          >
                            {current.title}
                          </h4>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Badge variant="accent" size="sm">
                          {current.issueDate || current.year}
                        </Badge>
                      </div>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-muted)',
                        marginBottom: '1rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <FiShield size={14} color="#10B981" />
                      <span style={{ color: '#10B981', fontWeight: 600 }}>
                        {isEnglish ? 'Verified Credential' : 'Emisor Oficial'}
                      </span>
                      <span>•</span>
                      <span>{current.issuer}</span>
                      {current.credentialId && (
                        <>
                          <span>•</span>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.8rem' }}>
                            ID: {current.credentialId}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Habilidades Validadas */}
                    {current.skills && (
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
                    )}

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
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ color: 'var(--accent-light)', fontWeight: 600 }}>
                          {isEnglish ? 'Verified & Accredited ✓' : 'Acreditado y Verificado ✓'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {/* Botón Ver Diploma / Credencial en HD */}
                        <Button
                          size="sm"
                          variant="primary"
                          icon={<FiEye size={14} />}
                          onClick={() => {
                            soundFX.playClick()
                            setSelectedDiploma({
                              id: current.id || 'cert',
                              title: current.title,
                              issuer: current.issuer,
                              recipient: 'Adrian Marcel Villafan Virhuez',
                              date: current.issueDate || current.year,
                              credentialId: current.credentialId,
                              credentialUrl: current.credentialUrl,
                              hasExternalLink: current.hasExternalLink,
                              skills: current.skills || [],
                              color: currentBrand.color,
                              type: current.issuer.toLowerCase().includes('certiprof')
                                ? 'certiprof'
                                : current.issuer.toLowerCase().includes('ibm')
                                ? 'ibm'
                                : current.issuer.toLowerCase().includes('anthropic')
                                ? 'anthropic'
                                : current.issuer.toLowerCase().includes('rimac')
                                ? 'rimac'
                                : 'other',
                            })
                          }}
                        >
                          {isEnglish ? 'Preview Credential' : 'Ver Credencial'}
                        </Button>

                        {/* Botón Verificar en Sitio Oficial (SOLO si NO es CertiProf) */}
                        {current.hasExternalLink !== false && current.credentialUrl && (
                          <Button
                            size="sm"
                            variant="outline"
                            icon={<FiExternalLink size={14} />}
                            onClick={() => {
                              soundFX.playClick()
                              window.open(current.credentialUrl, '_blank')
                            }}
                          >
                            {isEnglish ? 'Verify Official Link ↗' : 'Verificar en Sitio Oficial ↗'}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              )}

              {/* Grid de selector rápido de todos los certificados */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '0.5rem',
                  maxHeight: '190px',
                  overflowY: 'auto',
                  paddingRight: '0.25rem',
                }}
              >
                {filteredCerts.map((cert, index) => {
                  const b = getCertBranding(cert)
                  const isSelected = safeCertPage === index
                  return (
                    <button
                      key={cert.id || index}
                      onClick={() => {
                        soundFX.playClick()
                        setCertPage(index)
                      }}
                      style={{
                        padding: '0.55rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        textAlign: 'left',
                        background: isSelected ? 'var(--pill-bg)' : 'transparent',
                        border: isSelected ? `1px solid ${b.color}` : '1px solid var(--border-subtle)',
                        color: isSelected ? 'var(--text-primary)' : 'var(--text-muted)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.2rem',
                      }}
                    >
                      <span style={{ color: b.color, fontWeight: 700, fontSize: '0.7rem' }}>
                        {cert.issuer.split('/')[0].trim()}
                      </span>
                      <span
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '100%',
                        }}
                      >
                        {cert.title}
                      </span>
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🎓 Modal Oficial de Preview del Diploma / Credencial */}
        <DiplomaPreviewModal item={selectedDiploma} onClose={() => setSelectedDiploma(null)} />
      </div>
    )
  }
)

EducationCertShowcase.displayName = 'EducationCertShowcase'

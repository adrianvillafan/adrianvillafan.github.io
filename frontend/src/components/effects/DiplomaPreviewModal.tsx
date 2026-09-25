import React, { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { soundFX } from '@/utils/soundEffects'
import { useLanguage } from '@/context/LanguageContext'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import {
  FiX,
  FiAward,
  FiCheckCircle,
  FiDownload,
  FiPrinter,
  FiShield,
  FiCalendar,
  FiUser,
  FiExternalLink,
} from 'react-icons/fi'
import { SiCoursera, SiAtlassian, SiAnthropic } from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'

export interface DiplomaItem {
  id: string
  title: string
  degreeLevel?: string
  issuer: string
  recipient: string
  date: string
  credentialId?: string
  credentialUrl?: string
  faculty?: string
  motto?: string
  skills: string[]
  color: string
  type: string
  hasExternalLink?: boolean
}

interface DiplomaPreviewModalProps {
  item: DiplomaItem | null
  onClose: () => void
}

export const DiplomaPreviewModal: React.FC<DiplomaPreviewModalProps> = React.memo(
  ({ item, onClose }) => {
    const { isEnglish } = useLanguage()

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          soundFX.playClick()
          onClose()
        }
      },
      [onClose]
    )

    useEffect(() => {
      if (item) {
        soundFX.playSuccess()
        window.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'unset'
      }
    }, [item, handleKeyDown])

    if (!item) return null

    const handlePrint = () => {
      soundFX.playClick()
      window.print()
    }

    const isCertiprof = item.type === 'certiprof'

    return (
      <AnimatePresence>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="diploma-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
        >
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              soundFX.playClick()
              onClose()
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 25 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '92vh',
              overflowY: 'auto',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-active)',
              borderRadius: '24px',
              boxShadow: '0 30px 60px -12px rgba(0, 0, 0, 0.7), 0 0 60px var(--accent-glow)',
              zIndex: 151,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Top Toolbar */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'var(--bg-glass)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <FiAward size={20} color="var(--accent-light)" />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  {isEnglish ? 'Official Credential Preview' : 'Vista Previa Oficial de Credencial'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {!isCertiprof && (
                  <Button size="sm" variant="outline" icon={<FiPrinter size={14} />} onClick={handlePrint}>
                    {isEnglish ? 'Print' : 'Imprimir'}
                  </Button>
                )}
                <button
                  onClick={() => {
                    soundFX.playClick()
                    onClose()
                  }}
                  aria-label="Cerrar modal"
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: 'var(--pill-bg)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <FiX size={17} />
                </button>
              </div>
            </div>

            {/* Diploma Certificate Canvas View */}
            <div style={{ padding: '2rem 1.5rem' }}>
              <div
                className="certificate-paper"
                style={{
                  background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
                  border: '3px double #d97706',
                  borderRadius: '16px',
                  padding: '2.5rem 2rem',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.6), 0 10px 30px rgba(0, 0, 0, 0.4)',
                  textAlign: 'center',
                }}
              >
                {/* Decorative Corner Ornaments */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', width: '24px', height: '24px', borderTop: '2px solid #f59e0b', borderLeft: '2px solid #f59e0b' }} />
                <div style={{ position: 'absolute', top: '12px', right: '12px', width: '24px', height: '24px', borderTop: '2px solid #f59e0b', borderRight: '2px solid #f59e0b' }} />
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '24px', height: '24px', borderBottom: '2px solid #f59e0b', borderLeft: '2px solid #f59e0b' }} />
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '24px', height: '24px', borderBottom: '2px solid #f59e0b', borderRight: '2px solid #f59e0b' }} />
                {/* Official Institution Crest */}
                {item.type === 'unmsm' || item.issuer.toLowerCase().includes('san marcos') ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <img
                      src="./images/unmsm_seal.svg"
                      alt="Escudo Oficial UNMSM"
                      width={74}
                      height={74}
                      style={{
                        width: '74px',
                        height: '74px',
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 4px 14px rgba(245, 158, 11, 0.45))',
                      }}
                    />
                  </div>
                ) : item.type === 'up' || item.issuer.toLowerCase().includes('pacífico') || item.issuer.toLowerCase().includes('pacifico') ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '16px',
                        background: '#ffffff',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                      }}
                    >
                      <img
                        src="./images/upacifico.png"
                        alt="Escudo Universidad del Pacífico"
                        width={52}
                        height={52}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </div>
                  </div>
                ) : item.type === 'ibm' || item.issuer.toLowerCase().includes('ibm') ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <div
                      style={{
                        borderRadius: '10px',
                        background: 'rgba(15, 98, 254, 0.12)',
                        border: '1px solid rgba(15, 98, 254, 0.3)',
                        padding: '8px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src="./images/ibm_logo.svg"
                        alt="IBM"
                        width={80}
                        height={34}
                        style={{ width: '80px', height: '34px', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                ) : item.type === 'rimac' || item.issuer.toLowerCase().includes('rimac') ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <div
                      style={{
                        borderRadius: '10px',
                        background: '#ffffff',
                        padding: '6px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <img
                        src="./images/rimac_logo.png"
                        alt="Rimac Seguros"
                        height={32}
                        style={{ maxHeight: '32px', width: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                ) : item.type === 'certiprof' || item.issuer.toLowerCase().includes('certiprof') ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <div
                      style={{
                        borderRadius: '10px',
                        background: '#ffffff',
                        padding: '6px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      <img
                        src="./images/certiprof_logo.png"
                        alt="CertiProf International"
                        height={34}
                        style={{ maxHeight: '34px', width: 'auto', objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                ) : item.type === 'anthropic' || item.issuer.toLowerCase().includes('anthropic') ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <div
                      style={{
                        borderRadius: '14px',
                        background: 'rgba(217, 119, 6, 0.15)',
                        border: '1px solid rgba(217, 119, 6, 0.3)',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D97706',
                      }}
                    >
                      <SiAnthropic size={42} />
                    </div>
                  </div>
                ) : item.issuer.toLowerCase().includes('atlassian') ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <SiAtlassian size={44} color="#0052CC" />
                  </div>
                ) : item.issuer.toLowerCase().includes('linkedin') ? (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <FaLinkedin size={44} color="#0A66C2" />
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.85rem' }}>
                    <SiCoursera size={44} color="#0056D2" />
                  </div>
                )}

                {/* Country / Authority Header */}
                <div style={{ fontSize: '0.8rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#f59e0b', fontWeight: 800, marginBottom: '0.4rem' }}>
                  {item.type === 'unmsm' ? 'REPÚBLICA DEL PERÚ' : 'INTERNATIONAL CERTIFICATE OF COMPLETION'}
                </div>

                {/* Issuer Institution */}
                <h2
                  id="diploma-modal-title"
                  style={{
                    fontSize: 'clamp(1.3rem, 2.8vw, 1.85rem)',
                    fontWeight: 800,
                    letterSpacing: '-0.01em',
                    color: '#ffffff',
                    margin: '0.25rem 0',
                    lineHeight: 1.2,
                  }}
                >
                  {item.issuer}
                </h2>

                {item.motto && (
                  <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontStyle: 'italic', letterSpacing: '0.05em', marginBottom: '1.25rem' }}>
                    « {item.motto} »
                  </div>
                )}

                {item.faculty && (
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, marginBottom: '1.25rem' }}>
                    {item.faculty}
                  </div>
                )}

                {/* Confiere / Otorga */}
                <div style={{ fontSize: '0.88rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.15em', margin: '1rem 0 0.5rem' }}>
                  {item.type === 'unmsm' ? 'Por cuanto se ha cumplido con los requisitos académicos, otorga a:' : 'Certifies that:'}
                </div>

                {/* Recipient Full Name */}
                <div
                  style={{
                    fontSize: 'clamp(1.5rem, 3.2vw, 2.1rem)',
                    fontWeight: 900,
                    color: '#f8fafc',
                    fontFamily: 'serif',
                    letterSpacing: '0.02em',
                    borderBottom: '1px solid rgba(245, 158, 11, 0.4)',
                    display: 'inline-block',
                    padding: '0.2rem 1.5rem 0.5rem',
                    margin: '0.5rem 0 1rem',
                  }}
                >
                  {item.recipient}
                </div>

                {/* Degree / Certificate Title */}
                <div style={{ fontSize: '0.88rem', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>
                  {item.type === 'unmsm' ? 'El Grado Académico de:' : 'Has earned the credential:'}
                </div>

                <div
                  style={{
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                    fontWeight: 800,
                    color: item.color,
                    letterSpacing: '-0.01em',
                    marginBottom: '1.25rem',
                    textShadow: `0 0 20px ${item.color}40`,
                  }}
                >
                  {item.title}
                </div>

                {/* Skills gained */}
                <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.45rem', maxWidth: '620px', margin: '0 auto 1.75rem' }}>
                  {item.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        color: '#f1f5f9',
                        background: 'rgba(255, 255, 255, 0.07)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Footer validation bar & Gold Seal */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTop: '1px dashed rgba(245, 158, 11, 0.3)',
                    paddingTop: '1.25rem',
                    marginTop: '1.25rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', fontWeight: 600 }}>
                      <FiShield size={15} />
                      <span>{isEnglish ? 'Verified Credential' : 'Credencial Acreditada'}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.2rem', fontFamily: 'monospace' }}>
                      {item.credentialId ? `ID: ${item.credentialId}` : 'Registro Oficial'}
                    </div>
                  </div>

                  {/* Golden Foil Seal */}
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, #fde047 0%, #ca8a04 70%, #854d0e 100%)',
                      border: '2px solid #fef08a',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#451a03',
                      fontWeight: 900,
                      fontSize: '0.62rem',
                      lineHeight: 1.1,
                      boxShadow: '0 4px 15px rgba(202, 138, 4, 0.5)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>SEAL</span>
                    <span>★ ★ ★</span>
                    <span>VALID</span>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', justifyContent: 'flex-end', color: '#e2e8f0', fontWeight: 600 }}>
                      <FiCalendar size={14} />
                      <span>{item.date}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>Lima, Perú</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div
              style={{
                padding: '1rem 1.5rem',
                borderTop: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '0.75rem',
                background: 'var(--bg-glass)',
              }}
            >
              {!isCertiprof && item.credentialUrl && item.hasExternalLink !== false && (
                <Button
                  size="md"
                  variant="primary"
                  icon={<FiExternalLink size={16} />}
                  onClick={() => {
                    soundFX.playClick()
                    window.open(item.credentialUrl, '_blank')
                  }}
                >
                  {isEnglish ? 'Verify on Official Platform' : 'Verificar en Plataforma Oficial'}
                </Button>
              )}
              {!isCertiprof && (
                <Button size="md" variant="outline" icon={<FiPrinter size={16} />} onClick={handlePrint}>
                  {isEnglish ? 'Print Diploma' : 'Imprimir'}
                </Button>
              )}
              <Button size="md" variant="outline" onClick={onClose}>
                {isEnglish ? 'Close' : 'Cerrar'}
              </Button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    )
  }
)

DiplomaPreviewModal.displayName = 'DiplomaPreviewModal'
